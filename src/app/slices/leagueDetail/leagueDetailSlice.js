import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leagueData: null,
  registrationModal: false,
  verificationModal: false,
  verificationModule: null, // <-- Add this line
  isAgreedToJoin: {},
  isJoinedUser: null,
  isQueueUser: null,
  isMatchJoind: null,
  starOfTheWeek: [],
  userInQueue: false,
  queuePlayers: 1,
  leaderBoard:null
};

const leagueDetailSlice = createSlice({
  name: "leagueDetail",
  initialState,
  reducers: {
    resetLeaderBoard: (state, action) => {
      state.leaderBoard = null;
    },
    setUserInQueue: (state, action) => {
      state.userInQueue = action.payload;
    },
    setQueuePlayers: (state, action) => {
      state.queuePlayers = action.payload;
    },
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
      // Accepts { open: boolean, module: string }
      if (typeof action.payload === "object" && action.payload !== null) {
        state.verificationModal = action.payload.open;
        state.verificationModule = action.payload.module;
      } else {
        state.verificationModal = action.payload;
        if (!action.payload) state.verificationModule = null;
      }
    },
    removeFromQueue: (state, action) => {
      if (state.leagueData && state.leagueData.inQueue) {
        state.leagueData.inQueue = state.leagueData.inQueue.filter(
          (participant) => participant !== action.payload
        );
      }
      state.isQueueUser = false;
    },
    setLeaderBoard: (state, action) => {
      if (action.payload) {
        if (
          !action.payload.requestedUser &&
          state.leaderBoard?.requestedUser
        ) {
          action.payload.requestedUser =
            state.leaderBoard.requestedUser;
        }
      }
      state.leaderBoard = action.payload;
    },
    setLeagueData: (state, action) => {      
      state.leagueData = action.payload;
    },
    setQueueData: (state, action) => {
      state.isMatchJoind = null;
      state.isQueueUser = null;
      state.isJoinedUser = null;
      if (
        action.payload &&
        action.payload.joinedUsers &&
        state.leagueData.userId
      ) {
        state.isJoinedUser = action.payload.joinedUsers.some(
          (participant) => participant == state.leagueData.userId
        );
      }

      if (action.payload && action.payload.inQueue && state.leagueData?.userId) {
        state.isQueueUser = action.payload.inQueue.some(
          (participant) => participant == state.leagueData.userId
        );
      }

      if (
        action.payload &&
        action.payload.isMatchJoind &&
        state.leagueData?.userId
      ) {
        state.isMatchJoind = action.payload.isMatchJoind.find(
          (participant) =>
            participant.userId?.toString() == state.leagueData.userId?.toString()
        );
      }
    },
  },
});

export const {
  setLeagueData,
  setQueueData,
  setRegistrationModal,
  setVerificationModal,
  setIsAgreedToJoin,
  removeFromQueue,
  setWeekOfStarUsers,
  setUserInQueue,
  setQueuePlayers,
  resetLeaderBoard,
  setLeaderBoard
} = leagueDetailSlice.actions;

export default leagueDetailSlice.reducer;
