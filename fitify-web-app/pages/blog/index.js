import { getPaginatedPosts } from "pages/api/ContentfulAPI";
import { Config } from "@/lib/Config";
import PostList from "@/components/blog/PostList";
import HeadPost from "@/components/blog/HeadPost";
import Link from "next/link";

const Blog = (props) => {
  const { posts, totalPages, currentPage } = props;

  // Ako nema postova (doslo je do greske)
  if (posts.length == 0)
    return <p>Error occured while loading the articles!</p>;

  return (
    <div className="w-9/12 mx-auto font-open-sans">
      <div className="flex flex-row justify-between">
        <h1 className="sm:text-5xl text-3xl sm:text-left text-center uppercase mt-12 text-gray-700 font-semibold">
          BLOG
        </h1>
        <Link href="/blog/addPost" passHref>
          <p className="bg-fitify-pink text-white sm:text-xl text-lg px-4 py-2 mt-12 hover:opacity-80 w-1/8">
            Add new post
          </p>
        </Link>
      </div>
      <HeadPost post={posts[0]} />
      <PostList
        posts={posts.slice(1)}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};
export default Blog;

export async function getStaticProps() {
  const posts = await getPaginatedPosts(1); //Hardcodirano 1, jer se na indeksu uvijek otvara prva stranica
  const totalPages = Math.ceil(posts.total / Config.pagination.pageSize); // Racunanje broja stranica

  return {
    props: { posts: posts.items, totalPages, currentPage: "1" },
  };
}
