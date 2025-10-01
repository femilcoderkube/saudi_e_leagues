// teamInvitationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

// Initial state
const initialState = {
  link: "", // current invite link
  loading: false, // loading state for fetch/reset
  error: null, // error message if any
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
};

// Thunk: Fetch invite link
export const fetchInviteLink = createAsyncThunk(
  "teamInvitation/fetchLink",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/TeamInvitationLink", {
        teamId: teamId,
      });
      // assuming API response: { data: { link: "..." } }
      return response.data?.data || "";
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
        teamId: teamId,
      });
      // assuming API response: { data: { link: "..." } }
      return response.data?.data || "";
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to reset invite link"
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
      state.loading = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch link
      .addCase(fetchInviteLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchInviteLink.fulfilled, (state, action) => {
        console.log("action", action);

        state.loading = false;
        state.link = action.payload?.invitationLink;
        state.status = "succeeded";
      })
      .addCase(fetchInviteLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      // Reset link
      .addCase(resetInviteLink.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(resetInviteLink.fulfilled, (state, action) => {
        state.loading = false;
        state.link = action.payload?.invitationLink;
        state.status = "succeeded";
      })
      .addCase(resetInviteLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearInviteLinkState } = teamInvitationSlice.actions;
export default teamInvitationSlice.reducer;
