import ProductCard from "./ProductCard";

const ProductContainer = ({ products }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard product={product}></ProductCard>
      ))}
    </div>
  );
};

export default ProductContainer;
