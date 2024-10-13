import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  fetchUserNameByChatId,
  fetchAllUsers,
} from "../thunks/userThunk";

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
        state.user = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateUserPoints } = userSlice.actions;
export default userSlice.reducer;
