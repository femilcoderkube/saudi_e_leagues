// teamInvitationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  link: "", // current invite link
  team: null, // team data fetched via Iid
  games: [], // available games for dropdown
  loading: false,
  error: null,
  status: "idle",
};

// Thunk: Fetch invite link by teamId
export const fetchInviteLink = createAsyncThunk(
  "teamInvitation/fetchLink",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/TeamInvitationLink", {
        teamId,
      });
      return response.data?.data || {};
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch invite link"
      );
    }
  }
);

// Thunk: Reset invite link
export const resetInviteLink = createAsyncThunk(
  "teamInvitation/resetLink",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/TeamInvitationLink/reset", {
        teamId,
      });
      return response.data || {};
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reset invite link"
      );
    }
  }
);

// ✅ Thunk: Get team by Iid
export const fetchTeamByIid = createAsyncThunk(
  "teamInvitation/fetchTeamByIid",
  async (Iid, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/TeamInvitationLink/teamByIid/${Iid}`
      );
      return response.data?.data || null;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch team by Iid"
      );
    }
  }
);

// ✅ Thunk: Get all games
export const fetchGames = createAsyncThunk(
  "teamInvitation/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/Game/user");
      // API response assumed: { data: [ { id, name }, ... ] }
      return response.data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch games"
      );
    }
  }
);

// ✅ Thunk: Assign game to team member
export const assignGameToMember = createAsyncThunk(
  "teamInvitation/assignGameToMember",
  async ({ teamId, userId, game, gameId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/Team/members/game", {
        teamId,
        userId,
        game,
        gameId,
      });
      // API response assumed: { data: { updatedTeam } }

      return response.data || {};
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to assign game"
      );
    }
  }
);

const teamInvitationSlice = createSlice({
  name: "teamInvitation",
  initialState,
  reducers: {
    clearInviteLinkState: (state) => {
      state.link = "";
      state.team = null;
      state.games = [];
      state.loading = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch link
      .addCase(fetchInviteLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchInviteLink.fulfilled, (state, action) => {
        state.loading = false;
        state.link = action.payload?.invitationLink || "";
        state.status = "succeeded";
      })
      .addCase(fetchInviteLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // reset link
      .addCase(resetInviteLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(resetInviteLink.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
        state.link = action.payload?.data?.invitationLink || "";
        state.status = "succeeded";
      })
      .addCase(resetInviteLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // fetch team by Iid
      .addCase(fetchTeamByIid.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchTeamByIid.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTeamByIid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // fetch games
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })

      // assign game
      .addCase(assignGameToMember.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(assignGameToMember.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action?.payload?.message);
        // update team with new game assignment if backend returns updated team
        state.team = action.payload?.data.updatedTeam || state.team;
        state.status = "succeeded";
      })
      .addCase(assignGameToMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearInviteLinkState } = teamInvitationSlice.actions;
export default teamInvitationSlice.reducer;
