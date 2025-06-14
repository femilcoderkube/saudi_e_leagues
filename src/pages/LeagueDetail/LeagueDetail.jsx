import large_prime from "../../assets/images/large_prime.png";
import wind_girl from "../../assets/images/wind_girl.png";
import teamSizeImage from "../../assets/images/teamSize.png";
import valorant_bg from "../../assets/images/valorant_bg.png";
import fire_boy from "../../assets/images/fire_boy.png";
import User from "../../assets/images/user.png";
import join_btn from "../../assets/images/join_btn.png";
import star_of_week from "../../assets/images/star_of_week.png";
import ScoreTicker from "../../components/LobbyPageComp/Score_ticker.jsx";
import TimelineCard from "../../components/LobbyPageComp/TimeLineCard.jsx";
import LeaderBoard from "../../components/LobbyPageComp/LeaderBoardTable.jsx";
import { Link, useParams } from "react-router-dom";
import PopUp from "../../components/ModalPopUp/Popup.jsx";
import { useEffect } from "react";
import { socket } from "../../app/socket/socket.js";
import { generateTailwindGradient, SOCKET } from "../../utils/constant.js";
import { useSelector, useDispatch } from 'react-redux';
import { setLeagueData, setJoinStatus } from '../../app/slices/leagueDetail/leagueDetailSlice';
import GamingLoader from "../../components/Loader/loader.jsx";
import { baseURL } from "../../utils/axios.js";

const LeagueDetail = () => {
  const { lId } = useParams();
  const dispatch = useDispatch();
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { leagueData } = useSelector((state) => state.leagues);

  console.log("League ID:", lId);
  useEffect(() => {
    if (isSocketConnected) {
      // Listen for LEAGUEUPDATE
      socket.on(SOCKET.LEAGUEUPDATE, (data) => {
        dispatch(setLeagueData(data.data));
      });

      // Emit JOINLEAGUE once
      socket.emit(SOCKET.JOINLEAGUE, { Lid: lId });
    }

    return () => {
      // Clean up listeners when component unmounts or socket disconnects
      socket.off(SOCKET.LEAGUEUPDATE);
    };
  }, [isSocketConnected, lId, dispatch]);
  console.log("League Data:", leagueData);
  return (
      <main className="flex-1 pt-[0.5rem] lobby_page--wrapper">
        {/* --- dashboard main content back groud --- */}
        <div
          className="main_con--bg absolute top-0 left-0 w-full h-full bg-no-repeat"
          style={{ backgroundSize: "100rem" }}
        ></div>
        {/* <Outlet /> */}

       { !leagueData ? <GamingLoader/>  : <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex items-center">
            <div className="sd_content-left flex items-center gap-10 pb-6 mr-[-1rem] relative">
              <div className="sd_com--logo">
                <img src={`${baseURL}/api/v1/${leagueData?.partner?.logo || "" }`} alt="" style={{ width: "16.5rem" }} />
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
                  <span className="text-2xl font-bold">92</span>
                </div>
                <div className="participants p-4 text-right w-full pt-0 relative top-[-1.45rem]">
                  <span className="text-2xl font-bold">{leagueData?.totalRegistrations || 0}</span>
                  <h3 className="text-base text-[#D27D63]">Participants</h3>
                </div>
              </div>
            </div>
          </div>

          {/* === League Bottom  Card & Table Block HTML block Start === */}

          <div className="sd_bottom-wraper flex gap-[2.5rem] items-start">
            <div className="sd_content-left">
              {/* --- Game & Platform HTML Card Block Start --- */}

              <div className="sd_game_info--wrap inline-flex gap-5 items-center">
                <div className="sd_game-con sd_game--info relative sd_before sd_after polygon_border valorant_game">
                  <Link
                    to={"#"}
                    className={`game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center ${generateTailwindGradient("#000")}`}
                  >
                    <img
                     src={`${baseURL}/api/v1/${leagueData?.game?.logo || "" }`}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center sd_before">
                      <p className="text-base mb-2 text-[#E38D9D] font-medium">
                        Game
                      </p>
                      <h4 className="text-xl font-bold">{leagueData.game.name || ""}</h4>
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
                      src={`${baseURL}/api/v1/${leagueData?.platform?.logo || "" }`}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-base mb-2 purple_col font-medium">
                        Platform
                      </p>
                      <h4 className="text-xl font-bold">{leagueData?.platform?.name || "" }</h4>
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
                      <h4 className="text-xl font-bold"> {leagueData.playersPerTeam || 1}v{leagueData.playersPerTeam || 1} </h4>
                    </div>
                  </Link>
                </div>

                {/* === SVG Clip Path === */}
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

              {/* --- Star Of The Week Bedge HTML Card Block Start --- */}

              <div className="sd_star_bedge--wrap flex items-center mt-8 bg-no-repeat justify-between relative py-[0.625rem]">
                <div className="sd_bedge_left-con flex items-center gap-4 pl-[2rem]">
                  <div className="sd_bedge-lable border-r-1 border-[#7b7ed047] pr-6">
                    <img src={star_of_week} alt="" style={{ width: "6rem" }} />
                  </div>

                  <div className="sd_avtar-info gap-6 p-3 inline-flex justify-between items-center cursor-pointer text-white rounded">
                    <div className="user_img  relative sd_before ">
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

              {/* --- LeaderBoard Table HTML Block Start --- */}

              <LeaderBoard />
            </div>

            <div className="sd_content-right w-full">
              <Link
                to={"#"}
                className="lobby_btn que_btn join_btn hover:opacity-60 duration-300 mb-8 block sd_before relative"
              >
                <img src={join_btn} alt="" style={{ width: "30.5rem" }} />
              </Link>

              {/* --- Timeline-card HTML Block Start --- */}

              <TimelineCard timeLine={leagueData?.timeLine || {}} />

              {/* --- Rules & Regulation PopUP HTML Start--- */}
              <PopUp />
            </div>
          </div>
        </div>}
      </main>
  );
};

export default LeagueDetail;
