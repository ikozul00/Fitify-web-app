import { BsSliders } from "react-icons/bs";
import { useEffect, useState } from "react";
import { filters } from "../../constants/filters";

const Filter = ({ filterProducts }) => {
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");

  return (
    <main className="font-open-sans">
      <div className="flex flex-row justify-items-start">
        <BsSliders />
        <h1 className="text-3xl">Filters</h1>
      </div>
      <div>
        <div className="my-5 w-full border-black border-2">
          <select
            name="brand"
            id="brand"
            className="w-full"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
          >
            <option value={"all"}>All Brands</option>
            {filters.brand.items.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="my-5 w-full border-black border-2">
          <select
            name="category"
            id="category"
            className="w-full"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value={"all"}>All Categories</option>
            {filters.category.items.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button
          className="my-10 border-2 border-black w-full"
          onClick={() =>
            filterProducts({ newBrand: brand, newCategory: category })
          }
        >
          Apply
        </button>
      </div>
    </main>
  );
};

export default Filter;
