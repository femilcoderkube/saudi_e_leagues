import React, { useEffect, useState } from "react";
import {
  FirstPosCard_gold,
  EvenPosCard,
  OddPosCard,
} from "../../components/DraftingDetailComponents/DraftTeamsCards";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDraftById, setPickedPlayer, socket, stopDraftSocket } from "../../app/socket/socket";
import { getIntervalCountdown, getServerURL } from "../../utils/constant";
import GamingLoader from "../../components/Loader/loader";
import GoldCrown from "../../assets/images/gold_crown.png";

const DraftingDetail = () => {
  const { draftId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { draftData, picks, teams, otherPlayers } = useSelector((state) => state.draft);
  const [countdown, setCountdown] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  const getCaptainValidation = () => {
    if (!user || !teams || !draftData) {
      return { isUserCaptain: false, isCurrentTurn: false, userTeamIndex: -1 };
    }

    const userTeamIndex = teams.findIndex(team =>
      team?.captains?.userId?._id === user._id
    );

    const isUserCaptain = userTeamIndex !== -1;

    let isCurrentTurn = false;
    if (isUserCaptain && draftData?.currentInterval !== undefined && draftData.currentInterval !== -1) {
      const totalTeams = draftData?.totalTeams || teams.length;
      const interval = draftData.currentInterval + 1;

      const snakeOrder = [];
      let direction = 1;
      let currentRoundTeams = [];

      for (let i = 1; i <= interval; i++) {
        if (currentRoundTeams.length === 0) {
          currentRoundTeams = direction === 1
            ? [...Array(totalTeams).keys()]
            : [...Array(totalTeams).keys()].reverse();
        }
        snakeOrder.push(currentRoundTeams.shift());

        if (currentRoundTeams.length === 0) {
          direction *= -1;
        }
      }

      const currentTeamIndex = snakeOrder[interval - 1];
      isCurrentTurn = currentTeamIndex === userTeamIndex;
    }

    return { isUserCaptain, isCurrentTurn, userTeamIndex };
  };

  const { isUserCaptain, isCurrentTurn, userTeamIndex } = getCaptainValidation();

  useEffect(() => {
    if (isSocketConnected) {
      getDraftById({ draftId, isSocketConnected });
    }
    return () => {
      stopDraftSocket();
    };
  }, [isSocketConnected, user, window.location.pathname, draftId]);

  useEffect(() => {
    if (draftData && teams && otherPlayers) {
      setIsInitialLoading(false);
    }
  }, [draftData, teams, otherPlayers]);

  useEffect(() => {
    setTimeout(() => {
      if (draftData && new Date(draftData?.startTime) < new Date()) {
        const initialCountdown = getIntervalCountdown(
          draftData?.currentIntervalTime, draftData?.pickTimeSeconds
        );
        setCountdown(initialCountdown);
      }
    }, 100);
  }, [draftData, draftData?.currentIntervalTime]);

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

  useEffect(() => {
    if (validationMessage) {
      const timer = setTimeout(() => {
        setValidationMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [validationMessage]);

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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

    if (!isUserCaptain) {
      setValidationMessage("You are not a captain!");
      return;
    }

    if (!isCurrentTurn) {
      setValidationMessage("It's not your turn to pick!");
      return;
    }

    if (isSocketConnected) {
      setPickedPlayer({ draftId, Playerdata, isSocketConnected });
      setValidationMessage(""); // Clear any existing message

    }
    // return () => {
    //   stopDraftSocket();
    // };
  }

  if (isInitialLoading || !draftData || !teams || !otherPlayers) {
    return (
      <GamingLoader />
    );
  }

  return (
    <main className="flex-1 tournament_page--wrapper  pb-[5.25rem] sm:pb-0">
      {validationMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="font-semibold">{validationMessage}</p>
        </div>
      )}

      {isUserCaptain && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40">
          <div className={`px-4 py-2 rounded-lg text-white font-semibold ${isCurrentTurn ? 'bg-green-500' : 'bg-gray-500'
            }`}>
            {isCurrentTurn ? 'Your Turn to Pick!' : 'Waiting for other captain...'}
          </div>
        </div>
      )}
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
              {teams?.map((team, teamIdx) => {

                const isCurrentCaptainTurn = (() => {
                  if (!draftData?.currentInterval || draftData.currentInterval === -1) {
                    return false; 
                  }

                  const totalTeams = draftData?.totalTeams || teams.length;
                  const interval = draftData.currentInterval + 1;

                  const snakeOrder = [];
                  let direction = 1;
                  let currentRoundTeams = [];

                  for (let i = 1; i <= interval; i++) {
                    if (currentRoundTeams.length === 0) {
                      currentRoundTeams = direction === 1
                        ? [...Array(totalTeams).keys()]
                        : [...Array(totalTeams).keys()].reverse();
                    }
                    snakeOrder.push(currentRoundTeams.shift());

                    if (currentRoundTeams.length === 0) {
                      direction *= -1;
                    }
                  }

                  const currentTeamIndex = snakeOrder[interval - 1];

                  return currentTeamIndex === teamIdx;
                })();

                return (
                  <div className="drafting__teams-list" key={teamIdx}>
                    <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                      Team {teamIdx + 1}
                    </h2>
                    <div className="drafting__teams-list-block">
                      <div className={`drafting__teams-item relative ${isCurrentCaptainTurn ? 'captain_turn' : ''}`}>
                        <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                          <img
                            alt="Gold Crown"
                            className="h-9"
                            src={GoldCrown}
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

                      {/* Team captain card */}
                      <ul className="drafting__teams-picked-list">
                        {team.players.map((p, slotIdx) => {
                          const isPicked = !!p.username;

                          const data = {
                            index: p.index,
                            username: p.username || "",
                            fullName: p.fullName || "",
                            id: p.id || `empty-${teamIdx}-${slotIdx}`,
                            rep: p.rep || 0,
                            profilePic: getServerURL(p.profilePic) || "",
                            rank: p.rank || "",
                            score: Math.round(p.score || 0)
                          };

                          const Card = slotIdx % 2 === 0 ? EvenPosCard : OddPosCard;

                          return (
                            <li
                              key={data.id}
                              className={`drafting__teams-item list-none ${isPicked ? "assign" : "empty"}`}
                            >
                              <Card props={data} />
                            </li>
                          );
                        })}
                      </ul>

                      {/* {otherPlayers?.length > 0 && (() => {
                          const totalTeams = draftData?.totalTeams;
                          const maxCount = draftData?.totalPlayers - draftData?.totalTeams;
                          const numPicks = otherPlayers.length;
                          let snakeOrder = [];
                          let direction = 1; // 1 for forward, -1 for backward

                          // Build the snake order array
                          while (snakeOrder.length < numPicks) {
                            for (let i = 0; i < totalTeams && snakeOrder.length < numPicks; i++) {
                              snakeOrder.push(direction === 1 ? i : totalTeams - 1 - i);
                            }
                            direction *= -1;
                          }
                          

                          // Find picks for this specific team based on snake order
                          const teamPicks = [];
                          snakeOrder.forEach((teamIdxInOrder, pickIdx) => {
                            if (teamIdxInOrder === teamIdx && team?.players?.[teamPicks.length]) {
                              let pickNumber = maxCount ? maxCount - pickIdx : numPicks - pickIdx;
                              teamPicks.push({
                                pickIdx: pickNumber,
                                playerId: team.players[teamPicks.length],
                                globalPickIndex: pickIdx
                              });
                            }
                          });

                          // Render the player cards for this team
                          return teamPicks.map((pick, index) => {
                            const playerData = otherPlayers?.find(p => p.userId._id === pick.playerId.id);

                            if (!playerData) {
                              console.warn(`Player with ID ${pick.playerId} not found in otherPlayers`);
                              return null;
                            }

                            const data = {
                              index: maxCount + 1 - pick.pickIdx,
                              username: playerData?.userId?.username || "",
                              fullName: playerData?.userId?.fullName || "",
                              id: playerData?.userId?._id || "",
                              rep: playerData?.wilsonScore || 0,
                              profilePic: getServerURL(playerData?.userId?.profilePicture || ""),
                              rank: playerData?.rank || "",
                              score: Math.round(playerData?.totalLeaguesScore || 0)
                            };

                            // Use pick number to determine even/odd card
                            const Card = pick.pickIdx % 2 === 0 ? EvenPosCard : OddPosCard;

                            return (
                              <li key={pick.index} className={`drafting__teams-item list-none ${data.username ? 'assign' : ''}`}>
                                <Card props={data} />
                              </li>
                            );
                          });
                        })()} */}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="draft-picks-wrapper mb-8">
            <div className="draft-picks-wrapper-title text-center relative mb-4">
              <h2 className="text-[3.2rem] font-bold font_oswald drafting__title-bg relative inline-block">
                {otherPlayers.length > 0 ? "Draft Pick" : "No Draft Picks Available"}
              </h2>
            </div>

            {new Date() < new Date(draftData?.startTime) ? (
              <div className="text-center py-8">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                  <p className="text-xl font-semibold">Draft hasn't started yet!</p>
                  <p>Draft will begin at: {new Date(draftData.startTime).toLocaleString()}</p>
                </div>

                {/* Show grayed out players */}
                <div className="draft-picks-wrapper-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8 opacity-50 pointer-events-none">
                  {otherPlayers.length > 0 && rows.map((row, rowIdx) => (
                    <div className="draft-row" key={rowIdx}>
                      {row.map((data, idx) => (
                        <div className="draft-picks-wrapper-item" key={data.index}>
                          {idx % 2 === 0 ? (
                            <OddPosCard props={data} />
                          ) : (
                            <EvenPosCard props={data} />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Normal draft interface when time has reached
              <div className="draft-picks-wrapper-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8">
                {otherPlayers.length > 0 ? (
                  rows.map((row, rowIdx) => (
                    <div className="draft-row" key={rowIdx}>
                      {row.map((data, idx) => {

                        const isClickable = isUserCaptain && isCurrentTurn;
                        return (
                          <div className="draft-picks-wrapper-item" key={data.index}>
                            {idx % 2 === 0 ? (
                              <OddPosCard props={data}
                                onClick={isClickable ? () => handlePlayerClick(data) : undefined}
                              />
                            ) : (
                              <EvenPosCard props={data}
                                onClick={isClickable ? () => handlePlayerClick(data) : undefined} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-8 text-xl text-gray-500">
                    No players available for drafting.
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      }
    </main>
  );
};

export default DraftingDetail;
