import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";
import { H2, H3 } from "@/components/blog/heading";
import { P, Strong } from "@/components/blog/text";
import { Ul, Li, Ol } from "@/components/blog/list";
import { A } from "@/components/blog/link";

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
  return (
    <main className="w-2/3 mx-auto my-10 flex justify-between">
      <div className="w-1/2">
        <div className="relative w-full h-full">
          <Image
            src={product.thumbnailImage.url}
            alt="Product image"
            layout="fill"
          />
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
              <button className="rounded-full border-black border-2">
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
      </div>
    </main>
  );
};
export default ProductView;
