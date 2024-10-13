import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  fetchUserNameByChatId,
  fetchAllUsers,
} from "../thunks/userThunk";

// Создание среза
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    username: "",
    user: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateUserPoints: (state, action) => {
      if (state.currentUser) {
        console.log("Обновляем очки пользователя:", action.payload);
        state.currentUser.points = action.payload;
      } else {
        console.warn(
          "Не удалось обновить очки: текущий пользователь не найден"
        );
      }
    },
  },
  extraReducers: (builder) => {
    // Обработка создания пользователя
    builder
      .addCase(createUser.pending, (state) => {
        console.log("Создание пользователя: загрузка...");
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log("Создан пользователь:", action.payload);
        state.loading = false;
        state.currentUser = action.payload;
        state.username = action.payload.username;
      })
      .addCase(createUser.rejected, (state, action) => {
        console.error(
          "Ошибка при создании пользователя:",
          action.error.message
        );
        state.loading = false;
        state.error = action.error.message;
      })
      // Обработка получения имени пользователя
      .addCase(fetchUserNameByChatId.pending, (state) => {
        console.log("Запрос имени пользователя: загрузка...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNameByChatId.fulfilled, (state, action) => {
        console.log("Имя пользователя обновлено:", action.payload.user);
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(fetchUserNameByChatId.rejected, (state, action) => {
        console.error(
          "Ошибка при получении имени пользователя:",
          action.error.message
        );
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        console.log("Загрузка всех пользователей: загрузка...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log("Полученные пользователи:", action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        console.error(
          "Ошибка при получении пользователей:",
          action.error.message
        );
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Экспортируем редюсер
export const { updateUserPoints } = userSlice.actions;
export default userSlice.reducer;
