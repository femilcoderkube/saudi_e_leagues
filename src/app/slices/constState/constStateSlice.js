import { createSlice } from "@reduxjs/toolkit";
import { countryData } from "../../../utils/CountryCodes";

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
  showCalendar: false,
  selectedStartDate: null,
  selectedEndDate: null,
  // New state for player selection confirmation
  selectedPlayerData: null,

  countryOptions: countryData.map((country) => ({
    value: country.name,
    label: country.name,
  })),
  dialCodeOptions: countryData.map((country) => ({
    value: country.dial_code,
    label: `${country.dial_code} (${country.code})`,
  }))
};

const constStateSlice = createSlice({
  name: "constState",
  initialState,
  reducers: {
    // New reducer for player selection
    setSelectedPlayerData: (state, action) => {
      state.selectedPlayerData = action.payload;
    },
    setShowCalendar: (state, action) => {
      state.showCalendar = action.payload;
    },
    setSelectedStartDate: (state, action) => {
      state.selectedStartDate = action.payload ? action.payload.toISOString() : null;
    },
    setSelectedEndDate: (state, action) => {
      state.selectedEndDate = action.payload ? action.payload.toISOString() : null;
    },
    setDateRange: (state, action) => {
      state.selectedStartDate = action.payload.startDate ? action.payload.startDate.toISOString() : null;
      state.selectedEndDate = action.payload.endDate ? action.payload.endDate.toISOString() : null;
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
    }
  },
});

export const { setMatchPage, setTimeLineCard, setMatchLoader, setLogin, setShowCalendar, setRegisteration, setActiveTabIndex, setshowNotification, setProfileVisible, setSubmitModal, setViewModal, setPreviewImage, setIsMatctCreated, setNotificationTabIndex, setActiveTournamentTab, setConfirmationPopUp, setSelectedStartDate, setSelectedEndDate, setDateRange, setSelectedPlayerData, setQueueConfirmation } = constStateSlice.actions;

export default constStateSlice.reducer;
