import { createSlice } from "@reduxjs/toolkit";
import { fetchUserHistory } from "../thunks/historyPredictionThunk";

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
            state.history = action.payload; 
            state.error = null;
          })
          .addCase(fetchUserHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; 
          });
    }
})

export default historySlice.reducer