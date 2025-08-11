import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stageTypes } from "../../../utils/constant";

const initialState = {
  tournamentData: null,
  tournamentStages: null,
  battleRoyalGroup: null,
  battleRoyalSchedule: null,
  stageSettings : null,
  loader :false,
  activeStage: 0,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    clearData:(state)=>{
      state.tournamentStages = null;
      state.battleRoyalGroup = null;
      state.battleRoyalSchedule = null;
      state.stageSettings =null;
      state.tournamentData = null;
    },
    setActiveStage: (state, action) => {
      state.tournamentStages = null;
      state.battleRoyalGroup = null;
      state.battleRoyalSchedule = null;
      state.stageSettings= null;
      state.loader =true
      state.activeStage = action.payload;
    },
    setTournamentData: (state, action) => {
      state.tournamentData = action.payload;
    },
    setTournamentStages: (state, action) => {
      if (action.payload.stageType == stageTypes.BattleRoyal) {
        state.battleRoyalGroup = action.payload.data?.matcheData?.participantList || [];
        state.battleRoyalSchedule = action.payload.data?.matcheData?.groupedByDate || {};
        state.stageSettings = action.payload.data?.settings || {}

      } else {
        state.tournamentStages = action.payload.data || {};
      }
      state.loader =false
    },
  },
  extraReducers: (builder) => {},
});

export const { setTournamentData, setActiveStage,clearData, setTournamentStages } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
