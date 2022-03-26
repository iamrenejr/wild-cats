import { AxiosResponse } from "axios";

import type { CallApi } from "./";
import { PAGE_SIZE } from "../constants";

interface CatsReturn {
  getBreedData: () => Promise<AxiosResponse>;
  getCatDataByBreed: (breedId: string, page: number) => Promise<AxiosResponse>;
}
type Cats = (callApi: CallApi) => CatsReturn;
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
