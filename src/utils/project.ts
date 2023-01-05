import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
  }, [params]);

  return result;
};
