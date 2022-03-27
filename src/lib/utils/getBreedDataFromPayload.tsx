type GetBreedDataFromPayload = (payload: ICatBreedsData) => ICatBreedsData;
export const getBreedDataFromPayload: GetBreedDataFromPayload = (payload) => ({
  id: payload.id,
  name: payload.name,
});
