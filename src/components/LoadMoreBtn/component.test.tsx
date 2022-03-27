import { fireEvent, render, screen } from "@testing-library/react";
import { LoadMoreBtn } from "./";

describe("Load More Button", () => {
  it("should render the button", () => {
    const text = "Click here";
    const { getByTestId } = render(
      <LoadMoreBtn visible text={text} onClick={jest.fn()} />
    );
    const loadMoreBtn = getByTestId("load-more-btn");
    expect(loadMoreBtn).toBeTruthy();
  });

  it("should display the provided text", () => {
    const text = "Click here";
    render(<LoadMoreBtn visible text={text} onClick={jest.fn()} />);
    const loadMoreBtn = screen.getByText(text);
    expect(loadMoreBtn).toBeTruthy();
  });

  it("should leave if set to not visible", () => {
    const text = "Click here";
    const { container } = render(
      <LoadMoreBtn visible={false} text={text} onClick={jest.fn()} />
    );
    const loadMoreBtn = container.getElementsByClassName(
      "load-more-btn-leaving"
    );
    expect(loadMoreBtn.length).toBe(1);
  });

  it("should call the onClick function from its props", () => {
    const text = "Click here";
    const onClick = jest.fn();
    const { getByTestId } = render(
      <LoadMoreBtn visible={false} text={text} onClick={onClick} />
    );
    const loadMoreBtn = getByTestId("load-more-btn");
    fireEvent.click(loadMoreBtn);
    expect(onClick).toHaveBeenCalled();
  });
});
