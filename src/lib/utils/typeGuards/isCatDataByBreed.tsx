import type { ActionPayload, ICatDataByBreedPayload } from "../../../types";

export const isCatDataByBreed = (
  data: ActionPayload
): data is ICatDataByBreedPayload =>
  (data as ICatDataByBreedPayload).breed !== undefined &&
  (data as ICatDataByBreedPayload).data !== undefined;
