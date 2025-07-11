import React from "react";
import timelineClock from "../../assets/images/timline_clock.png";
import { formatDateToMonthDay } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const TimelineCard = () => {
  const { leagueData } = useSelector((state) => state.leagues);
  const allStepsCompleted = leagueData?.timeLine?.every(
    (step) => new Date(step.endDate) < new Date()
  );
  const { t } = useTranslation();

  return (
    <div className="timeline-card rounded-xl overflow-hidden bg-[#0E123A] text-white">
      <div className="timeline-card__header flex items-center gap-3 px-4 py-[1.4rem] border-b border-[#2A2F64]">
        <img
          className="sm:w-[1.75rem] w-[1.5rem]"
          src={timelineClock}
          alt="clock"
        />
        <h3 className="timeline-card__title text-base sm:text-xl font_oswald ">
          {t("lobby.tournament_timeline")}
        </h3>
      </div>
      <div className="timeline_container custom_scroll">
        <div
          className={`timeline-card__steps p-4 ltr:pr-18 rtl:pl-18 flex flex-col gap-4 sd_before relative ${
            allStepsCompleted ? "completed" : "disabled"
          }`}
        >
          {leagueData?.timeLine?.map((step, index) => {
            let isActive = new Date(step.endDate) < new Date();
            return (
              <div
                key={index}
                className="timeline_wrap relative sd_after sd_before"
              >
                <div className="timeline-step bg-no-repeat flex flex-col gap-2 py-[1rem] px-4">
                  <div className="timeline-step__title text-md sm:text-lg">
                    {step.title}
                  </div>
                  <div className="timeline-step__date text-sm sm:text-base purple_light">
                    {formatDateToMonthDay(step.startDate) +
                      " - " +
                      formatDateToMonthDay(step.endDate)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
