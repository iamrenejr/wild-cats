import { fireEvent, render } from "@testing-library/react";
import { ToastBox } from "./";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";

describe("Toast Box", () => {
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

  it("should render the toast", () => {
    const { getByTestId, getByText } = render(
      <ToastBox text="test" onClose={jest.fn()} />
    );
    const toastBox = getByTestId("toast-box");
    expect(toastBox).toBeTruthy();

    const timeDiffer = getByText("just now");
    expect(timeDiffer).toBeTruthy();
  });

  it("should run the close button", () => {
    const onClose = jest.fn();
    act(() => {
      ReactDOM.render(<ToastBox text="test" onClose={onClose} />, container);
      const closeBtn = document.querySelector(
        "div.toast-header.toast-header > button"
      );
      if (closeBtn !== null) {
        fireEvent.click(closeBtn);
      }
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("should run the timer", () => {
    jest.useFakeTimers();
    act(() => {
      ReactDOM.render(<ToastBox text="test" onClose={jest.fn()} />, container);
      jest.advanceTimersByTime(61000);
    });
    const toastBox = document.querySelector(".toast-box");
    expect(toastBox).toBeTruthy();

    const timeDiffer = document.querySelector(".toast-time-ago");
    expect(timeDiffer).toBeTruthy();
  });
});
