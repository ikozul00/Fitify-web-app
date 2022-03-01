import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";
import { parseDate } from "@/lib/parseDate";

const PostList = (props) => {
  const { posts, currentPage, totalPages } = props;

  return (
    <div className=" mx-auto my-0">
      <h2 className=" sm:text-5xl text-3xl text-gray-700 mb-10">
        Recent articles
      </h2>
      <ul>
        {posts.map((post) => {
          const postDate = parseDate(post.date);
          return (
            <Link href={`/blog/${post.slug}`} key={post.id} passHref>
              <li className=" border-2 my-7 border-fitify-green flex sm:flex-row flex-col justify-between sm:h-56 h-auto py-0 cursor-pointer hover:bg-fitify-green-light">
                <div className=" md:w-2/12 sm:w-3/12 w-full sm:h-auto h-56 relative my-0">
                  <Image
                    src={post.thumbnailImage.url}
                    alt={post.thumbnailImage.title}
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
                <div className="sm:ml-7 sm:w-8/12 w-11/12 mx-auto">
                  <h2 className="sm:text-lg text-base my-2 sm:block hidden">
                    {`${postDate.day}/${postDate.month}/${postDate.year}`}
                  </h2>
                  <h1 className="sm:text-3xl text-xl font-bold text-gray-700 mb-2 mt-3">
                    {post.title}
                  </h1>
                  <p className="sm:text-lg text-base mb-2">
                    {post.description}
                  </p>
                </div>
                <div className="bg-fitify-green w-1/12 text-center sm:flex hidden place-content-center cursor-pointer">
                  <p className="text-5xl font-bold text-white h-20 self-center">
                    {">"}
                  </p>
                </div>
                <div className="sm:hidden flex my-4 w-11/12 mx-auto justify-between">
                  <h2 className="sm:text-lg text-base font-semibold">
                    {`${postDate.day}/${postDate.month}/${postDate.year}`}
                  </h2>
                  <p className="text-base font-semibold">{`Read more >>`}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default PostList;
