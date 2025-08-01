import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tournamentData: null,
  activeStage: 0,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setActiveStage: (state, action) => {
      state.activeStage = action.payload;
    },
    setTournamentData: (state, action) => {
      state.tournamentData = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setTournamentData, setActiveStage } = tournamentSlice.actions;

export default tournamentSlice.reducer;
