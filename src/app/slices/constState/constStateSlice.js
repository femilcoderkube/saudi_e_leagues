import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMatchMaking: false,
  isMatchLoader:false
};

const constStateSlice = createSlice({
  name: "constState",
  initialState,
  reducers: {
    setMatchPage: (state, action) => {
      // Accepts a boolean to set isMatchMaking
      state.isMatchMaking = !!action.payload;
    },
    setMatchLoader: (state, action) => {
      // Accepts a boolean to set isMatchMaking
      state.isMatchLoader = !!action.payload;
    },
  },
});

export const { setMatchPage ,setMatchLoader} = constStateSlice.actions;

export default constStateSlice.reducer;
