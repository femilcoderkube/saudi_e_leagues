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
      {/* party-card start */}
      <div className="rounded-xl overflow-hidden bg-[linear-gradient(180deg,rgba(34,35,86,0.2)_0%,rgba(34,35,86,0.2)_100%)] text-white mb-10">
        <div className="flex items-center justify-between ga-2 px-4 py-[1.25rem] bg-[linear-gradient(180deg,rgba(94,95,184,0.32)_0%,rgba(34,35,86,0.32)_100%),linear-gradient(90deg,rgba(68,119,239,0)_0%,rgba(67,109,238,0.096)_100%)] shadow-[inset_0px_2px_2px_0px_#5E5FB81F] backdrop-blur-[12px]">
          <div className="flex items-center sm:gap-4 gap-3">
            <img
              className="sm:w-[1.75rem] w-[1.5rem]"
              src={IMAGES.party_user}
              alt="clock"
            />
            <h3 className="text-[#F4F7FF] text-base sm:text-xl font-medium font_oswald ">
              Party Queue
            </h3>
          </div>
          <div>
            <img src={IMAGES.party_logout} alt="" />
          </div>
        </div>
        <div className="party_container px-4 py-5">
          <div className="grid grid-cols-3 items-center gap-7 justify-between">
            <div className="party-card-wp mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <sub className="flex items-center justify-center absolute -top-2.5 -left-2 w-6 h-6 rounded-full bg-[#0a0c32]">
                    <img className="w-4 h-4" src={IMAGES.party_imogi} alt="" />
                  </sub>
                  <img
                    className="rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]"
                    src={IMAGES.defaultImg}
                    alt=""
                  />
                </div>
                <div className="text-xl font-bold text-white">150</div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <img src={IMAGES.party_winner} alt="" />
                <span className="username font-bold text-base text-[#F4F7FF]">
                  Prime Name
                </span>
              </div>
              <span className="text-sm font-medium text-[#FFD0AF]">
                @ps5 ID
              </span>
            </div>
            <div className="party-card-wp mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <sub className="flex items-center justify-center absolute -top-2.5 -left-2 w-6 h-6 rounded-full bg-[#0a0c32]">
                    <img className="w-4 h-4" src={IMAGES.party_imogi} alt="" />
                  </sub>
                  <img
                    className="rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]"
                    src={IMAGES.defaultImg}
                    alt=""
                  />
                </div>
                <div className="text-xl font-bold text-white">150</div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {/* <img src={IMAGES.party_winner} alt="" /> */}
                <span className="username font-bold text-base text-[#F4F7FF]">
                  Prime Name
                </span>
              </div>
              <span className="text-sm font-medium text-[#FFD0AF]">
                @ps5 ID
              </span>
            </div>
            <div className="party-card-wp mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <sub className="flex items-center justify-center absolute -top-2.5 -left-2 w-6 h-6 rounded-full bg-[#0a0c32]">
                    <img className="w-4 h-4" src={IMAGES.party_imogi} alt="" />
                  </sub>
                  <img
                    className="rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]"
                    src={IMAGES.defaultImg}
                    alt=""
                  />
                </div>
                <div className="text-xl font-bold text-white">150</div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {/* <img src={IMAGES.party_winner} alt="" /> */}
                <span className="username font-bold text-base text-[#F4F7FF]">
                  Prime Name
                </span>
              </div>
              <span className="text-sm font-medium text-[#FFD0AF]">
                @ps5 ID
              </span>
            </div>
            <div className="party-card-wp mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <sub className="flex items-center justify-center absolute -top-2.5 -left-2 w-6 h-6 rounded-full bg-[#0a0c32]">
                    <img className="w-4 h-4" src={IMAGES.party_imogi} alt="" />
                  </sub>
                  <img
                    className="rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]"
                    src={IMAGES.defaultImg}
                    alt=""
                  />
                </div>
                <div className="text-xl font-bold text-white">150</div>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {/* <img src={IMAGES.party_winner} alt="" /> */}
                <span className="username font-bold text-base text-[#F4F7FF]">
                  Prime Name
                </span>
              </div>
              <span className="text-sm font-medium text-[#FFD0AF]">
                @ps5 ID
              </span>
            </div>
            <div className="party-card-wp mx-auto">
              <div className="add-img flex items-center justify-center rounded-full w-[3.125rem] h-[3.125rem] bg-[linear-gradient(180deg,rgba(33,36,92,0.7)_0%,rgba(17,18,60,0.7)_100%)] shadow-[inset_0px_4px_4px_0px_#5472880A] backdrop-blur-[24px] cursor-pointer">
                <span className="text-white text-2xl font-medium">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* party-card end */}

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
