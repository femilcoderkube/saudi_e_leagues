import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matchData: null,
  chatData : [],
  isTeamOne : false,
  isMyMatch : false,

};

const matchDetailSlice = createSlice({
  name: 'matchDetail',
  initialState,
  reducers: {
    setmatchData: (state, action) => {
      state.matchData = action.payload;
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
});

export const { setmatchData,clearmatchDetail, setIsMyMatch,setChatData, setIsTeamOne } = matchDetailSlice.actions;

export default matchDetailSlice.reducer; 