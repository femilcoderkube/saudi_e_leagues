import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

// Async thunk for file upload

const initialState = {
  matchData: null,
  opponent1: null,
  opponent2: null,
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
    setshowMobileChat: (state, action) => {
      state.showMobileChat = action.payload;
    },
    setmatchTData: (state, action) => {
      if(action.payload.status) {
        state.matchData = action.payload.data;
        state.opponent1 = action.payload.data.opponent1;
        state.opponent2 = action.payload.data.opponent2;
      }
      state.error = null;
    },
    setIsTeamOne: (state, action) => {
      state.isTeamOne = action.payload;
      state.error = null;
    },
    setIsMyMatch: (state, action) => {
      state.isMyMatch = action.payload;
      state.error = null;
    },
    setChatData: (state, action) => {
      state.chatData = action.payload;
      state.error = null;
    },
    clearmatchDetail: (state) => {
      state.matchData = null;
    },
  },
  extraReducers: (builder) => {

  },
});

export const {
  setmatchTData
} = TournamentMatchDetailSlice.actions;

export default TournamentMatchDetailSlice.reducer;
