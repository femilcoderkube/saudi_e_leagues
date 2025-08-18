import { createSlice } from "@reduxjs/toolkit";
import { calculateSnakeDraftPosition, getServerURL } from "../../../utils/constant";

const initialState = {
  draftData: null,
  teams: [],
  loading: false,
  error: null,
  otherPlayers: [],
  draftStatus: null,
  currentPick: null,
  picks: [],
  isUserCaptain : false,
  isCurrentTurn : false,
  userTeamIndex : -1

};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    clearData : (state, action) => {
      state.draftData = null;
      state.draftStatus = null;
      state.currentPick = null;
      state.isUserCaptain =false;
      state.isCurrentTurn =false;
      state.userTeamIndex = -1;
      state.teams = [];
      state.picks = [];
      state.otherPlayers =[];
    },
    setDraftData: (state, action) => {
      
      const { status, data , user } = action.payload;
      console.log("user--",user)
      
      if (!status || !data) return;
      
      // Early return if data hasn't changed and currentInterval is not 0
      if (state.draftData?.updatedAt === data.updatedAt && 
          state.draftData?.currentInterval !== 0) {
        return;
      }
      
      // Update core data
      state.draftData = data;
      state.teams = data.teams || [];
      state.otherPlayers = data.otherPlayers || [];
      
      // Transform picks data
      state.picks = state.otherPlayers.map((pick, idx) => ({
        index: idx,
        username: pick?.userId?.username || "",
        fullName: pick?.userId?.fullName || "",
        id: pick?.userId?._id || "",
        rep: pick?.wilsonScore || 0,
        profilePic: getServerURL(pick?.userId?.profilePicture || ""),
        rank: pick?.rank || "",
        score: Math.round(pick?.totalLeaguesScore || 0),
      }));
      
      // Calculate user team status
      state.userTeamIndex = state.teams.findIndex(team => 
        team?.captains?.userId?._id === user?._id
      );
      state.isUserCaptain = state.userTeamIndex !== -1;
      state.isCurrentTurn = false; // Default value
      
      // Calculate current turn if user is captain and interval is valid
      if (state.isUserCaptain && 
          data.currentInterval !== undefined && 
          data.currentInterval !== -1) {
        
        const totalTeams = data.totalTeams || state.teams.length;
        const currentInterval = data.currentInterval + 1;
        
        // Generate snake draft order for current interval
        const currentTeamIndex = calculateSnakeDraftPosition(currentInterval, totalTeams);
        state.isCurrentTurn = currentTeamIndex === state.userTeamIndex;
      }
    },
    
    // Helper function to calculate snake draft position

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
  clearData,
} = draftSlice.actions;

export default draftSlice.reducer;
