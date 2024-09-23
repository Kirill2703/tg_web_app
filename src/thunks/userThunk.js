import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/users"; // URL вашего API

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

// Асинхронное действие для получения имени пользователя по telegramId
export const fetchUserNameByChatId = createAsyncThunk(
  "user/fetchUserNameByChatId",
  async (telegramId) => {
    const response = await fetch(`${API_URL}/${chatId}`); // Здесь API_URL должен быть "/api/user"
    if (!response.ok) {
      console.error("Ошибка при получении имени пользователя: ", response);
      throw new Error("Пользователь не найден");
    }

    const data = await response.json();
    console.log("Полученные данные: ", data); // Логируем полученные данные
    return data.username; // Здесь нужно возвращать поле username
  }
);
