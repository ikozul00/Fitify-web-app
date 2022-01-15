import { getPaginatedPosts, getNumberOfPosts } from "@/lib/ContentfulAPI";
import { Config } from "@/lib/Config";

export default function BlogIndexPage(props) {
  const { postSummaries, totalPages, currentPage } = props;

  return (
    // We’ll build the post list component later
    <p>kupus</p>
  );
}

export async function getStaticPaths() {
  const totalPosts = await getNumberOfPosts();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  // Pocevsi od stranice 2 (prva je index), kreiraju se pathovi za sve stranice
  const paths = [];
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = await getPaginatedPosts(params.page);
  const totalPages = Math.ceil(posts.total / Config.pagination.pageSize);

  return {
    props: {
      posts: posts.items,
      totalPages,
      currentPage: params.page,
    },
  };
}
