import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";
import { useEffect } from "react/cjs/react.development";
import { parseDate } from "parseDate";

const PostList = (props) => {
  const { posts, currentPage, totalPages } = props;


  return (
    <div className=" mx-auto my-0">
      <h2 className=" text-5xl text-gray-700 mb-10">Recent articles</h2>
      <ul>
        {posts.map((post) => {
          const postDate = parseDate(post.date);
          return(
          <li key={post.id} className=" border-2 my-5 border-fitify-green flex justify-between h-56 py-0">
            <div className=" w-2/12 relative my-0">
             <Image
              src={post.thumbnailImage.url}
              alt={post.thumbnailImage.title}
              objectFit="cover"
              layout="fill"
            />
            </div>
            <div className="ml-7 w-8/12">
            <h2 className="text-lg text-gray-700 my-2">
              {`${postDate.day}/${postDate.month}/${postDate.year}`}
            </h2>
            <Link href={`/blog/${post.slug}`}>
              <h1 className="cursor-pointer text-3xl font-bold text-gray-700 mb-2 mt-3">
                {post.title}
              </h1>
            </Link>
            <p>
              {post.description}
            </p>
            </div>
            <div className="bg-fitify-green w-1/12 text-center flex place-content-center cursor-pointer">
              <p className="text-5xl font-bold text-white h-20 self-center">{'>'}</p>
            </div>
          </li>
        );})}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default PostList;
