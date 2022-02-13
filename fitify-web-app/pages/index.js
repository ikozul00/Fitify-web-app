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
        <h1 className="text-7xl my-8 text-white font-extrabold absolute top-24 left-16">
          Shop here
        </h1>
        <p className="md:w-1/5 w-2/5 text-2xl my-12 text-white font-normal absolute top-44 left-16">
          Newest sport fashion and equipment
        </p>
      </div>
      <div className="w-9/12 mx-auto sm:my-10 my-8">
        <Link href={`/shop`} passHref>
          <h1 className="text-center sm:text-5xl md:text-4xl text-3xl uppercase sm:mt-12 mt-6 text-gray-700 font-semibold hover:cursor-pointer hover:scale-105">
            SHOP
          </h1>
        </Link>
        <p className="md:w-1/5 sm:hidden block text-center text-base text-gray-700 mt-2 font-normal">
          Newest sport fashion and equipment
        </p>
        <div className="flex justify-around flex-wrap mx-auto">
          <Link href={`/shop?category=Clothes`} passHref>
            <div className="font-open-sans my-8 w-min hover:cursor-pointer hover:bg-fitify-green-light p-2">
              <div className=" lg:w-80 sm:w-96 w-72 sm:h-96 h-80 relative mx-auto">
                <Image
                  src={require("public/Clothes.jpg")}
                  alt="Clothes"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold sm:text-lg text-base">CLOTHES</h1>
                <h2 className="mb-2 mt-1 w-full sm:text-base text-sm">{`SHOP NOW >>`}</h2>
              </div>
            </div>
          </Link>
          <Link href={`/shop?category=Shoes`} passHref>
            <div className="font-open-sans my-8 w-min hover:cursor-pointer hover:bg-fitify-green-light p-2">
              <div className="lg:w-80 sm:w-96 w-72 sm:h-96 h-80 relative mx-auto">
                <Image
                  src={require("public/Shoes.jpg")}
                  alt="Shoes"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold sm:text-lg text-base">SHOES</h1>
                <h2 className="mb-2 mt-1 w-full sm:text-base text-sm">{`SHOP NOW >>`}</h2>
              </div>
            </div>
          </Link>
          <Link href={`/shop?category=Equipment`} passHref>
            <div className="font-open-sans my-8 w-min hover:cursor-pointer hover:bg-fitify-green-light p-2">
              <div className="lg:w-80 sm:w-96 w-72 sm:h-96 h-80 relative mx-auto">
                <Image
                  src={require("public/Equipment.jpg")}
                  alt="Equipment"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="w-full text-center">
                <h1 className="mb-2 mt-3 w-full font-bold sm:text-lg text-base">
                  EQUIPMENT
                </h1>
                <h2 className="mb-2 mt-1 w-full sm:text-base text-sm">{`SHOP NOW >>`}</h2>
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
