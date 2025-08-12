import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

// Async thunk for file upload

const initialState = {
  matchDataT: null,
  opponent1: null,
  opponent2: null,
  isShowChat: false,
  showMobileChat : false,
  chatData: [],
  winnerScore: {
    teamOne: "-",
    teamTwo: "-",
  },
};

const TournamentMatchDetailSlice = createSlice({
  name: "TournamentMatchDetailSlice",
  initialState,
  reducers: {
    setShowCancelBtn: (state, action) => {
      state.showCancelBtn = action.payload;
    },
    setSubmitScoreLoading: (state, action) => {
      state.submitScoreLoading = action.payload;
    },
    setshowMobileChatT: (state, action) => {
      state.showMobileChat = action.payload;
    },
    setmatchTData: (state, action) => {
      const { matchData, user } = action.payload || {};
      
      // Early return if no match data
      if (!matchData) return;
    
      // Helper function to check if user is in team
      const isUserInTeam = (team) => {
        return team?.team?.members?.some(member => 
          member?.user?.userId?._id?.toString() === user?._id?.toString()
        );
      };
    
      // Helper function to determine chat visibility
      const shouldShowChat = (matchData, isMyMatch) => {
        if (!isMyMatch) return false;
        
        const currentTime = Date.now();
        const startTime = new Date(matchData?.startTime).getTime() || 0;
        const endTime = new Date(matchData?.endTime).getTime() || 0;
        
        return currentTime >= startTime && currentTime <= endTime;
      };
    
      // Update basic match data
      state.matchDataT = matchData;
      state.opponent1 = matchData.opponent1;
      state.opponent2 = matchData.opponent2;
    
      // Check if current user is in this match
      const isMyMatch = isUserInTeam(matchData.opponent1) || isUserInTeam(matchData.opponent2);
    
      // Reset scores to default
      state.winnerScore.teamOne = "-";
      state.winnerScore.teamTwo = "-";
    
      // Find active score or determine chat visibility
      const activeScore = matchData?.matchScores?.find(score => score.isActive);
      
      if (activeScore) {
        state.winnerScore.teamOne = activeScore.opponent1Score;
        state.winnerScore.teamTwo = activeScore.opponent2Score;
        state.isShowChat = false; // Don't show chat when there's an active score
      } else {
        state.isShowChat = shouldShowChat(matchData, isMyMatch);
      }
    },
    setIsTeamOne: (state, action) => {
      state.isTeamOne = action.payload;
      state.error = null;
    },
    setIsMyMatch: (state, action) => {
      state.isMyMatch = action.payload;
      state.error = null;
    },
    setChatTData: (state, action) => {
      state.chatData = action.payload;
      state.error = null;
    },
    clearmatchDetail: (state) => {
      state.matchDataT  = null;
    },
  },
  extraReducers: (builder) => {

  },
});

export const {
  setmatchTData,
  setChatTData,
  setshowMobileChatT
} = TournamentMatchDetailSlice.actions;

export default TournamentMatchDetailSlice.reducer;
