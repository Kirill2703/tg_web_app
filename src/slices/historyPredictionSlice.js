import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  loading: false,
  error: null,
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserHistory.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchUserHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.history = action.payload; // Записываем историю
            state.error = null;
          })
          .addCase(fetchUserHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Сохраняем ошибку
          });
    }
})

export default historySlice.reducer