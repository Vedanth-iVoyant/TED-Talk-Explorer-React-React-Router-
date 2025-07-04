import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import { users } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { username, password } = values;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("LoginUser", JSON.stringify(user));
      message.success("Login Successful!");
      console.log("Logged In User: ", user);
      navigate("/");
    } else {
      message.error("Invalid username or password");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const loginUser = localStorage.getItem("LoginUser");
    if (loginUser) navigate("/");
  }, [navigate]);
  return (
    <Flex justify="center" align="center">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
