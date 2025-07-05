import { Link } from "react-router-dom";
import { talks } from "../api/talks";
import { speakers } from "../api/speakers";
import { topics } from "../api/topics";
import { Card, List, Typography, Row, Col, Button, Tag } from "antd";

const { Title, Paragraph } = Typography;

export default function Home() {
  const featuredTalks = talks.slice(0, 3);
  const featuredSpeakers = speakers.slice(0, 3);
  const popularTopics = topics.slice(0, 4);

  return (
    <div style={{ padding: "24px" }}>
      <Typography>
        <Title level={2}>TED Talk Explorer</Title>
        <Paragraph>Discover Inspiring Talks, Speakers & Ideas.</Paragraph>
      </Typography>

      {/* Featured Talks */}
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
          {featuredTalks.map((talk) => (
            <Col span={8} key={talk.id}>
              <Card
                cover={<img alt={talk.title} src={talk.thumbnail} />}
                hoverable
                style={{ width: "100%", objectFit: "cover" }}
              >
                <Card.Meta
                  title={<Link to={`/talks/${talk.id}`}>{talk.title}</Link>}
                  description={
                    <>
                      <div>
                        By {speakers.find((s) => s.id === talk.speakerId)?.name}
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
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Popular Speakers */}
      <Card
        title="Popular Speakers"
        extra={
          <Button type="link">
            <Link to="/speakers">See All</Link>
          </Button>
        }
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={16}>
          {featuredSpeakers.map((speaker) => (
            <Col span={4} key={speaker.id}>
              <Card
                cover={
                  <img
                    alt={speaker.name}
                    src={speaker.photo}
                    style={{
                      width: "100%",
                      height: "15rem",
                      objectFit: "cover",
                    }}
                  />
                }
                hoverable
                style={{ height: "100%" }}
              >
                <Card.Meta
                  title={
                    <Link to={`/speakers/${speaker.id}`}>{speaker.name}</Link>
                  }
                  description={speaker.bio}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Popular Topics */}
      <Card title="Popular Topics" style={{ marginBottom: "24px" }}>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={popularTopics}
          renderItem={(topic) => (
            <List.Item>
              <Card hoverable>
                <Link to={`/topics/${topic}`}>{topic}</Link>
              </Card>
            </List.Item>
          )}
        />
      </Card>

      {/* Quick Navigation Links */}
      <Card title="Explore More">
        <List
          dataSource={[
            { name: "Browse All Talks", link: "/talks" },
            { name: "Browse All Speakers", link: "/speakers" },
            { name: "View Favorites", link: "/favorites" },
          ]}
          renderItem={(item) => (
            <List.Item>
              <Link to={item.link}>{item.name}</Link>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
