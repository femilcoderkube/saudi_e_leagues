import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

// Async thunk for file upload

const initialState = {
  matchDataT: null,
  opponent1: null,
  opponent2: null,
  isShowChat: false,
  isSubmitBtnShow: false,
  myTeam: null,
  showMobileChat: false,
  isScoreSubmited: false,
  isEditScoreT: null,
  chatData: [],
  winnerScore: {
    teamOne: "-",
    teamTwo: "-",
  },
};
export const addScore = createAsyncThunk(
  "tournaments/addScore",
  async (payload, { rejectWithValue }) => {
    let data = payload;
    console.log("data", data);
    try {
      const response = await axiosInstance.post(
        `/TournamentMatch/add-score-team`,
        data
        ,
        // {
        //   headers: {
        //     " x-encrypt-response": false,
        //   },
        // }
      );
      return response.data.data;
    } catch (error) {
      console.log("err adding score", error);
      return rejectWithValue(
        error.response?.data?.message || "Error adding score"
      );
    }
  }
);

const TournamentMatchDetailSlice = createSlice({
  name: "TournamentMatchDetailSlice",
  initialState,
  reducers: {
    setShowCancelBtn: (state, action) => {
      state.showCancelBtn = action.payload;
    },
    setSubmitScoreLoading: (state, action) => {
      state.submitScoreLoading = action.payload;
    },
    setshowMobileChatT: (state, action) => {
      state.showMobileChat = action.payload;
    },
    setmatchTData: (state, action) => {
      const { matchData, user } = action.payload || {};

      // Early return if no match data

      console.log("matchdataaa", matchData);

      if (!matchData) return;

      const userId = user?._id?.toString();
      const currentTime = Date.now();
      const startTime = new Date(matchData?.startTime).getTime() || 0;
      const endTime = new Date(matchData?.endTime).getTime() || 0;

      // Helper function to check if user is in team
      const isUserInTeam = (team) => {
        return team?.team?.members?.some(
          (member) => member?.user?.userId?._id?.toString() === userId
        );
      };

      const team1Authors = matchData?.team1Author?.map(String) || [];
      const team2Authors = matchData?.team2Author?.map(String) || [];
      let isSubmitBtnShow = false;
      // Helper function to determine chat visibility
      const shouldShowChat = (matchData, isMyMatch) => {
        if (!isMyMatch) return false;

        return currentTime >= startTime && currentTime <= endTime;
      };

      // Update basic match data
      state.matchDataT = matchData;
      state.opponent1 = matchData.opponent1;
      state.opponent2 = matchData.opponent2;

      // Check if current user is in this match
      const isMyMatch =
        isUserInTeam(matchData.opponent1) ||
        isUserInTeam(matchData.opponent2) ||
        team1Authors.includes(userId) ||
        team2Authors.includes(userId);

      // Reset scores to default
      state.winnerScore.teamOne = "-";
      state.winnerScore.teamTwo = "-";

      // Find active score or determine chat visibility
      const activeScore = matchData?.matchScores?.find(
        (score) => score.isActive == true
      );

      if (activeScore) {
        state.winnerScore.teamOne = activeScore.opponent1Score;
        state.winnerScore.teamTwo = activeScore.opponent2Score;
        state.isShowChat = false; // Don't show chat when there's an active score
        state.isScoreSubmited = true;
      } else {
        state.isShowChat = shouldShowChat(matchData, isMyMatch);
        state.isScoreSubmited = false;
      }

      if (userId) {
        const isInTeam1 = team1Authors.includes(userId);
        const isInTeam2 = team2Authors.includes(userId);
        const isWithinTime = currentTime >= startTime && currentTime <= endTime;

        if (isInTeam1) {
          isSubmitBtnShow = isWithinTime;
          state.isEditScoreT = matchData?.matchScores?.find(
            (score) => score.submittedBy == "opponent1"
          );
        } else if (isInTeam2) {
          isSubmitBtnShow = isWithinTime;
          state.isEditScoreT = matchData?.matchScores?.find(
            (score) => score.submittedBy == "opponent2"
          );
        }

        console.log(" state.isEditScoreT----", state.isEditScoreT);

        state.myTeam = isUserInTeam(matchData.opponent1)
          ? "team1"
          : isUserInTeam(matchData.opponent2)
          ? "team2"
          : null;
      } else {
        isSubmitBtnShow = false;
      }

      state.isSubmitBtnShow = isSubmitBtnShow;
    },
    setIsTeamOne: (state, action) => {
      state.isTeamOne = action.payload;
      state.error = null;
    },
    setIsMyMatch: (state, action) => {
      state.isMyMatch = action.payload;
      state.error = null;
    },
    setChatTData: (state, action) => {
      state.chatData = action.payload;
      state.error = null;
    },
    clearmatchDetail: (state) => {
      state.matchDataT = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addScore.pending, (state) => {
        state.submitScoreLoading = true;
      })
      .addCase(addScore.fulfilled, (state, action) => {
        state.submitScoreLoading = false;
        state.isScoreSubmited = true;
      })
      .addCase(addScore.rejected, (state, action) => {
        state.submitScoreLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setmatchTData, setChatTData, setshowMobileChatT } =
  TournamentMatchDetailSlice.actions;

export default TournamentMatchDetailSlice.reducer;
