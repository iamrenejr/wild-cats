import { callApi } from "../";

describe("Index APIs", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should not throw with a normal request", () => {
    expect(() => callApi("GET", "/", {}, {})).not.toThrow();
  });

  it("should throw if it takes more than 5s to complete", async () => {
    try {
      jest.useFakeTimers();
      await callApi("GET", "/");
      jest.advanceTimersByTime(10000);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
