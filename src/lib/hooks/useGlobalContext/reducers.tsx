import _ from "lodash";

import { mergeCatDataItemsById } from "../../utils/mergeArrayOfObjects";
import {
  SELECT_CAT,
  GET_BREED_DATA_SUCCESS,
  GET_CAT_DATA_BY_BREED_SUCCESS,
} from "./actionTypes";

import type {
  Reducer,
  IStoreState,
  ActionPayload,
  StoreAction,
} from "../../../types";

type LocalReducer = Reducer<IStoreState, ActionPayload>;

const selectCat: LocalReducer = (oldState, payload) =>
  _.isString(payload)
    ? {
        ...oldState,
        selectedCat: payload,
      }
    : oldState;

const storeBreedData: LocalReducer = (oldState, payload) =>
  _.isArray(payload)
    ? {
        ...oldState,
        breeds: _.keyBy(payload, "name"),
      }
    : oldState;

const storeCatDataByBreed: LocalReducer = (oldState, payload) =>
  _.isObject(payload) && !_.isArray(payload) && _.isString(payload?.breed)
    ? {
        ...oldState,
        catData: {
          ...oldState.catData,
          [payload.breed]: mergeCatDataItemsById(
            oldState?.catData?.[payload.breed],
            payload.data
          ),
        },
      }
    : oldState;

// This is a normal reducer.
// It should be consumed by useReducer

type GlobalReducer = Reducer<IStoreState, StoreAction>;
export const reducer: GlobalReducer = (state, action) => {
  switch (action.type) {
    case SELECT_CAT: {
      if (action?.payload !== undefined) {
        return selectCat(state, action.payload);
      }
      return state;
    }
    case GET_BREED_DATA_SUCCESS: {
      if (action?.payload !== undefined) {
        return storeBreedData(state, action.payload);
      }
      return state;
    }
    case GET_CAT_DATA_BY_BREED_SUCCESS: {
      if (action?.payload !== undefined) {
        return storeCatDataByBreed(state, action.payload);
      }
      return state;
    }
    default:
      return state;
  }
};
