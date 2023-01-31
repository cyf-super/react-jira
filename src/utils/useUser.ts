import { useEffect } from "react";
import { User } from "./../auto-provider";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { cleanObject } from "utils";

export const useUser = (params?: Partial<User>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(params || {}) }));
  }, [params, client, run]);

  return result;
};
