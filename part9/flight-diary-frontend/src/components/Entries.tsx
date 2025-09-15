import { NonSensitiveDiaryEntry } from "../types";
import Entry from "./Entry";

const Entries = ({ entries }: { entries: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      {entries.map((entry) => {
        return <Entry key={entry.id} entry={entry} />;
      })}
    </div>
  );
};

export default Entries;
