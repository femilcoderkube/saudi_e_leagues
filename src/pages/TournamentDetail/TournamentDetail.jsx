import teamSizeImage from "../../assets/images/teamSize.png";

import center_league from "../../assets/images/center_league.png";
import { useParams } from "react-router-dom";
import { formatAmountWithCommas, getServerURL, stageTypes } from "../../utils/constant.js";

import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GamingLoader from "../../components/Loader/loader.jsx";
import SingleDoubleStages from "./singleDoubleStages.jsx";
import {
  getTournamentStages,
  startTournamentSocket,
} from "../../app/socket/socket.js";
import {
  clearData,
  setActiveStage,
} from "../../app/slices/tournamentSlice/tournamentSlice.js";
import BattleRoyalStage from "./BattleRoyalStage.jsx";
import {
  leftToRight,
  rightToLeft,
  cardVariantsAni,
} from "../../components/Animation/animation.jsx";
import { motion } from "motion/react";
import TournamentInfoBar from "../../components/TournamentInfoBar/TournamentInfoBar.jsx";

const TournamentDetail = () => {
  const { t, i18n } = useTranslation();
  const { tournamentData, activeStage, loader } = useSelector(
    (state) => state.tournament
  );

  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { user } = useSelector((state) => state.auth);
  const { tId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSocketConnected) {
      dispatch(clearData());
      startTournamentSocket({
        tId: tId,
        user: user,
        isSocketConnected: isSocketConnected,
      });
    }
  }, [isSocketConnected, tId]);

  useEffect(() => {
    if (tournamentData?.title) {
      document.title = `Prime eLeague - ${tournamentData?.title}`;
    }
  }, [tournamentData]);

  useEffect(() => {
    if (tournamentData?.stages?.length > 0 && isSocketConnected) {
      getTournamentStages({
        stageId: tournamentData?.stages[activeStage]?._id,
        stageType: tournamentData?.stages[activeStage]?.stageType,
        isSocketConnected: isSocketConnected,
        user: user,
      });
    }
  }, [tournamentData?.stages, activeStage, isSocketConnected]);

  // Empty dependency array means this runs once after mount
  return (
    <main className="flex-1 tournament_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      {!tournamentData ? (
        <GamingLoader />
      ) : (
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex flex-col md:flex-row items-center justify-between md:gap-0 gap-8 mb-10">
            <motion.div
              className="sd_content-left flex  items-center gap-12 md:gap-10 md:pb-6 pb-9.5 mr-[-1rem] relative order-2 md:order-1"
              variants={leftToRight}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="sd_com--logo cursor-hide w-[8.75rem] md:w-[18.5rem]">
                <img
                  src={getServerURL(tournamentData.internalPhoto)}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="sd_league--info flex-1">
                <h1 className="uppercase text-2xl md:text-5xl !font-black tracking-wide">
                  {i18n.language === "ar"
                    ? tournamentData?.titleAr
                    : tournamentData?.title}
                </h1>
                <h2 className="league_price text-2xl md:text-5xl !font-black font_oswald pt-5 sm:pt-3.5 md:pt-10 sm:pb-6 pb-3 yellow_grad-bg grad_text-clip">
                  <span className="icon-saudi_riyal !p-0"></span>
                  {formatAmountWithCommas(tournamentData?.prizepool)}
                </h2>
                <span className="block purple_col text-sm sm:text-xl">
                  {t("league.prize_pool")}
                </span>
              </div>
            </motion.div>
            <motion.div
              className="sd_content-right flex flex-col-reverse sm:flex-row items-center md:items-start order-1 md:order-2"
              variants={rightToLeft}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="player_img flex flex-row items-center gap-2 sm:gap-5">
                <div className="player_one sd_before relative gradiant_bg con_center w-[41.02rem] h-[27.33rem]">
                  <img
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    src={getServerURL(tournamentData.headerPhoto)}
                    alt=""
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-center ">
            <div className="sd_content-top order-2 flex-col xl:flex-row md:order-1 flex gap-5 justify-between w-full">
              <motion.div
                className="sd_game_info--wrap md:flex-row flex-1 inline-flex gap-[2.063rem] flex-wrap w-full justify-center xl:justify-start"
                initial="hidden"
                whileInView="visible"
                variants={cardVariantsAni}
                viewport={{ once: true, amount: 0.3 }}
              >
                <TournamentInfoBar
                  title={t("league.game")}
                  logo={tournamentData?.game?.logo}
                  name={tournamentData?.game?.shortName}
                />
                <TournamentInfoBar
                  title={t("league.platform")}
                  logo={tournamentData?.platform?.logo}
                  name={tournamentData?.platform?.name?.toUpperCase()}
                />
                <TournamentInfoBar
                  title={t("league.team_size")}
                  logo={teamSizeImage}
                  name={tournamentData.maxPlayersPerTeam}
                  type={1}
                />
                <TournamentInfoBar
                  title={t("league.participants")}
                  logo={teamSizeImage}
                  name={`${tournamentData?.totalRegistrations}/
                  ${tournamentData?.maxParticipants}`}
                  type={2}
                />
              </motion.div>
            </div>
          </div>

          <div className="sd_tournament-wrapper">
            <div className="sd_tournament-content">
              <div className="mx-auto mt-4">
                {/* <!-- Tabs --> */}
                <motion.ul
                  id="tournament-tabs"
                  className="sa__tournament-tabs inline-flex md:flex-row flex-col pt-2 w-full md:border-b md:border-gray-200/20"
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariantsAni}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {tournamentData?.stages?.map((item, index) => {
                    return (
                      <li
                        className={`font-semibold  cursor-pointer md:border-b-0 border-b border-gray-200/20 ${index == activeStage ? "active" : ""
                          }`}
                      >
                        <div
                          id={`stage-${index}`}
                          onClick={() =>
                            activeStage != index
                              ? dispatch(setActiveStage(index))
                              : null
                          }
                          className="px-4 py-2 pl-0 flex items-center justify-center text-xl whitespace-nowrap"
                        >
                          {item?.stageName}
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>

                {loader ? (
                 <GamingLoader/>
                ) : tournamentData?.stages[activeStage]?.stageType ==
                  stageTypes.BattleRoyal ? (
                  <BattleRoyalStage />
                ) : (
                  <SingleDoubleStages />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <svg
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id="game_polygon_clip" clipPathUnits="objectBoundingBox">
            <path
              d="
                        M0.3649,0.0833
                        H0.6351
                        L0.6622,0
                        H0.9459
                        L1,0.1667
                        V0.8333
                        L0.9459,1
                        H0.6622
                        L0.6351,0.9167
                        H0.3649
                        L0.3378,1
                        H0.0541
                        L0,0.8333
                        V0.1667
                        L0.0541,0
                        H0.3378
                        L0.3649,0.0833
                        Z
                      "
            />
          </clipPath>
        </defs>
      </svg>
    </main>
  );
};

export default TournamentDetail;
