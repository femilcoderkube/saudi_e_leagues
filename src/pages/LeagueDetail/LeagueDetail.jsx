import teamSizeImage from "../../assets/images/teamSize.png";
import mob_star_of_week from "../../assets/images/mob_star_week.png";
import ScoreTicker from "../../components/LobbyPageComp/Score_ticker.jsx";
import TimelineCard from "../../components/LobbyPageComp/TimeLineCard.jsx";
import LeaderBoard from "../../components/LobbyPageComp/LeaderBoardTable.jsx";
import { Link, useParams } from "react-router-dom";
import PopUp from "../../components/ModalPopUp/Popup.jsx";
import { useEffect } from "react";
import {
  startLeagueSocket,
  stopLeagueSocket,
} from "../../app/socket/socket.js";
import {
  formatAmountWithCommas,
  generateTailwindGradient,
  getRandomColor,
  getServerURL,
} from "../../utils/constant.js";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import GamingLoader from "../../components/Loader/loader.jsx";
import RegistrationModel from "./RegustrationModel.jsx";
import GetQueueButton from "./queueButton.jsx";

const LeagueDetail = () => {
  const { lId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { leagueData, registrationModal } = useSelector(
    (state) => state.leagues
  );
  const { t, i18n } = useTranslation();
  const isMatctCreated = useSelector(
    (state) => state.constState.isMatctCreated
  );
  useEffect(() => {
    let res = startLeagueSocket({ lId, user, isSocketConnected });
    console.log("res", res);
    return () => {
      stopLeagueSocket();
    };
  }, [isSocketConnected, lId, user, window.location.pathname, isMatctCreated]);

  useEffect(() => {
    if (leagueData?.title) {
      document.title = `Prime eLeague - ${leagueData?.title}`;
    }
  }, [leagueData]);

  return (
    <main className="flex-1 lobby_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      {/* <Outlet /> */}
      {registrationModal && <RegistrationModel />}
      {!leagueData ? (
        <GamingLoader />
      ) : isMatctCreated ? (
        <GamingLoader />
      ) : (
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex flex-col md:flex-row items-center justify-between md:gap-0 gap-8">
            <div className="sd_content-left flex  items-center gap-12 md:gap-10 md:pb-6 pb-9.5 mr-[-1rem] relative order-2 md:order-1">
              <div className="sd_com--logo cursor-hide w-[8.75rem] md:w-[18.5rem]">
                <img
                  src={getServerURL(leagueData?.internalPhoto || "")}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="sd_league--info flex-1">
                <h1 className="uppercase text-2xl md:text-5xl !font-black tracking-wide">
                  {i18n.language === "ar"
                    ? leagueData?.titleAr
                    : leagueData?.title || t("league.league_title")}
                </h1>
                <h2 className="league_price text-2xl md:text-5xl !font-black font_oswald pt-5 sm:pt-3.5 md:pt-10 sm:pb-6 pb-3 yellow_grad-bg grad_text-clip">
                  <span className="icon-saudi_riyal !p-0"></span>
                  {formatAmountWithCommas(leagueData?.prizepool)}
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
                    src={getServerURL(leagueData?.headerPhoto)}
                    alt=""
                    // style={{ width: "41rem" }}
                  />
                </div>
                {/* <div className="player_one sd_before relative gradiant_bg con_center -left-7 sm:left-0">
                  <img src={wind_girl} alt={t("images.wind_girl")} className="w-[10rem] md:w-[18.5rem]" />
                </div>
                <div className="player_two sd_before relative gradiant_bg con_center">
                  <img src={fire_boy} alt={t("images.fire_boy")} className="w-[10rem] md:w-[17.5rem]" />
                </div> */}
              </div>
              <div className="player_score mt-4 flex md:flex-col items-start md:h-full sm:ltr:ml-[-2.5rem] sm:rtl:ml-0 z-2">
                <div className="online_user md:p-4 px-4 py-1 relative md:flex-shrink flex-shrink-0 flex md:block flex-col md:flex-row">
                  <h3 className="sm:text-base text-sm text-[#63A3D2] order-2 md:order-1">
                    {t("league.online_users")}
                  </h3>
                  <span className="sm:text-2xl text-lg font-bold order-1 md:order-2">
                    {leagueData?.activeUsers || 0}
                  </span>
                </div>
                <div className="participants md:p-4 px-5 py-1 ltr:text-right rtl:text-left w-full pt-0 relative md:top-[-2.45rem] ">
                  <span className="sm:text-2xl text-lg font-bold">
                    {leagueData?.totalRegistrations || 0}
                  </span>
                  <h3 className="sm:text-base text-sm text-[#D27D63]">
                    {t("league.participants")}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-start">
            <div className="sd_content-left order-2 md:order-1">
              <div className="sd_game_info--wrap md:flex-row md:inline-flex hidden gap-3 md:gap-5 items-center justify-center md:justify-baseline w-full">
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={getServerURL(leagueData?.game?.logo || "")}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.game")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {leagueData?.game?.shortName || ""}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={getServerURL(leagueData?.platform?.logo || "")}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.platform")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {leagueData?.platform?.name?.toUpperCase() || ""}
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
                        {" "}
                        {leagueData.playersPerTeam || 1}v
                        {leagueData.playersPerTeam || 1}{" "}
                      </h4>
                    </div>
                  </div>
                </div>
                {/* <svg
                  width="0"
                  height="0"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute" }}
                >
                  <defs>
                    <clipPath
                      id="game_polygon_clip"
                      clipPathUnits="objectBoundingBox"
                    >
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
                </svg> */}
              </div>                          
              <LeaderBoard />
            </div>
            <div className="sd_content-right w-full order-0 xl:order-1">
              <GetQueueButton />
              <div className="sd_game_info--wrap md:flex-row inline-flex md:hidden gap-3 md:gap-5 w-full md:pb-0 pb-6 items-center justify-center md:justify-baseline">
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border">
                  <Link
                    to={"#"}
                    className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center"
                  >
                    <img
                      src={getServerURL(leagueData?.game?.logo || "")}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.game")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {leagueData?.game?.name || ""}
                      </h4>
                    </div>
                  </Link>
                </div>
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border">
                  <Link
                    to={"#"}
                    className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center"
                  >
                    <img
                      src={getServerURL(leagueData?.platform?.logo || "")}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.platform")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {leagueData?.platform?.name?.toUpperCase() || ""}
                      </h4>
                    </div>
                  </Link>
                </div>
                <div className="sd_game-con sd_team_size--info relative sd_before sd_after polygon_border">
                  <Link
                    to={"#"}
                    className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center"
                  >
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
                        {" "}
                        {leagueData.playersPerTeam || 1}v
                        {leagueData.playersPerTeam || 1}{" "}
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
              {/* --- Timeline-card HTML Block Start --- */}
              <div className="flex flex-col gap-6 md:block">
              <PopUp />   
              {/* Desktop version */}
              {leagueData?.leaderBoard.weekOfTheStartUsers && leagueData?.isWeekOfTheStar &&  (
                <div className="mob-star-week bg-[url(./assets/images/mob-star-week-shape.png)] sm:max-w-[30rem] sm:w-full flex flex-col md:mb-[2.4rem] bg-no-repeat bg-center bg-cover relative p-5 mx-auto md:order-2 order-2">
                  <div className="sd_bedge_left-con border-b-1 border-[#7b7ed047] pb-5 mb-6 flex flex-row items-center justify-between gap-4 w-full">
                    <div className="sd_bedge-lable">
                      <img
                        src={mob_star_of_week}
                        alt=""
                        style={{ width: "12.35rem" }}
                      />
                    </div>
                    {/* <div className="prize-pool">
                      <span className="font-bold text-xl grad_text-clip sm:block hidden">$5.000.000</span>
                    </div> */}
                  </div>
                  <div className="profile-wp flex items-center justify-between gap-3 pb-8">
                    <div className="sd_avtar-info gap-6 inline-flex justify-between sm:pl-6 items-center cursor-pointer text-white rounded">
                      <div className="user_img relative sd_before">
                        {leagueData?.leaderBoard?.weekOfTheStartUsers?.userId
                          ?.profilePic ? (
                          <img
                            src={getServerURL(
                              leagueData?.leaderBoard?.weekOfTheStartUsers
                                ?.userId?.profilePic
                            )}
                            alt=""
                            className="rounded-[3rem]"
                            style={{ width: "3rem", height: "3rem" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "3rem",
                              height: "3rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: getRandomColor(
                                leagueData?.leaderBoard?.weekOfTheStartUsers
                                  ?.userId?.username
                              ),
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              borderRadius: "50%",
                            }}
                          >
                            {leagueData?.leaderBoard?.weekOfTheStartUsers?.userId?.username
                              ?.charAt(0)
                              ?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <div className="use_con text-left flex flex-col gap-1">
                        <span className="text-lg">
                          {
                            leagueData?.leaderBoard?.weekOfTheStartUsers?.userId
                              ?.fullName
                          }
                        </span>
                        <span className="user_id md:text-md text-sm block text-[#87C9F2]">
                          @
                          {
                            leagueData?.leaderBoard?.weekOfTheStartUsers?.userId
                              ?.username
                          }
                        </span>
                      </div>
                    </div>
                    <div className="sd_score--con">
                      <h2 className="text-[1.5rem] !font-extrabold grad_text-clip">
                        {leagueData?.leaderBoard?.weekOfTheStartUsers?.weeklyScore?.toFixed(
                          2
                        )}
                      </h2>
                    </div>
                  </div>
                  <ScoreTicker />
                </div>
              )}           
              <TimelineCard />
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

export default LeagueDetail;

// Returns true if user is able to join queue (when getQueueText returns "QUEUE"), else false
