import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import boardReducer from "./boardRedux";
import favouriteReducer from "./favouriteRedux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    favourites: favouriteReducer,
  },
});
