import type { CallApi } from "./";
import { PAGE_SIZE } from "../constants";

import type { NetworkResult } from "../../types";

// The app should only talk to the cats API in a way
// that agrees with ICatsApi
interface ICatsApi {
  getBreedData: () => NetworkResult;
  getCatDataByBreed: (breedId: string, page: number) => NetworkResult;
}
type Cats = (callApi: CallApi) => ICatsApi;
export const cats: Cats = (callApi) => ({
  getBreedData: () => {
    return callApi("GET", "/v1/breeds");
  },
  getCatDataByBreed: (breedId, page) => {
    return callApi(
      "GET",
      `v1/images/search?limit=${PAGE_SIZE}&page=${page}&breed_id=${breedId}&order=DESC`
    );
  },
});
