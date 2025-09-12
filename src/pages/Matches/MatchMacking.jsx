import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/Matchmaking.css";
import { useNavigate, useParams } from "react-router-dom";
import { formatTime } from "../../utils/constant.js";
import { useSelector } from "react-redux";
import {
  startGetQueuePlayers,
  startLeagueSocket,
  startReadyToPlaySocket,
  stopReadyToPlaySocket,
} from "../../app/socket/socket.js";
import TimeOverPopup from "../../components/Overlays/TimeOverPopup.jsx";

import Sparkles from "./Sparkles.jsx";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../components/ui/images/images.js";

const MatchMaking = () => {
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { queuePlayers } = useSelector((state) => state.leagues);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const [showTimeOver, setShowTimeOver] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { lId, id } = useParams();
  const [timerActive, setTimerActive] = useState(true);
  const { t, i18n } = useTranslation();

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
    const canAccess = sessionStorage.getItem("canAccessFindingMatch");
    if (canAccess !== "true") {
      navigate(`/${id}/lobby/${lId}`); // or wherever you want to redirect
      return;
    }

    if (isSocketConnected && user?._id) {
      startLeagueSocket({ lId, user, isSocketConnected });
      startGetQueuePlayers();
      startReadyToPlaySocket({ lId, user, isSocketConnected });
    }
  }, [isSocketConnected, lId, user?._id]);

  const handleCancel = () => {
    if (seconds <= 2) return;
    if (isSocketConnected && user?._id) {
      stopReadyToPlaySocket({ lId, user, isSocketConnected });
      sessionStorage.removeItem("canAccessFindingMatch");
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
      sessionStorage.removeItem("canAccessFindingMatch");
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
                  yesText={t("yes")}
                  noText={t("no")}
                  message={t("time_over")}
                />
              )}
              <div className="grediant"></div>
              <img
                className="left-league absolute -top-60 left-14 opacity-[8%]"
                src={IMAGES.center_league}
                alt=""
                style={{ width: "20rem" }}
              />
              <img
                className="left-bottom-league absolute xl:bottom-25 xl:left-80 md:bottom-15 md:left-60 opacity-[8%]"
                src={IMAGES.center_league}
                alt=""
                style={{ width: "5.5rem" }}
              />
              <img
                className="right-league absolute xl:top-20 xl:right-60 md:top-10 md:right-40 opacity-[8%]"
                src={IMAGES.center_league}
                alt=""
                style={{ width: "9.5rem" }}
              />
              <img
                className="right-bottom-league absolute bottom-[-8.5rem] right-[-6.3rem] opacity-[8%]"
                src={IMAGES.center_league}
                alt=""
                style={{ width: "20rem" }}
              />
              <img
                className="center-league absolute left-1/2 top-[19rem]"
                src={IMAGES.center_league}
                alt=""
                style={{ width: "11rem" }}
              />
              <div onClick={handleCancel}>
                <div className="absolute bottom-[2.5rem] sm:ltr:right-[2.5rem] sm:rtl:left-[4.5rem] ltr:right-[0.8rem] rtl:left-[0.8rem]">
                  <img
                    className="cancel-btn duration-400 cursor-pointer z-2"
                    src={IMAGES.cancel_btn}
                    alt={t("cancel")}
                    style={{ width: "25rem" }}
                  />
                  <span
                    className="mob-common-btn absolute top-[2.0125rem] left-0 w-full text-center text-lg sm:text-2xl cursor-pointer"
                    style={{
                      fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
                      fontWeight: "bold",
                      textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {t("images.cancel_button")}
                  </span>
                </div>
                <Sparkles />
              </div>
              <div className="player-search text-center pt-14">
                <span className="md:text-[5.254rem] text-[3.75rem] font-bold grad_head--txt">
                  {formatTime(seconds)}
                </span>
                <h5 className="purple_col md:pt-5 pt-4 md:text-2xl text-base">
                  {queuePlayers > 1
                    ? `${queuePlayers} ${t("players_are_queue")}`
                    : t("player_search")}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchMaking;
