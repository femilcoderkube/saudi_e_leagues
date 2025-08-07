import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draftData: null,
  captains: [],
  players: [],
  loading: false,
  error: null,
  selectedPlayers: [],
  draftStatus: null,
  currentPick: null,
  pickOrder: [],
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setDraftData: (state, action) => {
      state.draftData = action.payload;
      state.captains = action.payload.data.captains || [];
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
      if (teamType === 'teamOne') {
        state.teams.teamOne = players;
      } else if (teamType === 'teamTwo') {
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
        teamTwo: []
      };
      state.error = null;
    }
  }
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
  clearDraftData
} = draftSlice.actions;

export default draftSlice.reducer;