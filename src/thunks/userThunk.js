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

// Асинхронное действие для получения имени пользователя по telegramId
export const fetchUserNameByChatId = createAsyncThunk(
  "user/fetchUserNameByChatId",
  async (chatId) => {
    const response = await fetch(`${API_URL}/${chatId}`); // Здесь API_URL должен быть "/api/user"
    if (!response.ok) {
      console.error("Ошибка при получении имени пользователя: ", response);
      throw new Error("Пользователь не найден");
    }

    const data = await response.json();
    console.log("Полученные данные: ", data); // Логируем полученные данные
    return data // Здесь нужно возвращать поле username
  }
);

export const fetchUpdatedUserPoints = createAsyncThunk(
  "user/fetchUpdatedUserPoints",
  async (username) => {
    const response = await fetch(`${API_URL}/${username}`); // Предполагается, что у вас есть такой эндпоинт

    if (!response.ok) {
      throw new Error("Не удалось обновить очки пользователя");
    }

    const data = await response.json();
    return data; // Возвращаем обновленного пользователя
  }
);