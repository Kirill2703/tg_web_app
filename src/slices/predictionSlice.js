import { createSlice } from "@reduxjs/toolkit";
import fetchAllPredictions from "../thunks/predictionThunk";

const initialState = {
  predictions: [],
  loading: false,
  error: null,
};

const predictionsSlice = createSlice({
  name: "predictions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPredictions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPredictions.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions = action.payload;
      })
      .addCase(fetchAllPredictions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default predictionsSlice.reducer;
