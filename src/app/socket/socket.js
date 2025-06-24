import { io } from "socket.io-client";
import { store } from "../slices/store";
import { setSocketConnected, setSocketId } from "../slices/socket/socketSlice";
import { SOCKET } from "../../utils/constant";
import { useSelector } from "react-redux";


// const SOCKET_URL = "/";
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "https://devnode.coderkubes.com";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
socket.connect();
socket.on("connect", () => {
  const user =  JSON.parse(localStorage.getItem("user")) || null;
  console.log("Socket connected:", socket.id);
  socket.emit(SOCKET.JOINUSEROOM, {userId : user?._id}); // Join a specific room or channel if needed
  store.dispatch(setSocketConnected(true));
  store.dispatch(setSocketId(socket.id));
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
  store.dispatch(setSocketConnected(false));
  store.dispatch(setSocketId(null));
});

socket.on("connect_error", (error) => {
  console.error(
    "Socket connection error:",
    error.message,
    error.stack,
    error.name
  );
  store.dispatch(setSocketConnected(false));
});
