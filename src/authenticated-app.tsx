import styled from "@emotion/styled";
import { MenuProps, Dropdown, Space, Button } from "antd";
import { Row } from "components/lib";
import { ProjectLIst } from "./screens/project-list";
import { ReactComponent as SoftwareLogo } from "@/assets/headerLogo.svg";
import { User } from "auto-provider";

export const AuthenticatedApp = ({
  logout,
  user,
}: {
  logout: () => Promise<void>;
  user: User;
}) => {
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
    <Container>
      <Header between={true} marginBottom={2}>
        <HeaderLeft gap={true}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SoftwareLogo>
          <h3>用户名</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown menu={{ items }}>
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              <Space>Hi,{user && user?.name}</Space>
            </Button>
          </Dropdown>
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
  padding: 0 3.2rem;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;
const Main = styled.main`
  grid-area: main;
`;
