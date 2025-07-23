import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UnreadNotification: [],
  ReadNotification: [],
  isRead: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      if (action.payload.status) {
        if(action.payload.isRead){
          state.ReadNotification = action.payload.data;
        }else{
          state.UnreadNotification = action.payload.data;
        }
        state.isRead = action.payload.isRead;
      }
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
