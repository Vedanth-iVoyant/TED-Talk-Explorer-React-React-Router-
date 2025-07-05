import { Layout, List, Typography, Input, Flex } from "antd";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { talks } from "../api/talks";
import { speakers } from "../api/speakers";
import { Content } from "antd/es/layout/layout";

const { Sider } = Layout;
const { Title } = Typography;
const { Search } = Input;

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredTalks = useMemo(
    () =>
      talks.filter(
        (talk) =>
          talk.title.toLowerCase().includes(query) ||
          talk.description.toLowerCase().includes(query)
      ),
    [query]
  );

  const filteredSpeakers = useMemo(
    () =>
      speakers.filter(
        (speaker) =>
          speaker.name.toLowerCase().includes(query) ||
          speaker.bio.toLowerCase().includes(query)
      ),
    [query]
  );

  const onSearch = (value: string) => {
    setSearchParams({ q: value });
  };
  return (
    <Flex style={{ padding: "2rem" }}>
      <Sider style={{ backgroundColor: "white", marginRight: "2rem" }}>
        <Title level={4}>Filters</Title>
        <List
          dataSource={[
            "All",
            `Talks (${filteredTalks.length})`,
            `Speakers (${filteredSpeakers.length})`,
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Sider>
      <Content>
        <Search
          placeholder="Search talks, speakers..."
          value={query}
          onSearch={onSearch}
          enterButton
          allowClear
        />
        <Title level={4}>Talks</Title>
        <List
          itemLayout="vertical"
          dataSource={filteredTalks}
          renderItem={(talk) => (
            <List.Item
              key={talk.id}
              extra={<img src={talk.thumbnail} alt="thubnail" width={150} />}
            >
              <List.Item.Meta
                title={<Link to={`/talks/${talk.id}`}>{talk.title}</Link>}
                description={`By ${
                  speakers.find((s) => s.id === talk.speakerId)?.name
                }`}
              />
              {talk.description}
            </List.Item>
          )}
        ></List>
      </Content>
    </Flex>
  );
};
