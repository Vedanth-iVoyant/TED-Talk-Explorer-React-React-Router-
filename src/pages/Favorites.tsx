import { Card, Typography, Empty, Row, Col, Tag, Button, Avatar } from "antd";
import { getUserFavorites, saveUserFavorites } from "../utils/storage";
import { talks } from "../api/talks";
import { speakers } from "../api/speakers";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  HeartFilled,
  PlayCircleOutlined,
  UserOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>(getUserFavorites());
  const favoriteTalks = talks.filter((talk) => favorites.includes(talk.id));

  const toggleFavorite = (talkId: string) => {
    const updatedFavorites = favorites.includes(talkId)
      ? favorites.filter((id) => id !== talkId)
      : [...favorites, talkId];

    setFavorites(updatedFavorites);
    saveUserFavorites(updatedFavorites);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    saveUserFavorites([]);
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <Title
              level={2}
              style={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HeartFilled style={{ color: "#ff4d4f", marginRight: "12px" }} />
              My Favorite Talks
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              {favoriteTalks.length} favorite talk
              {favoriteTalks.length !== 1 ? "s" : ""} saved
            </Text>
          </div>
          {favoriteTalks.length > 0 && (
            <Button
              type="default"
              icon={<DeleteOutlined />}
              onClick={clearAllFavorites}
              style={{ color: "#ff4d4f", borderColor: "#ff4d4f" }}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {favoriteTalks.length > 0 ? (
        <Row gutter={[24, 24]}>
          {favoriteTalks.map((talk) => {
            const speaker = speakers.find((s) => s.id === talk.speakerId);

            return (
              <Col key={talk.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    border: "1px solid #e8e8e8",
                    position: "relative",
                  }}
                  cover={
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <Link to={`/talks/${talk.id}`}>
                        <img
                          src={talk.thumbnail}
                          alt={talk.title}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </Link>

                      {/* Play Button Overlay */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          borderRadius: "50%",
                          width: "48px",
                          height: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                        className="play-overlay"
                      >
                        <PlayCircleOutlined
                          style={{ color: "white", fontSize: "24px" }}
                        />
                      </div>

                      {/* Duration Badge */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {talk.duration} mins
                      </div>

                      {/* Favorite Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "rgba(255, 77, 79, 0.9)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <HeartFilled style={{ fontSize: "10px" }} />
                        Favorite
                      </div>
                    </div>
                  }
                  bodyStyle={{ padding: "16px" }}
                  actions={[
                    <Button
                      key="favorite"
                      type="text"
                      icon={<HeartFilled style={{ color: "#ff4d4f" }} />}
                      onClick={() => toggleFavorite(talk.id)}
                      style={{ color: "#ff4d4f" }}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <div
                    style={{
                      height: "140px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link to={`/talks/${talk.id}`}>
                      <Title
                        level={5}
                        style={{
                          marginBottom: "8px",
                          lineHeight: "1.3",
                          color: "#1890ff",
                          cursor: "pointer",
                        }}
                        ellipsis={{ rows: 2 }}
                      >
                        {talk.title}
                      </Title>
                    </Link>

                    {/* Speaker Info */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <Avatar
                        size={24}
                        icon={<UserOutlined />}
                        style={{ marginRight: "8px" }}
                      />
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {speaker?.name}
                      </Text>
                    </div>

                    {/* Talk Description */}
                    <Paragraph
                      ellipsis={{ rows: 2, expandable: false }}
                      style={{
                        marginBottom: "12px",
                        color: "#666",
                        fontSize: "13px",
                        lineHeight: "1.4",
                        flex: 1,
                      }}
                    >
                      {talk.description}
                    </Paragraph>

                    {/* Tags */}
                    <div style={{ marginTop: "auto" }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "4px",
                        }}
                      >
                        {talk.tags.slice(0, 2).map((tag) => (
                          <Tag
                            key={tag}
                            color="blue"
                            style={{
                              fontSize: "10px",
                              padding: "2px 6px",
                              borderRadius: "8px",
                              border: "none",
                              margin: 0,
                            }}
                          >
                            {tag}
                          </Tag>
                        ))}
                        {talk.tags.length > 2 && (
                          <Tag
                            color="default"
                            style={{
                              fontSize: "10px",
                              padding: "2px 6px",
                              borderRadius: "8px",
                              border: "none",
                              margin: 0,
                            }}
                          >
                            +{talk.tags.length - 2}
                          </Tag>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Card style={{ textAlign: "center", padding: "60px 20px" }}>
          <Empty
            image={
              <HeartOutlined style={{ fontSize: "64px", color: "#ccc" }} />
            }
            description={
              <div>
                <Title
                  level={4}
                  type="secondary"
                  style={{ marginBottom: "8px" }}
                >
                  No Favorite Talks Yet
                </Title>
                <Text type="secondary">
                  Start exploring talks and add them to your favorites!
                </Text>
              </div>
            }
          >
            <Link to="/talks">
              <Button type="primary" size="large" icon={<PlayCircleOutlined />}>
                Explore Talks
              </Button>
            </Link>
          </Empty>
        </Card>
      )}

      {/* Add Custom CSS for hover effects */}
      <style>{`
        .ant-card:hover .play-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};
