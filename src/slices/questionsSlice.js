import { createSlice } from "@reduxjs/toolkit";
import fetchAllQuestionsByQuizId from "../thunks/questionsThunk";


const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestionsByQuizId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuestionsByQuizId.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchAllQuestionsByQuizId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default questionSlice.reducer;
