import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/game/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch games"
      );
    }
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    resetGamesState: (state) => {
      state.games = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.data || [];
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGamesState } = gamesSlice.actions;

export default gamesSlice.reducer;
