import { createAsyncThunk } from "@reduxjs/toolkit";

// const API_URL = "http://localhost:4000/api/prediction";

const API_URL = "https://footwise.onrender.com/api/prediction";

export const fetchUserHistory = createAsyncThunk(
  "prediction/fetchHistory",
  async (username, thunkAPI) => {
    try {
      const responce = await fetch(`${API_URL}/history/${username}`);
      if (!responce.ok) {
        throw new Error("Здесь пока ничего нет");
      }
      const data = await responce.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
