/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Card, Button, Divider } from "antd";
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
      <ShadowCard>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登陆" : "没有账号？注册新账号"}
        </a>
      </ShadowCard>
    </Container>
  );
};

const Footer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
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
