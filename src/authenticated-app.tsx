import styled from "@emotion/styled";
import { MenuProps, Dropdown, Space, Button } from "antd";
import { ButtonNoPadding, Row } from "components/lib";
import { ProjectLIst } from "./screens/project-list";
import { ReactComponent as SoftwareLogo } from "@/assets/headerLogo.svg";
import { useAuth } from "./context/auth-context";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModel } from "screens/project-list/project-model";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModelOpen, setProjectModelOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModelOpen={setProjectModelOpen} />
      <ButtonNoPadding onClick={() => setProjectModelOpen(true)}>
        打开
      </ButtonNoPadding>
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModelOpen={setProjectModelOpen} />
              }
            ></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Route
              path={"/*"}
              element={<Navigate to={"/projects"}></Navigate>}
            ></Route>
          </Routes>
        </Router>
      </Main>
      <ProjectModel
        projectModelOpen={projectModelOpen}
        onClose={() => setProjectModelOpen(false)}
      ></ProjectModel>
    </Container>
  );
};

const ProjectListScreen = (props: {
  setProjectModelOpen: (isOpen: boolean) => void;
}) => {
  return (
    <ProjectLIst setProjectModelOpen={props.setProjectModelOpen}></ProjectLIst>
  );
};

const PageHeader = (props: {
  setProjectModelOpen: (isOpen: boolean) => void;
}) => {
  const { user, logout } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type={"link"} target="_blank" onClick={logout}>
          登出
        </Button>
      ),
    },
  ];
  return (
    <Header between={true} marginBottom={2}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SoftwareLogo>
        </ButtonNoPadding>
        <ProjectPopover setProjectModelOpen={props.setProjectModelOpen} />
        <span>用户名</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            <Space>Hi,{user && user?.name}</Space>
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  /* display: grid;
  grid-template-rows: 6rem 1fr; */
  height: 100vh;
`;

const Header = styled(Row)`
  grid-area: header;
  height: 6rem;
  padding: 0 3.2rem;
`;

const HeaderLeft = styled(Row)`
  button {
    display: flex;
    align-items: center;
  }
`;
const HeaderRight = styled(Row)``;
const Main = styled.main`
  grid-area: main;
`;
