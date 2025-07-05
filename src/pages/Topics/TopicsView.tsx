import { Link, Outlet, useParams } from "react-router-dom";
import { topics } from "../../api/topics";
import { Card, Flex, Typography } from "antd";
import { talks } from "../../api/talks";
import { useState } from "react";
import { getUserFavorites, saveUserFavorites } from "../../utils/storage";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const TopicsView = () => {
  const { tagName } = useParams();
  const tag = topics.find((tag) => tag === tagName);
  const talksByTopic = tag
    ? talks.filter((talk) => talk.tags.includes(tag))
    : [];

  const { id } = useParams();

  const [favorites, setFavorites] = useState<string[]>(getUserFavorites);

  const taggleFavorite = (talkId: string) => {
    let updatedFavorites: string[];
    if (favorites.includes(talkId)) {
      updatedFavorites = favorites.filter((id) => id !== talkId);
    } else {
      updatedFavorites = [...favorites, talkId];
    }

    setFavorites(updatedFavorites);
    saveUserFavorites(updatedFavorites);
  };
  if (id) {
    return <Outlet />;
  }
  return (
    <Flex style={{ padding: "2rem" }}>
      <Title level={4}>{tag}</Title>
      <ul>
        {talksByTopic.map((talk) => (
          <li key={talk.id}>
            <Card
              title={
                <>
                  <Link to={talk.id}>{talk.title}</Link>
                  <span
                    onClick={() => taggleFavorite(talk.id)}
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    {favorites.includes(talk.id) ? (
                      <HeartFilled style={{ color: "red" }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </span>
                </>
              }
            >
              {talk.title} <br />
              <img src={talk.thumbnail} alt={talk.title} width={300} />
            </Card>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
