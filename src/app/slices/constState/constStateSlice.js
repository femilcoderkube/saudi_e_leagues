import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { countryData } from "../../../utils/CountryCodes";
import axiosInstance from "../../../utils/axios";

const initialState = {
  isMatchMaking: false,
  isMatchLoader: false,
  isLogin: false,
  isRegisteration: false,
  profileVisible: false,
  submitModal: false,
  viewModal: false,
  showNotification: false,
  isActiveTab: 1,
  isMatctCreated: false,
  timeLineCard: true,
  NotificationTabIndex: 0,
  activeTournamentTab: 1,
  confirmationPopUp: 0,
  queueConfimation: false,
  announcementBanner: false,
  showCalendar: false,
  selectedStartDate: null,
  selectedEndDate: null,
  // New state for player selection confirmation
  selectedPlayerData: null,
  gameMatchLoader: false,
  popupData: null,
  isPopUpShow: false,

  countryOptions: countryData.map((country) => ({
    value: country.name,
    label: country.name,
  })),
  dialCodeOptions: countryData.map((country) => ({
    value: country.dial_code,
    label: `${country.dial_code} (${country.code})`,
  })),

  //PARTY QUEUE
  showPartyQueuePopup: false,
  invitedPlayers: [],
  allPlayers: [],
  partyQueueTeam: null,
};

export const createPartyQueue = createAsyncThunk(
  "const/createPartyQueue",
  async ({ userId, leagueid }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/LeagueTempTeams", {
        userId, leagueid,
      });      
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create Party queue");
    }
  }
);

export const fetchLeagueParticipants = createAsyncThunk(
  "const/fetchLeagueParticipants",
  async ({ leagueId, userId, page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/LeaguesParticipants/party", {
        params: { leagueId, userId, page, limit },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch participants");
    }
  }
);

export const sendInvite = createAsyncThunk(
  "const/sendInvite",
  async ({ userId, name, leagueName, teamId, leagueId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/LeagueTempTeams/sendInvite", {
        userId,
        name,
        leagueName,
        teamId,
        leagueId,
      });
      return response.data;
    } catch (error) {
      console.error("Send invite error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to send invite");
    }
  }
);

export const acceptInvite = createAsyncThunk(
  "const/acceptInvite",
  async ({ userId, leagueId, teamId}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/LeagueTempTeams/acceptInvite", {
        userId,
        leagueId,
        teamId,
      });
      console.log("ACCEPT invite response:", response);
      
      return response.data;
    } catch (error) {
      console.error("Accept invite error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to Accept invite");
    }
  }
);
const constStateSlice = createSlice({
  name: "constState",
  initialState,
  reducers: {
    setAllPlayers: (state, action) => {
      state.allPlayers = action.payload;
    },
    // invitePlayer: (state, action) => {
    //   // prevent duplicates
    //   if (!state.invitedPlayers.find(p => p.id === action.payload.id)) {
    //     state.invitedPlayers.push(action.payload);
    //   }
    // },
    invitePlayer: (state, action) => {
      const player = action.payload;
      if (!state.invitedPlayers.find((p) => p.userId._id === player.userId._id)) {
        state.invitedPlayers.push(player);
        state.allPlayers = state.allPlayers.filter(
          (p) => p.userId._id !== player.userId._id
        );
      }
    },
    // removeInvitedPlayer: (state, action) => {
    //   state.invitedPlayers = state.invitedPlayers.filter(
    //     (p) => p.id !== action.payload
    //   );
    // },
    removeInvitedPlayer: (state, action) => {
      const playerId = action.payload;
      const player = state.invitedPlayers.find((p) => p.userId._id === playerId);
      if (player) {
        state.invitedPlayers = state.invitedPlayers.filter((p) => p.userId._id !== playerId);
        state.allPlayers.push(player);
      }
    },
    setShowPartyQueuePopup: (state, action) => {
      state.showPartyQueuePopup = !state.showPartyQueuePopup;
    },
    setIsPopUpShow: (state, action) => {
      state.isPopUpShow = action.payload;
    },
    setPopupData: (state, action) => {
      state.popupData = action.payload;
    },
    setGameMatchLoader: (state, action) => {
      state.gameMatchLoader = action.payload;
    },
    // New reducer for player selection
    setSelectedPlayerData: (state, action) => {
      state.selectedPlayerData = action.payload;
    },
    setShowCalendar: (state, action) => {
      state.showCalendar = action.payload;
    },
    setSelectedStartDate: (state, action) => {
      state.selectedStartDate = action.payload
        ? action.payload.toISOString()
        : null;
    },
    setSelectedEndDate: (state, action) => {
      state.selectedEndDate = action.payload
        ? action.payload.toISOString()
        : null;
    },
    setDateRange: (state, action) => {
      state.selectedStartDate = action.payload.startDate
        ? action.payload.startDate.toISOString()
        : null;
      state.selectedEndDate = action.payload.endDate
        ? action.payload.endDate.toISOString()
        : null;
    },
    setConfirmationPopUp: (state, action) => {
      state.confirmationPopUp = action.payload;
      // Clear selected player data when closing popup
      if (action.payload === 0) {
        state.selectedPlayerData = null;
      }
    },
    setQueueConfirmation: (state, action) => {
      state.queueConfimation = action.payload;
    },
    setAnnouncementBanner: (state, action) => {
      state.announcementBanner = action.payload;
    },
    setActiveTournamentTab: (state, action) => {
      state.activeTournamentTab = action.payload;
    },
    setNotificationTabIndex: (state, action) => {
      state.NotificationTabIndex = action.payload;
    },
    setTimeLineCard: (state, action) => {
      state.timeLineCard = action.payload;
    },
    setIsMatctCreated: (state, action) => {
      state.isMatctCreated = action.payload;
    },
    setshowNotification: (state, action) => {
      state.showNotification = action.payload;
    },
    setActiveTabIndex: (state, action) => {
      state.isActiveTab = action.payload;
    },
    setPreviewImage: (state, action) => {
      state.viewModal = action.payload;
    },
    setViewModal: (state, action) => {
      state.viewModal = action.payload;
    },
    setSubmitModal: (state, action) => {
      state.submitModal = action.payload;
    },
    setProfileVisible: (state, action) => {
      state.profileVisible = action.payload;
    },
    setMatchPage: (state, action) => {
      // Accepts a boolean to set isMatchMaking
      state.isMatchMaking = !!action.payload;
    },
    setMatchLoader: (state, action) => {
      // Accepts a boolean to set isMatchMaking
      state.isMatchLoader = !!action.payload;
    },
    setLogin: (state, action) => {
      // Accepts a boolean to set isLogin
      state.isLogin = !!action.payload;
    },
    setRegisteration: (state, action) => {
      // Accepts a boolean to set isRegisteration
      state.isRegisteration = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(createPartyQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPartyQueue.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payloadWWWWWW", action.payload);
        
        state.partyQueueTeam = action.payload;
        // toast.success("Party queue created successfully");
      })
      .addCase(createPartyQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("action.payload", action.payload);
        
        // toast.error(action.payload || "Failed to create party queue");
      })
      .addCase(fetchLeagueParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeagueParticipants.fulfilled, (state, action) => {
        state.loading = false;
        // ⚡ Only set allPlayers if not already filled (avoid reset on reopen)
        if (state.allPlayers.length === 0) {
          console.log("action.payload", action.payload);

          state.allPlayers = action.payload.result || [];
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItem;
        }
      })
      .addCase(fetchLeagueParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(sendInvite.pending, (state) => {
        state.loading = true;
        state.error = null;
        // state.inviteStatus = null;
      })
      .addCase(sendInvite.fulfilled, (state, action) => {
        state.loading = false;
        // state.inviteStatus = "success";
        // toast can be called in component
      })
      .addCase(sendInvite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.inviteStatus = "error";
      });

  },
});

export const {
  setPopupData,
  setMatchPage,
  setTimeLineCard,
  setMatchLoader,
  setLogin,
  setShowCalendar,
  setRegisteration,
  setActiveTabIndex,
  setshowNotification,
  setGameMatchLoader,
  setProfileVisible,
  setSubmitModal,
  setViewModal,
  setPreviewImage,
  setIsMatctCreated,
  setNotificationTabIndex,
  setActiveTournamentTab,
  setConfirmationPopUp,
  setSelectedStartDate,
  setSelectedEndDate,
  setDateRange,
  setSelectedPlayerData,
  setQueueConfirmation,
  setAnnouncementBanner,
  setIsPopUpShow,
  setAllPlayers,
  invitePlayer,
  removeInvitedPlayer,
  setShowPartyQueuePopup
} = constStateSlice.actions;

export default constStateSlice.reducer;
