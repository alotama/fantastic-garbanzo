import { useRouter } from "next/router";

export const RouterPush = jest.fn();

const JestRouter = () => {
  jest.mock("next/router", () => ({
    useRouter: jest.fn(),
  }));
  
  return useRouter.mockImplementation(() => ({
    RouterPush,
    pathname: "/",
    route: "/",
    asPath: "/",
    query: "",
  })); 
}

export default JestRouter;