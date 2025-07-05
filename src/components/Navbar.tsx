import { Layout, Menu, Typography, Button, Input } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { getStoredUser } from "../utils/storage";

const Navbar = () => {
  const { Header } = Layout;
  const { Title } = Typography;
  const { Search } = Input;
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();
  const [searchVisible, setSearchVisible] = useState(false);

  const getActiveKey = () => {
    if (location.pathname.startsWith("/talks")) return "talks";
    if (location.pathname.startsWith("/speakers")) return "speakers";
    if (location.pathname.startsWith("/favorites")) return "favorites";
    if (location.pathname.startsWith("/admin")) return "admin";
    if (location.pathname.startsWith("/login")) return "login";
    return "home";
  };

  const handleLogout = () => {
    localStorage.removeItem("LoginUser");
    navigate("/login");
  };

  const onSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${value}`);
      setSearchVisible(false);
    }
  };

  const handleSearchClick = () => {
    setSearchVisible(true);
  };

  const handleSearchClose = () => {
    setSearchVisible(false);
  };

  const menuItems = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "talks",
      label: <Link to="/talks">Talks</Link>,
    },
    {
      key: "speakers",
      label: <Link to="/speakers">Speakers</Link>,
    },
    {
      key: "favorites",
      label: <Link to="/favorites">Favorites</Link>,
    },
    ...(!user
      ? [
          {
            key: "login",
            label: <Link to="/login">Login</Link>,
          },
        ]
      : []),
    ...(user?.role === "admin"
      ? [
          {
            key: "admin",
            label: <Link to="/admin">Admin</Link>,
          },
        ]
      : []),
  ];

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1000,
          width: "100%",
          paddingInline: "16px",
          height: "80px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Search Overlay */}
        {searchVisible && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              paddingInline: "24px",
              zIndex: 1001,
            }}
          >
            <Search
              placeholder="Search Talks, Speakers, Topics"
              onSearch={onSearch}
              enterButton
              allowClear
              autoFocus
              style={{ flex: 1, marginRight: "16px" }}
              size="large"
            />
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleSearchClose}
              size="large"
              style={{ color: "#666" }}
            />
          </div>
        )}

        {/* Left - Title */}
        <div style={{ flex: "0 0 auto" }}>
          <Title
            level={3}
            style={{
              margin: 0,
              color: "#000000",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "#e62b1e" }}>TED</span>
            <span style={{ color: "#000000" }}> Talk Explorer</span>
          </Title>
        </div>

        {/* Center - Menu */}
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[getActiveKey()]}
            items={menuItems}
            overflowedIndicator={false}
            style={{
              backgroundColor: "transparent",
              borderBottom: "none",
              fontWeight: "500",
              fontSize: "14px",
              flex: 1,
              justifyContent: "center",
            }}
          />
        </div>

        {/* Right - Search Icon and User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Button
            type="text"
            icon={<SearchOutlined />}
            onClick={handleSearchClick}
            size="large"
            style={{
              marginLeft: "16px",
              color: "#666",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          {user && (
            <div
              style={{
                marginLeft: "16px",
                display: "flex",
                alignItems: "center",
                color: "#000000",
                fontSize: "14px",
              }}
            >
              <span style={{ marginRight: "12px", fontWeight: "500" }}>
                Hello, {user.username}
              </span>
              <Button
                size="middle"
                type="primary"
                danger
                onClick={handleLogout}
                style={{
                  borderRadius: "6px",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
