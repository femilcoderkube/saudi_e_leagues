import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/Matchmaking.css";
import { useNavigate, useParams } from "react-router-dom";
import { formatTime } from "../../utils/constant.js";
import {useSelector } from "react-redux";
import {
  startReadyToPlaySocket,
  stopReadyToPlaySocket,
} from "../../app/socket/socket.js";
import TimeOverPopup from "../../components/ModalPopUp/TimeOverPopup";
import center_league from "../../assets/images/center_league.png";
import cancel_btn from "../../assets/images/cancelbtn.png";
import Sparkles from "./Sparkles.jsx";
import { useTranslation } from 'react-i18next';


const MatchMaking = () => {
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const [showTimeOver, setShowTimeOver] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { lId } = useParams();
  const [timerActive, setTimerActive] = useState(true);
  const { t } = useTranslation();


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
    if (seconds >= 300) {
      stopReadyToPlaySocket({ lId, user, isSocketConnected });
      setShowTimeOver(true);
      setTimerActive(false);
    }
  }, [seconds, lId, user, isSocketConnected]);

  // Handle JOINMATCH event and socket setup
  useEffect(() => {
    if (isSocketConnected && user?._id) {
      startReadyToPlaySocket({ lId, user, isSocketConnected });
    }
  }, [isSocketConnected, lId, user?._id,]);

  const handleCancel = () => {
    if (isSocketConnected && user?._id) {
      stopReadyToPlaySocket({ lId, user, isSocketConnected });
      navigate(-1);
    }
  };

  const handleTimeOverYes = () => {
    setShowTimeOver(false);
    setSeconds(0);
    setTimerActive(true);
    if (isSocketConnected && user?._id) {
      startReadyToPlaySocket({ lId, user, isSocketConnected });
    }
  };

  const handleTimeOverNo = () => {
    setShowTimeOver(false);
    if (isSocketConnected && user?._id) {
      stopReadyToPlaySocket({ lId, user, isSocketConnected });
      navigate(-1);
    }
  };

  return (
    <>
      <div className="match_loading--page h-full overflow-hidden relative">
        {/* --- dashboard main content back groud --- */}
        <div
          className="main_con--bg absolute top-0 left-0 h-full bg-no-repeat"
          style={{ backgroundSize: "100%" }}
        ></div>

        <div className="sd_match-wrapper ">
          {/* ===  === */}
          <div className="sd_matchmaching-comp">
            <div className="match-makingwp overflow-hidden">
              {showTimeOver && (
                <TimeOverPopup
                  onYes={handleTimeOverYes}
                  onNo={handleTimeOverNo}
                  yesText={t('yes')}
                  noText={t('no')}
                  message={t('time_over')}
                />
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
                  className="cancel-btn absolute bottom-[2.5rem] ltr:right-[2.5rem] rtl:left-[4.5rem] duration-400 cursor-pointer z-2"
                  src={cancel_btn}
                  alt={t('cancel')}
                  style={{ width: "25rem" }}
                />
                <Sparkles />
              </div>
              <div className="player-search text-center pt-14">
                <span className="text-[5.254rem] font-bold grad_head--txt">
                  {formatTime(seconds)}
                </span>
                <h5 className="purple_col pt-5 text-2xl">{t('player_search')}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchMaking;
