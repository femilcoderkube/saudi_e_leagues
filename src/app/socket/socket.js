import { io } from "socket.io-client";
import { store } from "../slices/store";
import { setSocketConnected, setSocketId } from "../slices/socket/socketSlice";
import { getPartnerByDocId, getPartnerById, items, SOCKET } from "../../utils/constant";
import {
  removeFromQueue,
  setLeagueData,
  setRegistrationModal,
} from "../slices/leagueDetail/leagueDetailSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChatData, setIsMyMatch, setIsTeamOne, setmatchData } from "../slices/MatchSlice/matchDetailSlice";

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

  // Remove any previous listener to avoid duplicate navigation
  socket.off(SOCKET.JOINMATCH);

  socket.on(SOCKET.JOINMATCH, (data) => {
    // Use window.location for navigation since hooks can't be used here
    if (data?.matchId && data?.partner) {
      // If already on a /match/ page, do nothing
      if (window.location.pathname.includes("/match/")) return;
      let pId = getPartnerByDocId(data.partner).id;
      window.location.href = `/${pId}/match/${data.matchId}`;
    }
  });

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
      if(data.data.leaderBoard.requestedUser.userId._id == user?._id){
        store.dispatch(setLeagueData(data.data));
      }else{
        delete data.data.leaderBoard.requestedUser;
        store.dispatch(setLeagueData(data.data));
      }
      
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
  store.dispatch(removeFromQueue(user._id));
}
export function joinLeagueSocket({ isSocketConnected, payload }) {
  if (!isSocketConnected) return;
  socket.emit(SOCKET.LEAGUEJOIN, payload);
  store.dispatch(setRegistrationModal(false));
}
export function startMatchUpdate(mId , user){
  socket.on(SOCKET.MATCHUPDATE, (data)=>{
    if (data.isMatchUpdate == true) {
      store.dispatch(setmatchData({match : data.data ,
        user : user
      })); 
    } else {
      store.dispatch(setChatData(data.data?.reverse()));
    }
  });
  // Emit JOINLEAGUE once
  socket.emit(SOCKET.STARTMATCH, { matchId: mId });
}

export function stopMatchUpdate(){
  socket.off(SOCKET.STARTMATCH);
}
export function sendMatchMsg(body){
  socket.emit(SOCKET.ONMESSAGE, body);
}
export function giveReputation(body){
  socket.emit(SOCKET.GIVEREPUTATION,body);
}
