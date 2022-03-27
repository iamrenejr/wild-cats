import axios, { Method } from "axios";

import { cats } from "./cats";
import { API_TIMEOUT } from "../constants";

import type { NetworkResult } from "../../types";

// Implement wrapper around axios to decouple the app from it
// Also allow DRY use of the API which can otherwise be repetitive
export type CallApi = (
  method: Method,
  path: string,
  headers?: Record<string, string>,
  data?: Record<string, unknown>
) => NetworkResult;
export const callApi: CallApi = (method, path, headers, data) => {
  try {
    type Failer = Promise<Error>;
    const failer: Failer = new Promise((_, rej) => {
      setTimeout(() => {
        rej(new Error("Timeout"));
      }, API_TIMEOUT);
    });

    const axiosRequest = axios.request({
      method,
      baseURL: "https://api.thecatapi.com",
      url: path,
      responseType: "json",
      headers: {
        ...(headers ? headers : {}),
        "content-type": "application/json",
        "x-api-key": "",
      },
      ...(data ? { data } : {}),
    });

    return Promise.race([axiosRequest, failer]);
  } catch {
    return Promise.reject(new Error("Unexpected Error"));
  }
};

export const catsApi = cats(callApi);
