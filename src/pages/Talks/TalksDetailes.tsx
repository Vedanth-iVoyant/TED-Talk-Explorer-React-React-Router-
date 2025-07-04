import { useParams } from "react-router-dom";
import { talks } from "../../api/talks";

export const TalksDetailes = () => {
  const { id } = useParams();
  const talk = talks.find((talk) => talk.id === id);
  return (
    <div>
      <h2>TalksDetailes</h2>
      <iframe src={talk?.videoUrl} />
      <br /> <h3>{talk?.title}</h3>
      <p>{talk?.description}</p>
    </div>
  );
};
