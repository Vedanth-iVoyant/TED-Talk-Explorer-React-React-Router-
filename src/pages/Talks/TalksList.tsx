import { Link, Outlet, useParams } from "react-router-dom";
import { talks } from "../../api/talks";
import { Card } from "antd";
import { useState } from "react";
import { getUserFavorites, saveUserFavorites } from "../../utils/storage";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

export default function TalksList() {
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
    <>
      <h2>Talks Videos</h2>
      <ul>
        {talks.map((talk) => (
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
    </>
  );
}
