import { useState, useEffect } from "react";
import { getAssetById } from "pages/api/ContentfulAPI";
import Image from "next/image";

const MultipleImagesChanger = ({ imageIds, updateImages }) => {
  const [images, setImages] = useState([]);

  useEffect(async () => {
    let imagesInfo = [];
    for (let i = 0; i < imageIds.length; i++) {
      let imageInfo = await getAssetById(imageIds[i]);
      imageInfo.id = imageIds[i]; // Dodaje se ovo polje kako bi se dalje razlikovale postojece od novih slika
      imagesInfo.push(imageInfo);
    }

    setImages([...imagesInfo]);
    console.log("Original images:", imagesInfo);
  }, []);

  const handleImageUpload = (e) => {
    let newImages = [];
    for (let i = 0; i < e.target.files.length; i++)
      newImages.push({
        url: URL.createObjectURL(e.target.files[i]),
        title: e.target.files[i].name,
        file: e.target.files[i],
        id: "",
      });

    setImages([...images, ...newImages]);
    updateImages([...images, ...newImages]);
  };

  const handleXButtonClick = (e, image) => {
    e.preventDefault();
    console.log(image);

    let arr = [...images]; // Pomocni niz
    let index = arr.indexOf(image);
    if (index > -1) {
      arr.splice(index, 1);
      setImages(arr); // 2nd parameter means remove one item only
    }
    updateImages([...arr]);
  };

  return (
    <div className="w-full flex flex-row">
      <div className="flex flex-row justify-start w-full flex-wrap">
        {images &&
          images.map((image) => (
            <li className="flex justify-start w-full" key={image.title}>
              <div className="xl:w-80 sm:w-48 w-36 sm:h-72 h-44 relative mr-10">
                <Image
                  src={image.url}
                  alt={image.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <button
                className="font-bold text-3xl p-4 hover:scale-110"
                onClick={(e) => {
                  handleXButtonClick(e, image);
                }}
              >
                X
              </button>
            </li>
          ))}
      </div>
      <input
        type="file"
        id="images"
        name="images"
        className="basis-1/4"
        onChange={handleImageUpload}
        multiple
      />
    </div>
  );
};
export default MultipleImagesChanger;
