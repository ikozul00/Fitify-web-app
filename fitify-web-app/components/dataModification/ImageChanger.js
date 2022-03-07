import { useState, useEffect } from "react";
import { getAssetById } from "pages/api/ContentfulAPI";
import Image from "next/image";

const ImageChanger = ({ imageId, setNewImage }) => {
  const [image, setImage] = useState("");

  useEffect(async () => {
    if (imageId) {
      let imageInfo = await getAssetById(imageId);
      console.log(imageInfo);
      setImage({ ...imageInfo });
    }
  }, [imageId]);

  const handleImageUpload = (e) => {
    setImage({
      url: URL.createObjectURL(e.target.files[0]),
      title: e.target.files[0].name,
    });

    setNewImage({ file: e.target.files[0], id: "" });
  };

  return (
    <div className="flex flex-row justify-start">
      <input
        type="file"
        id="thumbnailImage"
        name="thumbnailImage"
        className="mr-20"
        onChange={handleImageUpload}
      />
      <div className="xl:w-80 sm:w-48 w-36 sm:h-72 h-44 relative">
        {image && (
          <Image
            src={image.url}
            alt={image.title}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
    </div>
  );
};
export default ImageChanger;
