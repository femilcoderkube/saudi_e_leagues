import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveTournamentTab,
  setShowCalendar,
} from "../../app/slices/constState/constStateSlice.js";
import ScheduleCard from "../../components/Cards/TournamentDetail/ScheduleCard.jsx";
import RoundRobinStanding from "./RoundrobinStandings.jsx";
import DatePiker from "../../components/Cards/TournamentDetail/DatePiker.jsx";
import { getServerURL } from "../../utils/constant.js";
import GamingLoader from "../../components/Loader/loader.jsx";
import { useTranslation } from "react-i18next";
import { cardVariantsAni } from "../../components/Animation/animation.jsx";
import { motion } from "motion/react";
import { IMAGES } from "../../components/ui/images/images.js";

const SingleDoubleStages = () => {
  const { t } = useTranslation();
  const { activeTournamentTab, showCalendar } = useSelector(
    (state) => state.constState
  );
  const { activeStage, tournamentStages, loader, nextDayDate, currentDate } =
    useSelector((state) => state.tournament);
  const dispatch = useDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);
  console.log("tournamentStages", tournamentStages);
  let container;

  useEffect(() => {
    if (tournamentStages) {
      container = document.getElementById("Major-final");
      if (window.bracketsViewer && container) {
        if (container.innerHTML) {
          container.innerHTML = "";
        }
        let config = tournamentStages.config;
        if (
          config?.stage &&
          config?.match &&
          config?.round &&
          config?.group &&
          config?.participant
        ) {
          window.bracketsViewer.setParticipantImages(
            config?.participant.map((participant) => ({
              participantId: participant.id,
              imageUrl: getServerURL(participant.imageUrl),
            }))
          );
          window.bracketsViewer.render(
            {
              stages: config?.stage.map((stage) => ({ ...stage, name: " " })),
              matches: config?.match,
              rounds: config?.round,
              groups: config?.group,
              matchGames: [],
              participants: config?.participant,
            },
            {
              selector: `#Major-final`,
              participantOriginPlacement: "none",
            }
          );
        }
      }
    }
  }, [tournamentStages, activeStage, activeTournamentTab]);

  // Detect fullscreen changes and manage state
  useEffect(() => {
    const handleFullscreenChange = () => {
      const el = document.getElementById("Major-final");
      const isInFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );

      if (isInFullscreen && document.fullscreenElement === el) {
        setIsFullscreen(true);
      } else {
        el?.classList.remove("brackt_fullscreen");
        setIsFullscreen(false);
      }
    };

    // Check initial state
    handleFullscreenChange();

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const handleActiveTournamentTab = (tab) => {
    dispatch(setActiveTournamentTab(tab));
  };

  function openFullscreen() {
    const el = document.getElementById("Major-final");
    if (el) {
      el.classList.add("brackt_fullscreen");
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  }

  function closeFullscreen() {
    const el = document.getElementById("Major-final");

    // Exit fullscreen using the appropriate method
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    // Remove fullscreen class and update state
    el?.classList.remove("brackt_fullscreen");
    setIsFullscreen(false);
  }

  if (loader) {
    return <GamingLoader />;
  }

  if (tournamentStages && tournamentStages?.config?.match) {
    return (
      <div id="tournament-tab-contents" className="mt-7">
        <div id="first" className="py-4 active">
          <div
            className={`tab-btn-wp flex justify-between items-center gap-5 ${
              activeTournamentTab === 1 ? "bracket-btn" : ""
            }`}
          >
            <div className="game_status--tab-wrapper text-center md:text-left md:rtl:text-right">
              <div className="game_status--tab sm:w-auto rounded-xl overflow-hidden relative md:left-auto md:-translate-x-0 rtl:translate-x-[0] sm:top-1 top-0 inline-flex justify-center sm:justify-start">
                <button
                  onClick={() => handleActiveTournamentTab(1)}
                  className={`w-[10rem] h-[4rem] md:py-2 md:px-2.5 px-4 py-4 sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300 ${
                    activeTournamentTab === 1
                      ? "active-tab hover:opacity-100 polygon_border"
                      : ""
                  }`}
                >
                  {t("tournament.brackets")}
                </button>
                <button
                  onClick={() => handleActiveTournamentTab(3)}
                  className={`w-[10rem] h-[4rem] md:py-2 md:px-2.5 px-4 py-4 sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300 ${
                    activeTournamentTab === 3
                      ? "active-tab hover:opacity-100 polygon_border"
                      : ""
                  }`}
                >
                  Group Standings
                </button>
                <button
                  onClick={() => handleActiveTournamentTab(2)}
                  className={`w-[10rem] h-[4rem] md:py-2 md:px-2.5 px-4 py-4 sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300 ${
                    activeTournamentTab === 2
                      ? "active-tab hover:opacity-100 polygon_border"
                      : ""
                  }`}
                >
                  {t("tournament.schedule")}
                </button>
              </div>
            </div>

            <div className="relative inline-block">
              {activeTournamentTab === 1 && (
                <div className="full-screen-wp p-2 w-16 h-16 text-center cursor-pointer">
                  {!isFullscreen ? (
                    <div
                      className="full-screen p-3 w-12 h-12 flex items-center justify-center"
                      onClick={() => openFullscreen()}
                    >
                      <img
                        className="w-6 h-6"
                        src={IMAGES.full_screen}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      className="full-screen p-3 w-12 h-12 flex items-center justify-center"
                      onClick={() => closeFullscreen()}
                    >
                      <img
                        className="w-6 h-6"
                        src={IMAGES.exit_screen}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTournamentTab === 2 && (
                <button
                  id="calendar-popup-btn"
                  className="relative calender-btn purple_light bg-no-repeat bg-cover px-5 py-4 flex justify-between items-center gap-1 w-[12.5rem] h-[3.5rem] cursor-pointer"
                  onClick={() => dispatch(setShowCalendar(!showCalendar))}
                >
                  <span className="sm:text-lg text-base font-bold">
                    {currentDate && nextDayDate ? (
                      <>
                        {new Date(currentDate).toLocaleString("en-US", {
                          day: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(nextDayDate).toLocaleString("en-US", {
                          day: "2-digit",
                        })}{" "}
                        <span className="font-normal">
                          {new Date(currentDate).toLocaleString("en-US", {
                            month: "short",
                          })}
                        </span>
                      </>
                    ) : (
                      "Select Date"
                    )}
                  </span>
                  <img
                    className="w-3.5 h-2 object-cover object-center"
                    src={IMAGES.cal_arrow}
                    alt=""
                  />
                </button>
              )}
              {showCalendar && activeTournamentTab === 2 && (
                <div
                  id="calendar-popup"
                  className={`open-cal absolute ltr:right-0 rtl:left-0 z-50 ${
                    window.innerHeight -
                      document
                        .getElementById("calendar-popup-btn")
                        ?.getBoundingClientRect().bottom <
                    300
                      ? "bottom-[100%] mb-2"
                      : "top-[100%] mt-2"
                  }`}
                >
                  <DatePiker
                    startDate={currentDate ? new Date(currentDate) : null}
                    endDate={nextDayDate ? new Date(nextDayDate) : null}
                  />
                </div>
              )}
            </div>
          </div>

          <>
            {activeTournamentTab === 1 && (
              <motion.div
                className="tournament-bracket-wrapper mb-15"
                initial="hidden"
                whileInView="visible"
                variants={cardVariantsAni}
                viewport={{ once: true, amount: 0 }}
              >
                <div
                  id="Major-final"
                  className="!p-0 brackets-viewer !bg-transparent relative"
                  dir="ltr"
                >
                  {isFullscreen && (
                    <div className="fullscreen-close-btn">
                      <button
                        onClick={() => closeFullscreen()}
                        title="Exit Fullscreen"
                      >
                        <img src={IMAGES.exit_screen} alt="Exit Fullscreen" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            {activeTournamentTab === 2 && (
              <div
                className="tournament-bracket-wrapper md:mt-20 mt-15 mb-15"
                initial="hidden"
                whileInView="visible"
                variants={cardVariantsAni}
                viewport={{ once: true, amount: 0 }}
              >
                {tournamentStages?.matcheData.length > 0 ? (
                  <div className="tournament-schedule-card-list grid gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {tournamentStages?.matcheData
                      ?.filter(
                        (item) =>
                          new Date(item.startTime).setHours(0, 0, 0, 0) >=
                            new Date(currentDate).setHours(0, 0, 0, 0) &&
                          new Date(item.startTime).setHours(0, 0, 0, 0) <
                            new Date(nextDayDate).setHours(23, 59, 59, 999)
                      )
                      .map((item, index) => {
                        return <ScheduleCard key={index} item={item} />;
                      })}
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-50 text-xl text-gray-400">
                    {t("tournament.no_matchs_found")}
                  </div>
                )}
              </div>
            )}
            {activeTournamentTab === 3 && (
              <div className="robin-round-standing grid gap-7.5">
                {tournamentStages?.config?.group?.map((group) => {
                  // Filter participants and matches for the current group
                  const groupParticipants =
                    tournamentStages?.config?.participant.filter((p) =>
                      tournamentStages?.config?.match.some(
                        (m) =>
                          m.group_id === group.id &&
                          (m.opponent1?.id === p.id || m.opponent2?.id === p.id)
                      )
                    );
                  const groupMatches = tournamentStages?.config?.match.filter(
                    (m) => m.group_id === group.id
                  );

                  return (
                    <RoundRobinStanding
                      key={group.id}
                      groupData={{
                        participants: groupParticipants,
                        matches: groupMatches,
                      }}
                      groupNumber={group.number}
                    />
                  );
                })}
              </div>
            )}
          </>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center py-50 text-xl text-gray-400">
        {t("tournament.no_data_found")}
      </div>
    );
  }
};

export default SingleDoubleStages;
