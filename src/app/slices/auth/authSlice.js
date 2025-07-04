import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginRequest, { rejectWithValue }) => {
    try {
      // API call to login with /admin/login
      const response = await axiosInstance.post("/users/login", loginRequest);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const checkUsersExists = createAsyncThunk(
  "users/checkUsersExists",
  async ({ email, userName }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (email) params.append("email", email);
      if (userName) params.append("username", userName);
      const response = await axiosInstance.get(
        `/users/check?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error checking users existence"
      );
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
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action?.payload?.data?.token;
        // state.admin = action.payload.data.admin;
        state.user = action.payload?.data?.user;
        // Store the token in localStorage
        if (!action.payload.data?.token || !action.payload.data?.user) {
          // toast.error(action.payload.data);
        } else {
          localStorage.setItem("token", action.payload.data.token);
          localStorage.setItem("user", JSON.stringify(action.payload.data.user));
          state.user = action.payload.data.user;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkUsersExists.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUsersExists.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkUsersExists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
