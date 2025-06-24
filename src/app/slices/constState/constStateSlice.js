import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMatchMaking: false,
  isMatchLoader:false,
  isLogin: false,
  isRegisteration: false,
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
    setLogin: (state, action) => {
      // Accepts a boolean to set isLogin
      state.isLogin = !!action.payload;
    },
    setRegisteration: (state, action) => {
      // Accepts a boolean to set isRegisteration
      state.isRegisteration = !!action.payload;
    }
  },
});

export const { setMatchPage ,setMatchLoader ,setLogin ,setRegisteration} = constStateSlice.actions;

export default constStateSlice.reducer;
