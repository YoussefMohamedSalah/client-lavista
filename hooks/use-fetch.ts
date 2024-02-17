import { BASE_API_URL } from "@/constants/constants";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export type TApiResponse = {
  status: Number;
  statusText: String;
  result: any;
  error: any;
  loading: Boolean;
};

type JSONValue =
  | boolean
  | number
  | string
  | null
  | readonly JSONValue[]
  | { readonly [key: string]: JSONValue };

export const useApiGet = (
  url: string,
  method: string,
  body: JSONValue
): TApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [result, setResult] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      const requestHeaders = authHeader(url);
      requestHeaders.append("Content-Type", "application/json");
      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };
      if (body) {
        requestOptions.body = JSON.stringify(body);
      }
      const apiResponse = await fetch(url, requestOptions);
      const json = await apiResponse.json();
      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
      setResult(json);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const isLoggedIn = false;
    const isApiUrl = url.startsWith(BASE_API_URL);
    let headers: HeadersInit = new Headers();
    if (isLoggedIn && isApiUrl) {
      headers.append("Authorization", `Bearer ${Cookies.get("access_token")}`);
    }
    return headers;
  }

  useEffect(() => {
    getAPIData();
  }, []);

  return { status, statusText, result, error, loading };
};
