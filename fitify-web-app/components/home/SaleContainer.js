import Image from "next/image";
import Link from "next/link";

const SaleContainer = ({ products }) => {
  let counter=0;

  return (
    <div className="w-9/12 mx-auto my-10">
      <Link href={"/shop?sale=true"}>
        <h1 className="text-center text-5xl uppercase mt-12 text-gray-700 font-semibold hover:cursor-pointer hover:scale-105">
          SALE
        </h1>
      </Link>
      <div className="xl:flex justify-between w-full flex-wrap grid md:grid-cols-3 grid-cols-2">
        {products.map((product) => {
          counter++;
          return (
            <Link
              href={`/shop/product/${product.sys.id}`}
              key={product.sys.id}
              id={product.sys.id}
            >
              <div className={`font-open-sans my-6 hover:cursor-pointer hover:bg-fitify-green-light p-2 ${counter===5 ? "md:block hidden" : ""}`}>
                <div className=" sm:w-48 sm:h-56 w-36 h-40 relative mx-auto">
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
      <div className="flex md:justify-end justify-center w-full">
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
