import { parseDate } from "parseDate";
import Image from "next/image";
import Link from "next/link";

const BlogContainer = ({ posts }) => {
  return (
    <div className="w-9/12 mx-auto my-10">
      <Link href={"/blog"} passHref>
        <h1 className="text-center md:text-5xl sm:text-4xl text-3xl uppercase mt-12 text-gray-700 font-semibold hover:cursor-pointer hover:scale-105">
          BLOG
        </h1>
      </Link>
      <div className="xl:flex flex-row w-full justify-around flex-wrap grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {posts.map((post) => {
          const postDate = parseDate(post.date);
          return (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              id={post.slug}
              passHref
            >
              <div className="font-open-sans md:my-10 my-6 bg-fitify-green w-min hover:cursor-pointer hover:opacity-70  justify-self-center">
                <div className="relative md:w-64 sm:w-96 w-64 md:h-72 sm:h-80 h-72">
                  <Image
                    src={post.thumbnailImage.url}
                    alt={post.thumbnailImage.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full text-white relative h-36">
                  <h1 className="sm:text-xl text-lg font-bold mb-2 mt-3 w-52 md:mx-auto mx-4">
                    {post.title}
                  </h1>
                  <h2 className="sm:text-lg text-base my-2 self-end mr-0 absolute bottom-0 right-3 font-semibold">
                    {`${postDate.day}/${postDate.month}/${postDate.year}`}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex md:justify-end w-full justify-center">
        <Link href={"/blog"} passHref>
          <a className="text-white bg-fitify-purple font-semibold sm:py-4 py-2 sm:px-6 px-3 hover:opacity-80 mb-20">
            {`DISCOVER MORE >>`}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BlogContainer;
