import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/api/user";

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ username, telegramId }) => {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, chatId }),
    });

    if (!response.ok) {
      throw new Error("Не удалось создать пользователя");
    }

    const data = await response.json();
    return data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Не удалось загрузить пользователей");
    }

    const data = await response.json();
    return data;
  }
);

export const fetchUserNameByChatId = createAsyncThunk(
  "user/fetchUserNameByChatId",
  async (chatId, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/${chatId}`);
    if (!response.ok) {
      return rejectWithValue("Пользователь не найден");
    }

    const data = await response.json();
    return data;
  }
);

export const updateUserPoints = createAsyncThunk(
  "user/updateUserPoints",
  async ({ userId, points }) => {
    const response = await fetch(`${API_URL}/${userId}/updatePoints`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при обновлении очков");
    }

    const data = await response.json();
    return data;
  }
)
//
  export const updateUserPointsQuiz = createAsyncThunk(
    "user/updatePointsQuiz",
    async ({ chatId, correctAnswers, quizId }, thunkAPI) => {
      
      try {
        console.log("Updating user points...");
        console.log("Request data:", { chatId, correctAnswers, quizId });
        const response = await fetch(`${API_URL}/updatepointsquiz/${chatId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, correctAnswers, quizId }),
        });

        if (!response.ok) {
          throw new Error("Ошибка при обновлении очков пользователя");
        }

        const data = await response.json();
         console.log("Points updated successfully:", data.points);
        return data; // Возвращаем обновленные данные
      } catch (error) {
        console.error("Error updating points:", error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
