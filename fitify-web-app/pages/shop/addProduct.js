import { useState } from "react";
import { createNewProduct } from "pages/api/ModifyProducts";
import { filters } from "@/constants/filters";
import { checkProduct } from "@/lib/errorChecking";
import ImageChanger from "@/components/dataModification/ImageChanger";
import MultipleImagesChanger from "@/components/dataModification/MultipleImagesChanger";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [gender, setGender] = useState(filters.gender.items[0]);
  const [category, setCategory] = useState(filters.category.items[0]);
  const [brand, setBrand] = useState(filters.brand.items[0]);
  const [color, setColor] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [details, setDetails] = useState("");
  const [material, setMaterial] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const sendProduct = (e) => {
    e.preventDefault();
    let newProduct = {
      title: title,
      price: price,
      oldPrice: oldPrice,
      category: category,
      gender: gender,
      brand: brand,
      color: color,
      sizes: sizes,
      material: material,
      productDetails: details,
      thumbnailImage: thumbnailImage,
      images: images,
    };

    console.log(newProduct);
    let errorCheck = checkProduct(newProduct);
    if (errorCheck.error == false) {
      createNewProduct(newProduct);
      setErrorMessage("Your query is taken.");
    } else setErrorMessage(errorCheck.errorMsg);
  };

  const handleSizeChange = (e) => {
    const isChecked = e.target.checked;
    // Ako je true dodaj u listu sizes, inace izvadi iz liste
    if (isChecked) {
      setSizes([...sizes, e.target.value]);
    } else {
      let index = sizes.indexOf(e.target.value);
      setSizes(sizes.splice(index, 1));
    }
  };

  const handleColorChange = (e) => {
    const isChecked = e.target.checked;
    // Ako je true dodaj u listu sizes, inace izvadi iz liste
    if (isChecked) {
      setColor([...color, e.target.value]);
    } else {
      let index = color.indexOf(e.target.value);
      setColor(color.splice(index, 1));
    }
  };

  return (
    <div className="md:ml-16 ml-8 w-11/12 my-12 font-open-sans">
      <div className="flex flex-row">
        <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase text-gray-700 font-semibold basis-5/6">
          Add new product
        </h1>
        {errorMessage && (
          <p className="border-2 border-fitify-pink text-2xl p-2 basis-1/6">
            {errorMessage}
          </p>
        )}
      </div>
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
          <p className="mt-5 text-xl">Colors:</p>
          {filters.color.items.map((option) => {
            return (
              <div>
                <input
                  type="checkbox"
                  name={option}
                  key={option}
                  value={option}
                  onChange={handleColorChange}
                />
                <label htmlFor={option} className="mx-2">
                  {option}
                </label>
              </div>
            );
          })}
          <p className="mt-5 text-xl">Sizes:</p>
          {filters.sizes.items.map((option) => {
            return (
              <div>
                <input
                  type="checkbox"
                  name={option}
                  key={option}
                  value={option}
                  onChange={handleSizeChange}
                />
                <label htmlFor={option} className="mx-2">
                  {option}
                </label>
              </div>
            );
          })}
          <label htmlFor="material" className="mt-5 text-xl">
            Material:
          </label>
          <textarea
            id="material"
            name="material"
            rows={1}
            className="border-2 mb-5 border-fitify-purple form-field "
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
          ></textarea>
          <label htmlFor="details" className="mt-5 text-xl">
            Details:
          </label>
          <textarea
            id="details"
            name="details"
            rows={6}
            className="border-2 mb-5 border-fitify-purple form-field "
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>

          <p className="mt-5 text-xl">Thumbnail image:</p>
          <ImageChanger
            imageId={""}
            setNewImage={(img) => setThumbnailImage(img)}
          />
          <p className="mt-5 text-xl">Images:</p>
          <MultipleImagesChanger
            imageIds={[]}
            updateImages={(newImagesArray) => setImages([...newImagesArray])}
          />
          <button
            onClick={sendProduct}
            className=" bg-fitify-purple text-white w-36 py-2 place-self-end mb-7"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
