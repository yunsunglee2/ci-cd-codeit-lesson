import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataFetching from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Post } from "../libs/useJSONPlaceholder";

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts/1", (req, res, ctx) => {
    const fakePost: Post = {
      userId: 1,
      id: 1,
      title: "옹오오오오ㅗ",
      body: "아아아ㅏ",
    };
    return res(ctx.json(fakePost));
  }),
  // rest.get(path, (req,res,ctx) => {}),
];

describe("DataFetching 컴포넌트 테스트", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const renderDataFetchingComponent = () => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });

    render(
      <QueryClientProvider client={client}>
        <DataFetching />
      </QueryClientProvider>
    );
  };

  it("", async () => {
    renderDataFetchingComponent();
    const postbody = screen.findByText(/body/i);
    
    screen.debug();

    await waitFor(() => {
      const postbodyByGetBy = screen.getByText(/body/i);
      expect(postbodyByGetBy).toBeInTheDocument();
    });

    expect(postbody).toBeInTheDocument();
  });
});
