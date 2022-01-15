import Link from "next/link";
import Image from "next/image";

const HeadPost = ({ post }) => {
  return (
    <div className="bg-teal-600 w-2/3 mx-auto my-0">
      <Link href={`blog/${post.slug}`}>
        <h1 className="cursor-pointer text-center text-5xl my-8 text-gray-600">
          {post.title}
        </h1>
      </Link>
      <Image
        src={post.thumbnailImage.url}
        alt={post.thumbnailImage.title}
        layout="fixed"
        width={250}
        height={300}
      />
      {post.description}
    </div>
  );
};
export default HeadPost;
