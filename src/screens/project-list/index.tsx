import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

export const ProjectLIst = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const debounceParam = useDebounce(param, 1000);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        users={users}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  padding-top: 0;
`;
