import teamSizeImage from "../../assets/images/teamSize.png";
import mob_star_of_week from "../../assets/images/mob_star_week.png";
import ScoreTicker from "../../components/LobbyPageComp/Score_ticker.jsx";
import TimelineCard from "../../components/LobbyPageComp/TimeLineCard.jsx";
import LeaderBoard from "../../components/LobbyPageComp/LeaderBoardTable.jsx";
import { Link, useParams } from "react-router-dom";
import PopUp from "../../components/ModalPopUp/Popup.jsx";
import { getServerURL } from "../../utils/constant.js";
import GetQueueButton from "../LeagueDetail/queueButton.jsx";
import Que_btn from "../../assets/images/quebtn.png";
import leagueLogo from "../../assets/images/large_prime.png";
import headerPhoto from "../../assets/images/game_detail_img.png";
import { useTranslation } from "react-i18next";
import { fromPairs, transform } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTournamentTab } from "../../app/slices/constState/constStateSlice.js";
import TournamentScheduleCard from "./TournamentScheduleCard.jsx";
import GamingLoader from "../../components/Loader/loader.jsx";
import { startTournamentSocket } from "../../app/socket/socket.js";
import { setActiveStage } from "../../app/slices/tournamentSlice/tournamentSlice.js";

const TournamentDetail = () => {
  const { t, i18n } = useTranslation();
  const { tournamentData,activeStage } = useSelector((state) => state.tournament);
  const { activeTournamentTab } = useSelector((state) => state.constState);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { user } = useSelector((state) => state.auth);
  const { tId } = useParams();
  const dispatch = useDispatch();
  const handleActiveTournamentTab = (tab) => {
    dispatch(setActiveTournamentTab(tab));
  };
  // Static data

  // const tournamentData = {
  //   internalPhoto: "../../assets/images/league-logo.png",
  //   title: "League Title",
  //   titleAr: "عنوان الدوري",
  //   prizepool: 1000000,
  //   headerPhoto: "/images/header-photo.png",
  //   activeUsers: 1234,
  //   totalRegistrations: 5678,
  //   game: {
  //     logo: "/images/game-logo.png",
  //     shortName: "Game Name",
  //     name: "Full Game Name"
  //   },
  //   platform: {
  //     logo: "/images/platform-logo.png",
  //     name: "Platform"
  //   },
  //   playersPerTeam: 2,
  //   leaderBoard: {
  //     weekOfTheStartUsers: {
  //       userId: {
  //         profilePic: "/images/profile.png",
  //         username: "player123",
  //         fullName: "Player Name"
  //       },
  //       weeklyScore: 9876.54
  //     }
  //   },
  //   isWeekOfTheStar: true
  // };

  useEffect(() => {
    if (isSocketConnected) {
      startTournamentSocket({
        tId: tId,
        user: user,
        isSocketConnected: isSocketConnected,
      });
    }
    // if (window.bracketsViewer && document.getElementById("first")) {
    //   window.bracketsViewer.render({
    //     stages: TournamentData.stage,
    //     matches: TournamentData.match,
    //     matchGames: TournamentData.match_game,
    //     participants: TournamentData.participant,
    //   }, {
    //     selector: "#Major-final",
    //   });
    // }
  }, [isSocketConnected,tId,user]);

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
          <div className="sd_top-wraper flex flex-col md:flex-row items-center justify-between md:gap-0 gap-8">
            <div className="sd_content-left flex  items-center gap-12 md:gap-10 md:pb-6 pb-9.5 mr-[-1rem] relative order-2 md:order-1">
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
                  {tournamentData?.prizepool}
                </h2>
                <span className="block purple_col text-sm sm:text-xl">
                  {t("league.prize_pool")}
                </span>
              </div>
            </div>
            <div className="sd_content-right flex flex-col-reverse sm:flex-row items-center md:items-start order-1 md:order-2">
              <div className="player_img flex flex-row items-center gap-2 sm:gap-5">
                <div className="player_one sd_before relative gradiant_bg con_center w-[41.02rem] h-[27.33rem]">
                  <img
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    src={getServerURL(tournamentData.headerPhoto)}
                    alt=""
                  />
                </div>
              </div>
              <div className="player_score mt-4 flex md:flex-col items-start md:h-full sm:ltr:ml-[-2.5rem] sm:rtl:ml-0 z-2"></div>
            </div>
          </div>
          <div className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-center ">
            <div className="sd_content-top order-2 flex-col xl:flex-row md:order-1 flex gap-5 justify-between w-full">
              <div className="sd_game_info--wrap md:flex-row flex-1 inline-flex gap-[2.063rem] flex-wrap w-full justify-center xl:justify-start">
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={getServerURL(tournamentData?.game?.logo)}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.game")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {tournamentData?.game?.shortName}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={getServerURL(tournamentData?.platform?.logo)}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.platform")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {tournamentData?.platform?.name?.toUpperCase()}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="sd_game-con sd_team_size--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={teamSizeImage}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.team_size")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {tournamentData?.maxPlayersPerTeam}v
                        {tournamentData?.maxPlayersPerTeam}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="sd_game-con sd_team_size--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={teamSizeImage}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.participants")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {tournamentData?.totalRegistrations}/
                        {tournamentData?.maxParticipants}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sd_tournament-wrapper">
            <div className="sd_tournament-content">
              <div class="mx-auto mt-4">
                {/* <!-- Tabs --> */}
                <ul
                  id="tournament-tabs"
                  class="sa__tournament-tabs inline-flex pt-2 w-full border-b border-gray-200/20 overflow-x-auto"
                >
                  {tournamentData?.stages?.map((item, index) => {
                    console.log("activeStage", activeStage , index);
                    return (
                      <li class={`font-semibold  cursor-pointer ${index == activeStage ? "active" : ""}`}>
                        <div
                          id="default-tab"
                          onClick={()=>dispatch(setActiveStage(index))}
                          className="px-4 py-2 pl-0 flex items-center justify-center text-xl whitespace-nowrap"
                        >
                          {item?.stageName}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* <!-- Tab Contents --> */}
                <div id="tournament-tab-contents" className="mt-7">
                  <div id="first" className="py-4 active">
                    <div className="game_status--tab-wrapper text-center md:text-left rtl:text-right">
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
                    </div>
                    {activeTournamentTab === 1 && (
                      <div className="tournament-bracket-wrapper">
                        <div
                          id="Major-final"
                          className="!p-0 brackets-viewer !bg-transparent "
                        ></div>
                      </div>
                    )}
                    {activeTournamentTab === 2 && (
                      <div className="tournament-bracket-wrapper mt-20">
                        <div className="tournament-schedule-card-list grid gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                          <TournamentScheduleCard />
                          <TournamentScheduleCard />
                          <TournamentScheduleCard />
                          <TournamentScheduleCard />
                        </div>
                      </div>
                    )}
                  </div>
                  <div id="second" class="hidden p-4">
                    Second tab
                  </div>
                  <div id="third" class="hidden p-4">
                    Third tab
                  </div>
                  <div id="fourth" class="hidden p-4">
                    Fourth tab
                  </div>
                </div>
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

