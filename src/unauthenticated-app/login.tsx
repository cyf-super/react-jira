import { Form, Input } from "antd";
import { useAsync } from "utils/use-async";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./logout";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();

  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  });

  const submitAction = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
  };

  return (
    <Form onFinish={submitAction}>
      {user ? <div>{user.name}</div> : null}
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
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          登陆
        </LongButton>
      </Form.Item>
    </Form>
  );
};
