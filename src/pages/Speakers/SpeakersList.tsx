import { Card, Row, Col, Typography, Tag, Input, Select, Space } from "antd";
import { speakers } from "../../api/speakers";
import { talks } from "../../api/talks";
import { Link, Outlet, useParams } from "react-router-dom";
import {
  SearchOutlined,
  UserOutlined,
  PlayCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useState, useMemo } from "react";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

export const SpeakersList = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Get speaker stats
  const getSpeakerStats = (speakerId: string) => {
    const speakerTalks = talks.filter((talk) => talk.speakerId === speakerId);
    const totalDuration = speakerTalks.reduce(
      (sum, talk) => sum + talk.duration,
      0
    );
    const allTags = speakerTalks.flatMap((talk) => talk.tags);
    const uniqueTags = [...new Set(allTags)];

    return {
      totalTalks: speakerTalks.length,
      totalDuration,
      topTags: uniqueTags.slice(0, 3),
    };
  };

  // Filter and sort speakers
  const filteredAndSortedSpeakers = useMemo(() => {
    const filtered = speakers.filter(
      (speaker) =>
        speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        speaker.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "talks":
          return (
            getSpeakerStats(b.id).totalTalks - getSpeakerStats(a.id).totalTalks
          );
        case "duration":
          return (
            getSpeakerStats(b.id).totalDuration -
            getSpeakerStats(a.id).totalDuration
          );
        default:
          return 0;
      }
    });
  }, [searchTerm, sortBy]);

  if (id) return <Outlet />;

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <Title level={2} style={{ marginBottom: "8px" }}>
          <UserOutlined style={{ marginRight: "12px" }} />
          Featured Speakers
        </Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>
          Discover amazing speakers and their inspiring talks
        </Text>
      </div>

      {/* Search and Filter Controls */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="Search speakers..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: "100%" }}
              placeholder="Sort by"
            >
              <Option value="name">Name (A-Z)</Option>
              <Option value="talks">Most Talks</Option>
              <Option value="duration">Total Duration</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={10}>
            <div style={{ textAlign: "right" }}>
              <Text type="secondary">
                {filteredAndSortedSpeakers.length} speaker
                {filteredAndSortedSpeakers.length !== 1 ? "s" : ""} found
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Speakers Grid */}
      <Row gutter={[24, 24]}>
        {filteredAndSortedSpeakers.map((speaker) => {
          const stats = getSpeakerStats(speaker.id);

          return (
            <Col key={speaker.id} xs={24} sm={12} md={8} lg={6}>
              <Link to={speaker.id}>
                <Card
                  hoverable
                  style={{
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    border: "1px solid #e8e8e8",
                  }}
                  cover={
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={speaker.photo}
                        alt={speaker.name}
                        style={{
                          width: "100%",
                          height: "380px",
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
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <PlayCircleOutlined />
                        {stats.totalTalks} talk
                        {stats.totalTalks !== 1 ? "s" : ""}
                      </div>
                    </div>
                  }
                  bodyStyle={{ padding: "16px" }}
                >
                  <div
                    style={{
                      height: "140px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Title
                      level={4}
                      style={{ marginBottom: "8px", lineHeight: "1.2" }}
                    >
                      {speaker.name}
                    </Title>

                    <Paragraph
                      ellipsis={{ rows: 2, expandable: false }}
                      style={{
                        marginBottom: "12px",
                        color: "#666",
                        fontSize: "14px",
                        lineHeight: "1.4",
                      }}
                    >
                      {speaker.bio}
                    </Paragraph>

                    <div style={{ marginTop: "auto" }}>
                      {/* Speaker Stats */}
                      <div style={{ marginBottom: "8px" }}>
                        <Space size="small">
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            <CalendarOutlined /> {stats.totalDuration} mins
                            total
                          </Text>
                        </Space>
                      </div>

                      {/* Tags */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "4px",
                        }}
                      >
                        {stats.topTags.map((tag) => (
                          <Tag
                            key={tag}
                            color="blue"
                            style={{
                              fontSize: "10px",
                              padding: "2px 6px",
                              borderRadius: "8px",
                              border: "none",
                            }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>

      {/* Empty State */}
      {filteredAndSortedSpeakers.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <UserOutlined
            style={{ fontSize: "48px", color: "#ccc", marginBottom: "16px" }}
          />
          <Title level={4} type="secondary">
            No speakers found
          </Title>
          <Text type="secondary">
            Try adjusting your search terms or filters
          </Text>
        </div>
      )}
    </div>
  );
};
