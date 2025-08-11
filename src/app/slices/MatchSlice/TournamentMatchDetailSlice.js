import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

// Async thunk for file upload

const initialState = {
  matchData: null,
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
    setShowCancelBtn :(state,action)=>{
      state.showCancelBtn = action.payload;
    },
    setSubmitScoreLoading :(state,action)=>{
      state.submitScoreLoading = action.payload;
    },
    setshowMobileChat :(state,action)=>{
      state.showMobileChat = action.payload;
    },
    setmatchTData: (state, action) => {
      
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

} = TournamentMatchDetailSlice.actions;

export default TournamentMatchDetailSlice.reducer;
