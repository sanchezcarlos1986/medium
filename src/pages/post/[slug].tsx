import Header from "components/Header";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { sanityClient } from "sanity";
import { Post } from "typings";

interface Props {
  post: Post;
}

const MyPost: FC<Props> = ({ post }) => {
  return (
    <main>
      <Header />
      <Head>
        <title>{post.title}</title>
      </Head>
      {post.title}
    </main>
  );
};

export default MyPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == 'post']{
        _id,
        slug {
            current
        }
      }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const query = `*[_type == 'post' && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    mainImage,
    author -> {
     name,
     image
   },
   body
  }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: post,
    },
  };
};
