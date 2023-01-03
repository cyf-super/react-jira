import styled from "@emotion/styled";
import { Button } from "antd";
import { Row } from "components/lib";
import { ProjectLIst } from "./screens/project-list";

export const AuthenticatedApp = ({
  logout,
}: {
  logout: () => Promise<void>;
}) => {
  return (
    <Container>
      <Header between={true} marginBottom={2}>
        <HeaderLeft gap={true}>
          <h3>logo</h3>
          <h3>用户名</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>登出</Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectLIst></ProjectLIst>
      </Main>
    </Container>
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
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;
const Main = styled.main`
  grid-area: main;
`;
