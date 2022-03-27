import { render } from "@testing-library/react";
import App from "./App";

test("It doesnt crash", () => {
  render(<App />);
});
