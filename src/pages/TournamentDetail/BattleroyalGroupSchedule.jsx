import React, { useState, useEffect } from "react";
import "../../assets/css/homepage.css";
import team_falcons from "../../assets/images/team-falcons.png";
import date_icon from "../../assets/images/date_icon.png";
import pubg_icon from "../../assets/images/pubg_icon.png";
import schdule_down from "../../assets/images/schdule_down.png";
import battale_sahpe_img from "../../assets/images/battale-sahpe-img.png";
export default function BattleRoyalSChedule() {
  const [activeIndex, setActiveIndex] = useState(null); // ✅ now stores index

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scheduleData = [
    {
      map: "Miramar",
      icon: pubg_icon,
      group: "Group 1",
      match: "Match 1",
      teams: [
        {
          position: "1st",
          positionClass: "schdule-common",
          name: "Team Falcons",
          logo: team_falcons,
          points: 4,
          pp: 5,
          kp: 6,
        },
        {
          position: "7th",
          positionClass: "schdule-common-1",
          name: "Team Falcons",
          logo: team_falcons,
          points: 4,
          pp: 5,
          kp: 6,
        },
      ],
      roundIcons: [
        { className: "round-gold", img: team_falcons },
        { className: "round-gold round-gray", img: team_falcons },
        { className: "round-gold round-red", img: team_falcons },
        { className: "round-gold round-common", text: "+9" },
      ],
    },
    // Add more items if needed
  ];

  return (
    <>
      {/* === Schedule Start === */}
      <div className="schedule-date-wp pb-9 lg:pt-17 md:pt-8 pt-5 flex items-center gap-5">
        <img className="w-5 h-6" src={date_icon} alt="" />
        <div className="schdule-date">
          <span className="grad_text-clip sm:text-2xl text-lg font-bold inline-block ltr:pr-5 rtl:pl-5 ltr:mr-5 rtl:ml-5 ltr:border-r rtl:border-l border-[rgb(40,55,66,0.8)]">
            Friday
          </span>
          <span className="grad_text-clip sm:text-2xl text-lg font-bold inline-block">
            Jun 20
          </span>
        </div>
      </div>

      {/* === Accordion Loop === */}
      {scheduleData.map((item, idx) => (
        <div
          key={idx}
          className={`${
            activeIndex === idx ? "active-accordation" : ""
          } schdule-accordion-card w-full mb-6`}
        >
          <div className="schdule-accordion-header md:px-6 px-3 py-5 w-full flex justify-between items-center gap-1 relative">
            <img
              className="battle-shape absolute ltr:left-0 rtl:right-0 top-0 h-full md:w-[22.51rem] -z-1 object-cover object-center"
              src={battale_sahpe_img}
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
                  src={item.icon}
                  alt=""
                />
                <span className="uppercase inline-block md:text-2xl sm:text-lg text-base font-bold">
                  {item.map}
                </span>
              </div>
              <div className="flex items-center lg:gap-6 sm:gap-4 gap-2">
                {item.roundIcons.map((icon, i) =>
                  icon.img ? (
                    <div
                      key={i}
                      className={`${icon.className} md:w-12 md:h-12 w-9 h-9 rounded-full flex items-center justify-center`}
                    >
                      <img
                        className="md:w-6 md:h-6 w-4 h-4"
                        src={icon.img}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      key={i}
                      className={`${icon.className} md:w-12 md:h-12 w-9 h-9 rounded-full flex items-center justify-center`}
                    >
                      <span className="text-base font-semibold text-white">
                        {icon.text}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right section with dropdown toggle */}
            <div className="mob-match-gp flex items-center ltr:lg:pr-[7rem] rtl:lg:pl-[7rem] ltr:sm:pr-[4rem] rtl:sm:pl-[4rem] ltr:pr-[3rem] rtl:pl-[3rem]">
              <div>
                <p className="md:text-xl text-base font-bold text-[#F4F7FF]">
                  {item.group}
                </p>
                <p className="md:text-xl text-base font-bold text-[#F4F7FF]">
                  {item.match}
                </p>
              </div>
              <div
                className="schdule-icon absolute lg:w-[6rem] sm:w-[4rem] w-[3rem] ltr:right-0 rtl:left-0 top-0 h-full flex items-center justify-center cursor-pointer"
                onClick={() => toggleAccordion(idx)} // ✅ Toggle this index
              >
                <img className="sm:w-5 sm:h-3 w-4 h-2" src={schdule_down} alt="" />
              </div>
            </div>
          </div>

          {/* Conditionally visible body */}
          {activeIndex === idx && (
            <div className="schdule-collapse">
              <div className="schdule-accordion-body flex justify-between items-center">
                {item.teams.map((team, tIdx) => (
                  <div
                    key={`${team.name}-${tIdx}`}
                    className={`mob-body-full flex justify-between gap-3 items-center md:p-8 sm:p-5 p-3 w-6/12${
                      tIdx === 0
                        ? " ltr:border-r rtl:border-l border-[rgb(40,55,66,0.4)]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center lg:gap-11 md:gap-4 gap-2">
                      <div className={team.positionClass}>
                        <p className="text-base font-black grad_text-clip uppercase">
                          {team.position}
                        </p>
                      </div>
                      <div className="flex items-center sm:gap-4 gap-2">
                        <img
                          className="md:w-8 md:h-8 h-6 w-6"
                          src={team.logo}
                          alt=""
                        />
                        <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                          {team.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center lg:gap-13 gap-6">
                      <p className="text-lg font-bold text-[#1DED85]">
                        {team.points}
                        <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                          {" "}
                          Points
                        </span>
                      </p>
                      <p className="text-lg font-bold text-[#F4F7FF]">
                        {team.pp}
                        <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                          {" "}
                          PP
                        </span>
                      </p>
                      <p className="text-lg font-bold text-[#F4F7FF]">
                        {team.kp}
                        <span className="text-base font-semibold inline-block text-[#688992] ltr:pl-1 rtl:pr-1">
                          {" "}
                          KP
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {/* === Schedule End === */}
    </>
  );
}
