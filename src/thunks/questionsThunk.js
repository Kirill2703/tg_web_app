import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://footwise.onrender.com/api/question";

const fetchAllQuestionsByQuizId = createAsyncThunk(
  "prediction/fetchAllByQuizId",
  async (quizId, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/${quizId}`);
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
export default fetchAllQuestionsByQuizId;