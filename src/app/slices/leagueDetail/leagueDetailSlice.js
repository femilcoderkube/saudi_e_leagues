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
      // if (action.payload?.leaderBoard) {
      //   if (
      //     !action.payload.leaderBoard.requestedUser &&
      //     state.leagueData?.leaderBoard?.requestedUser
      //   ) {
      //     action.payload.leaderBoard.requestedUser =
      //       state.leagueData.leaderBoard.requestedUser;
      //   }
      // }
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

      if (
        action.payload &&
        action.payload.isMatchJoind &&
        action.payload?.userId
      ) {
        state.isMatchJoind = action.payload.isMatchJoind.find(
          (participant) =>
            participant.userId?.toString() == action.payload.userId?.toString()
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
  setWeekOfStarUsers,
  setUserInQueue,
  setQueuePlayers,
  resetLeaderBoard,
  setLeaderBoard
} = leagueDetailSlice.actions;

export default leagueDetailSlice.reducer;
