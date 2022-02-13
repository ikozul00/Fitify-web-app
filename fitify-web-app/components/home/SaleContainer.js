import Image from "next/image";
import Link from "next/link";

const SaleContainer = ({ products }) => {
  let counter=0;

  return (
    <div className="w-9/12 mx-auto my-10">
      <Link href={"/shop?sale=true"}>
        <h1 className="text-center md:text-5xl sm:text-4xl text-3xl uppercase sm:mt-12 mt-6 text-gray-700 font-semibold hover:cursor-pointer hover:scale-105">
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
                <div className=" sm:w-48 sm:h-56 customSmall:w-32 w-24 customSmall:h-40 h-36 relative mx-auto">
                  <Image
                    src={product.thumbnailImage.url}
                    alt="Product image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full text-center">
                <h2 className="mt-1 sm:w-44 w-auto">
                    {product.brand}
                </h2>
                <h2 className=" mt-1 sm:w-44 w-auto">
                    {product.title}
                  </h2>
                  <div className="flex sm:flex-row flex-col sm:justify-around justify-start sm:w-44 w-auto px-4">
                  <h1 className="line-through sm:mb-2 mb-0 sm:mt-2 mt-1 sm:text-xl text-base text-fitify-green font-bold">
                    ${product.oldPrice}
                  </h1>
                  <h1 className="sm:text-xl text-base sm:my-2 my-0 font-black">${product.price}</h1>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex md:justify-end justify-center w-full">
      <Link href={"/shop?sale=true"}>
        <a className=" text-white bg-fitify-purple font-semibold sm:py-4 py-2 sm:px-6 px-3 hover:opacity-80">
          {`DISCOVER MORE >>`}
        </a>
      </Link>
      </div>
    </div>
  );
};

export default SaleContainer;
