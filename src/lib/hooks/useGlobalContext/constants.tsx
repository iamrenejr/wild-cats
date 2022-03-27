import type { IStoreState } from "../../../types";

export const initialState: IStoreState = {
  selectedCat: "",
  breeds: { "": { id: "", name: "" } },
  catData: {
    "": [
      {
        id: "",
        name: "",
        description: "",
        url: "",
        origin: "",
        temperament: "",
      },
    ],
  },
};
