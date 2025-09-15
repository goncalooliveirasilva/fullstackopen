import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from "../types";
const baseUrl = "http://localhost:3000/api";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${baseUrl}/diaries`
  );
  return data;
};

const addEntry = async (entry: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${baseUrl}/diaries`, entry);
  return data;
};

export default { getAll, addEntry };
