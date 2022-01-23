import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostDisplay from "./PostDisplay";
import { Post } from "typings";

const post: Post = {
  _id: "95b54299-ce26-487e-9e4d-e06b71682e8f",
  author: {
    image: {
      _type: "image",
      asset: {
        _ref: "image-bde30da5e14c064dc269cd5d586331219aa8a6c0-199x200-jpg",
        _type: "reference",
      },
    },
    name: "Carlos Sánchez",
  },
  description: "This is the description for my post!",
  mainImage: {
    _type: "image",
    asset: {
      _ref: "image-65960eb02eaeaa058950e49a47166b78edbdd06f-1280x720-jpg",
      _type: "reference",
    },
  },
  slug: {
    _type: "slug",
    current: "this-is-my-first-post",
  },
  title: "This is my first post",
};

describe("<PostDisplay />", () => {
  beforeEach(() => {
    render(<PostDisplay post={post} />);
  });

  test("should render menu", () => {
    expect(screen.getByText(/about/i));
  });
});
