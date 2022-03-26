import _ from "lodash";

type MergeCatDataItemsById<U> = (arr1: U, arr2: U) => U;
export const mergeCatDataItemsById: MergeCatDataItemsById<ICatDataItem[]> = (
  oldState,
  payload
) => _(oldState).keyBy("id").merge(_.keyBy(payload, "id")).values().value();
