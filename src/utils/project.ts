import { useCallback, useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", cleanObject(params || {})], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (parmas: Partial<Project>) =>
      client(`projects/${parmas.id}`, {
        data: parmas,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (parmas: Partial<Project>) =>
      client(`projects/${parmas.id}`, {
        data: parmas,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id, // id为undefine就不发送请求
    }
  );
};
