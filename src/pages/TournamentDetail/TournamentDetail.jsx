
import teamSizeImage from "../../assets/images/teamSize.png";
import mob_star_of_week from "../../assets/images/mob_star_week.png";
import ScoreTicker from "../../components/LobbyPageComp/Score_ticker.jsx";
import TimelineCard from "../../components/LobbyPageComp/TimeLineCard.jsx";
import LeaderBoard from "../../components/LobbyPageComp/LeaderBoardTable.jsx";
import { Link } from "react-router-dom";
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




const TournamentDetail = () => {
  const { t, i18n } = useTranslation();
  const { activeTournamentTab } = useSelector((state) => state.constState);
  const dispatch = useDispatch();
  const handleActiveTournamentTab = (tab) => {
    dispatch(setActiveTournamentTab(tab));
  }
  // Static data

  const staticData = {
    internalPhoto: "../../assets/images/league-logo.png",
    title: "League Title",
    titleAr: "عنوان الدوري",
    prizepool: 1000000,
    headerPhoto: "/images/header-photo.png",
    activeUsers: 1234,
    totalRegistrations: 5678,
    game: {
      logo: "/images/game-logo.png",
      shortName: "Game Name",
      name: "Full Game Name"
    },
    platform: {
      logo: "/images/platform-logo.png",
      name: "Platform"
    },
    playersPerTeam: 2,
    leaderBoard: {
      weekOfTheStartUsers: {
        userId: {
          profilePic: "/images/profile.png",
          username: "player123",
          fullName: "Player Name"
        },
        weeklyScore: 9876.54
      }
    },
    isWeekOfTheStar: true
  };

  useEffect(() => {
    if (window.bracketsViewer && document.getElementById("first")) {
      window.bracketsViewer.render({
        stages: TournamentData.stage,
        matches: TournamentData.match,
        matchGames: TournamentData.match_game,
        participants: TournamentData.participant,
      }, {
        selector: "#Major-final",
      });
    }
  }, [activeTournamentTab]); // Empty dependency array means this runs once after mount
  return (
    <main className="flex-1 tournament_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      {(
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex flex-col md:flex-row items-center justify-between md:gap-0 gap-8">
            <div className="sd_content-left flex  items-center gap-12 md:gap-10 md:pb-6 pb-9.5 mr-[-1rem] relative order-2 md:order-1">
              <div className="sd_com--logo cursor-hide w-[8.75rem] md:w-[18.5rem]">
                <img
                  src={leagueLogo}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="sd_league--info flex-1">
                <h1 className="uppercase text-2xl md:text-5xl !font-black tracking-wide">
                  {staticData.title}
                </h1>
                <h2 className="league_price text-2xl md:text-5xl !font-black font_oswald pt-5 sm:pt-3.5 md:pt-10 sm:pb-6 pb-3 yellow_grad-bg grad_text-clip">
                  <span className="icon-saudi_riyal !p-0"></span>
                  {staticData.prizepool}
                </h2>
                <span className="block purple_col text-sm sm:text-xl">
                  Prize Pool
                </span>
              </div>
            </div>
            <div className="sd_content-right flex flex-col-reverse sm:flex-row items-center md:items-start order-1 md:order-2">
              <div className="player_img flex flex-row items-center gap-2 sm:gap-5">
                <div className="player_one sd_before relative gradiant_bg con_center w-[41.02rem] h-[27.33rem]">
                  <img
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    src={headerPhoto}
                    alt=""
                  />
                </div>
              </div>
              <div className="player_score mt-4 flex md:flex-col items-start md:h-full sm:ltr:ml-[-2.5rem] sm:rtl:ml-0 z-2">

              </div>
            </div>
          </div>
          <div className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-center ">
            <div className="sd_content-top order-2 flex-col xl:flex-row md:order-1 flex gap-5 justify-between w-full">
              <div className="sd_game_info--wrap md:flex-row flex-1 inline-flex gap-[2.063rem] flex-wrap w-full justify-center xl:justify-start">
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={"getServerURL(staticData.game.logo)"}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        Game
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {staticData.game.shortName}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border cursor-default">
                  <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
                    <img
                      src={getServerURL(staticData.platform.logo)}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        Platform
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {staticData.platform.name.toUpperCase()}
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
                        Team Size
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {staticData.playersPerTeam}v{staticData.playersPerTeam}
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
                        Participants
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        11/1000
                      </h4>
                    </div>
                  </div>
                </div>

              </div>
              <div className="w-full xl:w-auto order-first xl:order-3 flex justify-center items-center">
                <div className="relative que_btn flex items-center justify-center hover:opacity-60 duration-300 sd_before cursor-not-allowed min-h-[5rem] xl:min-h-[100%] order-first md:order-3">
                  <img
                    className="mx-auto h-full absolute z-0 left-0 w-full"
                    src={Que_btn}
                    alt=""
                  />{" "}
                  <span
                    className="w-full text-center text-[1.2rem] sm:text-[1.375rem] relative z-10 px-5 xl:px-12 mt-[0.75rem]"
                    style={{
                      fontFamily: i18n.language === 'ar' ? "Cairo" : "Yapari",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Get Started
                  </span>

                </div>
              </div>
            </div>
          </div>

          <div className="sd_tournament-wrapper">
            <div className="sd_tournament-content">
              <div class="mx-auto mt-4">
                {/* <!-- Tabs --> */}
                <ul id="tournament-tabs" class="sa__tournament-tabs inline-flex pt-2 w-full border-b border-gray-200/20 overflow-x-auto">
                  <li class="font-semibold active"><a id="default-tab" href="#first" className="px-4 py-2 pl-0 flex items-center justify-center text-xl whitespace-nowrap">Overview</a></li>
                  <li class=" font-semibold"><a href="#second" className="px-4 py-2 flex items-center justify-center text-xl whitespace-nowrap">Open Qualifiers</a></li>
                  <li class="font-semibold"><a href="#third" className="px-4 py-2 flex items-center justify-center text-xl whitespace-nowrap">Online Major</a></li>
                  <li class=" font-semibold"><a href="#fourth" className="px-4 py-2 flex items-center justify-center text-xl whitespace-nowrap">Major Final</a></li>
                </ul>

                {/* <!-- Tab Contents --> */}
                <div id="tournament-tab-contents" className="mt-7">
                  <div id="first" className="py-4 active">
                    <div className="game_status--tab-wrapper text-center md:text-left rtl:text-right"> 
                      <div class="game_status--tab sm:w-auto rounded-xl overflow-hidden relative md:left-auto md:-translate-x-0 rtl:translate-x-[0] top-1  inline-flex justify-center sm:justify-start">
                          <button onClick={() => handleActiveTournamentTab(1)} class={`w-[10rem] h-[4rem] md:py-2 md:px-2.5 px-4 py-4 sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
                ${activeTournamentTab === 1 ? 'active-tab hover:opacity-100 polygon_border' : ''}`}>Brackets</button>
                      
                        <button onClick={() => handleActiveTournamentTab(2)} class={`w-[10rem] h-[4rem] md:py-2 md:px-2.5 px-4 py-4 sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
                ${activeTournamentTab === 2 ? 'active-tab hover:opacity-100 polygon_border' : ''}`}>Schedule</button>
                      </div>
                    </div>
                    {activeTournamentTab === 1 && <div className="tournament-bracket-wrapper">
                     <div id="Major-final" className="!p-0 brackets-viewer !bg-transparent "></div>
                     </div>}  
                     {activeTournamentTab === 2 && <div className="tournament-bracket-wrapper mt-20">
                      <div className="tournament-schedule-card-list grid gap-x-8 gap-y-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                          <TournamentScheduleCard />
                          <TournamentScheduleCard />
                          <TournamentScheduleCard />
                          <TournamentScheduleCard />
                     </div>
                     </div>}
                    
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
const TournamentData = {
  "participant": [
    {
      "id": 0,
      "tournament_id": 0,
      "name": "Team 1"
    },
    {
      "id": 1,
      "tournament_id": 0,
      "name": "Team 2"
    },
    {
      "id": 2,
      "tournament_id": 0,
      "name": "Team 3"
    },
    {
      "id": 3,
      "tournament_id": 0,
      "name": "Team 4"
    },
    {
      "id": 4,
      "tournament_id": 0,
      "name": "Team 6"
    },
    {
      "id": 5,
      "tournament_id": 0,
      "name": "Team 7"
    },
    {
      "id": 6,
      "tournament_id": 0,
      "name": "Team 8"
    },
    {
      "id": 7,
      "tournament_id": 0,
      "name": "Team 9"
    },
    {
      "id": 8,
      "tournament_id": 0,
      "name": "Team 10"
    },
    {
      "id": 9,
      "tournament_id": 0,
      "name": "Team 11"
    },
    {
      "id": 10,
      "tournament_id": 0,
      "name": "Team 12"
    },
    {
      "id": 11,
      "tournament_id": 0,
      "name": "Team 13"
    },
    {
      "id": 12,
      "tournament_id": 0,
      "name": "Team 14"
    },
    {
      "id": 13,
      "tournament_id": 0,
      "name": "Team 15"
    },
    {
      "id": 14,
      "tournament_id": 0,
      "name": "Team 16"
    }
  ],
  "stage": [
    {
      "id": 0,
      "tournament_id": 0,
      "name": "Example",
      "type": "double_elimination",
      "number": 1,
      "settings": {
        "size": 16,
        "seedOrdering": [
          "natural",
          "natural",
          "reverse_half_shift",
          "reverse"
        ],
        "grandFinal": "double",
        "matchesChildCount": 0
      }
    }
  ],
  "group": [
    {
      "id": 0,
      "stage_id": 0,
      "number": 1
    },
    {
      "id": 1,
      "stage_id": 0,
      "number": 2
    },
    {
      "id": 2,
      "stage_id": 0,
      "number": 3
    }
  ],
  "round": [
    {
      "id": 0,
      "number": 1,
      "stage_id": 0,
      "group_id": 0
    },
    {
      "id": 1,
      "number": 2,
      "stage_id": 0,
      "group_id": 0
    },
    {
      "id": 2,
      "number": 3,
      "stage_id": 0,
      "group_id": 0
    },
    {
      "id": 3,
      "number": 4,
      "stage_id": 0,
      "group_id": 0
    },
    {
      "id": 4,
      "number": 1,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 5,
      "number": 2,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 6,
      "number": 3,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 7,
      "number": 4,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 8,
      "number": 5,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 9,
      "number": 6,
      "stage_id": 0,
      "group_id": 1
    },
    {
      "id": 10,
      "number": 1,
      "stage_id": 0,
      "group_id": 2
    },
    {
      "id": 11,
      "number": 2,
      "stage_id": 0,
      "group_id": 2
    }
  ],
  "match": [
    {
      
      "id": 0,
      "number": 1,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 4,
      "opponent1": {
        "id": 0,
        "position": 1,
        "score": 16,
        "result": "win"
      },
      "opponent2": {
        "id": 1,
        "position": 2,
        "score": 12,
        "result": "loss"
      }
    },
    {
      "id": 1,
      "number": 2,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 3,
      "opponent1": {
        "id": 2,
        "position": 3,
        "score": 8
      },
      "opponent2": {
        "id": 3,
        "position": 4,
        "score": 4
      }
    },
    {
      "id": 2,
      "number": 3,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 0,
      "opponent1": null,
      "opponent2": {
        "id": 4,
        "position": 6
      }
    },
    {
      "id": 3,
      "number": 4,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 5,
        "position": 7
      },
      "opponent2": {
        "id": 6,
        "position": 8
      }
    },
    {
      "id": 4,
      "number": 5,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 7,
        "position": 9
      },
      "opponent2": {
        "id": 8,
        "position": 10
      }
    },
    {
      "id": 5,
      "number": 6,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 9,
        "position": 11
      },
      "opponent2": {
        "id": 10,
        "position": 12
      }
    },
    {
      "id": 6,
      "number": 7,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 11,
        "position": 13
      },
      "opponent2": {
        "id": 12,
        "position": 14
      }
    },
    {
      "id": 7,
      "number": 8,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 0,
      "child_count": 0,
      "status": 2,
      "opponent1": {
        "id": 13,
        "position": 15
      },
      "opponent2": {
        "id": null,
        "position": 16
      }
    },
    {
      "id": 8,
      "number": 1,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 1,
      "child_count": 0,
      "status": 1,
      "opponent1": {
        "id": 0
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 9,
      "number": 2,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 1,
      "child_count": 0,
      "status": 1,
      "opponent1": {
        "id": 4
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 10,
      "number": 3,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 1,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 11,
      "number": 4,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 1,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 12,
      "number": 1,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 2,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 13,
      "number": 2,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 2,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 14,
      "number": 1,
      "stage_id": 0,
      "group_id": 0,
      "round_id": 3,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 15,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 4,
      "child_count": 0,
      "status": 1,
      "opponent1": {
        "id": 1,
        "position": 1
      },
      "opponent2": {
        "id": null,
        "position": 2
      }
    },
    {
      "id": 16,
      "number": 2,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 4,
      "child_count": 0,
      "status": 0,
      "opponent1": null,
      "opponent2": {
        "id": null,
        "position": 4
      }
    },
    {
      "id": 17,
      "number": 3,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 4,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 5
      },
      "opponent2": {
        "id": null,
        "position": 6
      }
    },
    {
      "id": 18,
      "number": 4,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 4,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 7
      },
      "opponent2": {
        "id": null,
        "position": 8
      }
    },
    {
      "id": 19,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 5,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 2
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 20,
      "number": 2,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 5,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 1
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 21,
      "number": 3,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 5,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 4
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 22,
      "number": 4,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 5,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 3
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 23,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 6,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 24,
      "number": 2,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 6,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 25,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 7,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 2
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 26,
      "number": 2,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 7,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 1
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 27,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 8,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 28,
      "number": 1,
      "stage_id": 0,
      "group_id": 1,
      "round_id": 9,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null,
        "position": 1
      },
      "opponent2": {
        "id": null
      }
    },
    {
      "id": 29,
      "number": 1,
      "stage_id": 0,
      "group_id": 2,
      "round_id": 10,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null,
        "position": 1
      }
    },
    {
      "id": 30,
      "number": 1,
      "stage_id": 0,
      "group_id": 2,
      "round_id": 11,
      "child_count": 0,
      "status": 0,
      "opponent1": {
        "id": null
      },
      "opponent2": {
        "id": null
      }
    }
  ],
  "match_game": []
}