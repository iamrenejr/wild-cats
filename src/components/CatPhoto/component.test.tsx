import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import _ from "lodash";

import { CatPhoto } from "./";

describe("Cat Photo", () => {
  const src = "/img.jpg";
  let container: HTMLElement | null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.useRealTimers();
    if (container !== null) {
      document.body.removeChild(container);
    }
    container = null;
  });

  it("should render the photo", () => {
    const { getByTestId } = render(<CatPhoto src={src} />);
    const catPhoto = getByTestId("cat-photo");
    expect(catPhoto).toBeTruthy();
  });

  it("should start animating via CSS class on mount", () => {
    jest.useFakeTimers();
    act(() => {
      ReactDOM.render(<CatPhoto src={src} />, container);
    });
    const catPhoto = screen.getByTestId("cat-photo");
    expect(
      _.values(catPhoto.classList).includes("cat-image-animation-over")
    ).toBe(false);
    expect(_.values(catPhoto.classList).includes("cat-image-animation")).toBe(
      true
    );
    act(() => {
      jest.advanceTimersByTime(3000);
    });
  });

  it("should stop animating via CSS class after 2s", () => {
    jest.useFakeTimers();
    render(<CatPhoto src={src} />);
    act(() => {
      jest.advanceTimersByTime(3100);
    });
    const catPhoto = document.querySelector("img") || { classList: "" };
    const { classList } = catPhoto;
    expect(_.values(classList).includes("cat-image-animation")).toBe(false);
    expect(_.values(classList).includes("cat-image-animation-over")).toBe(true);
  });
});
