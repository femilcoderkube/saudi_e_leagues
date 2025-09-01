import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stageTypes } from "../../../utils/constant";

const initialState = {
  tournamentData: null,
  tournamentStages: null,
  battleRoyalGroup: null,
  battleRoyalSchedule: null,
  stageSettings: null,
  loader: false,
  activeStage: 0,
  currentDate: null, // store timestamp
  nextDayDate: Date.now() + 86400000 // store timestamp

};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    clearData: (state) => {
      state.tournamentStages = null;
      state.battleRoyalGroup = null;
      state.battleRoyalSchedule = null;
      state.stageSettings = null;
      state.tournamentData = null;
      state.currentDate= null;
      state.nextDayDate= Date.now() + 86400000;

    },
    setActiveStage: (state, action) => {
      state.tournamentStages = null;
      state.battleRoyalGroup = null;
      state.battleRoyalSchedule = null;
      state.stageSettings = null;
      state.loader = true
      state.activeStage = action.payload;
            state.currentDate= null;
      state.nextDayDate= Date.now() + 86400000;
    },
    setcurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setnextDayDate: (state, action) => {
      state.nextDayDate = action.payload;
    },
    setTournamentData: (state, action) => {
      state.tournamentData = action.payload;
            state.currentDate= null;
      state.nextDayDate= Date.now() + 86400000;
    },
    setTournamentStages: (state, action) => {
      if (action.payload.stageType == stageTypes.BattleRoyal) {
        state.battleRoyalGroup = action.payload.data?.matcheData?.participantList || [];
        state.battleRoyalSchedule = action.payload.data?.matcheData?.groupedByDate || {};
        state.stageSettings = action.payload.data?.settings || {}

      } else {
        state.tournamentStages = action.payload.data || {};
      }
      state.loader = false
    },
    resetDateFilter: (state) => {
           state.currentDate= null;
      state.nextDayDate= Date.now() + 86400000;
    }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['tournament.currentDate', 'tournament.nextDayDate'],
        ignoredActionPaths: ['payload'], // optional
      },
    }),
  extraReducers: (builder) => { },
});

export const { setTournamentData, setActiveStage, clearData, setTournamentStages, setnextDayDate, setcurrentDate } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
