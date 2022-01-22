import Banner from "components/Banner";
import Header from "components/Header";
import Link from "next/link";
import { FC } from "react";
import { Post } from "typings";
import { sanityClient, urlFor } from "../sanity";

interface Props {
  posts: Post[];
}

const Home: FC<Props> = ({ posts }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Banner />
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer border rounded-lg overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt={post.title}
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt={post.author.name}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    description,
    mainImage,
    author -> {
     name, image
   },
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts: posts,
    },
  };
};
