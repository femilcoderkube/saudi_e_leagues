import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false, // from registerSlice
  userDetail: null,
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
export const checkBannedUser = createAsyncThunk(
  "auth/checkBannedUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      // API call to login with /admin/login
      if (!token) {
        return rejectWithValue("Token not found");
      }
      console.log(token);
      const response = await axiosInstance.get("/BannedUsers/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
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

// Register thunk from registerSlice
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

// fetchUserById thunk from usersSlice
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching user"
      );
    }
  }
);

// Add updateUser thunk from usersSlice
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users?id=${id}`, user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating user"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/users/reset-password?email=${email}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset password request"
      );
    }
  }
);

// New updatePassword thunk
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/users/update-password", {
        password,
        token,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update password"
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
      state.userDetail = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    // resetRegisterState from registerSlice
    resetRegisterState: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    // Add clearUserDetail reducer from usersSlice
    clearUserDetail(state) {
      state.userDetail = null;
    },
    clearResetPasswordState(state) {
      state.resetPasswordSuccess = false;
      state.resetPasswordError = null;
    },
    // New reducer to clear update password state
    clearUpdatePasswordState(state) {
      state.updatePasswordSuccess = false;
      state.updatePasswordError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser logic (existing)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action?.payload?.data?.token;
        state.user = action.payload?.data?.user;
        if (!action.payload.data?.token || !action.payload.data?.user) {
          // toast.error(action.payload.data);
        } else {
          localStorage.setItem("token", action.payload.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.data.user)
          );
          state.user = action.payload.data.user;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // checkUsersExists logic (existing)
      .addCase(checkUsersExists.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUsersExists.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkUsersExists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // registerUser logic from registerSlice
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
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        state.user = action.payload.data.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // fetchUserById logic from usersSlice
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload.data;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateUser logic from usersSlice
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload.data;
        toast.success("Profile updated successfully!");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // checkBannedUser logic
      .addCase(checkBannedUser.fulfilled, (state, action) => {
        if (action.payload.data.violation && action.payload.data.banMessage) {
          let message = `${action.payload.data.banMessage}`;
          toast.error(message);
          state.token = null;
          state.user = null;
          state.userDetail = null;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      })
      // resetPassword logic
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.resetPasswordError = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetPasswordError = action.payload;
        toast.error(action.payload);
      })
      // updatePassword logic
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.updatePasswordError = null;
        state.updatePasswordSuccess = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.updatePasswordSuccess = true;
        toast.success("Password updated successfully!");
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.updatePasswordError = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  logout,
  resetRegisterState,
  clearUserDetail,
  clearResetPasswordState,
  clearUpdatePasswordState,
} = authSlice.actions;
export default authSlice.reducer;
