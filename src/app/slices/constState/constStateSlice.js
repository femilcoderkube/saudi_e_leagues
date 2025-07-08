import { createSlice } from "@reduxjs/toolkit";
import { countryData } from "../../../utils/CountryCodes";

const initialState = {
  isMatchMaking: false,
  isMatchLoader:false,
  isLogin: false,
  isRegisteration: false,
  profileVisible : false,
  submitModal :false,
  viewModal :false,

  countryOptions :countryData.map((country) => ({
    value: country.name,
    label: country.name,
  })),
   dialCodeOptions : countryData.map((country) => ({
    value: country.dial_code,
    label: `${country.dial_code} (${country.code})`,
  }))
};

const constStateSlice = createSlice({
  name: "constState",
  initialState,
  reducers: {
    setPreviewImage:(state,action)=>{
      state.viewModal = action.payload;
    },
    setViewModal:(state,action)=>{
      state.viewModal = action.payload;
    },
    setSubmitModal:(state,action)=>{
      state.submitModal = action.payload;
    },
    setProfileVisible:(state,action)=>{
      state.profileVisible = action.payload;
    },
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

export const { setMatchPage ,setMatchLoader ,setLogin ,setRegisteration,setProfileVisible ,setSubmitModal,setViewModal ,setPreviewImage} = constStateSlice.actions;

export default constStateSlice.reducer;
