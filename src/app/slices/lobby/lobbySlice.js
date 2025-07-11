import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  games: [],
  leagues: [],
  loading: false,
  error: null,
  currentPage: 1,
  perPage: 10,
  totalPages: 0,
  searchTerm: "",
  activeIndex: 0,
  tabs: ["ongoing", "finished", "all"],
  isListView: true,
  selectedGame: {},
  isGameDropDownOpen: false,
  gameSearchTerm: "",
  filteredGames: [],
};

export const fetchGames = createAsyncThunk(
  "lobby/fetchGames",
  async ({ searchTerm }, { rejectWithValue }) => {
    try {
      console.log("Called");
      let params = {};
      if (searchTerm) {
        params.searchKey = searchTerm;
      }
      const response = await axiosInstance.get("/game/user", {
        params: params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching partners"
      );
    }
  }
);
export const fetchLeagues = createAsyncThunk(
  "lobby/fetchLeagues",
  async ({ partnerId, filter, GameId }, { rejectWithValue }) => {
    try {
      let params = {
        partnerId: partnerId,
      };
      if (GameId) {
        params.GameId = GameId;
      }
      if (filter || filter != "All") {
        params.filter = filter;
      }
      console.log("tabs----", params);
      const response = await axiosInstance.get("/leagues/user", {
        params: params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching partners"
      );
    }
  }
);

const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    setGameSearchTerm: (state, action) => {
      state.gameSearchTerm = action.payload;
      state.filteredGames = state.games.filter((game) =>
        game.name.toLowerCase().includes(state.gameSearchTerm.toLowerCase())
      );
    },
    setGameDropDownOpen: (state, action) => {
      state.isGameDropDownOpen = action.payload;
    },
    setSelectedGame: (state, action) => {
      state.selectedGame = action.payload;
      state.isGameDropDownOpen = false;
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    setIsListView: (state, action) => {
      state.isListView = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.data;
        state.filteredGames = action.payload.data;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLeagues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        state.loading = false;
        state.leagues = action.payload.data?.result;
        state.totalPages = action.payload.data?.totalPages;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setPerPage,
  setPage,
  setActiveIndex,
  setIsListView,
  setSelectedGame,
  setGameDropDownOpen,
  setGameSearchTerm,
} = lobbySlice.actions;

export default lobbySlice.reducer;
