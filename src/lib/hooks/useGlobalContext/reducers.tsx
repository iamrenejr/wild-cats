import _ from "lodash";

import {
  SELECT_CAT,
  GET_BREED_DATA_SUCCESS,
  GET_CAT_DATA_BY_BREED_SUCCESS,
} from "./actionTypes";

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
  _.isObject(payload) &&
  payload?.breed !== undefined &&
  _.isString(payload?.breed) &&
  payload?.data !== undefined &&
  !oldState.catData[payload.breed]
    ? {
        ...oldState,
        catData: {
          ...oldState.catData,
          [payload.breed]: payload.data,
        },
      }
    : oldState;

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
