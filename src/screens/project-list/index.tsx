import { useDebounce, useDodumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Row, Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/useUser";
import { useProjectsSearchParams } from "./util";

export const ProjectLIst = (props: { ProjectButton: JSX.Element }) => {
  useDodumentTitle("项目列表");
  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 1000);
  const { data: list, isLoading, error, retry } = useProject(debouncedParam);
  const { data: users } = useUser();

  return (
    <Container>
      <Row justify="space-between" align="middle">
        <h1>项目列表</h1>
        {props.ProjectButton}
      </Row>
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
        ProjectButton={props.ProjectButton}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  padding-top: 0;
`;
