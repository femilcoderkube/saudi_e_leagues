import { io } from "socket.io-client";
import { store } from "../slices/store";
import { setSocketConnected, setSocketId } from "../slices/socket/socketSlice";
import { SOCKET } from "../../utils/constant";
import { removeFromQueue, setLeagueData, setRegistrationModal } from "../slices/leagueDetail/leagueDetailSlice";
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
  const user = JSON.parse(localStorage.getItem("user")) || null;
  console.log("Socket connected:", socket.id);
  socket.emit(SOCKET.JOINUSEROOM, { userId: user?._id }); // Join a specific room or channel if needed
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
export function startLeagueSocket({ lId, user, isSocketConnected }) {
  if (isSocketConnected) {
    // Remove any previous listener to prevent duplicate handlers
    stopLeagueSocket();
    // Emit join league event
    socket.emit(SOCKET.JOINLEAGUE, { Lid: lId, userId: user?._id });
    // Listen for league updates and update state
    socket.on(SOCKET.LEAGUEUPDATE, (data) => {
      console.log("League Update Data:", data);
      data.data.userId = user?._id;
      store.dispatch(setLeagueData(data.data));
    });
  }
}
export function stopLeagueSocket() {
  // Remove the league update listener
  socket.off(SOCKET.LEAGUEUPDATE);
}

export function startReadyToPlaySocket({ lId, user, isSocketConnected }) {
  if (!isSocketConnected) return;
  socket.emit(SOCKET.READYTOPLAY, { Lid: lId, userId: user?._id });
}
export function stopReadyToPlaySocket({ lId, user, isSocketConnected }) {
  if (!isSocketConnected) return;
  socket.emit(SOCKET.NOTREADYTOPLAY, { Lid: lId, userId: user?._id });
  store.dispatch(removeFromQueue(user._id))
}
export function joinLeagueSocket({ isSocketConnected, payload }) {
  if (!isSocketConnected) return;
  socket.emit(SOCKET.JOINLEAGUE, payload);
  store.dispatch(setRegistrationModal(false));
}
