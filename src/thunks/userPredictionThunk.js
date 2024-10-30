import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://footwise.onrender.com/api/user-prediction";

export const fetchAllUserPredictions = createAsyncThunk(
  "user-prediction/fetchAll",
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
export const createUserPrediction = createAsyncThunk(
  "user-prediction/create",
  async ({ username, predictionId, selectedTeam, betPoints }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          predictionId,
          selectedTeam,
          betPoints,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании прогноза");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
