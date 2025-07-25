import { io } from "socket.io-client";
import { store } from "../slices/store";
import { setSocketConnected, setSocketId } from "../slices/socket/socketSlice";
import {
  getPartnerByDocId,
  getPartnerById,
  items,
  SOCKET,
} from "../../utils/constant";
import {
  removeFromQueue,
  setLeagueData,
  setRegistrationModal,
} from "../slices/leagueDetail/leagueDetailSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChatData,
  setIsMyMatch,
  setIsTeamOne,
  setmatchData,
} from "../slices/MatchSlice/matchDetailSlice";
import { setIsMatctCreated } from "../slices/constState/constStateSlice";
import { setLastMatch, setNotification } from "../slices/notificationSlice/notificationSlice";

// const SOCKET_URL = "/";
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "https://devnode.coderkubes.com";
// const SOCKET_URL =
//   import.meta.env.VITE_SOCKET_URL || "https://backend.primeeleague.com";

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
      store.dispatch(setIsMatctCreated(true));
      // If already on a /match/ page, do nothing
      if (window.location.pathname.includes("/match/")) return;
      let pId = getPartnerByDocId(data.partner).id;
      window.location.href = `/${pId}/match/${data.matchId}`;
      sessionStorage.removeItem("canAccessFindingMatch");
    }
  });
  socket.on(SOCKET.ONNOTIFICATION, (data) => {
    // console.log("Notification Data:", data);
    store.dispatch(setNotification(data));
  });
  socket.on(SOCKET.LASTMATCHUPDATE, (data) => {
    console.log("Last Match Update Data:", data);
    store.dispatch(setLastMatch(data));
  });
  if(user?._id){
    startNotificationSocket({userId: user?._id , isRead: true});
    startNotificationSocket({userId: user?._id , isRead: false});
    getLastMatchesSocket(user?._id);
  }
  // socket.emit(SOCKET.NOTIFICATION, { userId: user?._id , isRead: false});
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
export function startNotificationSocket({ userId, isRead }) {
  // console.log("startNotificationSocket", userId, isRead);
  if(userId){
  socket.emit(SOCKET.NOTIFICATION, { userId: userId, isRead: isRead });
  }
}
export function readNotificationSocket( id ) {
  socket.emit(SOCKET.READNOTIFICATION, { id: id });
}
export function getLastMatchesSocket(userId){
  socket.emit(SOCKET.GETLASTMATCHS, { userId: userId });
}
export function startLeagueSocket({ lId, user, isSocketConnected }) {
  if (isSocketConnected) {
    // Remove any previous listener to prevent duplicate handlers
    stopLeagueSocket();
    // Emit join league event
    socket.emit(SOCKET.JOINLEAGUE, { Lid: lId, userId: user?._id });
    // Listen for league updates and update state
    socket.on(SOCKET.LEAGUEUPDATE, (data) => {
      console.log("League Update Data:", data);
      if (!data?.status) {
        window.location.href = "/";
        return;
      }
      if (window.location.pathname.includes(data?.data?._id?.toString())) {
        data.data.userId = user?._id;
        console.log(" user?._id",  user?._id);
        if (data.data?.leaderBoard?.requestedUser?.userId?._id == user?._id) {
          store.dispatch(setLeagueData(data.data));
        } else {
          delete data.data.leaderBoard.requestedUser;
          store.dispatch(setLeagueData(data.data));
        }
        store.dispatch(setIsMatctCreated(false));
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
export function startMatchUpdate(mId, user) {
  socket.on(SOCKET.MATCHUPDATE, (data) => {
    if (!data?.status) {
      window.location.href = "/";
      return;
    }
    if (data.isMatchUpdate == true) {
      store.dispatch(
        setmatchData({
          match: data.data,
          user: user,
        })
      );
    } else {
      store.dispatch(setChatData(data.data?.reverse()));
    }
  });
  // Emit JOINLEAGUE once
  socket.emit(SOCKET.STARTMATCH, { matchId: mId });
}

export function stopMatchUpdate() {
  socket.off(SOCKET.STARTMATCH);
}
export function sendMatchMsg(body) {
  socket.emit(SOCKET.ONMESSAGE, body);
}
export function giveReputation(body) {
  socket.emit(SOCKET.GIVEREPUTATION, body);
}
