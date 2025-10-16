import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import lobbySlice from "./lobby/lobbySlice";
import socketSlice from "./socket/socketSlice";
import leaguesSlice from "./leagueDetail/leagueDetailSlice";
import gameSlice from "./game/gamesSlice";
import constStateSlice from "./constState/constStateSlice";
import Matchslice from "./MatchSlice/matchDetailSlice";
import notificationSlice from "./notificationSlice/notificationSlice";
import tournamentSlice from "./tournamentSlice/tournamentSlice";
import draftSlice from "./draft/draftSlice";
import TournamentMatchDetailSlice from "./MatchSlice/TournamentMatchDetailSlice";
import TournamentTeamSlice from "./TournamentTeam/TournamentTeamSlice";
import teamInvitationSlice from "./teamInvitationSlice/teamInvitationSlice";
import latestMatchesSlice from "./latestMatches/latestMatchesSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    lobby: lobbySlice,
    socket: socketSlice,
    leagues: leaguesSlice,
    games: gameSlice,
    constState: constStateSlice,
    matchs: Matchslice,
    tournamentMatch: TournamentMatchDetailSlice,
    notification: notificationSlice,
    tournament: tournamentSlice,
    draft: draftSlice,
    tournamentTeam: TournamentTeamSlice,
    teamInvitation: teamInvitationSlice,
    latestMatches: latestMatchesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
