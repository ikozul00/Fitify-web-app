import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import styles from '../../styles/ImageSlider.module.css';

const ImageSlider = ({ images,name }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  // Ako je samo jedna slika, vrati samo sliku
  if (images.length == 1)
    return (
      <section className="slider relative">
      <div className={`relative image-container ${styles.imageContainer}`}>
      <Image
        src={images[current].url}
        alt={`Product ${name} image`}
        layout="fill"
        objectFit="cover"
      />
      </div>
    </section>
    );

  return (
    <section className="slider mt-2">
      
      <div className={`relative image-container ${styles.imageContainer} mx-auto`}>
      <button className="text-5xl font-bold text-black absolute z-10 top-40 left-2" onClick={() => prevSlide()}>{`<`}</button>
      <Image
        src={images[current].url}
        alt={`Product ${name} image`}
        layout="fill"
        objectFit="cover"
      >
        </Image>
        <button className="text-5xl font-bold text-black absolute z-10 top-40 right-2" onClick={() => nextSlide()}>{`>`}</button>
      </div>
      
      <p className="text-center mt-3">{current+1} of {length}</p>
    </section>
  );
};

export default ImageSlider;
