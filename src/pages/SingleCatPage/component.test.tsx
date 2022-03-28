import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { BrowserRouterProps } from "react-router-dom";

import SingleCatPage from "./";
import { initialContext } from "../../lib/hooks/useGlobalContext/context";

describe("Single Cat Page", () => {
  const MockBrowserRouter = ({ children }: BrowserRouterProps) => (
    <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
  );
  const BrowserRouter = MockBrowserRouter;

  it("should render nothing without a context provider", () => {
    render(
      <BrowserRouter>
        <SingleCatPage />
      </BrowserRouter>
    );
    const root = screen.queryByTestId("single-cat-page-root");
    expect(root).toBe(null);
  });

  it("should render null with an improper context provider", () => {
    const Context = React.createContext(initialContext);
    render(
      <Context.Provider value={initialContext}>
        <BrowserRouter>
          <SingleCatPage />
        </BrowserRouter>
      </Context.Provider>
    );
    const root = screen.queryByTestId("single-cat-page-root");
    expect(root).toBe(null);
  });
});
