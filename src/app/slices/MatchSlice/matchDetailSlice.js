import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

// Async thunk for file upload
export const uploadFile = createAsyncThunk(
  "matchDetail/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("/admin/fileUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "File upload failed"
      );
    }
  }
);

const initialState = {
  matchData: null,
  chatData: [],
  isTeamOne: false,
  isMyMatch: false,
  fileUploadLoading: false,
  fileUploadError: null,
  fileUploadResult: null,
  isCaptain : false,
  IsSubmited : false,
  isShowChat : false,
  winnerScore : {
    teamOne : "-",
    teamTwo : "-"
  }
};

const matchDetailSlice = createSlice({
  name: "matchDetail",
  initialState,
  reducers: {
    setmatchData: (state, action) => {
      const { match, user } = action.payload || {};
      if (match && user?._id) {
        const userId = user._id;
        const team1 = match.team1 || [];
        const team2 = match.team2 || [];
        const team1ScoreDetails = match.team1ScoreDetails || {};
        const team2ScoreDetails = match.team2ScoreDetails || {};

        // Flatten userIds for quick lookup
        const team1UserIds = team1.map(p => p?.participant?.userId?._id);
        const team2UserIds = team2.map(p => p?.participant?.userId?._id);

        state.matchData = match;
        state.isTeamOne = team1UserIds.includes(userId);
        state.isMyMatch = state.isTeamOne || team2UserIds.includes(userId);

        // Captain is first user in either team
        state.isCaptain =
          team1[0]?.participant?.userId?._id === userId ||
          team2[0]?.participant?.userId?._id === userId;

        // Submission check
        state.IsSubmited =
          team1ScoreDetails.submittedBy == userId ||
          team2ScoreDetails.submittedBy == userId;
          if(state.isCaptain){
            state.isShowChat = true;
          }else if (state.isMyMatch && !(
            (state.isTeamOne && team1ScoreDetails?.submittedBy) ||
            (!state.isTeamOne && team2ScoreDetails?.submittedBy)
          )){
            state.isShowChat = true;
          }else {
            state.isShowChat = false;
          }


          if(state.matchData.winner == "team1"){
            state.winnerScore.teamOne = team1ScoreDetails.yourScore;
            state.winnerScore.teamTwo = team1ScoreDetails.opponentScore;
          }else if(state.matchData.winner == "team2"){
            state.winnerScore.teamOne = team2ScoreDetails.opponentScore;
            state.winnerScore.teamTwo = team2ScoreDetails.yourScore;
          }
      }
      state.error = null;
    },
    setIsTeamOne: (state, action) => {
      state.isTeamOne = action.payload;
      state.error = null;
    },
    setIsMyMatch: (state, action) => {
      state.isMyMatch = action.payload;
      state.error = null;
    },
    setChatData: (state, action) => {
      state.chatData = action.payload;
      state.error = null;
    },
    clearmatchDetail: (state) => {
      state.matchData = null;
    },
    clearFileUploadState: (state) => {
      state.fileUploadLoading = false;
      state.fileUploadError = null;
      state.fileUploadResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.fileUploadLoading = true;
        state.fileUploadError = null;
        state.fileUploadResult = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.fileUploadLoading = false;
        state.fileUploadResult = action.payload;
        state.fileUploadError = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.fileUploadLoading = false;
        state.fileUploadError = action.payload;
        state.fileUploadResult = null;
      });
  },
});

export const {
  setmatchData,
  clearmatchDetail,
  setIsMyMatch,
  setChatData,
  setIsTeamOne,
  clearFileUploadState,
} = matchDetailSlice.actions;

export default matchDetailSlice.reducer;
