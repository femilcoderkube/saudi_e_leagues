import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { stageTypes } from "../../../utils/constant";

const initialState = {
  tournamentData: null,
  tournamentStages: null,
  battleRoyalGroup: null,
  battleRoyalSchedule: null,
  activeStage: 0,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setActiveStage: (state, action) => {
      state.tournamentStages = null;
      state.battleRoyalGroup = null;
      state.battleRoyalSchedule = null;
      state.activeStage = action.payload;
    },
    setTournamentData: (state, action) => {
      state.tournamentData = action.payload;
    },
    setTournamentStages: (state, action) => {
      if (action.payload.stageType == stageTypes.BattleRoyal) {
        state.battleRoyalGroup = action.payload.data?.matcheData?.participantList || [];
        state.battleRoyalSchedule = action.payload.data?.matcheData?.groupedByDate || {};
      } else {
        state.tournamentStages = action.payload.data || {};
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { setTournamentData, setActiveStage, setTournamentStages } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
