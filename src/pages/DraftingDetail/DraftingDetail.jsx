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
    }, 100);
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
                (team, teamIdx) => {
                  // console.log("team======", team);
                  return (
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


                        {/* {team?.players?.length > 0 && (
                          <>
                            {team.players.map((playerId, playerIndex) => {
                              // Find the actual player data from otherPlayers
                              const playerData = otherPlayers?.find(p => p.userId._id === playerId.id);

                              if (!playerData) {
                                console.warn(`Player with ID ${playerId} not found in otherPlayers`);
                                return null;
                              }

                              const data = {
                                index: playerIndex + 1, // Start from 1 since captain is 0
                                username: playerData?.userId?.username || "",
                                fullName: playerData?.userId?.fullName || "",
                                id: playerData?.userId?._id || "",
                                rep: playerData?.wilsonScore || 0,
                                profilePic: getServerURL(playerData?.userId?.profilePicture || ""),
                                rank: playerData?.rank || "",
                                score: Math.round(playerData?.totalLeaguesScore || 0)
                              };

                              // Alternate between Even and Odd cards
                              const Card = playerIndex % 2 === 0 ? EvenPosCard : OddPosCard;

                              return (
                                <li key={playerId} className="drafting__teams-item list-none">
                                  <Card props={data} />
                                </li>
                              );
                            })}
                          </>
                        )} */}

                        {/* {otherPlayers?.length > 0 &&
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
                                  // picks[pickIdx]
                                  team?.players?.[pickIdx]
                                ) {
                                  // Pick # should start from maxCount and decrease
                                  let pickNumber = maxCount
                                    ? maxCount - pickIdx
                                    : numPicks - pickIdx;
                                  return {
                                    pickIdx: pickNumber,
                                    playerId: team.players[pickIdx]

                                  };
                                }
                                return null;
                              })
                              .filter(Boolean); // remove nulls

                            return teamPicks.map((pick, index) => {
                              const playerData = otherPlayers?.find(p => p.userId._id === pick.playerId);

                              if (!playerData) return null;
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

                              const Card = pick.pickIdx % 2 === 0 ? EvenPosCard : OddPosCard;
                              return (
                                <li key={pick.playerId} className="drafting__teams-item list-none">
                                  <Card props={data} />
                                </li>
                              );
                            })
                          })()} */}
                          
                        {/* {(() => {
  const totalTeams = draftData?.totalTeams || 0;
  const totalOtherPlayers = draftData?.totalPlayers - totalTeams;
  const maxPlayersPerTeam = Math.floor(totalOtherPlayers / totalTeams);
  
  console.log(`Team ${teamIdx + 1}: Max players per team = ${maxPlayersPerTeam}`);
  
  // Create array of slots for this team
  const teamSlots = Array.from({ length: maxPlayersPerTeam }, (_, slotIndex) => {
    const playerId = team?.players?.[slotIndex]; // Get player at this slot (if exists)
    const isEmpty = !playerId;
    
    return {
      slotIndex,
      playerId,
      isEmpty,
      pickNumber: slotIndex + 1 // Simple pick numbering (1, 2, 3...)
    };
  });
  
  // Render all slots
  return teamSlots.map((slot) => {
    let data;
    
    if (!slot.isEmpty) {
      // Slot has a player - find player data
      const playerData = otherPlayers?.find(p => {
        // Handle both object and string IDs
        const playerIdToMatch = typeof slot.playerId === 'string' 
          ? slot.playerId 
          : slot.playerId?.id || slot.playerId?._id;
        return p.userId._id === playerIdToMatch;
      });
      
      if (playerData) {
        data = {
          index: slot.pickNumber,
          username: playerData?.userId?.username || "",
          fullName: playerData?.userId?.fullName || "",
          id: playerData?.userId?._id || "",
          rep: playerData?.wilsonScore || 0,
          profilePic: getServerURL(playerData?.userId?.profilePicture || ""),
          rank: playerData?.rank || "",
          score: Math.round(playerData?.totalLeaguesScore || 0),
          isEmpty: false
        };
      } else {
        // Player data not found, treat as empty
        slot.isEmpty = true;
      }
    }
    
    if (slot.isEmpty) {
      // Empty slot - show placeholder
      data = {
        index: slot.pickNumber,
        username: "",
        fullName: `Pick #${slot.pickNumber}`,
        id: `empty-team-${teamIdx}-slot-${slot.slotIndex}`,
        rep: 0,
        profilePic: "",
        rank: "",
        score: 0,
        isEmpty: true
      };
    }
    
    // Alternate between Even and Odd cards
    const Card = slot.slotIndex % 2 === 0 ? EvenPosCard : OddPosCard;
    
    return (
      <li 
        key={slot.isEmpty ? data.id : data.id} 
        className={`drafting__teams-item list-none ${!slot.isEmpty && data.username ? 'assign' : ''}`}
      >
        <Card props={data} />
      </li>
    );
  });
})()} */}

                        {/* {(() => {
                          const totalTeams = draftData?.totalTeams;
                          const maxCount = draftData?.totalPlayers - draftData?.totalTeams;
                          const maxPlayersPerTeam = Math.floor((draftData?.totalPlayers - totalTeams) / totalTeams);
                          let snakeOrder = [];
                          let direction = 1;

                          // Build the snake order array for all possible picks
                          const totalPossiblePicks = maxPlayersPerTeam * totalTeams;
                          while (snakeOrder.length < totalPossiblePicks) {
                            for (let i = 0; i < totalTeams && snakeOrder.length < totalPossiblePicks; i++) {
                              snakeOrder.push(direction === 1 ? i : totalTeams - 1 - i);
                            }
                            direction *= -1;
                          }

                          // Find ALL pick slots for this team (both filled and empty)
                          const teamSlots = [];
                          snakeOrder.forEach((teamIdxInOrder, pickIdx) => {
                            if (teamIdxInOrder === teamIdx) {
                              let pickNumber = maxCount ? maxCount - pickIdx : totalPossiblePicks - pickIdx;
                              const slotIndex = teamSlots.length; // 0, 1, 2, etc.
                              const playerId = team?.players?.[slotIndex]; // Get actual player if exists

                              teamSlots.push({
                                pickIdx: pickNumber,
                                playerId: playerId,
                                globalPickIndex: pickIdx,
                                slotIndex: slotIndex,
                                isEmpty: !playerId
                              });
                            }
                          });

                          // Render ALL slots for this team (filled and empty)
                          return teamSlots.map((slot, index) => {
                            let data;
                            let Card;

                            if (!slot.isEmpty) {
                              // Slot has a player - show player data
                              const playerData = otherPlayers?.find(p => p.userId._id === slot.playerId);

                              if (playerData) {
                                data = {
                                  index: maxCount + 1 - slot.pickIdx,
                                  username: playerData?.userId?.username || "",
                                  fullName: playerData?.userId?.fullName || "",
                                  id: playerData?.userId?._id || "",
                                  rep: playerData?.wilsonScore || 0,
                                  profilePic: getServerURL(playerData?.userId?.profilePicture || ""),
                                  rank: playerData?.rank || "",
                                  score: Math.round(playerData?.totalLeaguesScore || 0)
                                };
                              } else {
                                // Player data not found, treat as empty
                                slot.isEmpty = true;
                              }
                            }

                            if (slot.isEmpty) {
                              // Empty slot - show placeholder data
                              data = {
                                index: maxCount + 1 - slot.pickIdx,
                                username: "",
                                fullName: "",
                                id: ``,
                                rep: 0,
                                profilePic: "",
                                rank: "",
                                score: 0,
                                isEmpty: true
                              };
                            }

                            // Use pick number to determine even/odd card
                            Card = slot.pickIdx % 2 === 0 ? EvenPosCard : OddPosCard;

                            return (
                              <li key={slot.isEmpty ? data.id : slot.playerId} className="drafting__teams-item list-none">
                                <Card props={data} />
                              </li>
                            );
                          });
                        })()} */}


                        {/* Players slots (placeholders or picks) */}
                        <ul className="drafting__teams-picked-list">
                          {team.players.map((p, slotIdx) => {
                            // `p` is either { index } or full player object
                            const isPicked = !!p.username; // you only get `username` once someone is picked

                            const data = {
                              index: p.index,                     // always present
                              username: p.username || "",           // empty for placeholder
                              fullName: p.fullName || "",
                              id: p.id || `empty-${teamIdx}-${slotIdx}`,
                              rep: p.rep || 0,
                              profilePic: p.profilePic || "",
                              rank: p.rank || "",
                              score: Math.round(p.score || 0)
                            };

                            // pick even/odd styling on the placeholder index
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
            <div className="draft-picks-wrapper-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8">
              {otherPlayers.length > 0 ? (
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
                    ))}
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8 text-xl text-gray-500">
                  {/* You can customize this message or add a graphic */}
                  No players available for drafting.
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </main>
  );
};

export default DraftingDetail;
