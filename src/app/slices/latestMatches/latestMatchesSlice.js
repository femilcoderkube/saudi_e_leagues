import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  lastMatches: [],
  loading: false,
  error: null,
};

export const fetchLatestMatches = createAsyncThunk(
  "latestMatches/fetchLatestMatches",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/LeagueMatch/latestmatches`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch latest matches"
      );
    }
  }
);

const latestMatchesSlice = createSlice({
  name: "latestMatches",
  initialState,
  reducers: {
    resetLatestMatches: (state) => {
      state.lastMatches = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.lastMatches = Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];
        state.error = null;
      })
      .addCase(fetchLatestMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLatestMatches } = latestMatchesSlice.actions;

export default latestMatchesSlice.reducer;
