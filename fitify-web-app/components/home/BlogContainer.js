import { parseDate } from "parseDate";
import Image from "next/image";
import Link from "next/link";

const BlogContainer = ({ posts }) => {
  return (
    <div className="w-9/12 mx-auto my-10">
      <Link href={"/blog"}>
        <h1 className="text-center text-5xl uppercase mt-12 text-gray-700 font-semibold hover:cursor-pointer hover:scale-105">
          BLOG
        </h1>
      </Link>
      <div className="flex flex-row w-full justify-between">

        {posts.map((post) => {
          const postDate = parseDate(post.date);
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug} id={post.slug}>
              <div className="font-open-sans my-10 bg-fitify-green w-min hover:cursor-pointer hover:opacity-70">
                <div className="relative w-64 h-72">
                  <Image
                    src={post.thumbnailImage.url}
                    alt={post.thumbnailImage.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full text-white relative h-36">
                  <h1 className="text-xl font-bold mb-2 mt-3 w-52 mx-auto">
                    {post.title}
                  </h1>
                  <h2 className="text-lg my-2 self-end mr-0 absolute bottom-0 right-3">
                    {`${postDate.day}/${postDate.month}/${postDate.year}`}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-end w-full">
      <Link href={"/blog"}>
        <a className="text-white bg-fitify-purple font-semibold py-4 px-6 hover:opacity-80 mb-10">
        {`DISCOVER MORE >>`}
        </a>
      </Link>
      </div>
    </div>
  );
};

export default BlogContainer;
