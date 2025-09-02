import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UnreadNotification: [],
  ReadNotification: [],
  isRead: false,
  unReadNotificationCount: 0,
  notificationCount: 0,
  lastMatchs: []
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      if (action.payload.status) {
        if (action.payload.isRead) {
          state.ReadNotification = action.payload.data;
          state.notificationCount = action.payload.data.length;
        } else {
          state.UnreadNotification = action.payload.data;
          state.unReadNotificationCount = action.payload.data.length;
        }
        state.isRead = action.payload.isRead;
      }
    },
    refreshNotificationCounts: (state) => {
      state.unReadNotificationCount = state.UnreadNotification.length;
      state.notificationCount = state.ReadNotification.length;
    },
    setLastMatch: (state, action) => {
      if (action.payload.status) {
        state.lastMatchs = action.payload.data;
      }
    }
  },
});

export const {
  setNotification,
  setLastMatch,
  refreshNotificationCounts
} = notificationSlice.actions;

export default notificationSlice.reducer;
