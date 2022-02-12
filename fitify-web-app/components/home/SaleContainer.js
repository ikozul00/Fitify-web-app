import Image from "next/image";
import Link from "next/link";

const SaleContainer = ({ products }) => {
  return (
    <div className="w-9/12 mx-auto my-10">
      <Link href={"/shop?sale=true"}>
        <h1 className="text-center text-5xl uppercase mt-12 text-gray-700 font-semibold">
          SALE
        </h1>
      </Link>
      <div className="flex flex-row w-full">

        {products.map((product) => {
          return (
            <Link
              href={`/shop/product/${product.sys.id}`}
              key={product.sys.id}
              id={product.sys.id}
            >
              <div className="font-open-sans my-10 hover:cursor-pointer hover:bg-fitify-green-light">
                <div className="w-44 h-44 relative mx-auto">
                  <Image
                    src={product.thumbnailImage.url}
                    alt="Product image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full text-center">
                <h2 className="mt-1 w-44">
                    {product.brand}
                </h2>
                <h2 className=" mt-1 w-44">
                    {product.title}
                  </h2>
                  <div className="flex justify-around w-44 px-4">
                  <h1 className="line-through mb-2 mt-2 text-xl text-fitify-green font-bold">
                    ${product.oldPrice}
                  </h1>
                  <h1 className="text-xl my-2 font-black">${product.price}</h1>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-end w-full">
      <Link href={"/shop?sale=true"}>
        <a className=" text-white bg-fitify-purple font-semibold py-4 px-6 hover:opacity-80">
          {`DISCOVER MORE >>`}
        </a>
      </Link>
      </div>
    </div>
  );
};

export default SaleContainer;
