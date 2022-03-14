import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchEntryById, updateProduct } from "pages/api/ModifyProducts";
import { filters } from "@/constants/filters";
import { checkProduct } from "@/lib/errorChecking";
import Checkbox from "@/components/dataModification/Checkbox";
import ImageChanger from "@/components/dataModification/ImageChanger";
import MultipleImagesChanger from "@/components/dataModification/MultipleImagesChanger";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const ModifyProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState([]);
  const [details, setDetails] = useState("");
  const [material, setMaterial] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [images, setImages] = useState("");
  const router = useRouter();

  useEffect(async () => {
    if (router.query.id) {
      let entry = await fetchEntryById(router.query.id)
        .then((entry) => entry.fields)
        .catch(() => false);

      if (!entry) router.push("/404");
      else {
        console.log(entry);
        setTitle(entry.title["en-US"]);
        setPrice(entry.price["en-US"]);
        //Ako postoji stara cijena (product snizen)
        if (entry.oldPrice["en-US"]) setOldPrice(entry.oldPrice["en-US"]);
        setGender(entry.gender["en-US"]);
        setCategory(entry.category["en-US"]);
        setBrand(entry.brand["en-US"]);
        setSizes(entry.sizes["en-US"]);
        setColor(entry.color["en-US"]);
        setDetails(entry.productDetails["en-US"]);
        if (entry.material["en-US"]) setMaterial(entry.material["en-US"]);
        setThumbnailImage(entry.thumbnailImage["en-US"].sys);
        if (entry.images)
          setImages(entry.images["en-US"].map((image) => image.sys.id));
      }
    }
  }, [router]);

  const handleSizeChange = (selectedSizes) => {
    setSizes(selectedSizes);
    console.log("Selected Sizes:", selectedSizes);
  };

  const handleColorChange = (selectedColors) => {
    setColor(selectedColors);
    console.log("Selected Colors:", selectedColors);
  };

  const sendProduct = async (e) => {
    e.preventDefault();
    let product = {
      id: router.query.id,
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

    let errorCheck = checkProduct(product);
    if (errorCheck.error) NotificationManager.warning(errorCheck.errorMsg);
    else {
      NotificationManager.info("Your query is processing.");
      errorCheck = await updateProduct(product)
        .then(() =>
          NotificationManager.success(
            "Product is successfully updated! Change will be visible in several minutes."
          )
        )
        .catch(() => NotificationManager.error("Ooops! Something went wrong!"));
    }
  };

  const handleNewThumbnailImage = (newImage) => {
    setThumbnailImage({ ...newImage });
  };

  const handleUpdateImages = (newImagesArray) => {
    setImages([...newImagesArray]);
    console.log(images);
  };

  return (
    <div className="md:ml-16 ml-8 w-11/12 my-12 font-open-sans">
      <div className="flex flex-row">
        <h1 className="md:text-5xl sm:text-4xl text-3xl uppercase text-gray-700 font-semibold basis-5/6 px-7">
          Modify product
        </h1>
      </div>
      <form className=" w-5/6 my-5 flex flex-col">
        <div className="px-7 flex flex-col sm:text-base text-sm relative">
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
          <Checkbox
            options={filters.color}
            preselectedValues={color}
            setSelectedValues={handleColorChange}
          />
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
            imageId={thumbnailImage.id}
            setNewImage={handleNewThumbnailImage}
          />
          <p className="mt-5 text-xl">Images:</p>
          {images && (
            <MultipleImagesChanger
              imageIds={images}
              updateImages={handleUpdateImages}
            />
          )}
          <button
            onClick={sendProduct}
            className=" bg-fitify-purple text-white w-36 py-2 place-self-end mb-7"
          >
            Apply changes
          </button>
        </div>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default ModifyProduct;
