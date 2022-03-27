import type { ICatDataItem } from "../../types";

// Strip away other information except what ICatDataItem requires
interface IPayload {
  id: string;
  url: string;
  breeds: Record<string, string>[];
}
type GetCatDataFromPayload = (payload: IPayload) => ICatDataItem;
export const getCatDataFromPayload: GetCatDataFromPayload = (payload) => ({
  id: payload?.id,
  url: payload?.url,
  name: payload?.breeds?.[0]?.name,
  origin: payload?.breeds?.[0]?.origin,
  description: payload?.breeds?.[0]?.description,
  temperament: payload?.breeds?.[0]?.temperament,
});
