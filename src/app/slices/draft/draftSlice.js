import { createSlice } from "@reduxjs/toolkit";
import { getServerURL } from "../../../utils/constant";
import { captureOwnerStack } from "react";

const initialState = {
  draftData: null,
  teams: [],
  loading: false,
  error: null,
  otherPlayers: [],
  draftStatus: null,
  currentPick: null,
  picks: [],
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setDraftData: (state, action) => {
      if (action.payload.status) {
        if (state.draftData?.updatedAt !== action.payload.data?.updatedAt) {
          state.draftData = action.payload.data;
          state.teams = action.payload.data.teams || [];

          state.otherPlayers = action.payload.data?.otherPlayers || []

          state.picks = action.payload.data.otherPlayers?.map((pick, idx) => ({
            index: idx,
            username: pick?.userId?.username || "",
            fullName: pick?.userId?.fullName || "",
            id: pick?.userId?._id || "",
            rep: pick?.wilsonScore || 0,
            profilePic: getServerURL(pick?.userId?.profilePicture || ""),
            rank: pick?.rank || "",
            score: Math.round(pick?.totalLeaguesScore || 0),
          })) || [];
        }
      }
    },
    setDraftCaptain: (state, action) => {
      state.captains = action.payload;
    },
    setDraftPlayers: (state, action) => {
      state.players = action.payload;
    },
    setDraftLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDraftError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedPlayers: (state, action) => {
      state.selectedPlayers = action.payload;
    },
    addSelectedPlayer: (state, action) => {
      if (!state.selectedPlayers.includes(action.payload)) {
        state.selectedPlayers.push(action.payload);
      }
    },
    removeSelectedPlayer: (state, action) => {
      state.selectedPlayers = state.selectedPlayers.filter(
        (playerId) => playerId !== action.payload
      );
    },
    setDraftStatus: (state, action) => {
      state.draftStatus = action.payload;
    },
    setCurrentPick: (state, action) => {
      state.currentPick = action.payload;
    },
    setPickOrder: (state, action) => {
      state.pickOrder = action.payload;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    updateTeam: (state, action) => {
      const { teamType, players } = action.payload;
      if (teamType === "teamOne") {
        state.teams.teamOne = players;
      } else if (teamType === "teamTwo") {
        state.teams.teamTwo = players;
      }
    },
    clearDraftData: (state) => {
      state.draftData = null;
      state.captains = null;
      state.players = [];
      state.selectedPlayers = [];
      state.draftStatus = null;
      state.currentPick = null;
      state.pickOrder = [];
      state.teams = {
        teamOne: [],
        teamTwo: [],
      };
      state.error = null;
    },
  },
});

export const {
  setDraftData,
  setDraftCaptain,
  setDraftPlayers,
  setDraftLoading,
  setDraftError,
  setSelectedPlayers,
  addSelectedPlayer,
  removeSelectedPlayer,
  setDraftStatus,
  setCurrentPick,
  setPickOrder,
  setTeams,
  updateTeam,
  clearDraftData,
} = draftSlice.actions;

export default draftSlice.reducer;
