import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (registerRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/register",
        registerRequest,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
        state.success = true;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;

export default registerSlice.reducer;
