import { getAllProducts } from "pages/api/ContentfulAPI";
import ProductContainer from "@/components/shop/ProductContainer";
import Filter from "@/components/shop/Filter";
import { useEffect, useState } from "react";
import SortBy from "@/components/shop/SortBy";
import { sortProducts } from "@/lib/sorting";
import { searchProducts } from "@/lib/search";
import SearchBar from "@/components/shop/SearchBar";
import { useRouter } from "next/router";
import { setFilters } from "@/lib/filterFunctions";
import { BsSliders } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Shop = ({ products }) => {
  const [shownProducts, setShownProducts] = useState(products);
  const [sortingOption, setSortingOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [usedFilters, setUsedFilters] = useState({
    newCategory: "all",
    newBrand: "all",
    newColor: "all",
    newSize: "all",
    newGender: "all",
    newSale: "all",
    minimumPrice: 0,
    maximumPrice: 200,
  });
  const router = useRouter();
  const [displayFilters, setDisplayFilters] = useState(false);
  const { data:session } = useSession();

  useEffect(() => {
    if (router.query.search) {
      filterProducts(setFilters(router.query), router.query.search);
    } else {
      filterProducts(setFilters(router.query), "");
    }
    console.log(router.query);
  }, [router]);

  const filterProducts = (filters, searchValue) => {
    // Ako postoji search query, izdvoji produkte, inace uzmi sve produkte
    const filteredProducts =
      searchValue != "" ? searchProducts(searchValue, products) : products;

    setUsedFilters({ ...filters });
    setSearchQuery(searchValue);

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

    if (filters.newSale != "all") {
      if (filters.newSale == "sale")
        filteredProducts = filteredProducts.filter(
          (product) => product.oldPrice != null
        );
      else
        filteredProducts = filteredProducts.filter(
          (product) => product.oldPrice == null
        );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filters.minimumPrice &&
        product.price <= filters.maximumPrice
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
    <main className="w-11/12 mx-auto">
      <div className="font-open-sans md:text-left text-center my-10">
        <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase mt-12 text-gray-700 font-semibold">
          Shop
        </h1>

        <div className="flex flex-row md:justify-between  justify-center mt-8 pb-5 border-b-2 border-gray-700">
          <p
            className="basis-1/2 md:block hidden"
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
          athleisure aesthetic, we've got something to suit.`,
            }}
          />

       <div className="flex flex-col justify-between items-end">
           {session && (session?.user?.role==="admin") && <Link href="/shop/addProduct" passHref>
            <p className="mx-10 bg-fitify-pink text-white sm:text-xl text-lg px-4 py-2 custom:mt-0 mt-4 hover:opacity-80">
              Add new product
            </p>
          </Link>}
          <SearchBar searchQuery={searchQuery} />
       </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="basis-3/12 mt-10 md:block hidden">
          <Filter
            usedFilters={usedFilters}
            searchQuery={searchQuery}
            displayFilters={true}
          />
        </div>
        <div className=" md:basis-10/12 w-full">
          <div
            className={`flex flex-row md:${
              searchQuery != "" ? "justify-between" : "justify-end"
            } justify-between md:mb-0 mb-6`}
          >
            {searchQuery != "" && (
              <p className=" md:block hidden font-bold ml-10">
                Results for: {searchQuery}
              </p>
            )}
            <div className="md:hidden flex flex-col">
              <button
                className="md:hidden flex items-center font-xl border-2 border-black px-3 sm:w-40 w-36 h-9"
                onClick={() => setDisplayFilters(!displayFilters)}
              >
                <BsSliders />
                <span className="sm:mr-14 mr-10 ml-1">Filters</span>
                {!displayFilters && <FaArrowDown />}
                {displayFilters && <FaArrowUp />}
              </button>
              <Filter
                usedFilters={usedFilters}
                searchQuery={searchQuery}
                displayFilters={displayFilters}
              />
            </div>
            <SortBy setSortingOption={handleSetSortingOption} />
          </div>
          {searchQuery != "" && (
            <p className=" md:hidden block font-bold">
              Results for: {searchQuery}
            </p>
          )}

          <div className="flex flex-row sm:ml-10 ml-0">
            <div className="w-full">
              <p className="">{shownProducts.length} Results</p>
              <ProductContainer products={shownProducts} />
            </div>
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
