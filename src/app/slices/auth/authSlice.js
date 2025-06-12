import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  admin: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginRequest, { rejectWithValue }) => {
    try {
      // API call to login with /admin/login
      const response = await axiosInstance.post<any>(
        "/users/login",
        loginRequest
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        // state.admin = action.payload.data.admin;
        state.user = action.payload.data.user;
        // Store the token in localStorage
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
