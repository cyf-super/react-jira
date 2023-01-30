import { useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = () =>
    client("projects", { data: cleanObject(params || {}) });
  useEffect(() => {
    // TODO：useEffect依赖项为对象会导致重复渲染 --> 文章
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [params]);

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
