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
          date
          <input
            type="text"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type="text"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather
          <input
            type="text"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          comment
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
