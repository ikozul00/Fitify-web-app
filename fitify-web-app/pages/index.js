
import Image from "next/image";
import BlogContainer from "@/components/home/BlogContainer";
import {
  getNewestBlogArticles,
  getNewestSaleProducts,
} from "@/lib/ContentfulAPI";
import SaleContainer from "@/components/home/SaleContainer";
import Link from "next/link";

export default function Home({ saleProducts, blogArticles }) {
  return (
    <main className="font-open-sans flex flex-col">
      <div className="relative sm:block hidden h-100 w-full">
        <Image
          src={require("/public/HomepageImage.png")}
          alt="Header image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <h1 className="text-7xl my-8 text-white font-extrabold absolute top-24 left-16">Shop here</h1>
        <p className="md:w-1/5 w-2/5 text-2xl my-12 text-white font-normal absolute top-44 left-16">
          Newest sport fashion and equipment
        </p>
      </div>
      <div className="w-9/12 mx-auto sm:my-10 my-8">
        <Link href={`/shop`}>
          <h1 className="text-center text-5xl uppercase sm:mt-12 mt-8 text-gray-700 font-semibold hover:cursor-pointer hover:scale-105">
            SHOP
          </h1>
        </Link>
        <div className="flex justify-around flex-wrap mx-auto">
          <Link href={`/shop?category=Clothes`}>
            <div className="font-open-sans my-8 w-min hover:cursor-pointer hover:bg-fitify-green-light p-2">
              <div className=" lg:w-80 w-96 h-96 relative mx-auto">
                <Image
                  src={require("public/Clothes.jpg")}
                  alt="Clothes"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold text-lg">CLOTHES</h1>
                <h2 className="mb-2 mt-1 w-full">{`SHOP NOW >>`}</h2>
              </div>
            </div>
          </Link>
          <Link href={`/shop?category=Shoes`}>
            <div className="font-open-sans my-8 w-min hover:cursor-pointer hover:bg-fitify-green-light p-2">
              <div className="lg:w-80 w-96 h-96 relative mx-auto">
                <Image
                  src={require("public/Shoes.jpg")}
                  alt="Shoes"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold text-lg">SHOES</h1>
                <h2 className="mb-2 mt-1 w-full">{`SHOP NOW >>`}</h2>
              </div>
            </div>
          </Link>
          <Link href={`/shop?category=Equipment`}>
            <div className="font-open-sans my-8 w-min hover:cursor-pointer hover:bg-fitify-green-light p-2">
              <div className="lg:w-80 w-96 h-96 relative mx-auto">
                <Image
                  src={require("public/Equipment.jpg")}
                  alt="Equipment"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold text-lg">
                  EQUIPMENT
                </h1>
                <h2 className="mb-2 mt-1 w-full">{`SHOP NOW >>`}</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <SaleContainer products={saleProducts} />
      <BlogContainer posts={blogArticles} />
    </main>
  );
}

export async function getStaticProps() {
  const saleProducts = await getNewestSaleProducts();
  const blogArticles = await getNewestBlogArticles();

  return {
    props: { saleProducts: saleProducts, blogArticles: blogArticles },
  };
}
