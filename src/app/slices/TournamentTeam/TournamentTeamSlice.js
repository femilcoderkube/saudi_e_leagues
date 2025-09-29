import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    showTeamRegistrationPopup: false,
};

const TournamentTeamSlice = createSlice({
    name: "tournamentTeam",
    initialState,
    reducers: {
        setTeamRegistrationPopup: (state, action) => {
            state.showTeamRegistrationPopup = !state.showTeamRegistrationPopup;
        },
    },
    extraReducers: (builder) => { },
});

export const { setTeamRegistrationPopup } = TournamentTeamSlice.actions;

export default TournamentTeamSlice.reducer;
