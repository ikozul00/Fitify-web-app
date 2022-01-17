import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/shop/product/${product.sys.id}`}>
      <div className="font-open-sans my-10 mx-10 grid grid-cols-1">
        <div className="w-full">
          <Image
            src={product.thumbnailImage.url}
            alt="Product image"
            width={500}
            height={500}
          />
        </div>

        <div>
          <p>
            {product.brand} {product.title}
          </p>
          <div className="flex justify-between w-full">
            <p className="font-bold">${product.price}</p>
            {product.oldPrice != null && (
              <p className="line-through text-gray-500">${product.oldPrice}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
