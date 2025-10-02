import { io } from "socket.io-client";
import { store } from "../slices/store";
import { setSocketConnected, setSocketId } from "../slices/socket/socketSlice";
import { getPartnerByDocId } from "../../utils/constant";
import {
  removeFromQueue,
  resetLeaderBoard,
  setLeaderBoard,
  setLeagueData,
  setQueueData,
  setQueuePlayers,
  setRegistrationModal,
  setUserInQueue,
  setWeekOfStarUsers,
} from "../slices/leagueDetail/leagueDetailSlice";
import {
  setChatData,
  setmatchData,
} from "../slices/MatchSlice/matchDetailSlice";
import {
  setIsMatctCreated,
  setPartyQueueTeam,
} from "../slices/constState/constStateSlice";
import {
  setLastMatch,
  setNotification,
} from "../slices/notificationSlice/notificationSlice";
import {
  setTournamentData,
  setTournamentStages,
} from "../slices/tournamentSlice/tournamentSlice";
import { setDraftData } from "../slices/draft/draftSlice";
import {
  setChatTData,
  setmatchTData,
} from "../slices/MatchSlice/TournamentMatchDetailSlice";
import {
  deleteFcmToken,
  logout,
  setIsBannedUser,
} from "../slices/auth/authSlice";
import { globalNavigate } from "../../Services/navigationService";
import { wrapSocketWithEncryption } from "../../utils/socketEncryptionMiddleware";
import { toast } from "react-toastify";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "https://staging-backend.primeeleague.com";
// const SOCKET_URL =
//   import.meta.env.VITE_SOCKET_URL || "https://backend.primeeleague.com";
const encryptionEnabled = import.meta.env.VITE_ENCRYPTION_STATUS;

export const SOCKET = {
  JOINLEAGUE: "joinLeague",
  LEAVELEAGUE: "LeaveLeague",
  LEAGUEUPDATE: "leagueUpdate",
  LEAGUEJOIN: "leagueJoin",
  READYTOPLAY: "readyToPlay",
  NOTREADYTOPLAY: "notReadyToPlay",
  JOINMATCH: "joinMatch",
  MATCHUPDATE: "matchUpdate",
  STARTMATCH: "startMatch",
  ONMESSAGE: "onMessage",
  ONSUBMIT: "onSubmit",
  JOINUSEROOM: "joinUserRoom",
  GIVEREPUTATION: "giveReputation",
  NOTIFICATION: "notification",
  ONNOTIFICATION: "onNotification",
  READNOTIFICATION: "readNotification",
  GETLASTMATCHS: "getLastMatchs",
  LASTMATCHUPDATE: "lastMatchUpdate",
  GETWEEKOFSTAR: "getWeekOfStar",
  ONWEEKOFSTARUSERS: "onWeekOfStarUsers",
  CANCELMATCH: "cancelMatch",
  GETTOURNAMENT: "getTournament",
  ONTOURNAMENTUPDATE: "onTournamentUpdate",
  GETTOURNAMENTSTAGES: "getTournamentStages",
  ONTOURNAMENTSTAGESUPDATE: "onTournamentStagesUpdate",
  // DRAFTING PHASE
  GETDRAFTDATA: "getDraftData",
  ONDRAFTDATAUPDATE: "onDraftDataUpdate",
  SETPICKEDDRAFTPLAYER: "setPickedDraftPlayer",
  GETLEADERBOARD: "getLeaderBoard",
  GETMATCHT: "getMatchT",
  ONMATCHT: "onMatchT",
  ISBANUSER: "isBanUser",
  ONISBANUSER: "onIsBanUser",
  REMOVEDRAFTDATA: "removeDraftData",
  SETFCMTOKEN: "setFcmToken",
  CHECKUSERQUEUE: "checkUserQueue",
  GETUSERQUEUE: "getUserQueue",
  QUEUEPLAYER: "queuePlayer",
  PREPAREQUEUEDATA: "prepareQueueData",
  CREATE_PARTY: "createParty",
  PARTYUPDATEDATA: "partyUpdateData",
  LEAVEPARTY: "leaveParty",
  JOINTEAMROOM: "joinTeamRoom",
  LEAVETEAMROOM: "leaveTeamRoom",
  ACCEPT_INVITATION: "ACCEPT_INVITATION",
  READYTOPLAYPARTY: "readytoplayParty",
  PARTY_QUEUE_STARTED: "PARTY_QUEUE_STARTED",
  TEAM_DATA: "TeamData",
  TEAM_UPDATEDDATA: "TeamUpdatedData",
};

export let socket;

if (encryptionEnabled == "true") {
  socket = wrapSocketWithEncryption(
    io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
    })
  );
} else {
  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: false,
  });
}

socket.connect();
socket.on("connect", () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  joinUserRoom();

  socket.off(SOCKET.JOINMATCH);

  socket.on(SOCKET.JOINMATCH, (data) => {
    if (data?.matchId && data?.partner) {
      store.dispatch(setIsMatctCreated(true));
      if (window.location.pathname.includes("/match/")) return;
      let pId = getPartnerByDocId(data.partner).id;
      globalNavigate(`/${pId}/match/${data.matchId}`);
      sessionStorage.removeItem("canAccessFindingMatch");
    }
  });

  socket.on(SOCKET.PARTY_QUEUE_STARTED, (data) => {
    const leagueId = data?.team?.leagueId?._id;
    const isReady = data?.team?.isReady;
    const players = data?.team?.Players;

    if (data?.team?.Creator.toString() != user?._id.toString()) {
      if (leagueId && Array.isArray(players)) {
        const isMyTeam = players.some((player) => player.userId === user?._id);
        if (isMyTeam) {
          let pId = getPartnerByDocId(data?.team?.leagueId?.partner).id;

          if (data?.cancel_queue == true) {
            globalNavigate(`/${pId}/lobby/${leagueId}`);
          } else if (isReady) {
            sessionStorage.setItem("canAccessFindingMatch", "true");
            globalNavigate(`/${pId}/lobby/${leagueId}/finding-partymatch`);
          }
        }
      }
    }
  });

  if (user?._id) {
    checkIsUserBanned({ userId: user?._id });
  }

  socket.on(SOCKET.ONISBANUSER, (payload) => {
    const isBanned = payload?.isUserBan ?? false;
    store.dispatch(setIsBannedUser({ data: isBanned }));
    if (isBanned) {
      store.dispatch(deleteFcmToken());

      getUpdateToken("");

      store.dispatch(logout());
    }
  });

  socket.on(SOCKET.ONNOTIFICATION, (data) => {
    store.dispatch(setNotification(data));
  });
  socket.on(SOCKET.LASTMATCHUPDATE, (data) => {
    store.dispatch(setLastMatch(data));
  });
  if (user?._id) {
    startNotificationSocket({ userId: user?._id, isRead: true });
    startNotificationSocket({ userId: user?._id, isRead: false });
    getLastMatchesSocket(user?._id);
  }
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
    stopLeagueSocket();
    store.dispatch(resetLeaderBoard());

    socket.on(SOCKET.LEAGUEUPDATE, (data) => {
      // if (!data?.status) {
      //   window.location.href = "/";
      //   return;
      // }
      if (window.location.pathname.includes(data?.data?._id?.toString())) {
        data.data.userId = user?._id;
        store.dispatch(setLeagueData(data.data));
        store.dispatch(setIsMatctCreated(false));
      }
    });

    socket.on(SOCKET.GETLEADERBOARD, (data) => {
      if (window.location.pathname.includes(data?.Lid?.toString())) {
        data.data.userId = user?._id;
        if (data.data?.requestedUser?.userId?._id == user?._id) {
          store.dispatch(setLeaderBoard(data.data));
        } else {
          delete data.data.requestedUser;
          store.dispatch(setLeaderBoard(data.data));
        }
      }
    });
    socket.on(SOCKET.PREPAREQUEUEDATA, (data) => {
      if (window.location.pathname.includes(data?.data?.Lid?.toString())) {
        data.data.userId = user?._id;
        store.dispatch(setQueueData(data.data));
      }
    });
    socket.off(SOCKET.PARTYUPDATEDATA);
    socket.on(SOCKET.PARTYUPDATEDATA, (data) => {
      if (data?.message) {
        toast.error(data?.message);
      } else if (
        window.location.pathname.includes(data?.data?.leagueId?.toString())
      )
        store.dispatch(setPartyQueueTeam(data));
    });
    socket.emit(SOCKET.JOINLEAGUE, { Lid: lId, userId: user?._id });
    startStarOfTheWeekSocket({
      lId: lId,
      user: user,
      isSocketConnected: isSocketConnected,
    });
    if (user?._id) {
      startGetQueueUser(user?._id);
    }
  }
}
export function startGetQueueUser(userId) {
  socket.off(SOCKET.GETUSERQUEUE);
  socket.on(SOCKET.GETUSERQUEUE, (data) => {
    if (data.userQueue == true) {
      store.dispatch(setUserInQueue(true));
    } else {
      store.dispatch(setUserInQueue(false));
    }
  });
  socket.emit(SOCKET.CHECKUSERQUEUE, { userId });
}

export function startGetQueuePlayers() {
  socket.off(SOCKET.QUEUEPLAYER);
  socket.on(SOCKET.QUEUEPLAYER, (data) => {
    if (data.count) {
      store.dispatch(setQueuePlayers(data.count));
    }
  });
}
export function stopLeagueSocket(lId) {
  socket.off(SOCKET.LEAGUEUPDATE);
  socket.off(SOCKET.PREPAREQUEUEDATA);
  socket.off(SOCKET.GETLEADERBOARD);
  socket.emit(SOCKET.LEAVELEAGUE, { Lid: lId });
}
export function startStarOfTheWeekSocket({ lId, user, isSocketConnected }) {
  if (isSocketConnected) {
    socket.off(SOCKET.ONWEEKOFSTARUSERS);
    socket.on(SOCKET.ONWEEKOFSTARUSERS, (data) => {
      if (data?.status) {
        store.dispatch(setWeekOfStarUsers(data?.data));
      }
    });
    socket.emit(SOCKET.GETWEEKOFSTAR, { Lid: lId, userId: user?._id });
  }
}
export function getPartyQueueUpdate() {}
export function startReadyToPlaySocket({ lId, user, isSocketConnected }) {
  if (!isSocketConnected) return;
  socket.emit(SOCKET.READYTOPLAY, { Lid: lId, userId: user?._id });
  setTimeout(() => {
    startLeagueSocket(lId, user, isSocketConnected);
  }, 2000);
}
export function startReadyToPlayWithPartySocket({
  lId,
  user,
  teamId,
  isSocketConnected,
}) {
  if (!isSocketConnected) return;
  socket.emit(SOCKET.READYTOPLAYPARTY, { Lid: lId, teamId, userId: user?._id });
  setTimeout(() => {
    startLeagueSocket(lId, user, isSocketConnected);
  }, 2000);
}
export function stopReadyToPlaySocket({
  lId,
  user,
  isSocketConnected,
  isTeam = false,
}) {
  if (!isSocketConnected) return;

  socket.emit(SOCKET.NOTREADYTOPLAY, { Lid: lId, userId: user?._id, isTeam });
  store.dispatch(removeFromQueue(user._id));

  const handleQueueResponse = (data) => {
    socket.off(SOCKET.GETUSERQUEUE, handleQueueResponse);
  };

  socket.on(SOCKET.GETUSERQUEUE, handleQueueResponse);
  socket.emit(SOCKET.CHECKUSERQUEUE, { userId: user?._id });
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
  if (isSocketConnected) {
    stopTournamentSocket();
    socket.on(SOCKET.ONTOURNAMENTUPDATE, (data) => {
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
  if (isSocketConnected) {
    stopTournamentStagesSocket();
    socket.on(SOCKET.ONTOURNAMENTSTAGESUPDATE, (data) => {
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
      data.user = user;

      store.dispatch(setDraftData(data));
    });
    socket.emit(SOCKET.GETDRAFTDATA, { draftId });
  }
}
export function setPickedPlayer({ draftId, Playerdata, isSocketConnected }) {
  if (isSocketConnected) {
    socket.emit(SOCKET.SETPICKEDDRAFTPLAYER, { draftId, Playerdata });
  }
}
export function stopMatchDetailTSocket() {
  socket.off(SOCKET.ONMATCHT);
}
export function getMatchDetailTById({ mId, isSocketConnected, user }) {
  if (isSocketConnected) {
    stopMatchDetailTSocket();
    socket.on(SOCKET.ONMATCHT, (data) => {
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

export const getUpdateToken = (fcmToken) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  socket.emit(SOCKET.SETFCMTOKEN, {
    userId: user?._id,
    fcmToken: fcmToken,
  });
};

export const joinUserRoom = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    socket.emit(SOCKET.JOINUSEROOM, { userId: user?._id });
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }
};
export const acceptInvitation = (data) => {
  socket.emit(SOCKET.ACCEPT_INVITATION, data);
};
export function leavePartySocket(actionPayload) {
  socket.emit(SOCKET.LEAVEPARTY, actionPayload);
}
