import { Link } from "react-router-dom";
import { talks } from "../api/talks";
import { speakers } from "../api/speakers";
import { topics } from "../api/topics";
import { Card, List, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function Home() {
  const featuredTalks = talks.slice(0, 2);
  const featuredSpeakers = speakers.slice(0, 2);
  const popularTopics = topics.slice(0, 4);

  return (
    <div style={{ position: "absolute", padding: "24px" }}>
      <Typography>
        <Title level={2}>TED Talk Explorer</Title>
        <Paragraph>Discover Inspiring Talks, Speakers & Ideas.</Paragraph>
      </Typography>

      {/* Featured Talks */}
      <Card title="Featured Talks" style={{ marginBottom: "24px" }}>
        <List
          itemLayout="horizontal"
          dataSource={featuredTalks}
          renderItem={(talk) => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/talks/${talk.id}`}>{talk.title}</Link>}
                description={`By ${
                  speakers.find((s) => s.id === talk.speakerId)?.name
                }`}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Popular Speakers */}
      <Card title="Popular Speakers" style={{ marginBottom: "24px" }}>
        <List
          itemLayout="horizontal"
          dataSource={featuredSpeakers}
          renderItem={(speaker) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link to={`/speakers/${speaker.id}`}>{speaker.name}</Link>
                }
                description={speaker.bio}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Popular Topics */}
      <Card title="Popular Topics" style={{ marginBottom: "24px" }}>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={popularTopics}
          renderItem={(topic) => (
            <List.Item>
              <Link to={`/topics/${topic}`}>
                <Card>{topic}</Card>
              </Link>
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
