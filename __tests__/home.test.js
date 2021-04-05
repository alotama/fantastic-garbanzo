import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SearchBar from '../components/searchBar'
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

afterEach(cleanup);

test("SearchParams", () => {
  const { getByTestId } = render(<SearchBar />);
  const inputSearchBar = getByTestId("use-input-searchbar");
  const push = jest.fn();
  useRouter.mockImplementation(() => ({
    push,
    pathname: "/",
    route: "/",
    asPath: "/",
    query: "",
  }));

  fireEvent.change(inputSearchBar, { target: { value: "trenes" } });
  fireEvent.click(getByTestId("use-button-searchbar"))
  expect(push).toHaveBeenCalledWith('/items?search=trenes')
});