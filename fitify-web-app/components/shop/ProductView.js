import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { H2, H3 } from "@/components/blog/heading";
import { P, Strong } from "@/components/blog/text";
import { Ul, Li, Ol } from "@/components/blog/list";
import { A } from "@/components/blog/link";
import ImageSlider from "../imageSlider/ImageSlider";
import { useState } from "react";

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

const ProductView = ({ product }) => {
  const images = [product.thumbnailImage, ...product.imagesCollection.items];
  const [pickedSize,setPickedSize] = useState("0");

  function sizePicked(size){
    setPickedSize(size);
  }

  function addToCart(){
    if(pickedSize==="0"){
      alert("0");
    }
    else{
      alert(`Adding to cart ${product.title} ${product.price} ${images[0].url} ${pickedSize}`);
    }
  }

  return (
    <main className="w-2/3 mx-auto my-10 flex justify-between">
      <div className="w-1/2">
        <div className="relative w-full h-full">
          <ImageSlider images={images} />
        </div>
      </div>
      <div className="font-open-sans text-left px-5 w-1/2">
        <h1 className="text-3xl fitify-purple">{product.title}</h1>
        <div className="flex text-2xl my-8">
          <h2 className="text-gray-600">${product.price}</h2>
          {product.oldPrice != null && (
            <h2 className="line-through text-gray-500">${product.oldPrice}</h2>
          )}
        </div>
        <div>
          <p>Select Size</p>
          <div className="flex justify-around">
            {product.sizes.map((size) => (
              <button className={`rounded-full border-black border-2 ${pickedSize===size ? 'bg-fitify-green' : 'bg-white'}`} onClick={() => sizePicked(size)}>
                {size}
              </button>
            ))}
          </div>
        </div>
        <div>
          <MDXRemote {...product.mdxSource} components={components} lazy />
          <p className="text-2xl">Material:</p>
          {product.material}
        </div>
        <button className="bg-fitify-green border-2 border-black" onClick={() => addToCart()}>Add to cart</button>
      </div>
    </main>
  );
};
export default ProductView;
