import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
    showTeamRegistrationPopup: false,
    showTeamEditPopup: false,
    currentTeam: null,
    loading: false,
    error: null,
};

export const createTournamentTeam = createAsyncThunk(
    "tournamentTeam/createTeam",
    async ( formData , { rejectWithValue }) => {
        console.log("formData",formData);
        
        try {
            const response = await axiosInstance.post("/Team", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("CREATE TEAM ", response);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create team"
            );
        }
    }
);

// Update Team
export const updateTournamentTeam = createAsyncThunk(
    "tournamentTeam/updateTeam",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/Team?id=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update team"
            );
        }
    }
);

// Get Team by ID
export const fetchTeamById = createAsyncThunk(
    "tournamentTeam/fetchTeamById",
    async (teamId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/Team/${teamId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch team"
            );
        }
    }
);


const TournamentTeamSlice = createSlice({
    name: "tournamentTeam",
    initialState,
    reducers: {
        setTeamRegistrationPopup: (state, action) => {
            state.showTeamRegistrationPopup = !state.showTeamRegistrationPopup;
        },
        setTeamEditPopup: (state, action) => {
            state.showTeamEditPopup = action.payload;
        },
        setCurrentTeam: (state, action) => {
            state.currentTeam = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTournamentTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTournamentTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTeam = action.payload.data;
                state.showTeamRegistrationPopup = false;
            })
            .addCase(createTournamentTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setTeamRegistrationPopup , setTeamEditPopup, setCurrentTeam } = TournamentTeamSlice.actions;

export default TournamentTeamSlice.reducer;
