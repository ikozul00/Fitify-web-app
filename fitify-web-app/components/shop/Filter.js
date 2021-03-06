import { BsSliders } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { filters } from "../../constants/filters";
import InputRange from "react-input-range";
import { createQuery } from "@/lib/filterFunctions";
import "react-input-range/lib/css/index.css";

const Filter = ({ usedFilters, searchQuery, displayFilters }) => {
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const [color, setColor] = useState("all");
  const [size, setSize] = useState("all");
  const [gender, setGender] = useState("all");
  const [price, setPrice] = useState({ min: 0, max: 200 });
  const [sale, setSale] = useState("all");
  const router = useRouter();

  useEffect(() => {
    // Kada se promijeni query url, dodu novi propsi (nove vrijednosti filtra)
    setCategory(usedFilters.newCategory);
    setBrand(usedFilters.newBrand);
    setColor(usedFilters.newColor);
    setSize(usedFilters.newSize);
    setGender(usedFilters.newGender);
    setPrice({ min: usedFilters.minimumPrice, max: usedFilters.maximumPrice });
    setSale(usedFilters.newSale);
  }, [usedFilters]);

  const handleClick = (e) => {
    e.preventDefault();
    let query = createQuery(
      {
        newBrand: brand,
        newCategory: category,
        newColor: color,
        newSize: size,
        newGender: gender,
        newSale: sale,
        minimumPrice: price.min,
        maximumPrice: price.max,
      },
      searchQuery
    );
    router.push(`/shop/${query}`);
  };

  return (
    <main className="font-open-sans">
      <div className=" md:flex-row justify-items-start md:block hidden">
        <BsSliders />
        <h1 className="md:text-3xl text-xl">Filters</h1>
      </div>
      {displayFilters && <div>
        <div className="my-5 w-full border-black border-2">
          <select
            name="category"
            id="category"
            className="w-full"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value={"all"} key={"all"}>
              All Categories
            </option>
            {filters.category.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="my-5 w-full border-black border-2">
          <select
            name="brand"
            id="brand"
            className="w-full"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
          >
            <option value={"all"} key={"all"}>
              All Brands
            </option>
            {filters.brand.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5 w-full border-black border-2">
          <select
            name="color"
            id="color"
            className="w-full"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          >
            <option value={"all"} key={"all"}>
              All Colors
            </option>
            {filters.color.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="my-5 w-full border-black border-2">
          <select
            name="size"
            id="size"
            className="w-full"
            onChange={(e) => setSize(e.target.value)}
            value={size}
          >
            <option value={"all"} key={"all"}>
              All Sizes
            </option>
            {filters.sizes.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5 w-full border-black border-2">
          <select
            name="gender"
            id="gender"
            className="w-full"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <option value={"all"} key={"all"}>
              All Genders
            </option>
            {filters.gender.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5 w-full border-black border-2">
          <select
            name="sale"
            id="sale"
            className="w-full"
            onChange={(e) => setSale(e.target.value)}
            value={sale}
          >
            <option value={"all"} key={"all"}>
              Sale/New Season
            </option>
            <option value={"sale"} key={"sale"}>
              Sale
            </option>
            <option value={"new"} key={"new"}>
              New Season
            </option>
          </select>
        </div>

        <div className="my-5 w-full slider">
          <p className="my-5">Price</p>
          <InputRange
            draggableTrack
            minValue={0}
            maxValue={200}
            step={10}
            onChange={(value) => setPrice(value)}
            value={price}
            onChangeComplete={(value) => console.log(value)}
          />
        </div>

        <button
          className="my-5 w-full bg-fitify-purple text-white py-2 font-bold hover:opacity-70"
          onClick={handleClick}
        >
          Apply
        </button>
      </div>
    }
    </main>
  );
};

export default Filter;
