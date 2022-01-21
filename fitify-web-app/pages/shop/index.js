import { getAllProducts } from "@/lib/ContentfulAPI";
import ProductContainer from "@/components/shop/ProductContainer";
import Filter from "@/components/shop/Filter";
import { useState } from "react";
import SortBy from "@/components/shop/SortBy";
import { sortProducts } from "@/lib/sorting";

const Shop = ({ products }) => {
  const [shownProducts, setShownProducts] = useState(products);
  const [sortingOption, setSortingOption] = useState("");

  const filterProducts = (filters) => {
    // Uzmi sve produkte
    const filteredProducts = products;

    // Filtrira se korak po korak, po svakom filtru
    // Ako je neki filter postavljen na all, preskače se
    if (filters.newCategory != "all")
      filteredProducts = filteredProducts.filter(
        (product) => product.category == filters.newCategory
      );
    if (filters.newBrand != "all")
      filteredProducts = filteredProducts.filter(
        (product) => product.brand == filters.newBrand
      );
    if (filters.newColor != "all")
      filteredProducts = filteredProducts.filter((product) =>
        product.color.includes(filters.newColor)
      );
    if (filters.newSize != "all")
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.includes(filters.newSize)
      );

    // Svakako se prikazuju unisex proizvodi
    if (filters.newGender != "all")
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.gender == filters.newGender || product.gender == "unisex"
      );

    // Na kraju se postavljaju novi proizvodi za prikazivanje, ali prvo ih treba sortirati
    setShownProducts(sortProducts(sortingOption, filteredProducts));
  };

  const handleSetSortingOption = (option) => {
    // U stateu sortingOption pamti se sto je klijent odabrao, kako bi se poslije filtriranja moglo primijeniti
    setSortingOption(option);
    setShownProducts(sortProducts(option, shownProducts));
  };

  return (
    <main className="full">
      <div className="font-open-sans text-left lg:w-1/2 mx-10 my-10">
        <h1 className="text-5xl fitify-purple my-8">Shop</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: `Define your activewear style with our fashion clothing. Everyday
          essentials include relaxed t-shirts, easy-to-wear sweatpants and
          laid-back hoodies to see you comfortably through off-duty weekends.
          Our form-fitting athletic wear is constructed from high-tech materials
          to keep you comfortable through your workout, ensuring that our sports
          clothing is both form-focused and functional. Lightweight track
          jackets, hooded sweatshirts and cosy coats will keep you warm whatever
          the weather. Similarly, moisture-wicking crop tops, t-shirts, leggings
          and shorts will keep you cool as your workout heats up. Whether you’re
          exercising at home, working out in the gym or channelling that
          athleisure aesthetic, we’ve got something to suit.`,
          }}
        />
      </div>
      <div>
        <div className="flex flex-row justify-between">
          <p className="mx-10 my-10">{shownProducts.length} Results</p>
          <SortBy setSortingOption={handleSetSortingOption} />
        </div>
        <div className="flex flex-row">
          <div className="basis-1/5 px-10 py-10">
            <Filter filterProducts={filterProducts} />
          </div>
          <div className="basis-4/5">
            <ProductContainer products={shownProducts} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;

export async function getStaticProps() {
  const productCollection = await getAllProducts();
  return {
    props: {
      products: productCollection.items,
    },
  };
}
