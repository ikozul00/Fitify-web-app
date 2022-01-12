import { getPosts } from "../../helper";
import Link from "next/link";

const Blog = ({ posts }) => {
  console.log(posts);
  return (
    <>
      <h1>BLOG</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`blog/${post.slug}`}>
              <h1 className="cursor-pointer text-lg text-center">
                {post.title}
              </h1>
            </Link>
            {post.description}
          </li>
        ))}
      </ul>
    </>
  );
};
export default Blog;

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
  };
}
