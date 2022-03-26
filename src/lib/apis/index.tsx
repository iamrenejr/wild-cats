import axios, { AxiosResponse, Method } from "axios";
import { cats } from "./cats";

export type CallApi = (
  method: Method,
  path: string,
  headers?: Record<string, string>,
  data?: Record<string, unknown>
) => Promise<AxiosResponse>;
export const callApi: CallApi = (method, path, headers, data) => {
  const newHeaders = {
    ...(headers ? headers : {}),
    "x-api-key": "",
  };
  return axios.request({
    method,
    baseURL: "https://api.thecatapi.com",
    url: path,
    responseType: "json",
    headers: newHeaders,
    ...(data ? { data } : {}),
  });
};

export const catsApi = cats(callApi);
