import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TournamentDatepiker from "./DatePiker.jsx";
import cal_arrow from "../../assets/images/cal_arrow.png";
import {
  setActiveTournamentTab,
  setShowCalendar,
} from "../../app/slices/constState/constStateSlice";
import BattleRoyalStanding from "./BattleroyalGroupStandings.jsx";
import BattleRoyalSChedule from "./BattleroyalGroupSchedule.jsx";
import GamingLoader from "../../components/Loader/loader.jsx";

export default function BattleRoyalStage() {
  const {
    battleRoyalSchedule,
    battleRoyalGroup,
    loader,
    nextDayDate,
    currentDate,
  } = useSelector((state) => state.tournament);
  const {
    activeTournamentTab,
    showCalendar,
    selectedStartDate,
    selectedEndDate,
  } = useSelector((state) => state.constState);

  const dispatch = useDispatch();
  const handleActiveTournamentTab = (tab) => {
    dispatch(setActiveTournamentTab(tab));
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return {
      day: dateObj.getDate(),
      month: dateObj.toLocaleString("en", { month: "short" }),
    };
  };

  // Get display dates
  const startDateDisplay = formatDateForDisplay(selectedStartDate);
  const endDateDisplay = formatDateForDisplay(selectedEndDate);

  if (loader) {
    return <GamingLoader />;
  }

  if (
    battleRoyalSchedule &&
    Array.isArray(battleRoyalGroup) &&
    battleRoyalGroup.length > 0
  ) {
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
                    Group Standings
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
             {activeTournamentTab === 2 && <button
                className="relative calender-btn text-[#BABDFF] bg-no-repeat bg-cover px-5 py-4 flex justify-between items-center gap-1 w-[12.5rem] h-[3.5rem] cursor-pointer"
                onClick={() => dispatch(setShowCalendar(!showCalendar))}
              >
                <span className="sm:text-lg text-base font-bold">
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
                </span>
                <img
                  className="w-3.5 h-2 object-cover object-center"
                  src={cal_arrow}
                  alt=""
                />
              </button>}

              {/* Calendar Dropdown */}
              {(showCalendar && activeTournamentTab === 2 ) && (
                <div className="open-cal absolute ltr:right-0 rtl:left-0 top-[100%] z-50">
                  <TournamentDatepiker
                    startDate={new Date(currentDate)}
                    endDate={new Date(nextDayDate)}
                  />
                </div>
              )}
            </div>
          </div>
          <>
            {activeTournamentTab === 1 && (
              <div className="tournament-bracket-wrapper mb-15">
                <BattleRoyalStanding />
              </div>
            )}
            {activeTournamentTab === 2 && (
              <div className="tournament-bracket-wrapper mb-15">
                <BattleRoyalSChedule />
              </div>
            )}
          </>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center py-50 text-xl text-gray-400">
        No data found
      </div>
    );
  }
}
