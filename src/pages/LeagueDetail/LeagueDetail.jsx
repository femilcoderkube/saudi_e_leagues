import large_prime from "../../assets/images/large_prime.png";
import wind_girl from "../../assets/images/wind_girl.png";
import teamSizeImage from "../../assets/images/teamSize.png";
import valorant_bg from "../../assets/images/valorant_bg.png";
import fire_boy from "../../assets/images/fire_boy.png";
import User from "../../assets/images/user.png";
import join_btn from "../../assets/images/join_btn.png";
import need_btn from "../../assets/images/needToLogin.png";
import Que_btn from "../../assets/images/quebtn.png";
import Cancel_btn from "../../assets/images/cancelbtn.png";
import star_of_week from "../../assets/images/star_of_week.png";
import ScoreTicker from "../../components/LobbyPageComp/Score_ticker.jsx";
import TimelineCard from "../../components/LobbyPageComp/TimeLineCard.jsx";
import LeaderBoard from "../../components/LobbyPageComp/LeaderBoardTable.jsx";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import PopUp from "../../components/ModalPopUp/Popup.jsx";
import { useEffect, useState } from "react";
import { socket } from "../../app/socket/socket.js";
import { generateTailwindGradient, SOCKET } from "../../utils/constant.js";
import { useSelector, useDispatch } from "react-redux";
import {
  setLeagueData,
  setRegistrationModal,
} from "../../app/slices/leagueDetail/leagueDetailSlice";
import GamingLoader from "../../components/Loader/loader.jsx";
import { baseURL } from "../../utils/axios.js";
import RegistrationModel from "./RegustrationModel.jsx";
import { setLogin } from "../../app/slices/constState/constStateSlice.js";

const LeagueDetail = () => {
  const { lId, id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { leagueData ,registrationModal } = useSelector((state) => state.leagues);

  const navigate = useNavigate();
  useEffect(() => {
    const handleLeagueUpdate = (data) => {
      console.log("League Update Data:", data);
      dispatch(setLeagueData(data.data));
    };
    if (isSocketConnected) {
      // Listen for LEAGUEUPDATE
      socket.on(SOCKET.LEAGUEUPDATE, handleLeagueUpdate);

      // Emit JOINLEAGUE once
      socket.emit(SOCKET.JOINLEAGUE, { Lid: lId, userId: user?._id });
    }
  
    const handleBeforeUnload = () => {
      if (isSocketConnected) {
        socket.emit(SOCKET.LEAVELEAGUE, { Lid: lId });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off(SOCKET.LEAGUEUPDATE, handleLeagueUpdate);
      // console.log("Leaving league:", lId);
      socket.emit(SOCKET.LEAVELEAGUE, { Lid: lId });
      // socket.disconnect();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSocketConnected, lId, user?._id, dispatch]);

  const handleCancel = () => {
    if (isSocketConnected && user?._id) {
      console.log("Cancelling matchmaking for user:", user._id);
      socket.emit(SOCKET.NOTREADYTOPLAY, { Lid: lId, userId: user?._id });
      // Remove the user from inQueue locally
      if (leagueData && leagueData.inQueue) {
        const updatedInQueue = leagueData.inQueue.filter(
          (participant) => participant !== user?._id
        );
        dispatch(
          setLeagueData({
            ...leagueData,
            inQueue: updatedInQueue,
          })
        );
      }
    }
  };

  return (
    <main className="flex-1 lobby_page--wrapper">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      {/* <Outlet /> */}
      {registrationModal && (
        <RegistrationModel/>
      )}
      {!leagueData ? (
        <GamingLoader />
      ) : (
        <div className="sd_content-wrapper max-w-full pt-7">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex items-center justify-between">
            <div className="sd_content-left flex items-center gap-10 pb-6 mr-[-1rem] relative">
              <div className="sd_com--logo cursor-hide">
                <img
                  src={`${baseURL}/api/v1/${leagueData?.partner?.logo || ""}`}
                  alt=""
                  style={{ width: "16.5rem" }}
                />
              </div>
              <div className="sd_league--info">
                <h1 className="uppercase text-5xl !font-black tracking-wide">
                  {leagueData?.title || "League Title"}
                </h1>
                <h2 className="league_price text-5xl !font-black font_oswald pt-10 pb-6 yellow_grad-bg grad_text-clip">
                  ${leagueData?.prizepool || "0"}
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
                      src={`${baseURL}/api/v1/${leagueData?.game?.logo || ""}`}
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
                      src={`${baseURL}/api/v1/${
                        leagueData?.platform?.logo || ""
                      }`}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-base mb-2 purple_col font-medium">
                        Platform
                      </p>
                      <h4 className="text-xl font-bold">
                        {leagueData?.platform?.name || ""}
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
              <div className="sd_star_bedge--wrap flex items-center mt-8 bg-no-repeat justify-between relative py-[0.625rem]">
                <div className="sd_bedge_left-con flex items-center gap-4 pl-[2rem]">
                  <div className="sd_bedge-lable border-r-1 border-[#7b7ed047] pr-6">
                    <img src={star_of_week} alt="" style={{ width: "6rem" }} />
                  </div>
                  <div className="sd_avtar-info gap-6 p-3 inline-flex justify-between items-center cursor-pointer text-white rounded">
                    <div className="user_img relative sd_before">
                      <img
                        src={User}
                        alt=""
                        className="rounded-[3rem]"
                        style={{ width: "3rem" }}
                      />
                    </div>
                    <div className="use_con text-left flex flex-col gap-1">
                      <span className="text-lg">Just Larry</span>
                      <span className="user_id text-md block text-[#87C9F2]">
                        @larrry
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sd_score--con horizontal_center absolute">
                  <h2 className="text-[2rem] !font-extrabold grad_text-clip">
                    253.081
                  </h2>
                </div>
                <ScoreTicker />
              </div>
              <LeaderBoard />
            </div>
            <div className="sd_content-right w-full">
              {user?._id ? (
                leagueData.joinedUsers.some(
                  (participant) => participant == user?._id
                ) ? leagueData.inQueue.some(
                  (participant) => participant == user?._id
                ) ? (
                  <div
                    className="mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-pointer"
                    onClick={handleCancel}
                  >
                   
                    <img
                      src={Cancel_btn}
                      alt=""
                      style={{ width: "30.5rem" }}
                    />{" "}
                  </div>
                ) :(
                  <Link
                    className="mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before"
                    to={`/${id}/lobby/${leagueData?._id}/finding-match`}
                  >
                   <span
                     className="absolute top-[2.5rem] left-0 w-full text-center text-3xl"
                     style={{
                       fontFamily: "Yapari",
                       textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)"
                     }}
                   >
                     QUEUE
                   </span>
                    <img
                      src={Que_btn}
                      alt=""
                      style={{ width: "30.5rem" }}
                    />{" "}
                  </Link>
                ) : (
                  <div
                    onClick={() => dispatch(setRegistrationModal(true))}
                    className="join_btn hover:opacity-60 duration-300 mb-8 block sd_before relative cursor-pointer"
                  >
                    <img src={join_btn} alt="" style={{ width: "30.5rem" }} />
                  </div>
                )
              ) : (
                <div className=" lobby_btn mb-8 relative cursor-pointer"
                onClick={() => {
                  dispatch(setLogin(true))
                }}>
                  {" "}
                  <img
                    src={need_btn}
                    alt=""
                    style={{ width: "30.5rem" }}
                  />{" "}
                </div>
              )}

              {/* --- Timeline-card HTML Block Start --- */}

              <TimelineCard timeLine={leagueData?.timeLine || {}} />
              <PopUp pdf={baseURL + "/api/v1/" + leagueData?.rules} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default LeagueDetail;
