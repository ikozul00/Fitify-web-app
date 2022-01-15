import { getPaginatedPosts } from "@/lib/ContentfulAPI";
import { Config } from "@/lib/Config";
import PostList from "@/components/blog/PostList";

const Blog = (props) => {
  const { posts, totalPages, currentPage } = props;
  console.log(posts);
  console.log("Duljina je", posts.length);

  return (
    <PostList posts={posts} totalPages={totalPages} currentPage={currentPage} />
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
