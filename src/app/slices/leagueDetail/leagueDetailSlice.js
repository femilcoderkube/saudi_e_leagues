import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leagueData: null,
  registrationModal : false ,
  isAgreedToJoin: false,
};

const leagueDetailSlice = createSlice({
  name: 'leagueDetail',
  initialState,
  reducers: {
    setIsAgreedToJoin :  (state, action) => {
      state.isAgreedToJoin = action.payload;
    },
    setRegistrationModal : (state, action) => {
      state.registrationModal = action.payload;
    },
    setLeagueData: (state, action) => {
      state.leagueData = action.payload;
    },
    
  },
});

export const { setLeagueData ,setRegistrationModal ,setIsAgreedToJoin } = leagueDetailSlice.actions;

export default leagueDetailSlice.reducer; 