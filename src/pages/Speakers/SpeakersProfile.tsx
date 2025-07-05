import { Card, Typography, List } from "antd";
import { useParams, Link } from "react-router-dom";
import { speakers } from "../../api/speakers";
import { talks } from "../../api/talks";

const { Title, Paragraph } = Typography;

export const SpeakersProfile = () => {
  const { id } = useParams();
  const speaker = speakers.find((s) => s.id === id);
  const speakerTalks = talks.filter((talk) => talk.speakerId === speaker?.id);

  return (
    <div>
      {/* Black Top Section */}
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "60px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <img
          src={speaker?.photo}
          alt={speaker?.name}
          style={{
            width: "150px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        <div style={{ marginLeft: "30px" }}>
          <Title level={2} style={{ color: "#fff" }}>
            {speaker?.name}
          </Title>
          <Paragraph style={{ color: "#ccc", fontSize: "16px" }}>
            {speaker?.bio}
          </Paragraph>
        </div>
      </div>

      {/* Talks List Section */}
      <div
        style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}
      >
        <Title level={3}>Talks by {speaker?.name}</Title>
        {speakerTalks.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={speakerTalks}
            renderItem={(talk) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <img
                      src={talk.thumbnail}
                      alt={talk.title}
                      style={{
                        width: "100%",
                        height: "240px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <Link to={`/talks/${talk.id}`}>
                    <Title level={4}>{talk.title}</Title>
                  </Link>
                  <Paragraph>Duration: {talk.duration} mins</Paragraph>
                  <Paragraph type="secondary">
                    Tags: {talk.tags.join(", ")}
                  </Paragraph>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Paragraph>No talks found for this speaker.</Paragraph>
        )}
      </div>
    </div>
  );
};
