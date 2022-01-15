import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";

const PostList = (props) => {
  const { posts, currentPage, totalPages } = props;

  return (
    <div className="w-2/3 mx-auto my-0">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
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
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default PostList;
