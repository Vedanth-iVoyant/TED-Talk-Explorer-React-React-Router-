import { useParams, Link } from "react-router-dom";
import { talks } from "../../api/talks";
import { speakers } from "../../api/speakers";
import { Card, Row, Col, Typography, Tag, Avatar, Button, Divider } from "antd";
import { useState } from "react";
import { getUserFavorites, saveUserFavorites } from "../../utils/storage";
import {
  HeartFilled,
  HeartOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export const TalksDetailes = () => {
  const { id } = useParams();
  const talk = talks.find((talk) => talk.id === id);
  const [favorites, setFavorites] = useState<string[]>(getUserFavorites);

  const toggleFavorite = (talkId: string) => {
    const updatedFavorites = favorites.includes(talkId)
      ? favorites.filter((id) => id !== talkId)
      : [...favorites, talkId];

    setFavorites(updatedFavorites);
    saveUserFavorites(updatedFavorites);
  };

  if (!talk) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Title level={2}>Talk Not Found</Title>
        <Text>The requested talk could not be found.</Text>
      </div>
    );
  }

  const speaker = speakers.find((s) => s.id === talk.speakerId);
  const relatedTalks = talks.filter((t) => t.id !== talk.id).slice(0, 6);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Row gutter={24}>
        {/* Left side - Main video and details */}
        <Col span={16}>
          <Card style={{ marginBottom: "16px" }} bodyStyle={{ padding: 0 }}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src={talk.videoUrl}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                frameBorder="0"
                allowFullScreen
                title={talk.title}
              />
            </div>
          </Card>

          {/* Video Title and Actions */}
          <Card>
            <Title level={3} style={{ marginBottom: "12px" }}>
              {talk.title}
            </Title>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Avatar size={40} icon={<UserOutlined />} />
                <div>
                  <Link to={`/speakers/${speaker?.id}`}>
                    <Text strong style={{ fontSize: "16px" }}>
                      {speaker?.name}
                    </Text>
                  </Link>
                  <br />
                  <Text type="secondary">
                    <ClockCircleOutlined /> {talk.duration} mins
                  </Text>
                </div>
              </div>

              <Button
                type={favorites.includes(talk.id) ? "primary" : "default"}
                icon={
                  favorites.includes(talk.id) ? (
                    <HeartFilled />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={() => toggleFavorite(talk.id)}
                style={{
                  color: favorites.includes(talk.id) ? "#fff" : "#ff4d4f",
                  borderColor: favorites.includes(talk.id)
                    ? "#ff4d4f"
                    : "#ff4d4f",
                }}
              >
                {favorites.includes(talk.id) ? "Favorited" : "Add to Favorites"}
              </Button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              {talk.tags.map((tag) => (
                <Tag key={tag} color="blue" style={{ marginBottom: "4px" }}>
                  {tag}
                </Tag>
              ))}
            </div>

            <Divider />

            <div>
              <Title level={5}>Description</Title>
              <Paragraph>{talk.description}</Paragraph>
            </div>
          </Card>
        </Col>

        {/* Right side - Related videos */}
        <Col span={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <PlayCircleOutlined />
                <span>Up Next</span>
              </div>
            }
            style={{ position: "sticky", top: "24px" }}
          >
            <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {relatedTalks.map((relatedTalk) => {
                const relatedSpeaker = speakers.find(
                  (s) => s.id === relatedTalk.speakerId
                );
                return (
                  <div key={relatedTalk.id} style={{ marginBottom: "16px" }}>
                    <Link to={`/talks/${relatedTalk.id}`}>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ flex: "0 0 120px" }}>
                          <img
                            src={relatedTalk.thumbnail}
                            alt={relatedTalk.title}
                            style={{
                              width: "100%",
                              height: "68px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Text
                            strong
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.4",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {relatedTalk.title}
                          </Text>
                          <div style={{ marginTop: "4px" }}>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              {relatedSpeaker?.name}
                            </Text>
                          </div>
                          <div style={{ marginTop: "2px" }}>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              <ClockCircleOutlined /> {relatedTalk.duration}{" "}
                              mins
                            </Text>
                          </div>
                          <div style={{ marginTop: "4px" }}>
                            <Button
                              type="text"
                              size="small"
                              icon={
                                favorites.includes(relatedTalk.id) ? (
                                  <HeartFilled style={{ color: "#ff4d4f" }} />
                                ) : (
                                  <HeartOutlined />
                                )
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(relatedTalk.id);
                              }}
                              style={{ padding: "0 4px", height: "auto" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                    {relatedTalk.id !==
                      relatedTalks[relatedTalks.length - 1].id && (
                      <Divider style={{ margin: "12px 0" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
