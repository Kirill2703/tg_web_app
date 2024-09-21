import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    points: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const { setUser, setPoints } = userSlice.actions;
export default userSlice.reducer;
