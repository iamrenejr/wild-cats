import { useMemo } from "react";
import _ from "lodash";

// Strip away other objects from the prop to leave just id and url
type GetUrlProp = (record: UrlRecord) => UrlRecord;
const getUrlProp: GetUrlProp = ({ id, url }) => ({ id, url });

// This hook allows a memoized mapping over a large array
type UseGetUrlMap = (arr: UrlRecord[]) => readonly UrlRecord[];
export const useGetUrlMap: UseGetUrlMap = (arr) =>
  useMemo(() => _.map(arr, getUrlProp), [arr]);
