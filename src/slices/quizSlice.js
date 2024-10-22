import { createSlice } from "@reduxjs/toolkit";
import fetchAllQuizes from "../thunks/quizThunk";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuizes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizes = action.payload;
      })
      .addCase(fetchAllQuizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default quizSlice.reducer;
