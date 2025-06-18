import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  socketId: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocketConnected: (state, action) => {
      state.isConnected = action.payload;
      console.log('Socket connection status:', action.payload);
    },
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
  },
});

export const { setSocketConnected, setSocketId } = socketSlice.actions;

export default socketSlice.reducer; 