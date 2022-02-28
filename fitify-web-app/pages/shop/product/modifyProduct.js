import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchEntryById } from "pages/api/ModifyProducts";
import { filters } from "@/constants/filters";
import Checkbox from "@/components/shop/Checkbox";

const ModifyProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sizes, setSizes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(async () => {
    if (router.query.id) {
      let entry = await fetchEntryById(router.query.id);
      entry = entry.fields;
      //console.log(entry);
      setTitle(entry.title["en-US"]);
      setPrice(entry.price["en-US"]);
      //Ako postoji stara cijena (product snizen)
      if (entry.oldPrice) setOldPrice(entry.oldPrice["en-US"]);

      setGender(entry.gender["en-US"]);
      setCategory(entry.category["en-US"]);
      setBrand(entry.brand["en-US"]);
      setSizes(entry.sizes["en-US"]);
    }
  }, [router]);

  const handleSizeChange = (selectedSizes) => {
    setSizes(selectedSizes);
    console.log("Selected Sizes:", selectedSizes);
  };

  return (
    <div>
      <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase text-gray-700 font-semibold basis-5/6">
        Modify product
      </h1>
      <form className=" w-5/6 my-5 flex flex-col">
        <div className="px-7 flex flex-col sm:text-base text-sm">
          <label htmlFor="title" className="mt-5 text-xl">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="price" className="mt-5 text-xl">
            Price:
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="oldPrice" className="mt-5 text-xl">
            Old Price:
          </label>
          <input
            type="text"
            name="oldPrice"
            id="oldPrice"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-full"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
          <label htmlFor="category" className="mt-5 text-xl">
            Category:
          </label>
          <select
            name="category"
            id="category"
            className="md:w-2/5 sm:w-3/6 w-full border-2 border-black"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {filters.category.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="gender" className="mt-5 text-xl">
            Gender:
          </label>
          <select
            name="gender"
            id="gender"
            className="md:w-2/5 sm:w-3/6 w-full  border-2 border-black"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            {filters.gender.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="brand" className="mt-5 text-xl">
            Brand:
          </label>
          <select
            name="brand"
            id="brand"
            className="md:w-2/5 sm:w-3/6 w-full border-2 border-black"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
          >
            {filters.brand.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <Checkbox
            options={filters.sizes}
            preselectedValues={sizes}
            setSelectedValues={handleSizeChange}
          />
        </div>
      </form>
    </div>
  );
};

export default ModifyProduct;
