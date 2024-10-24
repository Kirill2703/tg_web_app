import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/api/quiz";

const fetchAllQuizes = createAsyncThunk(
  "quiz/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке предсказаний");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export default fetchAllQuizes
