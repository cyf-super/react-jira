import { useDebounce, useDodumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/useUser";
import { useProjectsSearchParams } from "./util";

export const ProjectLIst = () => {
  useDodumentTitle("项目列表");
  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 1000);
  const { data: list, isLoading, error, retry } = useProject(debouncedParam);
  const { data: users } = useUser();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        users={users || []}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  padding-top: 0;
`;
