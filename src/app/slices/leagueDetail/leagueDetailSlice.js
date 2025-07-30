import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket/socket";
import { SOCKET } from "../../../utils/constant";
import { act } from "react";
 
const initialState = {
  leagueData: null,
  registrationModal: false,
  verificationModal: false,
  isAgreedToJoin: {},
  isJoinedUser: null,
  isQueueUser: null,
  isMatchJoind : null,
  starOfTheWeek : []
};
 
const leagueDetailSlice = createSlice({
  name: "leagueDetail",
  initialState,
  reducers: {
    setWeekOfStarUsers: (state, action) => {
      state.starOfTheWeek = action.payload;
    },
    setIsAgreedToJoin: (state, action) => {
      const { id, value } = action.payload;
      state.isAgreedToJoin[id] = value;
    },
    setRegistrationModal: (state, action) => {
      state.registrationModal = action.payload;
    },
    setVerificationModal: (state, action) => {
      state.verificationModal = action.payload;
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
      state.isMatchJoind = null;
      state.isQueueUser = null;
      state.isJoinedUser = null;
      if (
        action.payload &&
        action.payload.joinedUsers &&
        action.payload?.userId
      ) {
        state.isJoinedUser = action.payload.joinedUsers.some(
          (participant) => participant == action.payload.userId
        );
      }
 
      if (action.payload && action.payload.inQueue && action.payload?.userId) {

        state.isQueueUser = action.payload.inQueue.some(
          (participant) => participant == action.payload.userId
        );
      }
   
      if (action.payload && action.payload.isMatchJoind && action.payload?.userId) {
        state.isMatchJoind = action.payload.isMatchJoind.find(
          (participant) => participant.userId?.toString() == action.payload.userId?.toString()
        );
      }

    },
  },
});
 
export const {
  setLeagueData,
  setRegistrationModal,
  setVerificationModal,
  setIsAgreedToJoin,
  removeFromQueue,
  setWeekOfStarUsers
} = leagueDetailSlice.actions;
 
export default leagueDetailSlice.reducer;