import { useDebounce, useDodumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Row } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/useUser";
import { useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox } from "components/lib";
import { useProjectModel } from "utils/url";

export const ProjectLIst = () => {
  const { open: setProjectModelOpen } = useProjectModel();
  useDodumentTitle("项目列表");
  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 1000);
  const { data: list, isLoading, error } = useProjects(debouncedParam);
  const { data: users } = useUser();

  return (
    <Container>
      <Row justify="space-between" align="middle">
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={() => setProjectModelOpen()}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        param={param}
        users={users || []}
        setParam={setParam}
      ></SearchPanel>
      <ErrorBox error={error}></ErrorBox>
      <List
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
