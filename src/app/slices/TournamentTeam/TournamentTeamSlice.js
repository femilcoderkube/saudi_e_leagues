import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  showTeamRegistrationPopup: false,
  showTeamEditPopup: false,
  showRosterModal: false,
  currentTeam: null,
  loading: false,
  updateloading: false,
  transferTeamloading: false,
  assignTeamloading: false,
  removeTeamloading: false,
  registerTournamentLoading: false,
  error: null,
  teamUserFormat: {
    manager: [],
    coach: [],
    players: [],
    substitutes: [],
  },
};

export const createTournamentTeam = createAsyncThunk(
  "tournamentTeam/createTeam",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Team/asCreator", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create team"
      );
    }
  }
);

// Update Team
export const updateTournamentTeam = createAsyncThunk(
  "tournamentTeam/updateTeam",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Team?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-encrypted": false,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update team"
      );
    }
  }
);

// Get Team by ID
export const fetchTeamById = createAsyncThunk(
  "tournamentTeam/fetchTeamById",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Team/${teamId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team"
      );
    }
  }
);

export const getTeamData = createAsyncThunk(
  "tournamentTeam/getTeamData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Team/user`, {
        params: { userId },
      });

      console.log("RESPONSE", response);
      return response;
    } catch (error) {
      console.error("Error fetching team data:", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch team data",
        status: error.response?.status || 500,
      });
    }
  }
);

export const updateTeamRoster = createAsyncThunk(
  "tournamentTeam/updateTeamRoster",
  async (
    { teamId, tournamentParticipantId, rosterData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/Roaster/updateRoaster`, {
        teamId,
        tournamentParticipantId,
        ...rosterData,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update team roster"
      );
    }
  }
);
export const withdrawTeamRoster = createAsyncThunk(
  "tournamentTeam/withdrawTeamRoster",
  async ({ teamId, tournamentId, participantId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Roaster/updateRoaster`, {
        teamId,
        tournamentId,
        participantId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update team roster"
      );
    }
  }
);

export const fetchTeamUserFormat = createAsyncThunk(
  "tournamentTeam/fetchTeamUserFormat",
  async ({ teamId, game }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/team/userFormat`, {
        params: { teamId, game },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team user format"
      );
    }
  }
);

export const updateTeamMemberGame = createAsyncThunk(
  "tournamentTeam/updateTeamMemberGame",
  async ({ teamId, userId, game, gameId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Team/members/game`, {
        teamId,
        userId,
        game,
        gameId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update team member game"
      );
    }
  }
);

export const transferTeamPresidency = createAsyncThunk(
  "tournamentTeam/transferTeamPresidency",
  async ({ teamId, newPresidentUserId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Team/transferPresidency`, {
        teamId,
        newPresidentUserId,
        userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to transfer team presidency"
      );
    }
  }
);

export const assignTeamRole = createAsyncThunk(
  "tournamentTeam/assignTeamRole",
  async (
    { teamId, userId, candidateId, gameRole, game },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/Team/assignRole`, {
        teamId,
        userId,
        candidateId,
        gameRole,
        game,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign team role"
      );
    }
  }
);
export const removeTeamPlayer = createAsyncThunk(
  "tournamentTeam/removeTeamPlayer",
  async (
    { teamId, userId, targetUserId, gameId, removeFromTeam },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/Team/removePlayer`, {
        teamId,
        userId,
        targetUserId,
        gameId,
        removeFromTeam,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign team role"
      );
    }
  }
);

export const removeTeam = createAsyncThunk(
  "tournamentTeam/removeTeam",
  async ({ teamId, user }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/Team/asCreator?id=${teamId}`,
        {
          user,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove team"
      );
    }
  }
);

// New thunk for Roaster/RegisterTour
export const registerTournament = createAsyncThunk(
  "tournamentTeam/registerTournament",
  async ({ tournamentId, teamId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/Roaster/RegisterTour`, {
        tournamentId,
        teamId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to register team for tournament"
      );
    }
  }
);

const TournamentTeamSlice = createSlice({
  name: "tournamentTeam",
  initialState,
  reducers: {
    setTeamRegistrationPopup: (state, action) => {
      state.showTeamRegistrationPopup = !state.showTeamRegistrationPopup;
    },
    setTeamEditPopup: (state, action) => {
      state.showTeamEditPopup = action.payload;
    },
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload;
    },
    setRosterModal: (state, action) => {
      state.showRosterModal = action.payload ?? !state.showRosterModal;
    },
    resetTeamUserFormat: (state) => {
      state.teamUserFormat = {
        manager: [],
        coach: [],
        players: [],
        substitutes: [],
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTournamentTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTournamentTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTeam = action.payload.data;
        state.showTeamRegistrationPopup = false;
      })
      .addCase(createTournamentTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeamData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamData.fulfilled, (state, action) => {
        state.loading = false;

        state.currentTeam = action.payload.data.data;
      })
      .addCase(getTeamData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeamRoster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamRoster.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTeamRoster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(withdrawTeamRoster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawTeamRoster.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(withdrawTeamRoster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTeamUserFormat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamUserFormat.fulfilled, (state, action) => {
        state.loading = false;
        state.teamUserFormat = action.payload;
      })
      .addCase(fetchTeamUserFormat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeamMemberGame.pending, (state) => {
        state.updateloading = true;
        state.error = null;
      })
      .addCase(updateTeamMemberGame.fulfilled, (state, action) => {
        state.updateloading = false;
        state.showRosterModal = false;
      })
      .addCase(updateTeamMemberGame.rejected, (state, action) => {
        state.updateloading = false;
        state.error = action.payload;
      })
      .addCase(transferTeamPresidency.pending, (state) => {
        state.transferTeamloading = true;
        state.error = null;
      })
      .addCase(transferTeamPresidency.fulfilled, (state, action) => {
        state.transferTeamloading = false;
        state.error = null;
      })
      .addCase(transferTeamPresidency.rejected, (state, action) => {
        state.transferTeamloading = false;
        state.error = action.payload;
      })
      .addCase(assignTeamRole.pending, (state) => {
        state.assignTeamloading = true;
        state.error = null;
      })
      .addCase(assignTeamRole.fulfilled, (state, action) => {
        state.assignTeamloading = false;
      })
      .addCase(assignTeamRole.rejected, (state, action) => {
        state.assignTeamloading = false;
        state.error = action.payload;
      })
      .addCase(removeTeamPlayer.pending, (state) => {
        state.assignTeamloading = true;
        state.error = null;
      })
      .addCase(removeTeamPlayer.fulfilled, (state, action) => {
        state.assignTeamloading = false;
      })
      .addCase(removeTeamPlayer.rejected, (state, action) => {
        state.assignTeamloading = false;
        state.error = action.payload;
      })
      .addCase(removeTeam.pending, (state) => {
        state.removeTeamloading = true;
        state.error = null;
      })
      .addCase(removeTeam.fulfilled, (state, action) => {
        state.removeTeamloading = false;
        state.error = null;
      })
      .addCase(removeTeam.rejected, (state, action) => {
        state.removeTeamloading = false;
        state.error = action.payload;
      })
      .addCase(registerTournament.pending, (state) => {
        state.registerTournamentLoading = true;
        state.error = null;
      })
      .addCase(registerTournament.fulfilled, (state, action) => {
        state.registerTournamentLoading = false;
        state.error = null;
      })
      .addCase(registerTournament.rejected, (state, action) => {
        state.registerTournamentLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setTeamRegistrationPopup,
  setTeamEditPopup,
  setRosterModal,
  setCurrentTeam,
  resetTeamUserFormat,
} = TournamentTeamSlice.actions;

export default TournamentTeamSlice.reducer;
