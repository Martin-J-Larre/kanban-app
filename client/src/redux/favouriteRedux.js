import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    value: [],
  },
  reducers: {
    setFavouriteList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFavouriteList } = favouriteSlice.actions;
export default favouriteSlice.reducer;
