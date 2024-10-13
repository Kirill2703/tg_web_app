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
        state.currentUser.points = action.payload; 
      }
    },
  },
  extraReducers: (builder) => {
    // Обработка создания пользователя
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.username = action.payload.username;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Обработка получения имени пользователя
      .addCase(fetchUserNameByChatId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNameByChatId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        console.log("Имя пользователя обновлено: ", action.payload.user);
      })
      .addCase(fetchUserNameByChatId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Сохраняем полученных пользователей
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Экспортируем редюсер
export default userSlice.reducer;
