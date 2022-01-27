import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

test("if renders correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello word")).toBeInTheDocument();

  //   Async methods

  //   expect(await screen.findByText('Button')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  
});
