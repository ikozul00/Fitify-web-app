import { getPostBySlug, getPosts } from "../../helper";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { H2, H3 } from "../../components/blog/heading";
import { P } from "../../components/blog/text";
import { Ul, Ol } from "../../components/blog/list";
import { A } from "../../components/blog/link";

const components = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  a: A,
};

const BlogPost = ({ post }) => (
  <main className="w-2/3 mx-auto my-0">
    <h1 className="text-center text-8xl text-gray-800">{post.title}</h1>
    <h2 className="text-center text-2xl my-8 text-gray-600">
      {post.description}
    </h2>
    <Image
      src={post.headerImage.url}
      alt={post.headerImage.title}
      layout="fixed"
      width={1000}
      height={500}
    />
    <MDXRemote {...post.mdxSource} components={components} />
    {console.log(post.mdxSource)}
  </main>
);

// Ova funkcija sluzi za static side rendering (staticko pregeneriranje)
// Nece se nigdje importati, sam Next.js je zove
// Ova funkcija izvrsava se samo na serverskoj strani - zato se ovdje mogu izvoditi "skupe" operacije
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

export async function getStaticProps(context) {
  const { slug } = context.params;
  const post = await getPostBySlug(slug);

  post.mdxSource = await serialize(post.body);
  delete post.body;
  //post.mdxSource = await serialize("## 1: YOU’RE NOT PACING YOURSELF");

  return {
    props: { post },
  };
}

export default BlogPost;
