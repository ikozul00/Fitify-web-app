import Image from "next/image";
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

const ProductView = ({ product,addToCartRedux, counter}) => {
  const images = [product.thumbnailImage, ...product.imagesCollection.items];
  const [pickedSize,setPickedSize] = useState("0");
  const [pickedAmount,setPickedAmount] = useState("1");
  const [added, setAdded] = useState(false);
  const [inital, setInital] = useState(true);
  const [pickSize,setPickSize] = useState(false);

  const amount = [1,2,3,4,5,6,7,8,9,10];

  useEffect(() => {
    if(!inital){
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
    setInital(false);
  }, [counter])

  function sizePicked(size){
    if(pickSize){
      setPickSize(false);
    }
    setPickedSize(size);
  }


  function addToCart(){
    if(pickedSize==="0"){
      setPickSize(true);
    }
    else{
      addToCartRedux(product.sys.id,product.title,images[0],product.price,pickedSize,pickedAmount);
    }
  }

  return (
    <main className="w-3/4 mx-auto my-10 flex justify-between font-open-sans">
      <div className="w-1/2">
        <div className="relative w-full h-full">
          <ImageSlider images={images} />
        </div>
      </div>
      <div className="font-open-sans text-left px-5 w-1/2">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <div className="flex text-2xl mt-8 mb-4">
          <h2 className="font-extrabold">${product.price}</h2>
          {product.oldPrice != null && (
            <h2 className="line-through font-bold ml-5 text-fitify-green">${product.oldPrice}</h2>
          )}
        </div>
        <p className="text-xl">Select Size:</p>
          <div className="flex justify-start mb-5 flex-wrap">
            {product.sizes.map((size) => (
              <button className={`rounded-full border-black w-10 h-10 border-2 font-semibold mx-2 my-2 ${pickedSize===size ? 'bg-fitify-green text-white' : 'bg-white text-black'}`} onClick={() => sizePicked(size)}>
                {size}
              </button>
            ))}
          </div>
        <div className="flex flex-row w-full justify-between items-baseline">
        <div>
        <label htmlFor="amount" id="amount" className="mr-3 text-xl">Amount:</label>
        <select name="amount" id="amount" className="w-20 text-center border-2 border-gray-500" value={pickedAmount} onChange={(e) => setPickedAmount(e.target.value)}>
          {
            amount.map((i) => <option value={`${i}`}>{i}</option>)
          }
        </select>
        </div>
        <button className=" bg-fitify-purple text-white text-xl px-4 py-2 " onClick={() => addToCart()}>Add to cart</button>
        </div>
        {added && 
          <div className=" border-2 border-fitify-green rounded-lg my-3">
            <p>Product <span className="font-semibold">{product.title}</span> successfully added to cart!</p>
          </div>
        }
        {pickSize &&
          <div className=" border-2 border-fitify-green rounded-lg my-3">
            <p>Sorry you need to first pick a size then you can add product <span className="font-semibold">product.title</span> to cart.</p>
          </div>
        }
        <div>
          <p className="font-semibold mt-3"><span className="font-bold text-lg">Material:</span> {product.material}</p>
          <MDXRemote {...product.mdxSource} components={components} lazy />
        </div>
      </div>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({ 
  addToCartRedux: (id,title,image,price,size,amount) => dispatch(addToCart(id,title,image,price,size,amount)),
});

const mapStateToProps = (state) => ({
  counter:state.cartReducer.quantity[0],
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductView); 
