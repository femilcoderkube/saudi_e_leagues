import { useNavigate, useParams } from "react-router-dom";
import TimelinePanel from "../../components/Cards/LeagueDetail/TimelinePanel.jsx";
import {
  formatAmountWithCommas,
  getServerURL,
  getTimeUntilRegistration,
  stageTypes,
} from "../../utils/constant.js";
import PDFPopup from "../../components/Overlays/LeagueDetail/PDFPopup.jsx";
import DiscordPopup from "../../components/Overlays/LeagueDetail/DiscordPopup.jsx";

import { useTranslation } from "react-i18next";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GamingLoader from "../../components/Loader/loader.jsx";
import SingleDoubleStages from "./singleDoubleStages.jsx";

import {
  clearData,
  getTeamAndTournamentDetails,
  getTournamentStages,
  resetRosterSelection,
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
import ManageTeamModal from "../../components/ManageTeam/ManageTeamModal.jsx";
import PDFViewer from "../../components/Overlays/LeagueDetail/PDFViewer.jsx";
import { registerTournament } from "../../app/slices/TournamentTeam/TournamentTeamSlice.js";
import {
  setActiveTournamentTab,
  setConfirmationPopUp,
  setisloading,
  setLogin,
  setPopupData,
  setViewManagePopup,
} from "../../app/slices/constState/constStateSlice.js";
import ConfirmationPopUp from "../../components/Overlays/ConfirmationPopUp.jsx";
import ViewTeamModal from "../../components/ManageTeam/ViewTeamModal.jsx";
import { fetchInviteLink } from "../../app/slices/teamInvitationSlice/teamInvitationSlice.js";
import TeamRegistrationPopup from "../../components/Overlays/TournamentTeam/TeamRegistrationPopup.jsx";
const TournamentDetail = () => {
  const { t, i18n } = useTranslation();
  const {
    tournamentData,
    teamData,
    currentTeam,
    activeStage,
    loader,
    tourmentTeamData,
  } = useSelector((state) => state.tournament);

  const { viewManagePopup, isloading } = useSelector(
    (state) => state.constState
  );

  const [showModal, setShowModal] = useState(false);
  const { loading, showTeamRegistrationPopup } = useSelector(
    (state) => state.tournamentTeam
  );

  const handleClose = () => setShowModal(false);

  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { user } = useSelector((state) => state.auth);
  const { id, tId } = useParams();
  const dispatch = useDispatch();
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // For accordion toggle

  const toggleAccordion = () => {
    setActiveIndex(activeIndex === "participants" ? null : "participants");
  };

  useEffect(() => {
    if (tId) {
      getData();
    }
  }, [user?._id, tId]);

  const getData = async () => {
    try {
      dispatch(setisloading(true));
      const resultAction = await dispatch(
        getTeamAndTournamentDetails({
          userId: user?._id,
          tournamentId: tId,
        })
      );
      if (getTeamAndTournamentDetails.fulfilled.match(resultAction)) {
        dispatch(setisloading(false));
      } else {
        dispatch(setisloading(false));
      }
    } catch (error) {
      dispatch(setisloading(false));
    }
  };

  useEffect(() => {
    if (tournamentData?._id && tournamentData?.tournamentType === "Team") {
      dispatch(fetchInviteLink(currentTeam?._id)).unwrap();
    }
  }, [
    currentTeam?._id,
    dispatch,
    tournamentData?._id,
    tournamentData?.tournamentType,
  ]);

  useEffect(() => {
    if (tournamentData?.title) {
      document.title = `Prime eLeague - ${tournamentData?.title}`;
    }
  }, [tournamentData]);

  useEffect(() => {
    if (
      tournamentData?.stages?.length > 0 &&
      typeof activeStage === "number" &&
      activeStage > -1
    ) {
      dispatch(
        getTournamentStages({ id: tournamentData?.stages[activeStage]?._id })
      );
    }
  }, [tournamentData?.stages, activeStage]);

  const onRegistration = async () => {
    if (tournamentData?.tournamentType === "Solo") {
      dispatch(
        setPopupData({
          tournamentId: tournamentData?._id,
          userId: user?._id, // Use userId for solo tournaments
        })
      );
    } else {
      dispatch(
        setPopupData({
          tournamentId: tournamentData?._id,
          teamId: currentTeam?._id, // Use teamId for team tournaments
        })
      );
    }
    dispatch(setConfirmationPopUp(14));
  };

  const handleRegisterTournament = async (data) => {
    try {
      const resultAction = await dispatch(registerTournament(data));

      if (registerTournament.fulfilled.match(resultAction)) {
        dispatch(
          getTeamAndTournamentDetails({
            userId: user?._id,
            tournamentId: tId,
          })
        );
        if (
          tournamentData?.tournamentType === "Team" &&
          (teamData?.userRole === "President" ||
            teamData?.userRole === "Manager")
        ) {
          setIsManageOpen(true);
        }
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const teams = useMemo(() => {
    if (tournamentData?.tournamentType === "Solo") {
      return (
        teamData?.participentList?.map((p) => ({
          name: p?.user?.username || "Unknown",
          shortName: p?.user?.username || "Unknown",
          logo: p?.user?.profilePicture || IMAGES.defaultImg,
          members: [p?.user], // Single user as the "member"
          participants: [p?.user], // Single user as the participant
          _id: p?._id,
        })) || []
      );
    }
    return (
      teamData?.participentList?.map((p) => ({
        name: p?.team?.teamName,
        shortName: p?.team?.teamShortName,
        logo: p?.team?.logoImage,
        members: p?.team?.members ?? [],
        participants: p?.participants ?? [],
        _id: p?._id,
      })) || []
    );
  }, [teamData, tournamentData?.tournamentType]);

  // Ensure all dates are valid and compare only if all are valid
  const regStart = tournamentData?.registrationStartDate
    ? new Date(tournamentData.registrationStartDate)
    : null;
  const regEnd = tournamentData?.registrationEndDate
    ? new Date(tournamentData.registrationEndDate)
    : null;
  const currentDate = new Date();

  // Defensive: check for valid dates and that regEnd is after regStart
  const isWithinRegistrationPeriod =
    regEnd > regStart && currentDate >= regStart && currentDate <= regEnd;

  const startDate = tournamentData?.startDate
    ? new Date(tournamentData?.startDate)
    : null;

  const endDate = tournamentData?.endDate
    ? new Date(tournamentData?.endDate)
    : null;

  const timeUntilRegistration = useMemo(
    () => getTimeUntilRegistration(regStart, t),
    [regStart, t]
  );

  const isRegistrationClosed =
    (regEnd && new Date() >= regEnd) ||
    (tournamentData?.maxParticipants &&
      tournamentData?.totalRegistrations >= tournamentData?.maxParticipants);

  const isTournamentStarted = startDate && new Date() >= startDate;
  const isTournamentFinished = endDate && new Date() >= endDate;

  const getButtonState = ({
    currentTeam,
    teamData,
    user,
    isWithinRegistrationPeriod,
    timeUntilRegistration,
    isRegistrationClosed,
    isTournamentStarted,
    isTournamentFinished,
    t,
    tournamentType,
  }) => {
    // Default state for disabled button
    const defaultState = {
      text: "",
      image: IMAGES.ragister_bl,
      isDisabled: true,
      onClick: undefined,
      className: "opacity-50 cursor-not-allowed",
    };

    // Tournament finished
    if (isTournamentFinished) {
      return {
        ...defaultState,
        text: t("images.Finished"),
      };
    }

    // Tournament started
    if (isTournamentStarted) {
      return {
        ...defaultState,
        text: t("images.Started"),
      };
    }

    // Registration closed
    if (isRegistrationClosed) {
      return {
        ...defaultState,
        text: t("images.RegistrationClose"),
      };
    }

    // Registration not yet open
    if (timeUntilRegistration) {
      return {
        ...defaultState,
        text: t("images.openIn", { time: timeUntilRegistration }),
      };
    }

    // No user logged in
    if (!user?._id) {
      return {
        image: IMAGES.ragister_og,
        isDisabled: false,
        text: t("auth.login"),
        onClick: () => dispatch(setLogin(true)),
        className: "cursor-pointer",
      };
    }

    if (tournamentType === "Solo") {
      // Check if user is already registered for solo tournament
      const isUserRegistered =
        teamData?.dataFound && teamData?.data?.status !== 1;

      if (isUserRegistered) {
        return {
          ...defaultState,
          text: t("images.Registergn"),
          image: IMAGES.ragister_gn,
        };
      }

      // Allow registration if within registration period
      if (isWithinRegistrationPeriod) {
        return {
          text: t("images.Registerog"),
          image: IMAGES.ragister_og,
          isDisabled: false,
          onClick: onRegistration, // Trigger solo registration
          className: "cursor-pointer",
        };
      }

      return {
        ...defaultState,
        text: t("images.Registerog"),
        image: IMAGES.ragister_og,
      };
    }

    // Existing team-based logic
    if (currentTeam?._id) {
      if (teamData?.dataFound && teamData?.data?.status !== 1) {
        return {
          ...defaultState,
          text: t("images.Registergn"),
          image: IMAGES.ragister_gn,
        };
      }

      if (teamData?.data?.status === 1) {
        return {
          ...defaultState,
          text: t("images.NotCompleted"),
          image: IMAGES.ragister_yl,
        };
      }

      if (
        !["Manager", "President"].includes(teamData?.userRole) ||
        !isWithinRegistrationPeriod
      ) {
        return {
          ...defaultState,
          text: t("images.Registerog"),
          image: IMAGES.ragister_og,
        };
      }

      return {
        text: t("images.Registerog"),
        image: IMAGES.ragister_og,
        isDisabled: false,
        onClick: onRegistration,
        className: "cursor-pointer",
      };
    }

    return {
      text: t("images.create"),
      image: IMAGES.ragister_og,
      isDisabled: false,
      onClick: () => dispatch(setConfirmationPopUp(16)),
      className: "cursor-pointer",
    };
  };

  const buttonState = useMemo(
    () =>
      getButtonState({
        currentTeam,
        teamData,
        user,
        isWithinRegistrationPeriod,
        timeUntilRegistration,
        isRegistrationClosed,
        isTournamentStarted,
        isTournamentFinished,
        t,
        tournamentType: tournamentData?.tournamentType,
      }),
    [
      currentTeam,
      teamData,
      user,
      isWithinRegistrationPeriod,
      timeUntilRegistration,
      isRegistrationClosed,
      isTournamentStarted,
      isTournamentFinished,
      t,
      tournamentData?.tournamentType,
    ]
  );

  return (
    <main className="flex-1 tournament_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      {isloading ? (
        <GamingLoader />
      ) : (
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex flex-col md:flex-row items-center justify-between md:gap-0 gap-8 md:mb-10 md-6">
            <motion.div
              className="sd_content-left flex  items-center gap-12 md:gap-10 md:pb-6 pb-5 mr-[-1rem] relative order-2 md:order-1"
              variants={leftToRight}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="sd_com--logo cursor-hide w-[8.75rem] md:w-[18.5rem]">
                <img
                  src={getServerURL(tournamentData?.internalPhoto)}
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
                    src={getServerURL(tournamentData?.headerPhoto)}
                    alt=""
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="about-tornament flex xl:items-start items-center xl:flex-nowrap flex-wrap xl:flex-row flex-col md:gap-[3rem] gap-8">
            <div className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-center ">
              <div className="sd_content-top order-2 flex-col xl:flex-row md:order-1 flex gap-5 justify-between w-full">
                <motion.div
                  className="sd_game_info--wrap md:flex-row xl:flex-nowrap flex-wrap flex-1 inline-flex gap-[2.063rem] w-full justify-center xl:justify-start"
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
                    name={tournamentData?.maxPlayersPerTeam}
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
            <button
              onClick={buttonState.onClick}
              className={`regi-close-btn common-width join_btn duration-300 block sd_before relative w-full ${buttonState.className}`}
              disabled={buttonState.isDisabled}
            >
              <span
                className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-base xl:text-[1.3rem]"
                style={{
                  fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
                  fontWeight: "bold",
                  textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                {buttonState.text}
              </span>
              <img
                className="mx-auto"
                src={buttonState.image}
                alt=""
                style={{ width: "100%" }}
              />
            </button>
          </div>
          <div className="sd_tournament-wrapper">
            <div className="sd_tournament-content">
              <div className="mx-auto mt-4">
                {/* <!-- Tabs --> */}
                <motion.ul
                  id="tournament-tabs"
                  className="sa__tournament-tabs inline-flex flex-wrap md:flex-row flex-col pt-2 w-full"
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariantsAni}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <li
                    className={`font-semibold cursor-pointer ltr:md:border-r rtl:md:border-l border-[#141D46] ${
                      activeStage === -1 ? "active" : ""
                    }`}
                  >
                    <div
                      id={`stage-overview`}
                      onClick={() =>
                        activeStage !== -1 ? dispatch(setActiveStage(-1)) : null
                      }
                      className={`px-4 pl-0 flex gap-[1.125rem] items-center justify-center text-xl whitespace-nowrap ${
                        activeStage === -1
                          ? "text-blue-500 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      <img
                        src={IMAGES.maskgroup}
                        alt="Overview Icon"
                        className="w-5 h-5"
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
                          onClick={() => {
                            // Set tab type depending on stage type
                            if (
                              tournamentData?.stages?.[index]?.stageType ===
                              stageTypes.RoundRobin
                            ) {
                              dispatch(setActiveTournamentTab(3));
                            } else {
                              dispatch(setActiveTournamentTab(1));
                            }
                            // Switch stage
                            if (activeStage !== index) {
                              dispatch(setActiveStage(index));
                            }
                          }}
                          className={`px-4 pl-0 flex gap-4 items-center justify-center text-xl whitespace-nowrap ${
                            index === activeStage
                              ? "text-blue-500 font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          {/* <img
                        src={IMAGES.user_about}
                        alt="Overview Icon"
                        className="w-5 h-5"
                      /> */}
                          {i18n.language == "en"
                            ? item?.stageName
                            : item.stageNameAr}
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
                          {tournamentData?.tournamentType === "Team" &&
                            teamData?.dataFound && (
                              <div className="your-team-card rounded-2xl md:mb-12 mb-9 bg-[linear-gradient(183.7deg,rgba(94,95,184,0.2)_3.03%,rgba(34,35,86,0.2)_97.05%)] shadow-[inset_0_2px_2px_0_rgba(94,95,184,0.12)] backdrop-blur-[0.75rem]">
                                <div className="flex sm:items-center sm:flex-row flex-col rounded-t-2xl justify-between md:gap-3 gap-2 md:px-8 md:py-5 p-5 border-b border-[#28374299] bg-[linear-gradient(180deg,rgba(94,95,184,0.3)_0%,rgba(34,35,86,0.4)_100%)] shadow-[inset_0_2px_2px_rgba(94,95,184,0.2)]">
                                  <div className="flex flex-wrap items-center sm:gap-4 gap-2">
                                    <span className="text-[var(--white-col)] md:text-xl text-lg font-bold ltr:md:pr-6 ltr:md:mr-2 ltr:md:border-r md:border-[var(--purple-col)] rtl:md:pl-6 rtl:md:ml-2 rtl:md:border-l">
                                      {t("league.yourteam")}
                                    </span>
                                    <span className="purple_col md:text-lg text-base font-semibold">
                                      {teamData?.data?.status == 1 && (
                                        <>
                                          {t(
                                            "tournament.invite_players_to_team",
                                            {
                                              count:
                                                tournamentData?.minPlayersPerTeam,
                                            }
                                          )}
                                        </>
                                      )}
                                      {teamData?.data?.status == 2 && (
                                        <>
                                          {tournamentData?.registrationEndDate &&
                                            (() => {
                                              const endDate = new Date(
                                                tournamentData.registrationEndDate
                                              );
                                              const now = new Date();
                                              const diffMs = endDate - now;
                                              if (diffMs > 0) {
                                                const totalHours = Math.floor(
                                                  diffMs / (1000 * 60 * 60)
                                                );
                                                const minutes = Math.floor(
                                                  (diffMs % (1000 * 60 * 60)) /
                                                    (1000 * 60)
                                                );
                                                const days = Math.floor(
                                                  totalHours / 24
                                                );
                                                const hours = totalHours % 24;
                                                const key =
                                                  days > 0
                                                    ? "tournament.roster_lock_in_days"
                                                    : totalHours > 0
                                                    ? "tournament.roster_lock_in_hour"
                                                    : "tournament.roster_lock_in";
                                                return (
                                                  <>
                                                    {t(key, {
                                                      days,
                                                      hours,
                                                      minutes,
                                                    })}
                                                  </>
                                                );
                                              }
                                              return null;
                                            })()}
                                        </>
                                      )}
                                      {teamData?.data?.status == 3 && (
                                        <>{t("tournament.roster_locked")}</>
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {teamData?.data?.status == 1 && (
                                      <>
                                        <span className="purple_col md:text-lg text-base font-semibold">
                                          {t("tourteam.notready")}
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-[linear-gradient(180deg,#ED1D4A_0%,#BC096B_107.14%)] shadow-[inset_0px_4px_4px_0px_#FFFFFF3D,0px_4px_24px_0px_#ED1D4A1F] inline-block"></span>
                                      </>
                                    )}
                                    {teamData?.data?.status == 2 && (
                                      <>
                                        <span className="purple_col md:text-lg text-base font-semibold">
                                          {t("tourteam.changeopen")}
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-[linear-gradient(180deg,#00FF00_0%,#008000_107.14%)] shadow-[inset_0px_4px_4px_0px_#FFFFFF3D,0px_4px_24px_0px_#00FF001F] inline-block"></span>
                                      </>
                                    )}
                                    {teamData?.data?.status == 3 && (
                                      <>
                                        <span className="purple_col md:text-lg text-base font-semibold">
                                          {t("tourteam.changeclose")}
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-[linear-gradient(180deg,#ED1D4A_0%,#BC096B_107.14%)] shadow-[inset_0px_4px_4px_0px_#FFFFFF3D,0px_4px_24px_0px_#ED1D4A1F] inline-block"></span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center sm:flex-row flex-col gap-4 justify-between md:px-8 md:py-6 p-5">
                                  <div className="flex items-center gap-2">
                                    {(() => {
                                      // Get the players array, fallback to empty array
                                      const players =
                                        teamData?.data?.Players || [];
                                      const maxPlayers =
                                        tournamentData?.maxPlayersPerTeam || 1;
                                      const totalPlayers = players.length;
                                      const displayCount = Math.min(
                                        5,
                                        maxPlayers
                                      );
                                      const extraCount =
                                        totalPlayers > 5 ? totalPlayers - 5 : 0;

                                      // Prepare the slots to display (up to maxPlayers)
                                      const slots = Array.from({
                                        length: maxPlayers,
                                      });

                                      return slots.map((_, idx) => {
                                        // Show first 7 players or empty slots
                                        if (idx < 5) {
                                          const player = players[idx];
                                          if (!player) {
                                            return (
                                              <div
                                                key={idx}
                                                className="md:w-16 md:h-16 sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)] flex items-center justify-center opacity-40"
                                              ></div>
                                            );
                                          }
                                          return (
                                            <div
                                              key={player._id}
                                              className="md:w-16 md:h-16 sm:w-12 sm:h-12 w-10 h-10 rounded-full overflow-hidden bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)] flex items-center justify-center mx-2"
                                            >
                                              <img
                                                src={
                                                  player.profilePicture
                                                    ? getServerURL(
                                                        player.profilePicture
                                                      )
                                                    : IMAGES.defaultImg
                                                }
                                                alt={player.username}
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          );
                                        }
                                        // For the 8th slot, if there are extra players, show "+N"
                                        if (idx === 5 && extraCount > 0) {
                                          return (
                                            <div
                                              key="extra-players"
                                              className="md:w-16 md:h-16 sm:w-12 sm:h-12 w-10 h-10 rounded-full bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)] flex items-center justify-center text-white font-bold text-lg "
                                            >
                                              +{extraCount}
                                            </div>
                                          );
                                        }
                                        // For slots after 8th, show nothing
                                        return null;
                                      });
                                    })()}
                                  </div>
                                  {tournamentData?.tournamentType === "Team" &&
                                  (teamData?.userRole === "President" ||
                                    teamData?.userRole === "Manager") &&
                                  teamData?.data?.status !== 3 ? (
                                    <div className="flex items-center md:gap-10 gap-4">
                                      <button
                                        className="purple_col sm:py-3.5 sm:px-4.5 px-4 py-3 rounded-lg bg-[radial-gradient(100%_100%_at_50%_0%,rgba(45,46,109,0.92)_0%,rgba(34,35,86,0.8)_100%)] shadow-[inset_0px_2px_4px_0px_#5759C33D] font-bold cursor-pointer manage-team"
                                        onClick={() => setIsManageOpen(true)} // open modal
                                      >
                                        {t("tournament.manageteam")}
                                      </button>
                                    </div>
                                  ) : (
                                    tournamentData?.tournamentType ===
                                      "Team" && (
                                      <div className="flex items-center md:gap-10 gap-4">
                                        <button
                                          className="purple_col sm:py-3.5 sm:px-4.5 px-4 py-3 rounded-lg bg-[radial-gradient(100%_100%_at_50%_0%,rgba(45,46,109,0.92)_0%,rgba(34,35,86,0.8)_100%)] shadow-[inset_0px_2px_4px_0px_#5759C33D] font-bold cursor-pointer manage-team"
                                          onClick={() => {
                                            dispatch(setViewManagePopup(true));
                                          }} // open modal
                                        >
                                          {t("tournament.viewteam")}
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          <div className="about-tournament-card">
                            <h3 className="sm:text-[2rem] text-2xl grad_text-clip !font-black sm:mb-8 mb-6 tracking-wide uppercase bg-[linear-gradient(180deg,rgba(148,156,244,0.288)_32.47%,rgba(104,107,146,0.192)_92.29%)]">
                              {t("league.about_tournament")}
                            </h3>
                            <p
                              className="text-[#F4F4F4] md:text-xl text-lg font-semibold sm:mb-6 mb-4"
                              dangerouslySetInnerHTML={{
                                __html:
                                  i18n.language === "ar"
                                    ? tournamentData?.descriptionAr
                                    : tournamentData?.description,
                              }}
                            />
                          </div>
                          <div
                            // Static accordion, no dynamic handlers or data
                            className={`about-accordation schdule-accordion-card w-full mb-6 md:mt-[5.5rem] sm:mt-[3rem] mt-[2rem] ${
                              activeIndex === "participants"
                                ? "active-accordation"
                                : ""
                            }`}
                          >
                            {/* Header ... unchanged */}
                            {teamData?.participentList?.length > 0 && (
                              <div
                                onClick={toggleAccordion}
                                className={`schdule-accordion-header md:px-6 px-3 py-5 w-full flex justify-between items-center gap-1 relative cursor-pointer ${
                                  activeIndex === "participants"
                                    ? "active-schdule-accordion-header"
                                    : ""
                                }`}
                              >
                                <img
                                  className="battle-shape absolute ltr:left-0 rtl:right-0 top-0 h-full md:w-[22.51rem] -z-1 object-cover object-center"
                                  src={IMAGES.list_partycip}
                                  alt=""
                                  loading="lazy"
                                />

                                <div className="flex items-center lg:gap-10 md:gap-7 gap-5">
                                  <div className="battle-shape-text flex items-center md:gap-6 gap-3 w-[21rem]">
                                    <span className="uppercase inline-block md:text-2xl sm:text-lg text-base font-bold text-[var(--white-col)]">
                                      {t("tournament.list_of_participants")}
                                    </span>
                                  </div>

                                  {/* Preview avatars */}
                                  <div className="data-images flex items-center lg:gap-6 sm:gap-4 gap-2">
                                    {teams.slice(0, 4).map((team, i) => {
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
                                          className={`round-gold ${classs} rounded-full flex items-center justify-center md:w-12 md:h-12 w-9 h-9`}
                                        >
                                          <img
                                            src={getServerURL(team?.logo)}
                                            alt={team?.name}
                                            className="md:w-6 md:h-6 w-5 h-5 rounded-full"
                                          />
                                        </div>
                                      );
                                    })}
                                    {/* {teams.length > 4 && (
                                      <div className="round-gold round-common md:w-12 md:h-12 w-9 h-9 rounded-full flex items-center justify-center">
                                        <span className="text-base font-semibold text-white">
                                          +{teams.length - 4}
                                        </span>
                                      </div>
                                    )} */}
                                  </div>
                                </div>

                                <div className="mob-match-gp flex flex-col md:gap-3.5 gap-2 items-end ltr:lg:pr-[7rem] rtl:lg:pl-[7rem] ltr:sm:pr-[4rem] rtl:sm:pl-[4rem] ltr:pr-[3rem] rtl:pl-[3rem]">
                                  <div className="flex gap-2 items-center">
                                    <p className="md:text-xl text-base font-semibold text-[#6D70BC]">
                                      {teams?.length > 4
                                        ? `+${teams?.length - 4}`
                                        : ""}
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
                            )}
                            {/* Participants List */}
                            <div className="schdule-collapse block">
                              {teams?.map((team, tIdx) => (
                                <div
                                  className="schdule-accordion-body flex justify-between items-center"
                                  key={`static-team-${tIdx}`}
                                >
                                  <div
                                    className={`mob-body-full flex justify-between gap-3 items-center lg:p-8 md:p-5 p-3 !w-full ltr:border-r rtl:border-l`}
                                  >
                                    <div className="flex items-center lg:gap-11 md:gap-4 gap-2">
                                      <div className="flex items-center sm:gap-4 gap-2">
                                        <img
                                          src={getServerURL(team?.logo)}
                                          alt={team?.name}
                                          className="md:w-8 md:h-8 h-6 w-6 rounded-full"
                                        />
                                        <span className="inline-block md:text-lg text-base font-bold text-[var(--white-col)]">
                                          {team?.name}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center xl:gap-13 gap-4">
                                      <p className="text-lg font-bold text-[var(--green-color)]">
                                        {tournamentData?.tournamentType ===
                                        "Solo"
                                          ? 1
                                          : team?.members?.length}
                                        <span className="text-base font-semibold inline-block text-[var(--slate-blue)] ltr:pl-1 rtl:pr-1">
                                          {t(
                                            tournamentData?.tournamentType ===
                                              "Solo"
                                              ? "tournament.player"
                                              : "tournament.members"
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
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
                                className="flex-1 max-w-[20.75rem] flex items-center gap-4 p-2 pr-6 rounded-xl text-[var(--white-col)] font-semibold md:text-lg text-base bg-[linear-gradient(180deg,rgba(94,95,184,0.3)_0%,rgba(34,35,86,0.4)_100%)] shadow-[inset_0_2px_2px_rgba(94,95,184,0.2)] cursor-pointer"
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
      {viewManagePopup && tournamentData?.tournamentType === "Team" ? (
        <ViewTeamModal
          isOpen={viewManagePopup}
          onClose={() => dispatch(setViewManagePopup(false))}
        />
      ) : (
        <ManageTeamModal
          isOpen={isManageOpen}
          onClose={() => {
            setIsManageOpen(false);
            dispatch(resetRosterSelection());
          }}
        />
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
      {showModal && <PDFViewer onClose={handleClose} />}
      <ConfirmationPopUp onRegisterTournament={handleRegisterTournament} />
      {showTeamRegistrationPopup && <TeamRegistrationPopup isEdit={false} />}
    </main>
  );
};

export default TournamentDetail;
