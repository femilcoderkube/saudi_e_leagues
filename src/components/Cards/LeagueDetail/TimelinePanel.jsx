import React from "react";
import { formatDateToMonthDay } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setTimeLineCard } from "../../../app/slices/constState/constStateSlice";
import { IMAGES } from "../../ui/images/images";

const TimelinePanel = () => {
  const { leagueData } = useSelector((state) => state.leagues);
  const { tournamentData } = useSelector((state) => state.tournament);
  const { timeLineCard } = useSelector((state) => state.constState);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // Determine which data to use based on the path
  let timelineSource;
  if (
    typeof window !== "undefined" &&
    window.location.pathname.toLowerCase().includes("tournament")
  ) {
    timelineSource = tournamentData?.timeLine;
  } else {
    timelineSource = leagueData?.timeLine;
  }

  return (
    <>
      <div className="timeline-card rounded-xl overflow-hidden bg-[#0E123A] text-white md:order-3 order-1">
        <div
          className={`timeline-card__header flex items-center gap-3 px-4 py-[1.4rem] border-b border-[#2A2F64] ${
            !timeLineCard ? "ActiveArrow" : ""
          }`}
          onClick={() => dispatch(setTimeLineCard(!timeLineCard))}
        >
          <img
            className="sm:w-[1.75rem] w-[1.5rem]"
            src={IMAGES.timelineClock}
            alt="clock"
          />
          <h3 className="timeline-card__title text-base sm:text-xl font_oswald ">
            {t("lobby.tournament_timeline")}
          </h3>
        </div>
        {
          <div
            className={`timeline_container ${
              timeLineCard ? "hidden md:block" : ""
            }`}
          >
            <div
              className={`timeline-card__steps p-4 ltr:pr-18 rtl:pl-18 flex flex-col gap-4 sd_before relative`}
            >
              {timelineSource?.map((step, index) => {
                let isActive = new Date(step.startDate) < new Date();
                return (
                  <div
                    key={index}
                    className={`timeline_wrap relative sd_after sd_before ${
                      isActive ? "completed" : "disabled"
                    }`}
                  >
                    <div className="timeline-step bg-no-repeat flex flex-col gap-2 py-[1rem] px-4">
                      <div className="timeline-step__title text-md sm:text-lg">
                        {i18n.language === "ar" ? step.titleAr : step.title}
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
        }
      </div>
    </>
  );
};

export default TimelinePanel;
