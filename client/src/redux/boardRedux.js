import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "user",
  initialState: {
    value: [],
  },
  reducers: {
    setBoards: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBoards } = boardSlice.actions;
export default boardSlice.reducer;
