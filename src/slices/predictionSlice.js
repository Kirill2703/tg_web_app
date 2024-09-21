import { createSlice } from "@reduxjs/toolkit";

const predictionSlice = createSlice({
  name: "prediction",
  initialState: {
    predictions: [],
    loading: false,
  },
  reducers: {
    setPredictions: (state, action) => {
      state.predictions = action.payload;
    },
    addPrediction: (state, action) => {
      state.predictions.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPredictions, addPrediction, setLoading } =
  predictionSlice.actions;
export default predictionSlice.reducer;
