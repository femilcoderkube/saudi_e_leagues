import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stageTypes } from "../../../utils/constant";
import axiosInstance from "../../../utils/axios";

const initialState = {
  tournamentData: null,
  tournamentStages: null,
  battleRoyalGroup: null,
  battleRoyalSchedule: null,
  stageSettings: null,
  loader: false,
  loading: false,
  isSoloRegister: false,
  activeStage: -1,
  tourmentTeamData: null,
  currentTeam: null,
  teamData: null,
  currentDate: null, // store timestamp
  nextDayDate: Date.now() + 86400000, // store timestamp
  rosterSelection: {
    managerId: null,
    coachId: null,
    playerIds: [],
  },
  teamUserFormat: {
    manager: [],
    coach: [],
    players: [],
    substitutes: [],
  },
  showTeamRegistrationPopup: false,
  showTeamEditPopup: false,
  showRosterModal: false,
};

export const getTeamAndTournamentDetails = createAsyncThunk(
  "tournament/getTeamAndTournamentDetails",
  async ({ tournamentId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Team/getTeamAndTournament`, {
        params: {
          userId,
          tournamentId,
        },
      });

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to get tournament details"
      );
    }
  }
);

export const fetchTeamUserFormat = createAsyncThunk(
  "tournamentTeam/fetchTeamUserFormat",
  async ({ teamId, game, tournamentId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/team/userFormat`, {
        params: { teamId, game, tournamentId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch team user format"
      );
    }
  }
);

// New async thunk for fetching tournament stages data
export const getTournamentStages = createAsyncThunk(
  "tournament/getTournamentStages",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/TournamentStage/stagesData`, {
        params: { id },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tournament stages"
      );
    }
  }
);

export const registerTournamentParticipant = createAsyncThunk(
  "tournament/registerTournamentParticipant",
  async (participantData, { rejectWithValue }) => {
    try {
      console.log("participantData", participantData);
      const response = await axiosInstance.post(
        `/TournamentParticipants`,
        participantData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to register tournament participant"
      );
    }
  }
);

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    resetTeamData: (state, action) => {
      state.showTeamRegistrationPopup = null;
      state.showTeamEditPopup = null;
      state.showRosterModal = null;
      state.currentTeam = null;
      state.teamData = null;
      state.rosterSelection = null;
      state.teamUserFormat = null;
    },
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
    setManagerSelection: (state, action) => {
      state.rosterSelection.managerId = action.payload ?? null;
    },
    setCoachSelection: (state, action) => {
      state.rosterSelection.coachId = action.payload ?? null;
    },
    togglePlayerSelection: (state, action) => {
      const playerId = action.payload;
      const exists = state.rosterSelection.playerIds.includes(playerId);
      state.rosterSelection.playerIds = exists
        ? state.rosterSelection.playerIds.filter((id) => id !== playerId)
        : [...state.rosterSelection.playerIds, playerId];
    },
    setRosterSelectionBulk: (state, action) => {
      const {
        managerId = null,
        coachId = null,
        playerIds = [],
      } = action.payload || {};
      state.rosterSelection = {
        managerId,
        coachId,
        playerIds: Array.isArray(playerIds) ? playerIds : [],
      };
    },
    resetRosterSelection: (state) => {
      state.rosterSelection = { managerId: null, coachId: null, playerIds: [] };
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
    clearData: (state) => {
      state.tournamentStages = null;
      state.battleRoyalGroup = null;
      state.battleRoyalSchedule = null;
      state.stageSettings = null;
      state.tournamentData = null;
      state.currentDate = null;
      state.nextDayDate = Date.now() + 86400000;
    },
    setActiveStage: (state, action) => {
      state.tournamentStages = null;
      state.battleRoyalGroup = null;
      state.battleRoyalSchedule = null;
      state.stageSettings = null;
      state.loader = true;
      state.activeStage = action.payload;
      if (action.payload === -1) {
        state.loader = false; // Reset loader for Overview tab
      }
      state.currentDate = null;
      state.nextDayDate = Date.now() + 86400000;
    },
    setcurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setnextDayDate: (state, action) => {
      state.nextDayDate = action.payload;
    },
    setTournamentData: (state, action) => {
      state.tournamentData = action.payload;
      state.currentDate = null;
      state.nextDayDate = Date.now() + 86400000;
    },
    setTournamentStages: (state, action) => {
      if (action.payload.stageType == stageTypes.BattleRoyal) {
        state.battleRoyalGroup =
          action.payload.data?.matcheData?.participantList || [];
        state.battleRoyalSchedule =
          action.payload.data?.matcheData?.groupedByDate || {};
        state.stageSettings = action.payload.data?.settings || {};
      } else {
        state.tournamentStages = action.payload.data || {};
      }
      state.loader = false;
    },
    resetDateFilter: (state) => {
      state.currentDate = null;
      state.nextDayDate = Date.now() + 86400000;
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["tournament.currentDate", "tournament.nextDayDate"],
        ignoredActionPaths: ["payload"], // optional
      },
    }),
  extraReducers: (builder) => {
    builder
      .addCase(getTeamAndTournamentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamAndTournamentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.tourmentTeamData = action.payload;
        state.tournamentData = action.payload.data.tournamentData;
        state.teamData = action.payload.data.teamData;
        state.currentTeam = action.payload.data.currentTeam;
        state.isSoloRegister = action.payload.data.isSoloRegister;
      })
      .addCase(getTeamAndTournamentDetails.rejected, (state, action) => {
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
        const hasSelection =
          state.rosterSelection?.managerId !== null ||
          state.rosterSelection?.coachId !== null ||
          (state.rosterSelection?.playerIds &&
            state.rosterSelection?.playerIds?.length > 0);
        if (!hasSelection && state.teamData && state.teamData?.data) {
          const managerId = state.teamData?.data?.Manager?._id || null; // FIX: Use Manager from teamData
          const coachId = state.teamData?.data?.Coach?._id || null;
          const playerIds = Array.isArray(state.teamData?.data?.Players)
            ? state.teamData?.data?.Players?.map((p) => p?._id).filter(Boolean)
            : [];
          state.rosterSelection = {
            managerId,
            coachId,
            playerIds,
          };
        }
      })
      .addCase(fetchTeamUserFormat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // New cases for getTournamentStages
      .addCase(getTournamentStages.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(getTournamentStages.fulfilled, (state, action) => {
        state.loader = false;
        state.error = null;

        const { stageType, data } = action.payload.data;

        if (stageType === stageTypes.BattleRoyal) {
          state.battleRoyalGroup = data?.matcheData?.participantList || [];
          state.battleRoyalSchedule = data?.matcheData?.groupedByDate || {};
          state.stageSettings = data?.settings || {};
        } else {
          state.tournamentStages = data || {};
        }
      })
      .addCase(getTournamentStages.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })
      .addCase(registerTournamentParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTournamentParticipant.fulfilled, (state, action) => {
        state.loading = false;
        state.participantData = action.payload; // Store the participant data
      })
      .addCase(registerTournamentParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setTournamentData,
  setActiveStage,
  clearData,
  setTournamentStages,
  setnextDayDate,
  setcurrentDate,
  setTeamRegistrationPopup,
  setTeamEditPopup,
  setRosterModal,
  setCurrentTeam,
  setManagerSelection,
  setCoachSelection,
  togglePlayerSelection,
  setRosterSelectionBulk,
  resetRosterSelection,
  resetTeamUserFormat,
  resetTeamData,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
