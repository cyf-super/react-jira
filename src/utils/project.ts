import { useCallback, useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useMutation, useQuery, useQueryClient, QueryKey } from "react-query";
import {
  useAddConfig,
  useEditConfig,
  useDeleteConfig,
} from "./use-optimistic-options";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", cleanObject(params || {})], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (parmas: Partial<Project>) =>
      client(`projects/${parmas.id}`, {
        data: parmas,
        method: "PATCH",
      }),
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects')
    // }
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (parmas: Partial<Project>) =>
      client(`projects`, {
        data: parmas,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
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
