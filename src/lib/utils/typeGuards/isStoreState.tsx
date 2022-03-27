import type { ActionPayload, IStoreState } from "../../../types";

export const isStoreState = (state: ActionPayload): state is IStoreState =>
  (state as IStoreState).selectedCat !== undefined;
