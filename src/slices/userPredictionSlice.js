import { createSlice } from "@reduxjs/toolkit";

const userPredictionSlice = createSlice({
  name: "userPrediction",
  initialState: {
    predictions: [],
    loading: false,
  },
  reducers: {
    setUserPredictions: (state, action) => {
      state.predictions = action.payload;
    },
    addUserPrediction: (state, action) => {
      state.predictions.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserPredictions, addUserPrediction, setLoading } =
  userPredictionSlice.actions;
export default userPredictionSlice.reducer;
