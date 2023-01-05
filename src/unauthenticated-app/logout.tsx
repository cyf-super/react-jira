import styled from "@emotion/styled";
import { Form, Input, Button } from "antd";
import { useAsync } from "utils/use-async";
import { useAuth } from "../context/auth-context";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  });

  const submitAction = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (error: unknown) {
      onError(error as Error);
    }
  };

  return (
    <Form onFinish={submitAction}>
      <Form.Item
        label="账号"
        name="username"
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        <Input type="text" placeholder="用户名" id="username" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input type="password" placeholder="密码" id="password" />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="cpassword"
        rules={[{ required: true, message: "请确认密码!" }]}
      >
        <Input type="password" placeholder="确认密码" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;
