export const initialState = {
  selectedCat: "",
  breeds: { "": { id: "", name: "", image: { url: "" } } },
  catData: {
    "": [{ breeds: [], id: "", name: "", description: "", url: "" }],
  },
  maxReachedBreeds: { "": false },
};
