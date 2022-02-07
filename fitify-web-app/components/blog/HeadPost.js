import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react/cjs/react.development";
import { parseDate } from "parseDate";

const HeadPost = ({ post }) => {
  const [date,setDate] = useState("");

  useEffect(() => {
    setDate(parseDate(post.date));
  },[]);


  return (
    <Link href={`blog/${post.slug}`}>
    <div className="bg-fitify-green mx-auto mt-16 mb-16 flex h-80 border-4 border-fitify-green cursor-pointer hover:opacity-75">
      <div className=" w-3/12 relative">
      <Image
        src={post.thumbnailImage.url}
        alt={post.thumbnailImage.title}
        layout="fill"
        objectFit="cover"
      />
      </div>
      <div className="w-7/12 ml-12">
      <h2 className="text-xl my-8 text-white">
      {`${date.day}/${date.month}/${date.year}`}
      </h2>
      
        <h1 className=" text-4xl my-8 text-white font-semibold">
          {post.title}
        </h1>
      <p className="text-white text-xl">{post.description}</p>
      </div>
    </div>
    </Link>
  );
};
export default HeadPost;
