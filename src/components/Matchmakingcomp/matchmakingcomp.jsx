import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import center_league from "../../assets/images/center_league.png";
import cancel_btn from "../../assets/images/cancel-btn.png";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../app/socket/socket";
import { SOCKET } from "../../utils/constant";
import { setMatchPage } from "../../app/slices/constState/constStateSlice";
import TimeOverPopup from "../ModalPopUp/TimeOverPopup";

const Matchmaking = ({setMatchLoading}) => {
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const { lId , id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showTimeOver, setShowTimeOver] = useState(false);
  const [hasJoinedMatch, setHasJoinedMatch] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  // Timer effect
  useEffect(() => {
    if (!timerActive) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timerActive]);

  // Show time over popup if 5 min and not joined
  useEffect(() => {
    if (seconds >= 300 && !hasJoinedMatch) {
      socket.emit(SOCKET.NOTREADYTOPLAY, { Lid: lId, userId: user._id });
      setShowTimeOver(true);
      setTimerActive(false);
    }
  }, [seconds, hasJoinedMatch]);

  // Set match page and handle sockets
  useEffect(() => {
    // Set match page state in redux
    

    // Handler for JOINMATCH event
    const handleJoinMatch = (data) => {
      console.log("Match Update Data (Match ID):", data);
      setHasJoinedMatch(true);
      
      setMatchLoading(data.matchId);
      
    };

    // Only set up socket listeners if connected
    if (isSocketConnected) {
      console.log("Socket connected, setting up listeners for JOINMATCH");
      socket.on(SOCKET.JOINMATCH, handleJoinMatch);

      if (user?._id) {
        console.log("Socket connected, setting up called for READYTOPLAY");
        socket.emit(SOCKET.READYTOPLAY, { Lid: lId, userId: user._id });
      }
    }

    // eslint-disable-next-line
  }, [isSocketConnected, lId, user?._id, dispatch]);

  const handleCancel = () => {
    if (isSocketConnected && user?._id) {
      console.log("Cancelling matchmaking for user:", user._id);
      socket.emit(SOCKET.NOTREADYTOPLAY, { Lid: lId, userId: user._id });
      dispatch(setMatchPage(false));
      navigate(-1);
    }
  };

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleTimeOverYes = () => {
    setShowTimeOver(false);
    setSeconds(0);
    setTimerActive(true);
    if (isSocketConnected && user?._id) {
      socket.emit(SOCKET.READYTOPLAY, { Lid: lId, userId: user._id });
    }
  };

  const handleTimeOverNo = () => {
    setShowTimeOver(false);
    if (isSocketConnected && user?._id) {
      socket.emit(SOCKET.NOTREADYTOPLAY, { Lid: lId, userId: user._id });
      dispatch(setMatchPage(false));
      navigate(-1);
    }
  };

  return (
    <div className="match-makingwp overflow-hidden">
      {showTimeOver && (
        <TimeOverPopup onYes={handleTimeOverYes} onNo={handleTimeOverNo} />
      )}
      <div className="grediant"></div>
      <img
        className="left-league absolute -top-60 left-14 opacity-[8%]"
        src={center_league}
        alt=""
        style={{ width: "20rem" }}
      />
      <img
        className="left-bottom-league absolute bottom-25 left-80 opacity-[8%]"
        src={center_league}
        alt=""
        style={{ width: "5.5rem" }}
      />
      <img
        className="right-league absolute top-20 right-60 opacity-[8%]"
        src={center_league}
        alt=""
        style={{ width: "9.5rem" }}
      />
      <img
        className="right-bottom-league absolute bottom-[-8.5rem] right-[-6.3rem] opacity-[8%]"
        src={center_league}
        alt=""
        style={{ width: "20rem" }}
      />
      <img
        className="center-league absolute left-1/2 top-[19rem]"
        src={center_league}
        alt=""
        style={{ width: "11rem" }}
      />
      <div onClick={handleCancel}>
        <img
          className="cancel-btn absolute bottom-0 right-0 hover:opacity-70 duration-400"
          src={cancel_btn}
          alt=""
          style={{ width: "25rem" }}
        />
      </div>
      <div className="player-search text-center pt-14">
        <span className="text-[5.254rem] font-bold grad_head--txt">
          {formatTime(seconds)}
        </span>
        <h5 className="purple_col pt-5 text-2xl">Player Search</h5>
      </div>
    </div>
  );
};

export default Matchmaking;
