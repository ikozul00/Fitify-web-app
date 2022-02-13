import { MDXRemote } from "next-mdx-remote";
import { H2, H3 } from "@/components/blog/heading";
import { P, Strong } from "@/components/blog/text";
import { Ul, Li, Ol } from "@/components/blog/list";
import { A } from "@/components/blog/link";
import ImageSlider from "../imageSlider/ImageSlider";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "redux/actions/cartActions";

const components = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  strong: Strong,
};


const ProductView = ({ product, addToCartRedux, counter }) => {
  const images = [product.thumbnailImage, ...product.imagesCollection.items];
  const [pickedSize, setPickedSize] = useState("0");
  const [pickedAmount, setPickedAmount] = useState("1");
  const [added, setAdded] = useState(false);
  const [inital, setInital] = useState(true);
  const [pickSize, setPickSize] = useState(false);

  const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    if (!inital) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    }
    setInital(false);
  }, [counter]);

  function sizePicked(size) {
    if (pickSize) {
      setPickSize(false);
    }
    setPickedSize(size);
  }

  function addToCart() {
    if (pickedSize === "0") {
      setPickSize(true);
    } else {
      addToCartRedux(
        product.sys.id,
        product.title,
        images[0],
        product.price,
        pickedSize,
        pickedAmount
      );
    }
  }

  return (
    <main className="custom:w-4/5 w-11/12 mx-auto my-10 flex md:flex-row flex-col justify-between md:items-start items-center font-open-sans">
      <div className="md:w-1/2 w-full">
        <div className="relative w-full h-full">
          <ImageSlider images={images} />
        </div>
      </div>
      <div className="font-open-sans px-5 md:w-1/2 w-11/12 md:mt-0 mt-8 text-left ">
        <h1 className="sm:text-4xl text-3xl font-bold">{product.brand}</h1>
        <h1 className="sm:text-3xl text-2xl  font-semibold">{product.title}</h1>
        <div className="flex sm:text-2xl text-xl  mt-8 mb-4">
          <h2 className="font-extrabold">${product.price}</h2>
          {product.oldPrice != null && (
            <h2 className="line-through font-bold ml-5 text-fitify-green">
              ${product.oldPrice}
            </h2>
          )}
        </div>
        <p className="sm:text-xl text-lg">Select Size:</p>
        <div className="flex justify-start mb-5 flex-wrap">
          {product.sizes.map((size) => {
            return(
            <button
              key={size}
              className={`rounded-full border-black sm:w-20 w-16 mm:h-10 h-12 border-2 font-semibold mx-2 my-2 ${
                pickedSize === size
                  ? "bg-fitify-green text-white border-white"
                  : "bg-white text-black border-black"
              }`}
              onClick={() => sizePicked(size)}
            >
              {size}
            </button>
          )})}
        </div>
        <div className="flex custom:flex-row  ms:flex-col customSmall:flex-row flex-col w-full justify-between items-baseline">
          <div>
            <label
              htmlFor="amount"
              id="amount"
              className="mr-3 sm:text-xl text-lg"
            >
              Amount:
            </label>
            <select
              name="amount"
              id="amount"
              className="sm:w-20 w-16 text-center border-2 border-gray-500"
              value={pickedAmount}
              onChange={(e) => setPickedAmount(e.target.value)}
            >
              {amount.map((i) => (
                <option key={i} value={`${i}`}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <button
            className=" bg-fitify-purple text-white sm:text-xl text-lg px-4 py-2 custom:mt-0 mt-4 hover:opacity-80"
            onClick={() => addToCart()}
          >
            Add to cart
          </button>
        </div>
        {added && (
          <div className=" border-2 border-fitify-green rounded-lg my-3">
            <p>
              Product <span className="font-semibold">{product.title}</span>{" "}
              successfully added to cart!
            </p>
          </div>
        )}
        {pickSize && (
          <div className=" border-2 border-fitify-green rounded-lg my-3">
            <p>
              Sorry you need to first pick a size then you can add product{" "}
              <span className="font-semibold">{product.title}</span> to cart.
            </p>
          </div>
        )}
        <div>
          <h2 className="sm:text-2xl text-xl font-semibold uppercase mt-10">
            Product details
          </h2>
          <p className="font-semibold mt-3">
            <span className="font-bold sm:text-lg text-base">Material:</span>{" "}
            {product.material}
          </p>
          <MDXRemote {...product.mdxSource} components={components} lazy />
        </div>
      </div>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCartRedux: (id, title, image, price, size, amount) =>
    dispatch(addToCart(id, title, image, price, size, amount)),
});

const mapStateToProps = (state) => ({
  counter: state.cartReducer.quantity[0],
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
