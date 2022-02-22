import { getAllProductIDs, getProductByID } from "pages/api/ContentfulAPI";
import { serialize } from "next-mdx-remote/serialize";
import React from "react";
import ProductView from "@/components/shop/ProductView";

const Product = ({ product }) => <ProductView product={product} />;

export async function getStaticPaths() {
  const products = await getAllProductIDs();

  //Uzmu se svi slugovi i iz njih kreiraju pathovi
  const paths = products.map((product) => ({
    params: { slug: product.sys.id },
  }));

  return {
    paths,
    fallback: false, // Ovim se obvezujemo da smo dali opise svih pathova koje zelimo staticki pregenerirati
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const product = await getProductByID(slug);
  product.mdxSource = await serialize(product.productDetails);
  delete product.productDetails;

  return {
    props: { product },
  };
}

export default Product;
