import { getPostBySlug, getPosts } from "../../helper";
import Image from "next/image";

const BlogPost = ({ post }) => (
  // Ovo je template za pojedine blog postove

  <main className="w-2/3 mx-auto my-0">
    <h1 className="text-center text-8xl text-gray-800">{post.title}</h1>
    <h2 className="text-center text-5xl my-8 text-gray-600">
      Some subtitle can go here
    </h2>
    <Image
      src={post.image.url}
      alt="post image"
      layout="fixed"
      width={600}
      height={300}
    />
    <p>{post.description}</p>
  </main>
);

export async function getStaticPaths() {
  const posts = await getPosts();

  //Uzmu se svi postovi i iz njih filtriraju svi slugovi
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  console.log(paths);
  return {
    paths,
    fallback: false, // Ovim se obvezujemo da smo dali opise svih pathova koje zelimo staticki pregenerirati
  };
}

// Ova funkcija sluzi za static side rendering (staticko pregeneriranje)
// Nece se nigdje importati, sam Next.js je zove
// Ova funkcija izvrsava se samo na serverskoj strani - zato se ovdje mogu izvoditi "skupe" operacije
export async function getStaticProps(context) {
  const { slug } = context.params;
  const post = await getPostBySlug(slug);

  return {
    props: { post },
  };
}

export default BlogPost;
