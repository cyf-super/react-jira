import { useState } from "react";
import { useDebounce, useDodumentTitle } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/useUser";
import { useQueryParams } from "utils/url";

export const ProjectLIst = () => {
  // const [, setParam] = useState({
  //   name: '',
  //   personId: ''
  // });

  useDodumentTitle("项目列表");

  // param：url上的 query
  // setParam：修改url上的query
  const [param, setParam] = useQueryParams(["name", "personId"]);
  const debounceParam = useDebounce(param, 1000);
  const { data: list, isLoading, error } = useProject(debounceParam);
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
