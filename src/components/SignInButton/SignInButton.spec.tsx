import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked } from "jest-mock";
import { SignInButton } from ".";

jest.mock("next-auth/client");

describe("SignInButton Component", () => {
  it("renders correctly when user is not login", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign In with GitHub")).toBeInTheDocument();
  });

  it("renders correctly when user is login", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
          email: "john@email.com",
        },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
