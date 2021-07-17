import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "../features/games";
import RouterReducer from "../features/router";
import UserReducer from "../features/user";

export const store = configureStore({
  reducer: {
    router: RouterReducer,
    games: GameReducer,
    user: UserReducer,
  },
});
