import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/shop/product/${product.sys.id}`} passHref>
      <div className="font-open-sans my-8 flex flex-col justify-between hover:bg-fitify-green-light hover:cursor-pointer p-2 w-min">
        <div className=" xl:w-80 sm:w-64 w-48 sm:h-72 h-52  relative">
          <Image
            src={product.thumbnailImage.url}
            alt="Product image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div>
          <p className="font-semibold">{product.brand}</p>
          <p>{product.title}</p>
          <div className="flex justify-start w-full">
            <p className="font-bold text-lg">${product.price}</p>
            {product.oldPrice != null && (
              <p className="line-through text-fitify-green font-bold text-xl ml-8">
                ${product.oldPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
