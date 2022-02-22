import { getPaginatedPosts } from "pages/api/ContentfulAPI";
import { Config } from "@/lib/Config";
import PostList from "@/components/blog/PostList";
import HeadPost from "@/components/blog/HeadPost";

const Blog = (props) => {
  const { posts, totalPages, currentPage } = props;

  // Ako nema postova (doslo je do greske)
  if (posts.length == 0)
    return <p>Error occured while loading the articles!</p>;

  return (
    <>
      <div className="w-9/12 mx-auto font-open-sans">
        <h1 className="sm:text-5xl text-3xl sm:text-left text-center uppercase mt-12 text-gray-700 font-semibold">
          BLOG
        </h1>
        <HeadPost post={posts[0]} />
        <PostList
          posts={posts.slice(1)}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
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
