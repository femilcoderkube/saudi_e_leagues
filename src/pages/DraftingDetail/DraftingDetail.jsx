import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { TeamOneScoreList } from "../Matchs/teamOneSection";
import {
  FirstPosCard_gold,
  EvenPosCard,
  OddPosCard,
} from "../../components/DraftingDetailComponents/DraftTeamsCards";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDraftById, setPickedPlayer, socket, stopDraftSocket } from "../../app/socket/socket";
import { getIntervalCountdown, getServerURL } from "../../utils/constant";

const DraftingDetail = () => {
  const { draftId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { draftData, picks, teams, otherPlayers } = useSelector((state) => state.draft);
  // Countdown state
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isSocketConnected) {
      getDraftById({ draftId, isSocketConnected });
    }
    return () => {
      stopDraftSocket();
    };
  }, [isSocketConnected, user, window.location.pathname, draftId]);

  useEffect(() => {
    setTimeout(() => {
      if (draftData && new Date(draftData?.startTime) < new Date()) {
        const initialCountdown = getIntervalCountdown(
          draftData?.currentIntervalTime, draftData?.pickTimeSeconds
        );
        setCountdown(initialCountdown);
      }
    }, 1000);
  }, [draftData, draftData?.currentIntervalTime]);

  // Replace your countdown timer effect with this:
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      if (draftData) {
        const realTimeCountdown = getIntervalCountdown(
          draftData?.currentIntervalTime, draftData?.pickTimeSeconds
        );

        setCountdown(realTimeCountdown);
      }
    }, 100);


    return () => clearInterval(timer);
  }, [countdown]);

  // Format countdown as MM:SS
  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Helper to chunk array into rows of given size
  const chunkArray = (arr, size) => {
    if (!Array.isArray(arr) || size <= 0) return [];
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(picks, otherPlayers?.length / 4);


  const handlePlayerClick = (Playerdata) => {
    if (isSocketConnected) {
      setPickedPlayer({ draftId, Playerdata, isSocketConnected });
    }
    return () => {
      stopDraftSocket();
    };
  }

  // const assignPlayerToCaptainTeamSnakeDraft = (selectedPlayerData) => {

  //   setDraftData(prev => {
  //     const { currentInterval, totalTeams, teams, otherPlayers } = prev;
  //     const round = Math.floor(currentInterval / totalTeams);
  //     const indexInRound = currentInterval % totalTeams;
  //     const teamIndex = (round % 2 === 0)
  //       ? indexInRound
  //       : (totalTeams - 1 - indexInRound);

  //     const playerEntry = otherPlayers.find(p => p.userId._id === selectedPlayerData.id);
  //     if (!playerEntry) {
  //       console.error("Player not found");
  //       return prev;
  //     }
  //     const playerId = playerEntry.userId._id;
  //     const playername = playerEntry.userId.username;

  //     // Prevent duplicate
  //     const alreadyPicked = prev.teams.some(team => team.players.includes(playerId));
  //     if (alreadyPicked) {
  //       console.warn("Player already picked");
  //       return prev;
  //     }

  //     // Build updated teams array immutably
  //     const updatedTeams = prev.teams.map((team, idx) => {
  //       if (idx === teamIndex) {
  //         return {
  //           ...team,
  //           players: [...team.players, playername]
  //         };
  //       }
  //       return team;
  //     });

  //     return {
  //       ...prev,
  //       currentInterval: currentInterval + 1,
  //       teams: updatedTeams
  //     };
  //   });
  // };
  // console.log("draftDataState", draftDataState);
  return (
    <main className="flex-1 tournament_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      {/* <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div> */}
      {
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="drafting__time-wrapper flex justify-center items-center mb-3">
            <h2 className="text-[7.5rem] font-bold font_oswald drafting__title-bg">
              {formatCountdown(countdown)}
            </h2>
          </div>
          <div className="drafting__final_teams-wrapper mb-5">
            <div className="drafting__teams-list-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {teams?.map(
                (team, teamIdx) => (
                  <div className="drafting__teams-list" key={teamIdx}>
                    <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                      Team {teamIdx + 1}
                    </h2>
                    <div className="drafting__teams-list-block">
                      <div className="drafting__teams-item relative">
                        <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                          <img
                            alt="Gold Crown"
                            className="h-9"
                            src="/src/assets/images/gold_crown.png"
                          />
                        </span>
                        {team && (
                          <FirstPosCard_gold
                            props={{
                              index: teamIdx,
                              username:
                                team?.captains?.userId?.username || "",
                              fullName:
                                team?.captains?.userId?.fullName || "",
                              id: team?.captains?.userId?._id || "",
                              rep:
                                team?.captains?.wilsonScore || 0,
                              profilePic: getServerURL(
                                team?.captains?.userId
                                  ?.profilePicture || ""
                              ),
                              rank: team?.captains?.rank || "",
                              score: Math.round(
                                team?.captains?.totalLeaguesScore || 0
                              ),
                            }}
                          />
                        )}
                      </div>
                      {/* {draftDataList && draftDataList?.data?.otherPlayers.length > 0 && (() => { */}
                      {otherPlayers?.length > 0 &&
                        (() => {
                          // Calculate the number of teams and picks
                          const totalTeams = draftData?.totalTeams;
                          const maxCount = draftData?.totalPlayers - draftData?.totalTeams;
                          const numPicks = otherPlayers.length;
                          let snakeOrder = [];
                          let direction = 1; // 1 for forward, -1 for backward
                          while (snakeOrder.length < numPicks) {
                            for (
                              let i = 0;
                              i < totalTeams && snakeOrder.length < numPicks;
                              i++
                            ) {
                              snakeOrder.push(
                                direction === 1 ? i : totalTeams - 1 - i
                              );
                            }
                            direction *= -1;
                          }

                          // Calculate pickIdx so that Pick # starts from maxCount and decreases
                          // If maxCount is 25 and there are 25 picks, Pick #25 is first, Pick #1 is last
                          const teamPicks = snakeOrder
                            .map((teamIdxInOrder, pickIdx) => {
                              if (
                                teamIdxInOrder === teamIdx &&
                                picks[pickIdx]
                              ) {
                                // Pick # should start from maxCount and decrease
                                let pickNumber = maxCount
                                  ? maxCount - pickIdx
                                  : numPicks - pickIdx;
                                return {
                                  pickIdx: pickNumber,
                                };
                              }
                              return null;
                            })
                            .filter(Boolean); // remove nulls

                          return teamPicks.map((pick, index) => {
                            
                            const data = {
                              index: maxCount + 1 - pick.pickIdx,
                              username:
                                team?.captains?.userId?.username || "",
                              fullName:
                                team?.captains?.userId?.fullName || "",
                              id: team?.captains?.userId?._id || "",
                              rep:
                                team?.captains?.wilsonScore || 0,
                              profilePic: getServerURL(
                                team?.captains?.userId
                                  ?.profilePicture || ""
                              ),
                              rank: team?.captains?.rank || "",
                              score: Math.round(
                                team?.captains?.totalLeaguesScore || 0
                              )
                            };

                            return (
                              <>
                                <li
                                  key={pick.pickIdx}
                                  className={`drafting__teams-item list-none`}
                                >
                                  {index % 2 === 0 ? (
                                    <EvenPosCard props={data} />
                                  ) : (
                                    <OddPosCard props={data} />
                                  )}
                                </li>
                              </>
                            );
                          });
                        })()}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="draft-picks-wrapper mb-8">
            <div className="draft-picks-wrapper-title text-center relative mb-4">
              <h2 className="text-[3.2rem] font-bold font_oswald drafting__title-bg relative inline-block">
                Draft Pick
              </h2>
            </div>
            <div className="draft-picks-wrapper-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8">
              {otherPlayers.length > 0 &&
                // draftDataList?.data?.otherPlayers.map((pick, idx) => (
                //   <div className="draft-picks-wrapper-item" key={idx}>
                //     {idx % 2 === 0 ? <OddPosCard props={pick} /> : <EvenPosCard props={pick} />}
                //   </div>
                // ))
                rows.map((row, rowIdx) => (
                  <div className="draft-row" key={rowIdx}>
                    {row.map((data, idx) => (

                      <div
                        className="draft-picks-wrapper-item"
                        key={data.index}
                      >
                        {idx % 2 === 0 ? (
                          <OddPosCard props={data} onClick={() => handlePlayerClick(data)} />
                        ) : (
                          <EvenPosCard props={data} onClick={() => handlePlayerClick(data)} />
                        )}
                      </div>
                    )
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      }
    </main>
  );
};

export default DraftingDetail;
