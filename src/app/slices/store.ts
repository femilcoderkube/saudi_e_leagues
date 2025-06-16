import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import lobbySlice from "./lobby/lobbySlice";
import socketSlice from "./socket/socketSlice";
import leaguesSlice from "./leagueDetail/leagueDetailSlice";
import gameSlice from "./game/gamesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lobby: lobbySlice,
    socket: socketSlice,
    leagues: leaguesSlice,
    games: gameSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
