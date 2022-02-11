import Image from "next/image";
import Link from "next/link";

const SaleContainer = ({ products }) => {
  return (
    <div className="w-9/12 mx-auto my-10">
      <h1 className="text-center text-5xl uppercase mt-12 text-gray-700 font-semibold">
        SALE
      </h1>
      <div className="flex flex-row w-full">
        {products.map((product) => {
          return (
            <Link
              href={`/shop/product/${product.sys.id}`}
              key={product.sys.id}
              id={product.sys.id}
            >
              <div className="font-open-sans my-10 mx-10 basis-1/5">
                <div className="w-full">
                  <Image
                    src={product.thumbnailImage.url}
                    alt="Product image"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="w-full text-center">
                  <h2 className="mb-2 mt-3 w-full">
                    {product.brand} {product.title}
                  </h2>
                  <h1 className="text-lg my-2 font-bold">${product.price}</h1>
                  <h2 className="line-through mb-2 mt-1 w-full">
                    ${product.oldPrice}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href={"/shop?sale=true"}>
        <a className="text-right text-white bg-fitify-purple font-semibold h-24 px-5">
          DISCOVER MORE
        </a>
      </Link>
    </div>
  );
};

export default SaleContainer;
