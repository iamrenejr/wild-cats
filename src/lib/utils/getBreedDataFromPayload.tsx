// Strip away other information except what ICatBreedsData requires
type GetBreedDataFromPayload = (payload: ICatBreedsData) => ICatBreedsData;
export const getBreedDataFromPayload: GetBreedDataFromPayload = (payload) => ({
  id: payload?.id,
  name: payload?.name,
});
