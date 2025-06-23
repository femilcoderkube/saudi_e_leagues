import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

// Async thunk for file upload
export const uploadFile = createAsyncThunk(
  'matchDetail/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/admin/fileUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'File upload failed'
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
};

const matchDetailSlice = createSlice({
  name: 'matchDetail',
  initialState,
  reducers: {
    setmatchData: (state, action) => {
      state.matchData = action.payload;
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