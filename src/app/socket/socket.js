import { io, Socket } from "socket.io-client";
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
  setWeekOfStarUsers,
} from "../slices/leagueDetail/leagueDetailSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChatData,
  setmatchData,
} from "../slices/MatchSlice/matchDetailSlice";
import { setIsMatctCreated } from "../slices/constState/constStateSlice";
import {
  setLastMatch,
  setNotification,
} from "../slices/notificationSlice/notificationSlice";
import {
  setTournamentData,
  setTournamentStages,
} from "../slices/tournamentSlice/tournamentSlice";
import {
  setDraftData,
  setDraftCaptain,
  setDraftPlayers,
  setDraftStatus,
  clearData,
} from "../slices/draft/draftSlice";
import { useEffect, useRef } from "react";
import {
  setChatTData,
  setmatchTData,
} from "../slices/MatchSlice/TournamentMatchDetailSlice";
import { logout, setIsBannedUser } from "../slices/auth/authSlice";
import { requestFCMToken } from "../../firebase";

// const SOCKET_URL = "/";
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "https://devnode.coderkubes.com";
// const SOCKET_URL =
//   import.meta.env.VITE_SOCKET_URL || "https://backend.primeeleague.com";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

// Store navigate function globally
let globalNavigate = null;

export const setGlobalNavigate = (navigate) => {
  globalNavigate = navigate;
};
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
      globalNavigate(`/${pId}/match/${data.matchId}`);
      // window.location.href = ;
      sessionStorage.removeItem("canAccessFindingMatch");
    }
  });

  if (user?._id) {
    checkIsUserBanned({ userId: user?._id });
  }

  socket.on(SOCKET.ONISBANUSER, (payload) => {
    const isBanned = payload?.isUserBan ?? false;
    store.dispatch(setIsBannedUser({ data: isBanned }));
    if (isBanned) {
      store.dispatch(logout());
      // optional: window.location.href = "/";
    }
  });

  socket.on(SOCKET.ONNOTIFICATION, (data) => {
    // console.log("Notification Data:", data);
    store.dispatch(setNotification(data));
  });
  socket.on(SOCKET.LASTMATCHUPDATE, (data) => {
    // console.log("Last Match Update Data:", data);
    store.dispatch(setLastMatch(data));
  });
  if (user?._id) {
    startNotificationSocket({ userId: user?._id, isRead: true });
    startNotificationSocket({ userId: user?._id, isRead: false });
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
export function checkIsUserBanned({ userId }) {
  if (userId) {
    socket.emit(SOCKET.ISBANUSER, { userId });
  }
}
export function startNotificationSocket({ userId, isRead }) {
  // console.log("startNotificationSocket", userId, isRead);
  if (userId) {
    socket.emit(SOCKET.NOTIFICATION, { userId: userId, isRead: isRead });
  }
}
export function readNotificationSocket(id) {
  socket.emit(SOCKET.READNOTIFICATION, { id: id });
}
export function getLastMatchesSocket(userId) {
  socket.emit(SOCKET.GETLASTMATCHS, { userId: userId });
}
export function startLeagueSocket({ lId, user, isSocketConnected }) {
  if (isSocketConnected) {
    // Remove any previous listener to prevent duplicate handlers
    stopLeagueSocket();

    socket.on(SOCKET.LEAGUEUPDATE, (data) => {
      // console.log("League Update Data:", data);
      if (!data?.status) {
        window.location.href = "/";
        return;
      }
      if (window.location.pathname.includes(data?.data?._id?.toString())) {
        data.data.userId = user?._id;
        socket.emit(SOCKET.SETFCMTOKEN, {
          userId: user?._id,
          fcmToken: requestFCMToken(),
        });
        console.log(" user?._id", user?._id);
        if (data.data?.leaderBoard?.requestedUser?.userId?._id == user?._id) {
          store.dispatch(setLeagueData(data.data));
        } else {
          delete data.data.leaderBoard.requestedUser;
          store.dispatch(setLeagueData(data.data));
        }
        store.dispatch(setIsMatctCreated(false));
      }
    });
    socket.emit(SOCKET.JOINLEAGUE, { Lid: lId, userId: user?._id });
    startStarOfTheWeekSocket({
      lId: lId,
      user: user,
      isSocketConnected: isSocketConnected,
    });
  }
}
export function stopLeagueSocket() {
  // Remove the league update listener
  socket.off(SOCKET.LEAGUEUPDATE);
}
export function startStarOfTheWeekSocket({ lId, user, isSocketConnected }) {
  if (isSocketConnected) {
    socket.off(SOCKET.ONWEEKOFSTARUSERS);
    socket.on(SOCKET.ONWEEKOFSTARUSERS, (data) => {
      if (data?.status) {
        // console.log("Week of Star Users Data:", data?.data);
        store.dispatch(setWeekOfStarUsers(data?.data));
      }
    });
    socket.emit(SOCKET.GETWEEKOFSTAR, { Lid: lId, userId: user?._id });
  }
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
export function cancelMatch(data) {
  socket.emit(SOCKET.CANCELMATCH, data);
}
export function startTournamentSocket({ tId, user, isSocketConnected }) {
  // console.log("startTournamentSocket", tId, user, isSocketConnected);
  if (isSocketConnected) {
    stopTournamentSocket();
    socket.on(SOCKET.ONTOURNAMENTUPDATE, (data) => {
      console.log("Tournament Update Data:", data);
      store.dispatch(setTournamentData(data.data));
    });
    socket.emit(SOCKET.GETTOURNAMENT, { tId: tId, userId: user?._id });
  }
}
export function stopTournamentSocket() {
  socket.off(SOCKET.ONTOURNAMENTUPDATE);
}
export function getTournamentStages({
  stageId,
  stageType,
  isSocketConnected,
  user,
}) {
  console.log("getTournamentStages", stageId, isSocketConnected, user);
  if (isSocketConnected) {
    stopTournamentStagesSocket();
    socket.on(SOCKET.ONTOURNAMENTSTAGESUPDATE, (data) => {
      console.log("Tournament Stages Update Data:", data);
      store.dispatch(setTournamentStages(data));
    });
    socket.emit(SOCKET.GETTOURNAMENTSTAGES, {
      stageId: stageId,
      stageType: stageType,
      userId: user?._id,
    });
  }
}
export function stopTournamentStagesSocket() {
  socket.off(SOCKET.ONTOURNAMENTSTAGESUPDATE);
}
export function stopDraftSocket({ draftId }) {
  socket.off(SOCKET.ONDRAFTDATAUPDATE);
  socket.emit(SOCKET.REMOVEDRAFTDATA, { draftId });
}
export function getDraftById({ draftId, isSocketConnected, user }) {
  if (isSocketConnected) {
    stopDraftSocket({ draftId });
    socket.on(SOCKET.ONDRAFTDATAUPDATE, (data) => {
      console.log("Draft Update Data:", data);
      data.user = user;

      // Saving entire data
      store.dispatch(setDraftData(data));
    });
    socket.emit(SOCKET.GETDRAFTDATA, { draftId });
  }
}
export function setPickedPlayer({ draftId, Playerdata, isSocketConnected }) {
  if (isSocketConnected) {
    socket.emit(SOCKET.SETPICKEDDRAFTPLAYER, { draftId, Playerdata })
  }
}
export function stopMatchDetailTSocket() {
  socket.off(SOCKET.ONMATCHT);
}
export function getMatchDetailTById({ mId, isSocketConnected, user }) {
  if (isSocketConnected) {
    stopMatchDetailTSocket();
    socket.on(SOCKET.ONMATCHT, (data) => {
      console.log("Match Details T Data:", data);
      if (data.status) {
        if (data.isMatchUpdate == true) {
          store.dispatch(setmatchTData({ user: user, matchData: data.data }));
        } else {
          store.dispatch(setChatTData(data.data?.reverse()));
        }
      }
    });
    socket.emit(SOCKET.GETMATCHT, { mId });
  }
}
