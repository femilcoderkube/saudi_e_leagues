import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveTournamentTab,
  setShowCalendar,
} from "../../app/slices/constState/constStateSlice.js";
import TournamentScheduleCard from "./TournamentScheduleCard.jsx";
import TournamentDatepiker from "./DatePiker.jsx";
import cal_arrow from "../../assets/images/cal_arrow.png";
import center_league from "../../assets/images/center_league.png";
import { getServerURL } from "../../utils/constant.js";
import GamingLoader from "../../components/Loader/loader.jsx";

const SingleDoubleStages = () => {
  const { activeTournamentTab, showCalendar, selectedStartDate, selectedEndDate } = useSelector(
    (state) => state.constState
  );
  const { activeStage, tournamentStages} = useSelector(
    (state) => state.tournament
  );
  const dispatch = useDispatch();

  // Format date for display
  const formatDateForDisplay = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return {
      day: dateObj.getDate(),
      month: dateObj.toLocaleString('en', { month: 'short' })
    };
  };

  // Get display dates
  const startDateDisplay = formatDateForDisplay(selectedStartDate);
  const endDateDisplay = formatDateForDisplay(selectedEndDate);

  useEffect(() => {
    if (tournamentStages) {
      let container = document.getElementById("Major-final");
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

  const handleActiveTournamentTab = (tab) => {
    dispatch(setActiveTournamentTab(tab));
  };

  if (tournamentStages && tournamentStages?.config?.match) {
    return (
      <div id="tournament-tab-contents" className="mt-7">
        <div id="first" className="py-4 active">
          <div className="tab-btn-wp flex sm:justify-between justify-center items-center gap-5">
            <div className="game_status--tab-wrapper text-center md:text-left md:rtl:text-right">
              {
                <div class="game_status--tab sm:w-auto rounded-xl overflow-hidden relative md:left-auto md:-translate-x-0 rtl:translate-x-[0] top-1  inline-flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleActiveTournamentTab(1)}
                    class={`w-[10rem] h-[4rem] md:py-2 md:px-2.5 px-4 py-4 sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
                ${
                  activeTournamentTab === 1
                    ? "active-tab hover:opacity-100 polygon_border"
                    : ""
                }`}
                  >
                    Brackets
                  </button>

                  <button
                    onClick={() => handleActiveTournamentTab(2)}
                    class={`w-[10rem] h-[4rem] md:py-2 md:px-2.5 px-4 py-4 sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
                ${
                  activeTournamentTab === 2
                    ? "active-tab hover:opacity-100 polygon_border"
                    : ""
                }`}
                  >
                    Schedule
                  </button>
                </div>
              }
            </div>
            <div className="relative inline-block">
              {/* Displayed Range */}
              { activeTournamentTab === 2 &&  <button
                className="relative calender-btn text-[#BABDFF] bg-no-repeat bg-cover px-5 py-4 flex justify-between items-center gap-1 w-[12.5rem] h-[3.5rem] cursor-pointer"
                onClick={() => dispatch(setShowCalendar(!showCalendar))}
              >
                <span className="sm:text-lg text-base font-bold">
                  {startDateDisplay && endDateDisplay ? (
                    <>
                      {startDateDisplay.day} - {endDateDisplay.day} <span className="font-normal">{endDateDisplay.month}</span>
                    </>
                  ) : (
                    <>
                      12 - 17 <span className="font-normal">Jul</span>
                    </>
                  )}
                </span>
                <img
                  className="w-3.5 h-2 object-cover object-center"
                  src={cal_arrow}
                  alt=""
                />
              </button>}

              {/* Calendar Dropdown */}
              {showCalendar && activeTournamentTab === 2 && (
                <div className="open-cal absolute ltr:right-0 rtl:left-0 top-[100%] z-50">
                  <TournamentDatepiker />
                </div>
              )}
            </div>
          </div>

          <>
            {activeTournamentTab === 1 && (
              <div className="tournament-bracket-wrapper mb-15">
                <div
                  id={`Major-final`}
                  className="!p-0 brackets-viewer !bg-transparent"
                  dir="ltr"
                ></div>
              </div>
            )}
            {activeTournamentTab === 2 && (
              <div className="tournament-bracket-wrapper md:mt-20 mt-15 mb-15">
                {tournamentStages?.matcheData.length > 0 ? (
                  <div className="tournament-schedule-card-list grid gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {tournamentStages?.matcheData?.map((item, index) => {
                      return <TournamentScheduleCard key={index} item={item} />;
                    })}
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-50 text-xl text-gray-400">
                    No Matchs found
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    );
  } else  {
    return (
      <div className="flex justify-center items-center py-50 text-xl text-gray-400">
        No data found
      </div>
    );
  }
};

export default SingleDoubleStages;
