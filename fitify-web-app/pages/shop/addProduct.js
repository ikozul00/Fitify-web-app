import { useState } from "react";
import { createNewProduct, fetchEntry } from "pages/api/ModifyProducts";
import { filters } from "@/constants/filters";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [oldPrice, setOldPrice] = useState();
  const [gender, setGender] = useState(filters.gender.items[0]);
  const [category, setCategory] = useState(filters.category.items[0]);
  const [brand, setBrand] = useState(filters.brand.items[0]);
  const [color, setColor] = useState(filters.color.items[0]);
  const [sizes, setSizes] = useState(filters.sizes.items[0]);
  const [details, setDetails] = useState("");
  const [material, setMaterial] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [images, setImages] = useState([]);

  const sendMessage = (e) => {
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
    createNewProduct(newProduct);
    //fetchEntry();
  };

  function handleChange(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case "title":
        setTitle(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "oldPrice":
        setOldPrice(value);
        break;
      default:
        console.log("Error with form");
    }
  }
  return (
    <div className="md:ml-16 ml-8 w-11/12 my-12 font-open-sans">
      <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase text-gray-700 font-semibold">
        Add new product
      </h1>
      <form className=" w-5/6 my-5 flex flex-col">
        <div className="px-7 flex flex-col sm:text-base text-sm">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-full"
            value={title}
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-ful"
            value={price}
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="oldPrice">Old Price:</label>
          <input
            type="number"
            name="oldPrice"
            id="oldPrice"
            className="border-2 mb-5 border-fitify-purple form-field md:w-2/5 sm:w-3/6 w-ful"
            value={oldPrice}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            className="w-full"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {filters.category.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            className="w-full"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            {filters.gender.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="brand">Brand:</label>
          <select
            name="brand"
            id="brand"
            className="w-full"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
          >
            {filters.brand.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="color">Color:</label>
          <select
            name="color"
            id="color"
            className="w-full"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          >
            {filters.color.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="sizes">Sizes:</label>
          <select
            name="sizes"
            id="sizes"
            className="w-full"
            onChange={(e) => setSizes(e.target.value)}
            value={sizes}
          >
            {filters.sizes.items.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="material">Material:</label>
          <textarea
            id="material"
            name="material"
            rows={1}
            className="border-2 mb-5 border-fitify-purple form-field "
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
          ></textarea>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            rows={6}
            className="border-2 mb-5 border-fitify-purple form-field "
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>

          <label htmlFor="thumbnailImage">Thumbnail image:</label>
          <input
            type="file"
            id="thumbnailImage"
            name="thumbnailImage"
            onChange={(e) => setThumbnailImage(e.target.files[0])}
          />
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={(e) => setImages(e.target.files)}
            multiple
          />

          <button
            onClick={sendMessage}
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
