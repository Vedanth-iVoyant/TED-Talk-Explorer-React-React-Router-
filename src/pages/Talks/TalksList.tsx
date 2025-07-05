import { Link, Outlet, useParams } from "react-router-dom";
import { talks } from "../../api/talks";
import { Card, Row, Col, Typography, Button, Tag, Tooltip } from "antd";
import { useState } from "react";
import {
  getUserFavorites,
  saveUserFavorites,
  getStoredUser,
} from "../../utils/storage";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { speakers } from "../../api/speakers";

const { Title } = Typography;

export default function TalksList() {
  const { id } = useParams();
  const user = getStoredUser(); // Get current user
  const [favorites, setFavorites] = useState<string[]>(getUserFavorites);

  const toggleFavorite = (talkId: string) => {
    // Only allow favoriting if user is logged in
    if (!user) {
      return; // Do nothing if user is not logged in
    }

    const updatedFavorites = favorites.includes(talkId)
      ? favorites.filter((id) => id !== talkId)
      : [...favorites, talkId];

    setFavorites(updatedFavorites);
    saveUserFavorites(updatedFavorites);
  };

  if (id) {
    return <Outlet />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>Talks Videos</Title>
      <Card
        title="Featured Talks"
        extra={
          <Button type="link">
            <Link to="/talks">See All</Link>
          </Button>
        }
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={16}>
          {talks.map((talk) => (
            <Col span={8} key={talk.id}>
              <Card
                cover={<img alt={talk.title} src={talk.thumbnail} />}
                hoverable
                style={{ width: "100%", objectFit: "cover" }}
                actions={[
                  user ? (
                    // If user is logged in, show clickable favorite icon
                    favorites.includes(talk.id) ? (
                      <HeartFilled
                        key="favorite"
                        style={{
                          color: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleFavorite(talk.id)}
                      />
                    ) : (
                      <HeartOutlined
                        key="favorite"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => toggleFavorite(talk.id)}
                      />
                    )
                  ) : (
                    // If user is not logged in, show tooltip with login prompt
                    <Tooltip
                      title="Please log in to add favorites"
                      placement="top"
                    >
                      <HeartOutlined
                        key="favorite"
                        style={{
                          fontSize: "20px",
                          cursor: "not-allowed",
                          color: "#d9d9d9",
                        }}
                        onClick={() => {}} // No action when clicked
                      />
                    </Tooltip>
                  ),
                ]}
              >
                <Link to={`/talks/${talk.id}`}>
                  <Card.Meta
                    title={<Link to={`/talks/${talk.id}`}>{talk.title}</Link>}
                    description={
                      <>
                        <div>
                          By{" "}
                          {speakers.find((s) => s.id === talk.speakerId)?.name}
                        </div>
                        <div>Duration: {talk.duration} mins</div>
                        <div style={{ marginTop: "8px" }}>
                          {talk.tags.map((tag) => (
                            <Tag key={tag} color="blue">
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      </>
                    }
                  />
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}
