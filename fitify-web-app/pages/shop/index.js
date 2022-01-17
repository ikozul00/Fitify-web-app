import { getAllProducts } from "@/lib/ContentfulAPI";
import ProductContainer from "@/components/shop/ProductContainer";

const Shop = ({ products, numberOfProducts }) => {
  return (
    <>
      <div className="font-open-sans text-left w-2/3 mx-10 my-10">
        <h1 className="text-5xl fitify-purple my-8">Shop</h1>
        <p>
          Define your activewear style with our fashion clothing. Everyday
          essentials include relaxed t-shirts, easy-to-wear sweatpants and
          laid-back hoodies to see you comfortably through off-duty weekends.
          Our form-fitting athletic wear is constructed from high-tech materials
          to keep you comfortable through your workout, ensuring that our sports
          clothing is both form-focused and functional. Lightweight track
          jackets, hooded sweatshirts and cosy coats will keep you warm whatever
          the weather. Similarly, moisture-wicking crop tops, t-shirts, leggings
          and shorts will keep you cool as your workout heats up. Whether you’re
          exercising at home, working out in the gym or channelling that
          athleisure aesthetic, we’ve got something to suit.
        </p>
      </div>
      <div>
        <p className="mx-10">{numberOfProducts} Results</p>
        <ProductContainer products={products} />
      </div>
    </>
  );
};

export default Shop;

export async function getStaticProps() {
  const productCollection = await getAllProducts();
  return {
    props: {
      products: productCollection.items,
      numberOfProducts: productCollection.total,
    },
  };
}
