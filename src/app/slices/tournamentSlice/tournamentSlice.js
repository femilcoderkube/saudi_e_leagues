import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tournamentData: null,
  tournamentStages: null,
  activeStage: 0,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setActiveStage: (state, action) => {
        state.tournamentStages = null;
      state.activeStage = action.payload;
    },
    setTournamentData: (state, action) => {
      state.tournamentData = action.payload;
    },
    setTournamentStages: (state, action) => {
      state.tournamentStages = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setTournamentData, setActiveStage, setTournamentStages } = tournamentSlice.actions;

export default tournamentSlice.reducer;
