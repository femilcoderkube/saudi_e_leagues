import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/homepage.css";
import team_falcons from "../../assets/images/team-falcons.png";
import date_icon from "../../assets/images/date_icon.png";
import pubg_icon from "../../assets/images/pubg_icon.png";
import schdule_down from "../../assets/images/schdule_down.png";
import battale_sahpe_img from "../../assets/images/battale-sahpe-img.png";
import { useSelector } from "react-redux";
import { getRandomColor, getServerURL } from "../../utils/constant";

export default function BattleRoyalSChedule() {
  const { battleRoyalSchedule, tournamentData ,stageSettings ,nextDayDate ,currentDate} = useSelector(
    (state) => state.tournament
  );

  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef({});

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Convert matcheData to array of objects with key-value pairs
  const convertMatcheDataToArray = (matcheData) => {
    if (!matcheData) return [];

    if (typeof matcheData === "object") {
      return Object.entries(matcheData).map(([key, value]) => value);
    }

    return [];
  };

  // Convert the data to key-value array
  const matcheDataArray = convertMatcheDataToArray(battleRoyalSchedule);

  return (
    <>
      {matcheDataArray?.filter(
                        (item) =>
                          new Date(item.date).setHours(0, 0, 0, 0) >=
                            new Date(currentDate).setHours(0, 0, 0, 0) &&
                          new Date(item.date).setHours(0, 0, 0, 0) <
                            new Date(nextDayDate).setHours(23, 59, 59, 999)
                      )?.map((itemObj, index) => {
        return (
          <div key={`date-${index}`}>
            <div className="schedule-date-wp pb-8 pt-5 flex items-center gap-5">
              <img className="w-5 h-6" src={date_icon} alt="" />
              <div className="schdule-date">
                <span className="grad_text-clip sm:text-2xl text-lg font-bold inline-block ltr:pr-5 rtl:pl-5 ltr:mr-5 rtl:ml-5 ltr:border-r rtl:border-l border-[rgb(40,55,66,0.8)]">
                  {itemObj.dateweekday}
                </span>
                <span className="grad_text-clip sm:text-2xl text-lg font-bold inline-block">
                  {itemObj.dateday}
                </span>
              </div>
            </div>
            {itemObj?.matches?.map((item, idx) => {
              const scores = item?.scores || [];
              const half = Math.ceil(scores.length / 2);
              const iconTeams = scores.length > 3 ? scores.slice(0, 3) : scores;
              const ExtraTeams = scores.length > 3 ? scores.slice(3).length : 0;
              const accordionKey = `S${idx}a${index}`;

              return (
                <div
                  key={accordionKey}
                  className={`${
                    activeIndex === accordionKey ? "active-accordation" : ""
                  } schdule-accordion-card w-full mb-6`}
                >
                  <div 
                    onClick={() => toggleAccordion(accordionKey)}
                    className="schdule-accordion-header md:px-6 px-3 py-5 w-full flex justify-between items-center gap-1 relative cursor-pointer"
                  >
                    <img
                      className="battle-shape absolute ltr:left-0 rtl:right-0 top-0 h-full md:w-[22.51rem] -z-1 object-cover object-center"
                      src={
                        stageSettings?.maps
                          ? getServerURL(stageSettings.maps[item?.matchNumber - 1]?.photo || "")
                          : battale_sahpe_img
                      }
                      alt=""
                    />

                    {/* SVG ClipPath (kept as-is) */}
                    <svg
                      className="absolute"
                      width="0"
                      height="0"
                      viewBox="0 0 360 96"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ position: "absolute" }}
                    >
                      <defs>
                        <clipPath
                          id="customClipPath"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path
                            transform="scale(0.00277778, 0.01041667)"
                            d="M360 0L339.6 56L330.6 48L312 96H0V0H360Z"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="flex items-center lg:gap-10 md:gap-7 gap-5">
                      <div className="battle-shape-text flex items-center md:gap-6 gap-3 w-[21rem]">
                        <img
                          className="md:w-12 md:h-[7.5] sm:w-10 sm:h-[5.5] w-8 h-[3.5]"
                          src={getServerURL(tournamentData?.game?.logo)}
                          alt=""
                        />
                        <span className="uppercase inline-block md:text-2xl sm:text-lg text-base font-bold">
                          { stageSettings?.maps
                          ? stageSettings?.maps[item?.matchNumber - 1]?.name || "" : tournamentData?.game?.name}
                        </span>
                      </div>
                      <div className="flex items-center lg:gap-6 sm:gap-4 gap-2">
                        {/* {iconTeams.map((team, i) => {
                          const classs =
                            i === 0
                              ? ""
                              : i === 1
                              ? "round-gray"
                              : i === 2
                              ? "round-red"
                              : "round-common";
                          return (
                            <div
                              key={i}
                              className={`round-gold ${classs} md:w-12 md:h-12 w-9 h-9 rounded-full flex items-center justify-center`}
                            >
                              {team?.participant?.team?.logoImage ? (
                                <img
                                  src={getServerURL(
                                    team?.participant?.team?.logoImage
                                  )}
                                  alt={team?.participant?.team?.teamName}
                                  className="md:w-6 md:h-6 w-4 h-4"
                                />
                              ) : (
                                <span className="text-base font-semibold text-white">
                                  {team?.participant?.team?.teamName
                                    ?.charAt(0)
                                    ?.toUpperCase() || "?"}
                                </span>
                              )}
                            </div>
                          );
                        })}
                        {ExtraTeams > 0 && (
                          <div
                            className={`round-gold round-common md:w-12 md:h-12 w-9 h-9 rounded-full flex items-center justify-center`}
                          >
                            <span className="text-base font-semibold text-white">
                              +{ExtraTeams}
                            </span>
                          </div>
                          )} */}
                      </div>
                    </div>

                    {/* Right section with dropdown toggle */}
                    <div className="mob-match-gp flex flex-col md:gap-3.5 gap-2 items-center ltr:lg:pr-[7rem] rtl:lg:pl-[7rem] ltr:sm:pr-[4rem] rtl:sm:pl-[4rem] ltr:pr-[3rem] rtl:pl-[3rem]">
                      <div className="flex gap-2 items-center">
                        <p className="md:text-xl text-base font-semibold text-white">
                          Group {item?.groupNumber || 0}
                        </p>
                        <p className="md:text-xl text-base font-semibold text-white">
                          Match {item?.matchNumber || 0}
                        </p>
                      </div>

                      <div className="royal-date-time flex gap-2 items-center">
                        <p className="md:text-xl text-base font-semibold text-[#BABDFF]">
                        12 Jul
                        </p>
                        <p className="md:text-xl text-base font-semibold text-[#7B7ED0]">
                        08:30 PM
                        </p>
                      </div>
                      
                      <div
                        className={`schdule-icon absolute lg:w-[6rem] sm:w-[4rem] w-[3rem] ltr:right-0 rtl:left-0 top-0 h-full flex items-center justify-center cursor-pointer`}
                      >
                        <img
                          className={`sm:w-5 sm:h-3 w-4 h-2`}
                          src={schdule_down}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  {/* Conditionally visible body with smooth animation */}
                  <div 
                    className="schdule-collapse hidden md:block"
                    ref={(el) => (contentRefs.current[accordionKey] = el)}
                  >
                    {(() => {
                      return scores.slice(0, half).map((team1, tIdx) => {
                        const team2 = scores[tIdx + half];

                        return (
                          <div
                            className="schdule-accordion-body flex justify-between items-center"
                            key={`${team1?.participant?._id || "team1"}-${
                              team2?.participant?._id || "team2"
                            }-${tIdx}`}
                          >
                            {/* Left Side (team1) */}
                            <div
                              className={`mob-body-full flex justify-between gap-3 items-center lg:p-8 md:p-5 p-3 w-[50%] ltr:border-r rtl:border-l border-[rgb(40,55,66,0.4)]`}
                            >
                              <div className="flex items-center lg:gap-11 md:gap-4 gap-2">
                                <div className="schdule-common">
                                  <p className="text-base font-black grad_text-clip uppercase w-11">
                                    {tIdx + 1}
                                    {tIdx === 0
                                      ? "st"
                                      : tIdx === 1
                                      ? "nd"
                                      : tIdx === 2
                                      ? "rd"
                                      : "th"}
                                  </p>
                                </div>
                                <div className="flex items-center sm:gap-4 gap-2">
                                  {team1?.participant?.team?.logoImage ? (
                                    <img
                                      src={getServerURL(
                                        team1?.participant?.team?.logoImage
                                      )}
                                      alt={team1?.participant?.team?.teamName}
                                      className="md:w-8 md:h-8 h-6 w-6"
                                    />
                                  ) : (
                                    <div
                                      className="mob-sch-img md:w-8 md:h-8 h-6 w-6"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: getRandomColor(
                                          team1?.participant?._id
                                        ),
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                        borderRadius: "50%",
                                      }}
                                    >
                                      {team1?.participant?.team?.teamName
                                        ?.charAt(0)
                                        ?.toUpperCase() || "?"}
                                    </div>
                                  )}

                                  <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                                    {team1?.participant?.team?.teamName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center xl:gap-13 gap-4">
                                <p className="text-lg font-bold text-[#1DED85]">
                                  {team1?.totalPoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    Points
                                  </span>
                                </p>
                                <p className="text-lg font-bold text-[#F4F7FF]">
                                  {team1?.placePoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    PP
                                  </span>
                                </p>
                                <p className="text-lg font-bold text-[#F4F7FF]">
                                  {team1?.killPoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    KP
                                  </span>
                                </p>
                              </div>
                            </div>
                            {/* Right Side (team2) */}
                            <div
                              className={`mob-body-full flex justify-between gap-3 items-center lg:p-8 md:p-5  p-3 w-[50%] ltr:border-r rtl:border-l border-[rgb(40,55,66,0.4)]`}
                            >
                              <div className="flex items-center lg:gap-11 md:gap-4 gap-2">
                                <div className="schdule-common-1">
                                  <p className="text-base font-black grad_text-clip uppercase w-11">
                                    {tIdx + 1 + half}
                                    {tIdx + half === 0
                                      ? "st"
                                      : tIdx + half === 1
                                      ? "nd"
                                      : tIdx + half === 2
                                      ? "rd"
                                      : "th"}
                                  </p>
                                </div>
                                <div className="flex items-center sm:gap-4 gap-2">
                                  {team2?.participant?.team?.logoImage ? (
                                    <img
                                      src={getServerURL(
                                        team2?.participant?.team?.logoImage
                                      )}
                                      alt={team2?.participant?.team?.teamName}
                                      className="md:w-8 md:h-8 h-6 w-6"
                                    />
                                  ) : (
                                    <div
                                      className="mob-sch-img md:w-8 md:h-8 h-6 w-6"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: getRandomColor(
                                          team2?.participant?._id
                                        ),
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                        borderRadius: "50%",
                                      }}
                                    >
                                      {team2?.participant?.team?.teamName
                                        ?.charAt(0)
                                        ?.toUpperCase() || "?"}
                                    </div>
                                  )}

                                  <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                                    {team2?.participant?.team?.teamName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center lg:gap-13 gap-6">
                                <p className="text-lg font-bold text-[#1DED85]">
                                  {team2?.totalPoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    Points
                                  </span>
                                </p>
                                <p className="text-lg font-bold text-[#F4F7FF]">
                                  {team2?.placePoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    PP
                                  </span>
                                </p>
                                <p className="text-lg font-bold text-[#F4F7FF]">
                                  {team2?.killPoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    KP
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                  <div 
                    className="schdule-collapse block  md:hidden"
                    ref={(el) => (contentRefs.current[accordionKey] = el)}
                  >
                    {(() => {
                      return scores.map((team1, tIdx) => {
                        

                        return (
                          <div
                            className="schdule-accordion-body flex justify-between items-center"
                            key={`${team1?.participant?._id || "team1"}-${tIdx}`}
                          >
                            {/* Left Side (team1) */}
                            <div
                              className={`mob-body-full flex justify-between gap-3 items-center lg:p-8 md:p-5 p-3 w-[50%] ltr:border-r rtl:border-l border-[rgb(40,55,66,0.4)]`}
                            >
                              <div className="flex items-center lg:gap-11 md:gap-4 gap-2">
                                <div className="schdule-common">
                                  <p className="text-base font-black grad_text-clip uppercase w-11">
                                    {tIdx + 1}
                                    {tIdx === 0
                                      ? "st"
                                      : tIdx === 1
                                      ? "nd"
                                      : tIdx === 2
                                      ? "rd"
                                      : "th"}
                                  </p>
                                </div>
                                <div className="flex items-center sm:gap-4 gap-2">
                                  {team1?.participant?.team?.logoImage ? (
                                    <img
                                      src={getServerURL(
                                        team1?.participant?.team?.logoImage
                                      )}
                                      alt={team1?.participant?.team?.teamName}
                                      className="md:w-8 md:h-8 h-6 w-6"
                                    />
                                  ) : (
                                    <div
                                      className="mob-sch-img md:w-8 md:h-8 h-6 w-6"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: getRandomColor(
                                          team1?.participant?._id
                                        ),
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                        borderRadius: "50%",
                                      }}
                                    >
                                      {team1?.participant?.team?.teamName
                                        ?.charAt(0)
                                        ?.toUpperCase() || "?"}
                                    </div>
                                  )}

                                  <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                                    {team1?.participant?.team?.teamName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center xl:gap-13 gap-4">
                                <p className="text-lg font-bold text-[#1DED85]">
                                  {team1?.totalPoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    Points
                                  </span>
                                </p>
                                <p className="text-lg font-bold text-[#F4F7FF]">
                                  {team1?.placePoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    PP
                                  </span>
                                </p>
                                <p className="text-lg font-bold text-[#F4F7FF]">
                                  {team1?.killPoints || 0}
                                  <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                                    {" "}
                                    KP
                                  </span>
                                </p>
                              </div>
                            </div>
                          
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}