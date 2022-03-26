import { AxiosResponse } from "axios";
import type { CallApi } from "./";

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
      `v1/images/search?limit=10&page=${page}&breed_id=${breedId}`
    );
  },
});
