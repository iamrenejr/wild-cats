import { useReducer } from "react";
import _ from "lodash";

import { catsApi } from "../../apis";
import { reducer } from "./reducers";
import {
  SELECT_CAT,
  GET_BREED_DATA_SUCCESS,
  GET_CAT_DATA_BY_BREED_SUCCESS,
} from "./actionTypes";
import { initialState } from "./constants";
import { getBreedDataFromPayload } from "../../utils/getBreedDataFromPayload";
import { getCatDataFromPayload } from "../../utils/getCatDataFromPayload";

import type { IContextValues } from "../../../types";

// This hook replicates redux functionality using useReducer
// The state and its actions must be stored in a React Context

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
    try {
      const resp = await catsApi.getBreedData();
      if (resp instanceof Error) {
        throw new Error(resp?.message);
      }

      dispatch({
        type: GET_BREED_DATA_SUCCESS,
        payload: _.map(resp?.data, getBreedDataFromPayload),
      });
    } catch {
      throw new Error("Unexpected error in getBreedData");
    }
  };

  type GetCatDataByBreed = (
    breed: string,
    breedId: string,
    page: number
  ) => Promise<Record<string, unknown>[]>;
  const getCatDataByBreed: GetCatDataByBreed = async (breed, breedId, page) => {
    try {
      const resp = await catsApi.getCatDataByBreed(breedId, page);
      if (resp instanceof Error) {
        throw new Error(resp?.message);
      }
      dispatch({
        type: GET_CAT_DATA_BY_BREED_SUCCESS,
        payload: {
          breed,
          data: _.map(resp.data, getCatDataFromPayload),
        },
      });
      return resp.data;
    } catch {
      throw new Error("Unexpected error in getCatDataByBreed");
    }
  };

  return {
    state,
    selectCat,
    getBreedData,
    getCatDataByBreed,
  };
};
