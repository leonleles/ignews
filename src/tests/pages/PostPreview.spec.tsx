import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrimiscClient } from "../../services/prismic";

const post = {
  slug: "fake-post",
  title: "Fake Post",
  content: "<p>fake post excerpt<p>",
  updated: "10 de Abril",
};

jest.mock("next-auth/client");
jest.mock("next/router");
jest.mock("../../services/prismic");

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText("Fake Post")).toBeInTheDocument();
    expect(screen.getByText("fake post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        userActiveSubscription: "fake-active-subscription",
      },
      false,
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/fake-post");
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrimiscClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My new post" }],
          content: [{ type: "paragraph", text: "Post content" }],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "fake-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-post",
            title: "My new post",
            content: "<p>Post content</p>",
            updated: "01 de abril de 2021",
          },
        },
      })
    );
  });
});


//{"props": {"post": {"content": "<p>Post content<p>", "slug": "fake-post", "title": "My new post", "updated": "01 de abril de 2021"}}}
//{"props": {"post": {"content": "<p>Post content</p>", "slug": "fake-post", "title": "My new post", "updated": "01 de abril de 2021"}}, "revalidate": 1800}