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
  invitedPlayers: [], // list of invited players
   allPlayers: [
    { id: 1, firstName: "Lionel", lastName: "Messi", username: "messi", avatar: "#" },
    { id: 2, firstName: "Cristiano", lastName: "Ronaldo", username: "ronaldo", avatar: "#" },
    { id: 3, firstName: "Neymar", lastName: "Jr", username: "neymar", avatar: "#" },
    { id: 4, firstName: "Kylian", lastName: "Mbappe", username: "mbappe", avatar: "#" },
    { id: 5, firstName: "Kevin", lastName: "De Bruyne", username: "kdb", avatar: "#" },
    { id: 6, firstName: "Luka", lastName: "Modric", username: "modric", avatar: "#" },
    { id: 7, firstName: "Robert", lastName: "Lewandowski", username: "lewa", avatar: "#" },
    { id: 8, firstName: "Harry", lastName: "Kane", username: "kane", avatar: "#" },
    { id: 9, firstName: "Karim", lastName: "Benzema", username: "benzema", avatar: "#" },
    { id: 10, firstName: "Mohamed", lastName: "Salah", username: "salah", avatar: "#" },
    { id: 11, firstName: "Sadio", lastName: "Mane", username: "mane", avatar: "#" },
    { id: 12, firstName: "Virgil", lastName: "van Dijk", username: "vandijk", avatar: "#" },
    { id: 13, firstName: "Erling", lastName: "Haaland", username: "haaland", avatar: "#" },
    { id: 14, firstName: "Sergio", lastName: "Ramos", username: "ramos", avatar: "#" },
    { id: 15, firstName: "Paul", lastName: "Pogba", username: "pogba", avatar: "#" },
    { id: 16, firstName: "Eden", lastName: "Hazard", username: "hazard", avatar: "#" },
    { id: 17, firstName: "Antoine", lastName: "Griezmann", username: "griezmann", avatar: "#" },
    { id: 18, firstName: "Raheem", lastName: "Sterling", username: "sterling", avatar: "#" },
    { id: 19, firstName: "Vinicius", lastName: "Jr", username: "vinijr", avatar: "#" },
    { id: 20, firstName: "Alisson", lastName: "Becker", username: "alisson", avatar: "#" },
  ],
};

const constStateSlice = createSlice({
  name: "constState",
  initialState,
  reducers: {
        setAllPlayers: (state, action) => {
      state.allPlayers = action.payload;
    },
    invitePlayer: (state, action) => {
      // prevent duplicates
      if (!state.invitedPlayers.find(p => p.id === action.payload.id)) {
        state.invitedPlayers.push(action.payload);
      }
    },
    removeInvitedPlayer: (state, action) => {
      state.invitedPlayers = state.invitedPlayers.filter(
        (p) => p.id !== action.payload
      );
    }
  

  ,
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
} = constStateSlice.actions;

export default constStateSlice.reducer;
