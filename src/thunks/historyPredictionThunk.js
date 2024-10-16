import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/api/user-prediction";

export const fetchUserHistory = createAsyncThunk(
  "/fetchHistory",
  async (username, thunkAPI) => {
    try {
      const responce = await fetch(`${API_URL}/history/${username}`);
      if (!responce.ok) {
        throw new Error("Ошибка при загрузке истории прогнозов");
      }
      const data = await responce.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
