import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react/cjs/react.development";
import { parseDate } from "@/lib/parseDate";

const HeadPost = ({ post }) => {
  const date = parseDate(post.sys.publishedAt);

  return (
    <Link href={`blog/${post.slug}`} passHref>
      <div className="bg-fitify-green mx-auto mt-16 mb-16 flex sm:flex-row flex-col border-4 border-fitify-green cursor-pointer hover:opacity-75">
        <div className=" md:w-4/12 sm:w-5/12 w-full relative sm:h-auto h-56">
          <Image
            src={post.thumbnailImage.url}
            alt={post.thumbnailImage.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="sm:w-7/12 w-11/12 sm:ml-12 mx-auto">
          <h2 className="md:text-xl sm:text-lg text-base  sm:block hidden lg:my-8 my-6 text-white font-semibold">
            {`${date.day}/${date.month}/${date.year}`}
          </h2>

          <h1 className="  md:text-4xl sm:text-2xl text-xl  lg:my-8 sm:my-6 mt-4 mb-2 text-white font-semibold">
            {post.title}
          </h1>
          <p className="text-white md:text-xl sm:text-lg text-base pb-2">
            {post.description}
          </p>
        </div>
        <div className="sm:hidden flex justify-between my-6 w-11/12 mx-auto">
          <h2 className="text-base sm:hidden block text-white font-semibold">
            {`${date.day}/${date.month}/${date.year}`}
          </h2>
          <p className="text-base text-white font-semibold">{`Read more >>`}</p>
        </div>
      </div>
    </Link>
  );
};
export default HeadPost;
