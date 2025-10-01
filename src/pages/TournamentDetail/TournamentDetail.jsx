import { useNavigate, useParams } from "react-router-dom";
import TimelinePanel from "../../components/Cards/LeagueDetail/TimelinePanel.jsx";
import {
  formatAmountWithCommas,
  getServerURL,
  stageTypes,
} from "../../utils/constant.js";
import PDFPopup from "../../components/Overlays/LeagueDetail/PDFPopup.jsx";
import DiscordPopup from "../../components/Overlays/LeagueDetail/DiscordPopup.jsx";

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
import DetailItem from "../../components/Details/DetailItem.jsx";
import { IMAGES } from "../../components/ui/images/images.js";
import { Images } from "lucide-react";
import ManageTeamModal from "../../components/ManageTeam/ManageTeamModal.jsx";
import PDFViewer from "../../components/Overlays/LeagueDetail/PDFViewer.jsx";
import { getTeamData } from "../../app/slices/TournamentTeam/TournamentTeamSlice.js";
const TournamentDetail = () => {
  const { t, i18n } = useTranslation();
  const { tournamentData, activeStage, loader } = useSelector(
    (state) => state.tournament
  );

  const [showModal, setShowModal] = useState(false);
  const { currentTeam } = useSelector((state) => state.tournamentTeam);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { user } = useSelector((state) => state.auth);
  const { id, tId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [condition] = useState("gn");

  useEffect(() => {
    if (user?._id) {
      dispatch(getTeamData(user._id));
    }
  }, [user?._id]);

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
    if (
      tournamentData?.stages?.length > 0 &&
      isSocketConnected &&
      typeof activeStage === "number" &&
      activeStage > -1
    ) {
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
              viewport={{ once: true, amount: 0.3 }}
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
              viewport={{ once: true, amount: 0.3 }}
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
          <div className="about-tornament flex xl:items-start items-center xl:flex-nowrap flex-wrap md:flex-row flex-col md:gap-[3rem] gap-5">
            <div className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-center ">
              <div className="sd_content-top order-2 flex-col xl:flex-row md:order-1 flex gap-5 justify-between w-full">
                <motion.div
                  className="sd_game_info--wrap md:flex-row lg:flex-nowrap flex-wrap flex-1 inline-flex gap-[2.063rem] w-full justify-center xl:justify-start"
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariantsAni}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <DetailItem
                    title={t("league.game")}
                    logo={tournamentData?.game?.logo}
                    name={tournamentData?.game?.shortName}
                  />
                  <DetailItem
                    title={t("league.platform")}
                    logo={tournamentData?.platform?.logo}
                    name={tournamentData?.platform?.name?.toUpperCase()}
                  />
                  <DetailItem
                    title={t("league.team_size")}
                    logo={IMAGES.teamSizeImage}
                    name={tournamentData.maxPlayersPerTeam}
                    type={1}
                  />
                  <DetailItem
                    title={t("league.participants")}
                    logo={IMAGES.teamSizeImage}
                    name={`${tournamentData?.totalRegistrations}/
                  ${tournamentData?.maxParticipants}`}
                    type={2}
                  />
                </motion.div>
              </div>
            </div>
            <div
              onClick={() => dispatch(setRegistrationModal(true))}
              className="common-width join_btn hover:opacity-60 duration-300 mb-8 block sd_before relative cursor-pointer"
            >
              <span
                className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-[1.375rem]"
                style={{
                  fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
                  fontWeight: "bold",
                  textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                {t("images.Registerog")}
              </span>

              <img
                className="mx-auto"
                src={
                  condition === "og" ? IMAGES.ragister_og : IMAGES.ragister_gn
                }
                alt=""
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="sd_tournament-wrapper">
            <div className="sd_tournament-content">
              <div className="mx-auto mt-4">
                {/* <!-- Tabs --> */}
                <motion.ul
                  id="tournament-tabs"
                  className="sa__tournament-tabs inline-flex md:flex-row flex-col pt-2 w-full"
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariantsAni}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <li
                    className={`font-semibold cursor-pointer md:border-r  border-gray-200/20 ${
                      activeStage === -1 ? "active" : ""
                    }`}
                  >
                    <div
                      id={`stage-overview`}
                      onClick={() =>
                        activeStage !== -1 ? dispatch(setActiveStage(-1)) : null
                      }
                      className={`px-4 py-2 pl-0 flex items-center justify-center text-xl whitespace-nowrap ${
                        activeStage === -1
                          ? "text-blue-500 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      <img
                        src={IMAGES.maskgroup}
                        alt="Overview Icon"
                        className="w-6 h-6 mr-2"
                      />
                      {t("tournament.overview")}
                    </div>
                  </li>
                  {tournamentData?.stages?.map((item, index) => {
                    return (
                      <li
                        className={`font-semibold cursor-pointer ${
                          index === activeStage ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div
                          id={`stage-${index}`}
                          onClick={() =>
                            activeStage !== index
                              ? dispatch(setActiveStage(index))
                              : null
                          }
                          className={`px-4 py-2 pl-0 flex items-center justify-center text-xl whitespace-nowrap ${
                            index === activeStage
                              ? "text-blue-500 font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          {item?.stageName}
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>

                {loader ? (
                  <GamingLoader />
                ) : activeStage === -1 ? (
                  <div className="mt-8">
                    {/* Overview content: static summary */}
                    <div className="">
                      <div className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-start sm:mb-16">
                        <motion.div
                          className="sd_content-left order-2 md:order-1 shrink-0 xl:max-w-[57.5rem] w-full"
                          variants={leftToRight}
                          custom={0}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.1 }}
                        >
                          <div className="your-team-card rounded-2xl md:mb-12 mb-9 bg-[linear-gradient(183.7deg,rgba(94,95,184,0.2)_3.03%,rgba(34,35,86,0.2)_97.05%)] shadow-[inset_0_2px_2px_0_rgba(94,95,184,0.12)] backdrop-blur-[0.75rem]">
                            <div className="flex sm:items-center sm:flex-row flex-col rounded-t-2xl justify-between md:gap-3 gap-2 md:px-8 md:py-5 p-5 border-b border-[#28374299] bg-[linear-gradient(180deg,rgba(94,95,184,0.3)_0%,rgba(34,35,86,0.4)_100%)] shadow-[inset_0_2px_2px_rgba(94,95,184,0.2)]">
                              <div className="flex flex-wrap items-center sm:gap-4 gap-2">
                                <span className="text-[#FFF] md:text-xl text-lg font-bold">
                                  {t("league.yourteam")}
                                </span>
                                <span className="text-[#9d9d9d] md:text-lg text-base font-semibold">
                                  {t("tournament.invite_players_to_team", {
                                    count: tournamentData?.maxPlayersPerTeam,
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[#9d9d9d] md:text-lg text-base font-semibold">
                                  {t("Not Ready")}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-[linear-gradient(180deg,#ED1D4A_0%,#BC096B_107.14%)] shadow-[inset_0px_4px_4px_0px_#FFFFFF3D,0px_4px_24px_0px_#ED1D4A1F] inline-block"></span>
                              </div>
                            </div>
                            <div className="flex items-center sm:flex-row flex-col gap-4 justify-between md:px-8 md:py-6 p-5">
                              <div className="flex items-center gap-2">
                                {/* Team Avatars */}
                                <div className="md:w-16 md:h-16 sm:w-12 sm:h-12 w-10 h-10 rounded-full overflow-hidden bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)] flex items-center justify-center">
                                  <img
                                    src={IMAGES.defaultImg}
                                    alt="Player 1"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {Array.from({
                                  length: Math.max(
                                    0,
                                    (tournamentData?.maxPlayersPerTeam || 1) - 1
                                  ),
                                }).map((_, idx) => (
                                  <div
                                    key={idx}
                                    className="md:w-16 md:h-16 sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)] flex items-center justify-center opacity-40"
                                  >
                                    {/* Empty slot */}
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center md:gap-10 gap-4">
                                <button
                                  className="text-[#fff] font-bold cursor-pointer manage-team"
                                  onClick={() => setIsManageOpen(true)} // open modal
                                >
                                  {t("tournament.manageteam")}
                                </button>

                                {/* <button
                                  className="cursor-pointer px-6.5 py-2.5 md:text-lg text-base font-bold rounded-xl text-[#fff] bg-[linear-gradient(3deg,rgba(67,75,233,1)_0%,rgba(70,181,249,1)_110%)]"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `/${id}/lobby/tournament/${tId}/register`
                                    );
                                  }}
                                >
                                  {t("tournament.Register")}
                                </button> */}
                              </div>
                            </div>
                          </div>
                          <div className="about-tournament-card">
                            <h3 className="sm:text-[2rem] text-2xl grad_text-clip !font-black sm:mb-8 mb-6 tracking-wide uppercase bg-[linear-gradient(180deg,rgb(244_247_255)_0%,rgba(186,189,255,1)_36%,rgba(123,126,208,1)_66%)]">
                              {t("league.about_tournament")}
                            </h3>
                            <p
                              className="text-[#9d9d9d] md:text-xl text-lg font-semibold sm:mb-6 mb-4"
                              dangerouslySetInnerHTML={{
                                __html:
                                  i18n.language === "ar"
                                    ? tournamentData?.descriptionAr
                                    : tournamentData?.description,
                              }}
                            />
                            {/* {t(
                                "The open qualifiers kick off for just 4 days, followed by the 3-day online major packed with excitement! The competition peaks in the 2-day major finals full of action and challenges."
                              )} */}

                            {/* <p className="text-[#9d9d9d] md:text-xl text-lg font-semibold">
                              {t(
                                "Don't miss your chance!! join now and showcase your skills!"
                              )}
                            </p> */}
                            {/* <div className="flex flex-col sm:flex-row sm:gap-8 gap-5 sm:mt-12 mt-8">
                              <a
                                href="https://discord.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 max-w-[20.75rem] flex items-center gap-4 p-2 pr-6 rounded-xl text-[#F4F7FF] font-semibold md:text-lg text-base bg-[linear-gradient(180deg,rgba(94,95,184,0.3)_0%,rgba(34,35,86,0.4)_100%)] shadow-[inset_0_2px_2px_rgba(94,95,184,0.2)]"
                              >
                                <span className="icon-discord flex items-center justify-center rounded-lg md:w-12 md:h-12 w-10 h-10 bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
                                  <img src={IMAGES.discord} />
                                </span>
                                {t("tournament.discordsupport")}
                                <span className="ltr:ml-auto rtl:mr-auto icon-arrow-right text-[#A6B6C6] rtl:[transform:rotateY(180deg)]">
                                  <img src={IMAGES.discord_arrow} alt="" />
                                </span>
                              </a>
                              <button
                                className="flex-1 max-w-[20.75rem] flex items-center gap-4 p-2 pr-6 rounded-xl text-[#F4F7FF] font-semibold md:text-lg text-base bg-[linear-gradient(180deg,rgba(94,95,184,0.3)_0%,rgba(34,35,86,0.4)_100%)] shadow-[inset_0_2px_2px_rgba(94,95,184,0.2)] cursor-pointer"
                                onClick={handleOpen}
                              >
                                <span className="icon-shield flex items-center justify-center rounded-lg md:w-12 md:h-12 w-10 h-10 bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
                                  <img src={IMAGES.rules_icon} alt="" />
                                </span>
                                {t("tournament.Rules_Regulations")}
                                <span className="ltr:ml-auto rtl:mr-auto icon-arrow-right text-[#A6B6C6] rtl:[transform:rotateY(180deg)]">
                                  <img src={IMAGES.discord_arrow} alt="" />
                                </span>
                              </button>
                            </div> */}
                          </div>
                          <div
                            // Static accordion, no dynamic handlers or data
                            className="about-accordation schdule-accordion-header md:px-6 px-3 py-5 w-full flex justify-between items-center gap-1 relative cursor-pointer mt-[5.5rem] active-schdule-accordion-header"
                          >
                            <img
                              className="battle-shape absolute ltr:left-0 rtl:right-0 top-0 h-full md:w-[22.51rem] -z-1 object-cover object-center"
                              src={IMAGES.list_partycip}
                              alt=""
                              loading="lazy"
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
                              <div className="battle-shape-text flex md:gap-6 gap-3 w-[21rem]">
                                <span className="inline-block md:text-2xl sm:text-lg text-base font-bold">
                                  List of Participants
                                </span>
                              </div>
                              <div className="data-images flex items-center lg:gap-6 sm:gap-4 gap-2">
                                {/* Static team icons */}
                                <div className="round-gold rounded-full flex items-center justify-center md:w-12 md:h-12 w-9 h-9">
                                  <img
                                    src={IMAGES.team_falcons}
                                    alt="Team 1"
                                    className="md:w-6 md:h-6 rounded-full"
                                  />
                                </div>
                                <div className="round-gold round-gray rounded-full flex items-center justify-center md:w-12 md:h-12 w-9 h-9">
                                  <img
                                    src={IMAGES.team_falcons}
                                    alt="Team 2"
                                    className="md:w-6 md:h-6 rounded-full"
                                  />
                                </div>
                                <div className="round-gold round-red rounded-full flex items-center justify-center md:w-12 md:h-12 w-9 h-9">
                                  <img
                                    src={IMAGES.team_falcons}
                                    alt="Team 3"
                                    className="md:w-6 md:h-6 rounded-full"
                                  />
                                </div>
                                <div className="round-gold round-common md:w-12 md:h-12 w-9 h-9 rounded-full flex items-center justify-center">
                                  <img
                                    src={IMAGES.team_falcons}
                                    alt="Team 3"
                                    className="md:w-6 md:h-6 rounded-full"
                                  />
                                  {/* <span className="text-base font-semibold text-white">
                                    +2
                                  </span> */}
                                </div>
                              </div>
                            </div>

                            {/* Right section with dropdown toggle */}
                            <div className="mob-match-gp flex flex-col md:gap-3.5 gap-2 items-end ltr:lg:pr-[7rem] rtl:lg:pl-[7rem] ltr:sm:pr-[4rem] rtl:sm:pl-[4rem] ltr:pr-[3rem] rtl:pl-[3rem]">
                              <div className="flex gap-2 items-center">
                                <p className="md:text-2xl sm:text-lg text-base font-bold text-[#6D70BC]">
                                  +10
                                </p>
                              </div>
                              <div className="schdule-icon absolute lg:w-[6rem] sm:w-[4rem] w-[3rem] ltr:right-0 rtl:left-0 top-0 h-full flex items-center justify-center cursor-pointer">
                                <img
                                  className="sm:w-5 sm:h-3 w-4 h-2"
                                  src={IMAGES.about_down}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          className="sd_content-right w-full order-0 xl:order-1"
                          variants={rightToLeft}
                          custom={1}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          {/* --- Timeline-card HTML Block Start --- */}
                          {/* <div className="flex flex-col gap-6 md:block"> */}
                          <PDFPopup />
                          {/* <div>    */}

                          {/* <span className="icon-discord flex items-center justify-center rounded-lg md:w-12 md:h-12 w-10 h-10 bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
                                  <img src={IMAGES.discord} />
                                </span>
                                {t("tournament.discordsupport")}
                                <span className="ltr:ml-auto rtl:mr-auto icon-arrow-right text-[#A6B6C6] rtl:[transform:rotateY(180deg)]">
                                  <img src={IMAGES.discord_arrow} alt="" />
                                </span>
                              </a>
                              <button
                                className="flex-1 max-w-[20.75rem] flex items-center gap-4 p-2 pr-6 rounded-xl text-[#F4F7FF] font-semibold md:text-lg text-base bg-[linear-gradient(180deg,rgba(94,95,184,0.3)_0%,rgba(34,35,86,0.4)_100%)] shadow-[inset_0_2px_2px_rgba(94,95,184,0.2)] cursor-pointer"
                                onClick={handleOpen}
                              > */}
                          <DiscordPopup />
                          <TimelinePanel />

                          {/* </div> */}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ) : tournamentData?.stages?.[activeStage]?.stageType ==
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

      {/* Popup */}
      <ManageTeamModal
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
      />
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
      {showModal && <PDFViewer onClose={handleClose} />}
    </main>
  );
};

export default TournamentDetail;
