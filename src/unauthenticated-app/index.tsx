import { useState } from "react";
import { Button, Card, Divider } from "antd";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./logout";
import styled from "@emotion/styled";
import logo from "../assets/logo.png";
import left from "@/assets/left.png";
import right from "@/assets/right.png";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登陆"}</Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登陆" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed; // 图片不随页面滚动而滚动
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 60rem) / 2) - 3.2rem),
    calc(((100vw - 80rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem);
  background-image: url(${left}), url(${right});
`;
const Header = styled.div`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  margin-top: -5rem;
  background-size: 8rem;
  width: 100%;
  transform: scale(1.2);
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  max-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
`;
