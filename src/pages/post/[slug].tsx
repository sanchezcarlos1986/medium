import Header from "components/Header";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Children, FC } from "react";
import PortableText from "react-portable-text";
import { sanityClient, urlFor } from "sanity";
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
      <img
        className="h-60 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
      />
      <article className="max-w-3xl mx-auto px-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500">{post.description}</h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-green-600">{post.author.name}</span> at{" "}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
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
    _createdAt,
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
    revalidate: 60, // after 60 seconds, it'll update the old cached version
  };
};
