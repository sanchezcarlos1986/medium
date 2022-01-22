import Banner from "components/Banner";
import Header from "components/Header";
import PostDisplay from "components/PostDisplay";
import { FC } from "react";
import { Post } from "typings";
import { sanityClient } from "../sanity";

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
          <PostDisplay key={post._id} post={post} />
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
