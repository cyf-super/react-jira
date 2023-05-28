import { useMemo } from "react";
import { useQueryParams } from "utils/url";
export const useProjectsSearchParams = () => {
  // param：url上的 query
  // setParam：修改url上的query
  const [param, setParam] = useQueryParams(["name", "personId"]);
  const projectsParam = useMemo(
    () => ({
      ...param,
      personId: Number(param.personId) || undefined,
    }),
    [param]
  );
  return [projectsParam, setParam] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};
