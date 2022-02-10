import Head from "next/head";
import Image from "next/image";
import BlogContainer from "@/components/home/BlogContainer";
import {
  getNewestBlogArticles,
  getNewestSaleProducts,
} from "@/lib/ContentfulAPI";
import SaleContainer from "@/components/home/SaleContainer";
import Link from "next/link";

export default function Home({ saleProducts, blogArticles }) {
  return (
    <main className="font-open-sans flex flex-col">
      <div className="relative h-2/3">
        <Image
          src={require("/public/HomepageImage.png")}
          alt="Product image"
          layout="fill"
          objectFit="cover"
        />
        <h1 className="text-6xl my-8 text-white font-semibold">Shop here</h1>
        <p className="w-1/5text-4xl my-8 text-white font-semibold">
          Newest sport fashion and equipment
        </p>
      </div>
      <div className="w-9/12 mx-auto my-10">
        <h1 className="text-center text-5xl uppercase mt-12 text-gray-700 font-semibold">
          SHOP
        </h1>
        <div className="flex flex-row">
          <Link href={`/shop?category=Clothes`}>
            <div className="font-open-sans my-10 mx-10 basis-1/3">
              <div className="w-full">
                <Image
                  src={require("public/Clothes.jpg")}
                  alt="Clothes"
                  width={400}
                  height={500}
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold text-lg">CLOTHES</h1>
                <h2 className="mb-2 mt-1 w-full">SHOP NOW</h2>
              </div>
            </div>
          </Link>
          <Link href={`/shop?category=Shoes`}>
            <div className="font-open-sans my-10 mx-10 basis-1/3">
              <div className="w-full">
                <Image
                  src={require("public/Shoes.jpg")}
                  alt="Shoes"
                  width={400}
                  height={500}
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold text-lg">SHOES</h1>
                <h2 className="mb-2 mt-1 w-full">SHOP NOW</h2>
              </div>
            </div>
          </Link>
          <Link href={`/shop?category=Equipment`}>
            <div className="font-open-sans my-10 mx-10 basis-1/3 ">
              <div className="w-full">
                <Image
                  src={require("public/Equipment.jpg")}
                  alt="Equipment"
                  width={400}
                  height={500}
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold text-lg">
                  EQUIPMENT
                </h1>
                <h2 className="mb-2 mt-1 w-full">SHOP NOW</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <SaleContainer products={saleProducts} />
      <BlogContainer posts={blogArticles} />
    </main>
  );
}

export async function getStaticProps() {
  const saleProducts = await getNewestSaleProducts();
  const blogArticles = await getNewestBlogArticles();

  return {
    props: { saleProducts: saleProducts, blogArticles: blogArticles },
  };
}
