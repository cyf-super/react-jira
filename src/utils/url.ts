import { useProject } from "utils/project";
import { cleanObject } from "utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(() => {
      return keys.reduce((prev: { [key in K]: string }, key: K) => {
        return {
          ...prev,
          [key]: searchParams.get(key) || "",
        };
      }, {} as { [key in K]: string });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setSearchParam]),

    // 根据的传入的params，过滤掉空的key，避免在url上显示出来
    // Object.fromEntries：把键值对列表转换为一个对象。
    (params: { [key in K]?: unknown }) => {
      const obj = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      });
      return setSearchParam(obj);
    },
  ] as const;
};

export const useProjectModel = () => {
  const [{ projectCreate }, setProjectCreate] = useQueryParams([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useQueryParams([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const open = () => {
    setProjectCreate({
      projectCreate: true,
    });
  };

  const close = () => {
    if (projectCreate === "true") {
      setProjectCreate({
        projectCreate: undefined,
      });
    } else {
      setEditingProjectId({
        editingProjectId: undefined,
      });
    }
  };

  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModelOpen: projectCreate === "true" || !!editingProject,
    editingProject,
    isLoading,
    open,
    close,
    startEdit,
  };
};
