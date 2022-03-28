import { cats } from "../cats";
import type { CallApi } from "../";

describe("Index APIs", () => {
  const callApi: CallApi = (a, b, c, d) =>
    Promise.resolve(new Error(`${a}${b}${c}${d}`));

  describe("#getBreedData", () => {
    it("should not throw when used normally", () => {
      expect(() => cats(callApi).getBreedData()).not.toThrow();
    });
  });

  describe("#getCatDataByBreed", () => {
    it("should not throw when used normally", () => {
      expect(() => cats(callApi).getCatDataByBreed("cat1", 1)).not.toThrow();
    });
  });
});
