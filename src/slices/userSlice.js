import { createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUserNameByTelegramId } from "../thunks/userThunk"; // Импортируем thunks

// Создание среза
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    name: "",
    loading: false,
    error: null,
  },
  reducers: {},
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
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Обработка получения имени пользователя
      .addCase(fetchUserNameByTelegramId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNameByTelegramId.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload;
      })
      .addCase(fetchUserNameByTelegramId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Экспортируем редюсер
export default userSlice.reducer;
