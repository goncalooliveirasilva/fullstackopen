import { NonSensitiveDiaryEntry } from "../types";

const Entry = ({ entry }: { entry: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <b>{entry.date}</b>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </div>
  );
};

export default Entry;
