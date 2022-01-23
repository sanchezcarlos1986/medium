import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("<Header />", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("should render menu", () => {
    expect(screen.getByText(/about/i));
    expect(screen.getByText(/contact/i));
    expect(screen.getByText(/follow/i));
    expect(screen.getByText(/sign in/i));
    expect(screen.getByText(/get started/i));
  });
});
