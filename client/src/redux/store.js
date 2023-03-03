import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import boardReducer from "./boardRedux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
});
