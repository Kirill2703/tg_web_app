import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/users"; // URL вашего API

// Асинхронное действие для создания пользователя
export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ name, telegramId }) => {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, telegramId }),
    });

    if (!response.ok) {
      throw new Error("Не удалось создать пользователя");
    }

    const data = await response.json();
    return data; // Возвращаем созданного пользователя
  }
);

// Асинхронное действие для получения имени пользователя по telegramId
export const fetchUserNameByTelegramId = createAsyncThunk(
  "user/fetchUserNameByTelegramId",
  async (telegramId) => {
    const response = await fetch(`${API_URL}/${telegramId}`);
    if (!response.ok) {
      throw new Error("Пользователь не найден");
    }

    const data = await response.json();
    return data.name; // Возвращаем имя пользователя
  }
);
