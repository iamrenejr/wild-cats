import { createContext } from "react";
import _ from "lodash";

import { initialState } from "./constants";

const initialContext: IContextValues = {
  state: initialState,
  selectCat: _.noop,
  getBreedData: _.noop,
  getCatDataByBreed: _.noop,
};

export const GlobalContext = createContext(initialContext);
