import ProductCard from "./ProductCard";

const ProductContainer = ({ products }) => {
  return (
    <div className="grid lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.sys.id}></ProductCard>
      ))}
    </div>
  );
};

export default ProductContainer;
