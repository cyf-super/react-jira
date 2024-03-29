import { useCallback } from "react";
import { useAuth } from "./../context/auth-context";
import qs from "qs";
import * as auth from "../auto-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? `application/json` : "",
    },
    ...customConfig,
  };

  if (config.method.toLowerCase() === "get") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      auth.logout();
      window.location.reload();
      return Promise.reject({ messgae: "请重新登陆" });
    }

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
