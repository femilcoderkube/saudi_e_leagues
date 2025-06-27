import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket/socket";
import { SOCKET } from "../../../utils/constant";
import { act } from "react";

const initialState = {
  leagueData: null,
  registrationModal: false,
  isAgreedToJoin: false,
  isJoinedUser : null,
  isQueueUser : null ,
};

const leagueDetailSlice = createSlice({
  name: "leagueDetail",
  initialState,
  reducers: {
    setIsAgreedToJoin: (state, action) => {
      state.isAgreedToJoin = action.payload;
    },
    setRegistrationModal: (state, action) => {
      state.registrationModal = action.payload;
    },
    removeFromQueue: (state, action) => {
      if (state.leagueData && state.leagueData.inQueue) {
        state.leagueData.inQueue = state.leagueData.inQueue.filter(
          (participant) => participant !== action.payload
        );
      }
      state.isQueueUser = false;
    },
    setLeagueData: (state, action) => {
      state.leagueData = action.payload;
      if(action.payload && action.payload.joinedUsers && action.payload.userId) {
        state.isJoinedUser = action.payload.joinedUsers.some(
          (participant) => participant == action.payload.userId
        );
      }
      if(action.payload && action.payload.inQueue && action.payload.userId) {
        state.isQueueUser = action.payload.inQueue.some(
          (participant) => participant == action.payload.userId
        );
      }
    },
  },
});

export const {
  setLeagueData,
  setRegistrationModal,
  setIsAgreedToJoin,
  removeFromQueue
} = leagueDetailSlice.actions;

export default leagueDetailSlice.reducer;
