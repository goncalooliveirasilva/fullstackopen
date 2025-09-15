import React from "react";
import { useState } from "react";
import entryService from "../services/entryService";
import { NewDiaryEntry, DiaryEntry, Visibility, Weather } from "../types";
import axios from "axios";

const NewEntryForm = ({
  onAddEntry,
  setMessage,
}: {
  onAddEntry: (entry: DiaryEntry) => void;
  setMessage: (message: string) => void;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const addNewEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newEntry: NewDiaryEntry = {
        date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment,
      };
      const savedEntry = await entryService.addEntry(newEntry);
      onAddEntry(savedEntry);
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setMessage(error.response?.data || error.message);
      } else if (error instanceof Error) {
        setMessage(error.message);
      }
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div>
      <form onSubmit={addNewEntry}>
        <div>
          <b>date</b>
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <b>visibility</b>
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          <b>weather</b>
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <b>comment</b>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
