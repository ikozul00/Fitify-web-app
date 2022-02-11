import { parseDate } from "parseDate";
import Image from "next/image";
import Link from "next/link";

const BlogContainer = ({ posts }) => {
  return (
    <div className="w-9/12 mx-auto my-10">
      <Link href={"/blog"}>
        <h1 className="text-center text-5xl uppercase mt-12 text-gray-700 font-semibold">
          BLOG
        </h1>
      </Link>
      <div className="flex flex-row w-full">
        {posts.map((post) => {
          const postDate = parseDate(post.date);
          return (
            <Link href={`/blog/${post.slug}`} key={post.slug} id={post.slug}>
              <div className="font-open-sans my-10 mx-10 basis-1/4 bg-fitify-green">
                <div className="w-full">
                  <Image
                    src={post.thumbnailImage.url}
                    alt={post.thumbnailImage.title}
                    width={500}
                    height={500}
                  />
                </div>
                <div className="ml-7 w-full text-white">
                  <h1 className="text-2xl font-bold mb-2 mt-3 w-2/3">
                    {post.title}
                  </h1>
                  <h2 className="text-lg my-2 w-3/4 text-right">
                    {`${postDate.day}/${postDate.month}/${postDate.year}`}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link href={"/blog"}>
        <a className="text-right text-white bg-fitify-purple font-semibold h-24 px-5">
          DISCOVER MORE
        </a>
      </Link>
    </div>
  );
};

export default BlogContainer;
