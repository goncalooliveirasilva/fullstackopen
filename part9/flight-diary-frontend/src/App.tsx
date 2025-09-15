import { useEffect, useState } from "react";
import entryService from "./services/entryService";
import { NonSensitiveDiaryEntry } from "./types";
import Notification from "./components/Notification";
import Entries from "./components/Entries";
import NewEntryForm from "./components/NewEntryForm";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getEntries = async () => {
      const entries = await entryService.getAll();
      setEntries(entries);
    };
    void getEntries();
  }, []);

  return (
    <div>
      <h1>Add New Entry</h1>
      <Notification message={message} />
      <NewEntryForm
        onAddEntry={(entry) => setEntries(entries.concat(entry))}
        setMessage={setMessage}
      />
      <h1>Diary entries</h1>
      <Entries entries={entries} />
    </div>
  );
}

export default App;
