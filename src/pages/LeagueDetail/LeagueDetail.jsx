import wind_girl from "../../assets/images/wind_girl.png";
import teamSizeImage from "../../assets/images/teamSize.png";
import valorant_bg from "../../assets/images/valorant_bg.png";
import fire_boy from "../../assets/images/fire_boy.png";

import star_of_week from "../../assets/images/star_of_week.png";
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
  getQueueText,
  getServerURL,
  SOCKET,
} from "../../utils/constant.js";
import { useSelector } from "react-redux";

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

  useEffect(() => {
    startLeagueSocket({ lId, user, isSocketConnected });
    return () => {
      stopLeagueSocket();
    };
  }, [isSocketConnected, lId, user]);

  return (
    <main className="flex-1 lobby_page--wrapper">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      {/* <Outlet /> */}
      {registrationModal && <RegistrationModel />}
      {!leagueData ? (
        <GamingLoader />
      ) : (
        <div className="sd_content-wrapper max-w-full pt-7">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex items-center justify-between">
            <div className="sd_content-left flex items-center gap-10 pb-6 mr-[-1rem] relative">
              <div className="sd_com--logo cursor-hide">
                <img
                  src={getServerURL(leagueData?.logo || "")}
                  alt=""
                  style={{ width: "16.5rem" }}
                />
              </div>
              <div className="sd_league--info">
                <h1 className="uppercase text-5xl !font-black tracking-wide">
                  {leagueData?.title || "League Title"}
                </h1>
                <h2 className="league_price text-5xl !font-black font_oswald pt-10 pb-6 yellow_grad-bg grad_text-clip">
                  <span className="icon-saudi_riyal !p-0"></span>
                  {formatAmountWithCommas(leagueData?.prizepool)}
                </h2>
                <span className="block purple_col text-xl">Prize Pool</span>
              </div>
            </div>
            <div className="sd_content-right flex">
              <div className="player_img flex items-center gap-5">
                <div className="player_one sd_before relative gradiant_bg con_center">
                  <img src={wind_girl} alt="" style={{ width: "18.5rem" }} />
                </div>
                <div className="player_two sd_before relative gradiant_bg con_center">
                  <img src={fire_boy} alt="" style={{ width: "17.5rem" }} />
                </div>
              </div>
              <div className="player_score mt-4 flex flex-col items-start h-full ml-[-2.5rem]">
                <div className="online_user p-4 relative">
                  <h3 className="text-base text-[#63A3D2]">Online Users</h3>
                  <span className="text-2xl font-bold">
                    {leagueData?.activeUsers || 0}
                  </span>
                </div>
                <div className="participants p-4 text-right w-full pt-0 relative top-[-1.45rem]">
                  <span className="text-2xl font-bold">
                    {leagueData?.totalRegistrations || 0}
                  </span>
                  <h3 className="text-base text-[#D27D63]">Participants</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="sd_bottom-wraper flex gap-[2.5rem] items-start">
            <div className="sd_content-left">
              <div className="sd_game_info--wrap inline-flex gap-5 items-center">
                <div className="sd_game-con sd_game--info relative sd_before sd_after polygon_border valorant_game">
                  <Link
                    to={"#"}
                    className={`game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center ${generateTailwindGradient(
                      "#000"
                    )}`}
                  >
                    <img
                      src={getServerURL(leagueData?.game?.logo || "")}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center sd_before">
                      <p className="text-base mb-2 text-[#E38D9D] font-medium">
                        Game
                      </p>
                      <h4 className="text-xl font-bold">
                        {leagueData.game.name || ""}
                      </h4>
                    </div>
                    <div className="game_theam--bg sd_before">
                      <img
                        src={valorant_bg}
                        alt=""
                        style={{ width: "10.75rem" }}
                      />
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
                      <p className="text-base mb-2 purple_col font-medium">
                        Platform
                      </p>
                      <h4 className="text-xl font-bold">
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
                      <p className="text-base mb-2 purple_col font-medium">
                        Team Size
                      </p>
                      <h4 className="text-xl font-bold">
                        {" "}
                        {leagueData.playersPerTeam || 1}v
                        {leagueData.playersPerTeam || 1}{" "}
                      </h4>
                    </div>
                  </Link>
                </div>
                <svg
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
                </svg>
              </div>
              {leagueData?.leaderBoard.weekOfTheStartUsers && (
                <div className="sd_star_bedge--wrap flex items-center mt-8 bg-no-repeat justify-between relative py-[0.625rem]">
                  <div className="sd_bedge_left-con flex items-center gap-4 pl-[2rem]">
                    <div className="sd_bedge-lable border-r-1 border-[#7b7ed047] pr-6">
                      <img
                        src={star_of_week}
                        alt=""
                        style={{ width: "6rem" }}
                      />
                    </div>
                    <div className="sd_avtar-info gap-6 p-3 inline-flex justify-between items-center cursor-pointer text-white rounded">
                      <div className="user_img relative sd_before">
                        <img
                          src={getServerURL(
                            leagueData?.leaderBoard?.weekOfTheStartUsers?.userId
                              ?.profilePic
                          )}
                          alt=""
                          className="rounded-[3rem]"
                          style={{ width: "3rem" }}
                        />
                      </div>
                      <div className="use_con text-left flex flex-col gap-1">
                        <span className="text-lg">
                          {
                            leagueData?.leaderBoard?.weekOfTheStartUsers?.userId
                              ?.fullName
                          }
                        </span>
                        <span className="user_id text-md block text-[#87C9F2]">
                          @
                          {
                            leagueData?.leaderBoard?.weekOfTheStartUsers?.userId
                              ?.username
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sd_score--con horizontal_center absolute">
                    <h2 className="text-[2rem] !font-extrabold grad_text-clip">
                      {leagueData?.leaderBoard?.weekOfTheStartUsers?.weeklyScore?.toFixed(
                        2
                      )}
                    </h2>
                  </div>
                  <ScoreTicker />
                </div>
              )}
              <LeaderBoard />
            </div>
            <div className="sd_content-right w-full">
              <GetQueueButton />

              {/* --- Timeline-card HTML Block Start --- */}

              <TimelineCard />
              <PopUp />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default LeagueDetail;

// Returns true if user is able to join queue (when getQueueText returns "QUEUE"), else false
