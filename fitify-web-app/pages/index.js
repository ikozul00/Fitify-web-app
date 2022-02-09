import Head from "next/head";
import Image from "next/image";
import BlogContainer from "@/components/home/BlogContainer";
import { getNewestBlogArticles } from "@/lib/ContentfulAPI";

export default function Home({ /*saleProducts,*/ blogArticles }) {
  return (
    <main className="font-open-sans flex flex-col">
      <div className="relative h-2/3">
        <Image //
          src={require("/public/HomepageImage.png")}
          alt="Product image"
          layout="fill"
          objectFit="cover"
        />
        <h1 className="text-6xl my-8 text-white font-semibold">Shop here</h1>
        <p className="w-1/5text-4xl my-8 text-white font-semibold">
          Newest sport fashion and equipment
        </p>
      </div>
      <BlogContainer posts={blogArticles} />
    </main>
  );
}

export async function getStaticProps() {
  //const saleProducts = await ;
  const blogArticles = await getNewestBlogArticles();

  return {
    props: { /*saleProducts: saleProducts,*/ blogArticles: blogArticles },
  };
}
