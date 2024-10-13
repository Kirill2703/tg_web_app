import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/api/user"; // URL вашего API

// Асинхронное действие для создания пользователя
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
    return data; // Возвращаем созданного пользователя
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error("Ошибка при получении пользователей:", response.statusText); // Логируем ошибку
      throw new Error("Не удалось загрузить пользователей");
    }

    const data = await response.json();
    console.log("Полученные пользователи:", data); // Логируем полученные данные
    return data; // Возвращаем массив пользователей
  }
);

export const fetchUserNameByChatId = createAsyncThunk(
  "user/fetchUserNameByChatId",
  async (chatId, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/${chatId}`);
    if (!response.ok) {
      console.error("Ошибка при получении имени пользователя: ", response);
      return rejectWithValue("Пользователь не найден");
    }

    const data = await response.json();
    console.log("Полученные данные пользователя: ", data);
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
    return data; // Возвращаем обновленные данные о пользователе
  }
);

