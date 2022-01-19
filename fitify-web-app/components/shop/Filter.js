import { BsSliders } from "react-icons/bs";
import { useEffect, useState } from "react";
import { filters } from "../../constants/filters";

const Filter = ({ brand, selectBrand }) => {
  useEffect(() => {
    console.log(brand);
  }, [brand]);
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
            onChange={(e) => selectBrand(e.target.value)}
            value={brand}
          >
            <option value={"all"}>All Brands</option>
            {filters.brand.items.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </main>
  );
};

export default Filter;
