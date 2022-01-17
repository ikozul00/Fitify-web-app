import ProductCard from "./ProductCard";

const ProductContainer = ({ products }) => {
  return (
    <div className="grid grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product}></ProductCard>
      ))}
    </div>
  );
};

export default ProductContainer;
