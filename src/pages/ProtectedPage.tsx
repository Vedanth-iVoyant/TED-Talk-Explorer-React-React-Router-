import { Typography, Button, Card, Space, Result } from "antd";
import { useLocation, Link } from "react-router-dom";
import {
  LockOutlined,
  IeOutlined,
  LoginOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const ProtectedPage = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Card
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e8e8e8",
        }}
        bodyStyle={{ padding: "40px" }}
      >
        <Result
          icon={
            isAdminPage ? (
              <IeOutlined
                style={{
                  fontSize: "72px",
                  color: "#ff4d4f",
                  marginBottom: "16px",
                }}
              />
            ) : (
              <LockOutlined
                style={{
                  fontSize: "72px",
                  color: "#faad14",
                  marginBottom: "16px",
                }}
              />
            )
          }
          title={
            <Title
              level={2}
              style={{
                color: isAdminPage ? "#ff4d4f" : "#faad14",
                marginBottom: "16px",
              }}
            >
              {isAdminPage ? "Access Denied" : "Authentication Required"}
            </Title>
          }
          subTitle={
            <div style={{ marginBottom: "24px" }}>
              <Paragraph
                style={{
                  fontSize: "16px",
                  color: "#666",
                  lineHeight: "1.6",
                  marginBottom: "16px",
                }}
              >
                {isAdminPage
                  ? "You don't have sufficient permissions to access this page. Only administrators can view this content."
                  : "This page requires authentication. Please log in to continue and access your personalized content."}
              </Paragraph>

              {!isAdminPage && (
                <Paragraph
                  style={{
                    fontSize: "14px",
                    color: "#999",
                    fontStyle: "italic",
                  }}
                >
                  Your session may have expired or you haven't logged in yet.
                </Paragraph>
              )}
            </div>
          }
          extra={
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {!isAdminPage && (
                <Link to="/login">
                  <Button
                    type="primary"
                    size="large"
                    icon={<LoginOutlined />}
                    style={{
                      width: "200px",
                      height: "45px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Go to Login
                  </Button>
                </Link>
              )}

              <Link to="/">
                <Button
                  type={isAdminPage ? "primary" : "default"}
                  size="large"
                  icon={<HomeOutlined />}
                  style={{
                    width: "200px",
                    height: "45px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Back to Home
                </Button>
              </Link>

              {isAdminPage && (
                <div style={{ marginTop: "16px" }}>
                  <Paragraph
                    style={{
                      fontSize: "13px",
                      color: "#999",
                      margin: 0,
                    }}
                  >
                    Need admin access? Contact your system administrator.
                  </Paragraph>
                </div>
              )}
            </Space>
          }
        />
      </Card>
    </div>
  );
};
