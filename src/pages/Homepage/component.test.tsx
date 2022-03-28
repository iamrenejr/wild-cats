import { render } from "@testing-library/react";
import Homepage from "./";

import { MemoryRouter } from "react-router-dom";
import type { BrowserRouterProps } from "react-router-dom";

describe("Homepage", () => {
  const MockBrowserRouter = ({ children }: BrowserRouterProps) => (
    <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
  );
  const BrowserRouter = MockBrowserRouter;

  it("should render the homepage", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
    const selectBox = getByTestId("select-box");
    expect(selectBox).toBeTruthy();
  });
});
