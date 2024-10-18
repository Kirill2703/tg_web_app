import { createSlice } from "@reduxjs/toolkit";
import {
  createUserPrediction,
} from "../thunks/userPredictionThunk";

const initialState = {
  predictions: [],
  loading: false,
  error: null,
};

const userPredictionSlice = createSlice({
  name: "userprediction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(createUserPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.predictions.push(action.payload); 
      })
      .addCase(createUserPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userPredictionSlice.reducer;
