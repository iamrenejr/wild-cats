import { useMemo } from "react";
import { map } from "fp-ts/ReadonlyArray";

type GetUrlProp = (record: UrlRecord) => UrlRecord;
const getUrlProp: GetUrlProp = ({ id, url }) => ({ id, url });

type UseGetUrlMap = (arr: UrlRecord[]) => readonly UrlRecord[];
export const useGetUrlMap: UseGetUrlMap = (arr) =>
  useMemo(() => map(getUrlProp)(arr), [arr]);
