import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket/socket";
import { SOCKET } from "../../../utils/constant";
import { act } from "react";
 
const initialState = {
  leagueData: null,
  registrationModal: false,
  isAgreedToJoin: {},
  isJoinedUser: null,
  isQueueUser: null,
};
 
const leagueDetailSlice = createSlice({
  name: "leagueDetail",
  initialState,
  reducers: {
    setIsAgreedToJoin: (state, action) => {
      const { id, value } = action.payload;
      state.isAgreedToJoin[id] = value;
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
      // Fix: Avoid optional chaining on left-hand side and preserve requestedUser if missing
      if (action.payload?.leaderBoard) {
        if (
          !action.payload.leaderBoard.requestedUser &&
          state.leagueData?.leaderBoard?.requestedUser
        ) {
          action.payload.leaderBoard.requestedUser =
            state.leagueData.leaderBoard.requestedUser;
        }
      }
      state.leagueData = action.payload;
 
      if (
        action.payload &&
        action.payload.joinedUsers &&
        action.payload.userId
      ) {
        state.isJoinedUser = action.payload.joinedUsers.some(
          (participant) => participant == action.payload.userId
        );
      }
      if (action.payload && action.payload.inQueue && action.payload.userId) {
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
  removeFromQueue,
} = leagueDetailSlice.actions;
 
export default leagueDetailSlice.reducer;