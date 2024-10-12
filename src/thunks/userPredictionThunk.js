import { createAsyncThunk } from "@reduxjs/toolkit";


const API_URL = "http://localhost:4000/api/user-prediction";

export const fetchAllUserPredictions = createAsyncThunk(
  "user-prediction/fetchAll", // Имя экшена
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке предсказаний");
      }
      const data = await response.json();
      return data; // Возвращаем данные
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createUserPrediction = createAsyncThunk(
  "user-prediction/create",
  async ({ userId, predictionId, selectedTeam }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          predictionId,
          selectedTeam,
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