import { useReducer } from "react";

import { catsApi } from "../../apis";

import { reducer } from "./reducers";
import {
  SELECT_CAT,
  GET_BREED_DATA_SUCCESS,
  GET_CAT_DATA_BY_BREED_SUCCESS,
} from "./actionTypes";
import { initialState } from "./constants";

type UseGlobalContext = () => IContextValues;
export const useGlobalContext: UseGlobalContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  type SelectCat = (cat: string) => void;
  const selectCat: SelectCat = (cat) => {
    dispatch({
      type: SELECT_CAT,
      payload: cat,
    });
  };

  type GetBreedData = () => Promise<void>;
  const getBreedData: GetBreedData = async () => {
    const resp = await catsApi.getBreedData();
    dispatch({
      type: GET_BREED_DATA_SUCCESS,
      payload: resp.data,
    });
  };

  type GetCatDataByBreed = (
    breed: string,
    breedId: string,
    page: number
  ) => Promise<void>;
  const getCatDataByBreed: GetCatDataByBreed = async (breed, breedId, page) => {
    const resp = await catsApi.getCatDataByBreed(breedId, page);
    dispatch({
      type: GET_CAT_DATA_BY_BREED_SUCCESS,
      payload: {
        breed,
        data: resp.data,
      },
    });
  };

  return {
    state,
    selectCat,
    getBreedData,
    getCatDataByBreed,
  };
};
