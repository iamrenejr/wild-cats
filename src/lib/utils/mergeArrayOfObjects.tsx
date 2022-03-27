import _ from "lodash";

import type { ICatDataItem } from "../../types";

// FULL OUTER JOIN two objects using their shared IDs
type MergeCatDataItemsById<U> = (arr1: U, arr2: U) => U;
export const mergeCatDataItemsById: MergeCatDataItemsById<ICatDataItem[]> = (
  oldState,
  payload
) => _(oldState).keyBy("id").merge(_.keyBy(payload, "id")).values().value();
