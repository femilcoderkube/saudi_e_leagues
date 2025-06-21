import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matchData: null,

};

const matchDetailSlice = createSlice({
  name: 'matchDetail',
  initialState,
  reducers: {
    setmatchData: (state, action) => {
      state.matchData = action.payload;
      state.error = null;
    },
    clearmatchDetail: (state) => {
      state.matchData = null;
    
    },
  },
});

export const { setmatchData,clearmatchDetail } = matchDetailSlice.actions;

export default matchDetailSlice.reducer; 