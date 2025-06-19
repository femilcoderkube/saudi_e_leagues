import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMatchMaking: false,
};

const constStateSlice = createSlice({
  name: "constState",
  initialState,
  reducers: {
    setMatchPage: (state, action) => {
      // Accepts a boolean to set isMatchMaking
      state.isMatchMaking = !!action.payload;
    },
  },
});

export const { setMatchPage } = constStateSlice.actions;

export default constStateSlice.reducer;
