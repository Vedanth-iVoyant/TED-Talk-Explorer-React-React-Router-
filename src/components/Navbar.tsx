import { Layout, Menu, Typography, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getStoredUser } from "../utils/storage";

const Navbar = () => {
  const { Header } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const user = getStoredUser();
  const handleLogout = () => {
    localStorage.removeItem("LoginUser");
    navigate("/login");
  };

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingInline: "24px",
        }}
      >
        <div style={{ flex: "1 1 auto" }}>
          <Title level={3} style={{ color: "white", margin: 0 }}>
            TED Talk Explorer
          </Title>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          style={{ minWidth: 600, justifyContent: "flex-end" }}
        >
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="talks">
            <Link to="/talks">Talks</Link>
          </Menu.Item>
          <Menu.Item key="speakers">
            <Link to="/speakers">Speakers</Link>
          </Menu.Item>
          <Menu.Item key="favorites">
            <Link to="/favorites">Favorites</Link>
          </Menu.Item>
          {!user && (
            <>
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="admin">
                <Link to="/admin">Admin</Link>
              </Menu.Item>
            </>
          )}
          {user && (
            <div style={{ marginLeft: "16px", color: "white" }}>
              Hello, {user.username}{" "}
              <Button
                size="small"
                type="primary"
                danger
                onClick={handleLogout}
                style={{ marginLeft: "8px" }}
              >
                Logout
              </Button>
            </div>
          )}
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
