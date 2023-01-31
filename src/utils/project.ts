import { useCallback, useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(params || {}) }),
    [client, params]
  );
  useEffect(() => {
    // TODO：useEffect依赖项为对象会导致重复渲染 --> 文章
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [fetchProjects, run]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (parmas: Partial<Project>) => {
    return run(
      client(`projects/${parmas.id}`, {
        data: parmas,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (parmas: Partial<Project>) => {
    return run(
      client(`projects/${parmas.id}`, {
        data: parmas,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
