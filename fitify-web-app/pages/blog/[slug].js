import { getAllPostSlugs, getPostBySlug } from "pages/api/ContentfulAPI";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { H2, H3 } from "../../components/blog/heading";
import { P, Strong } from "../../components/blog/text";
import { Ul, Li, Ol } from "../../components/blog/list";
import { A } from "../../components/blog/link";
import { CustomImage } from "@/components/blog/image";
import React from "react";
import { parseDate } from "parseDate";

const components = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  strong: Strong,
  img: CustomImage,
};

const BlogPost = ({ post }) => {
  const date = parseDate(post.date);

  return (
    <main className="w-4/5 mx-auto mt-0 mb-20 font-open-sans">
      <h3 className=" md:text-xl sm:text-lg text-base my-10 text-gray-600 text-right">
        {`${date.day}/${date.month}/${date.year}`}
      </h3>
      <h1 className="text-center md:text-6xl sm:text-5xl text-4xl text-gray-700 font-semibold">
        {post.title}
      </h1>
      <h2 className="text-center md:text-2xl sm:text-xl text-lg mt-5 mb-16 text-gray-600">
        {post.description}
      </h2>
      <div className="relative w-full h-96 mx-auto mb-10">
        <Image
          src={post.headerImage.url}
          alt={post.headerImage.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <MDXRemote {...post.mdxSource} components={components} lazy />
    </main>
  );
};

// Ova funkcija sluzi za static side rendering (staticko pregeneriranje)
// Nece se nigdje importati, sam Next.js je zove
// Ova funkcija izvrsava se samo na serverskoj strani - zato se ovdje mogu izvoditi "skupe" operacije
export async function getStaticPaths() {
  const posts = await getAllPostSlugs();

  //Uzmu se svi slugovi i iz njih kreiraju pathovi
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

  return {
    props: { post },
  };
}

export default BlogPost;
