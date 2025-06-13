import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leagueData: null,
  joinStatus: null,
  error: null,
};

const leagueDetailSlice = createSlice({
  name: 'leagueDetail',
  initialState,
  reducers: {
    setLeagueData: (state, action) => {
      state.leagueData = action.payload;
      state.error = null;
    },
    setJoinStatus: (state, action) => {
      state.joinStatus = action.payload;
    },
    setLeagueError: (state, action) => {
      state.error = action.payload;
    },
    clearLeagueDetail: (state) => {
      state.leagueData = null;
      state.joinStatus = null;
      state.error = null;
    },
  },
});

export const { setLeagueData, setJoinStatus, setLeagueError, clearLeagueDetail } = leagueDetailSlice.actions;

export default leagueDetailSlice.reducer; 