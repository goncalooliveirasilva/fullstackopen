import { useEffect, useState } from "react";
import entryService from "./services/entryService";
import { NonSensitiveDiaryEntry } from "./types";
// import Notification from "./components/Notification";
import Entries from "./components/Entries";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  // const [message, , setMessage] = useState("");
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getEntries = async () => {
      const entries = await entryService.getAll();
      setEntries(entries);
    };
    void getEntries();
  }, []);

  return (
    <div>
      <h1>Add new entry</h1>
      {/* <Notification message={message} success={success} /> */}
      <Entries entries={entries} />
    </div>
  );
}

export default App;
