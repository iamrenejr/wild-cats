import { useEffect } from "react";
import _ from "lodash";

import type { IStoreState } from "../../../types";

type UsePersistInLocalStorage = (
  state: IStoreState,
  initialState: IStoreState,
  onSave: (newState: IStoreState) => void
) => void;
export const usePersistInLocalStorage: UsePersistInLocalStorage = (
  state,
  initialState,
  onSave
) => {
  useEffect(() => {
    if (state === initialState) {
      const localStorageState = localStorage.getItem("state");
      if (_.isString(localStorageState)) {
        try {
          const newState = JSON.parse(localStorageState);
          onSave(newState);
        } catch {
          onSave(initialState);
        }
      }
    } else {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state]);
};
