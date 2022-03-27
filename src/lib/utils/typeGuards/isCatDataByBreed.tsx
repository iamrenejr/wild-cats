import type { ActionPayload, ICatDataByBreedPayload } from "../../../types";

export const isCatDataByBreed = (
  state: ActionPayload
): state is ICatDataByBreedPayload =>
  (state as ICatDataByBreedPayload).breed !== undefined;
