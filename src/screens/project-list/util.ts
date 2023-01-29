import { useQueryParams } from "utils/url";
export const useProjectsSearchParams = () => {
  // param：url上的 query
  // setParam：修改url上的query
  const [param, setParam] = useQueryParams(["name", "personId"]);
  const projectsParam = {
    ...param,
    personId: Number(param.personId) || undefined,
  };
  return [projectsParam, setParam] as const;
};
