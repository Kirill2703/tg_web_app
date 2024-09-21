import { createSlice } from "@reduxjs/toolkit";

const userQuizProgressSlice = createSlice({
  name: "userQuizProgress",
  initialState: {
    progress: [],
    loading: false,
  },
  reducers: {
    setUserQuizProgress: (state, action) => {
      state.progress = action.payload;
    },
    updateUserQuizProgress: (state, action) => {
      const index = state.progress.findIndex(
        (p) => p.quizId === action.payload.quizId
      );
      if (index !== -1) {
        state.progress[index] = action.payload;
      } else {
        state.progress.push(action.payload);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserQuizProgress, updateUserQuizProgress, setLoading } =
  userQuizProgressSlice.actions;
export default userQuizProgressSlice.reducer;
