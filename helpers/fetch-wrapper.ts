import { BASE_API_URL } from "@/constants/constants";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type JSONValue =
  | boolean
  | number
  | string
  | null
  | readonly JSONValue[]
  | { readonly [key: string]: JSONValue };

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
  patch: request("PATCH"),
};

function request(method: string) {
  return async (url: string, body: JSONValue, formData?: FormData) => {
    const requestHeaders = await authHeader(url);
    if (formData === undefined) {
      requestHeaders.append("Content-Type", "application/json");
    }
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    if (formData !== undefined) {
      requestOptions.body = formData;
    }
    try {
      const response = await fetch(url, requestOptions);
      return handleResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

// helper functions
async function authHeader(url: string) {
  const session =
    typeof window === "undefined"
      ? await getServerSession(authOptions)
      : await getSession();
  // return auth header with jwt if user is logged in and request is to the api url
  const isLoggedIn = true ? session : false;
  const isApiUrl = url.startsWith(BASE_API_URL);
  let headers: HeadersInit = new Headers();
  if (isLoggedIn && isApiUrl) {
    headers.append("Authorization", `Bearer ${session?.user.accessToken}`);
  }
  return headers;
}

async function handleResponse(response: Response) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      signOut({ callbackUrl: "/" });
    }
  }
  return data;
}
