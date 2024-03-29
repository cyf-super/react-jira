import { Form, Input, Button } from "antd";
import { useAuth } from "../../context/auth-context";

export const LoginScreen = () => {
  const { login } = useAuth();

  const submitAction = (values: { username: string; password: string }) => {
    login(values);
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
      <Form.Item>
        <Button htmlType="submit" type="primary">
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};
