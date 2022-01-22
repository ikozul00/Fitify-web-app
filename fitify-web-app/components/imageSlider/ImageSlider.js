import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";

const ImageSlider = ({ images }) => {
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
      <div className="slide">
        <img src={images[0].url} alt="Product image" className="image" />
      </div>
    );

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      {images.map((image, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={image.url} alt="Product image" className="image" />
            )}
          </div>
        );
      })}
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
    </section>
  );
};

export default ImageSlider;
