import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matchData: null,
  chatData : [],
  isTeamOne : false

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
    setChatData: (state, action) => {
      state.chatData = action.payload;
      state.error = null;
    },
    clearmatchDetail: (state) => {
      state.matchData = null;
    
    },
  },
});

export const { setmatchData,clearmatchDetail, setChatData, setIsTeamOne } = matchDetailSlice.actions;

export default matchDetailSlice.reducer; 