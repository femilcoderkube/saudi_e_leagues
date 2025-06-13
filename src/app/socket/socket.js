
import { io } from 'socket.io-client';
import { store } from '../slices/store';
import { setSocketConnected, setSocketId } from '../slices/socket/socketSlice';
import { setLeagueData, setJoinStatus, setLeagueError } from '../slices/leagueDetail/leagueDetailSlice';
import { SOCKET } from '../../utils/constant';

const SOCKET_URL = "/";

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],

});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
  store.dispatch(setSocketConnected(true));
  store.dispatch(setSocketId(socket.id));
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
  store.dispatch(setSocketConnected(false));
  store.dispatch(setSocketId(null));
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message, error.stack, error.name);
  store.dispatch(setSocketConnected(false));
});

