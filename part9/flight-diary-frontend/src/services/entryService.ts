import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";
const baseUrl = "http://localhost:3000/api";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${baseUrl}/diaries`
  );
  return data;
};

export default { getAll };
