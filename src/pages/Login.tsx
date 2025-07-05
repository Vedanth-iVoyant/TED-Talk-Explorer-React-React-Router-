import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  message,
  Typography,
  Card,
} from "antd";
import { users } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Title } = Typography;

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
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100vh",
        padding: "16px",
      }}
      vertical
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          borderRadius: "12px",
          border: "none",
        }}
        bodyStyle={{
          padding: "32px",
        }}
      >
        <Flex vertical align="center" style={{ marginBottom: "24px" }}>
          <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
            Welcome Back
          </Title>
          <Typography.Text
            type="secondary"
            style={{ fontSize: "14px", marginTop: "8px" }}
          >
            Please sign in to your account
          </Typography.Text>
        </Flex>

        <Form
          name="basic"
          layout="vertical"
          style={{ width: "100%" }}
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
            <Input
              size="large"
              placeholder="Enter your username"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Enter your password"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{
                borderRadius: "8px",
                height: "48px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;
