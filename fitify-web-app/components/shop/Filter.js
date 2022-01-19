import { BsSliders } from "react-icons/bs";
import { useEffect, useState } from "react";
import { filters } from "../../constants/filters";

const Filter = ({ filterProducts }) => {
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const [color, setColor] = useState("all");
  const [size, setSize] = useState("all");
  const [gender, setGender] = useState("all");

  return (
    <main className="font-open-sans">
      <div className="flex flex-row justify-items-start">
        <BsSliders />
        <h1 className="text-3xl">Filters</h1>
      </div>
      <div>
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
            name="color"
            id="color"
            className="w-full"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          >
            <option value={"all"}>All Colors</option>
            {filters.color.items.map((option) => (
              <option value={option}>{option}</option>
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
            <option value={"all"}>All Sizes</option>
            {filters.sizes.items.map((option) => (
              <option value={option}>{option}</option>
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
            <option value={"all"}>All Genders</option>
            {filters.gender.items.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>

        <button
          className="my-10 border-2 border-black w-full"
          onClick={() =>
            filterProducts({
              newBrand: brand,
              newCategory: category,
              newColor: color,
              newSize: size,
              newGender: gender,
            })
          }
        >
          Apply
        </button>
      </div>
    </main>
  );
};

export default Filter;
