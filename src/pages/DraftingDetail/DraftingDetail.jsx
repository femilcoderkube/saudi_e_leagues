import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { TeamOneScoreList } from "../Matchs/teamOneSection";
import { FirstPosCard_gold, EvenPosCard, OddPosCard } from "../../components/DraftingDetailComponents/DraftTeamsCards";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDraftById, socket, stopDraftSocket } from "../../app/socket/socket";
import { getServerURL } from "../../utils/constant";

const DraftingDetail = () => {
  const { t, i18n } = useTranslation();
  const staticData = {
    title: "Drafting",
    prizepool: "1000",
    game: {
      logo: "https://via.placeholder.com/150",
      shortName: "Game",
    },
    platform: {
      logo: "https://via.placeholder.com/150",
      name: "Platform",
    },
    playersPerTeam: 5,
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
  }, []);

  const { draftId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);

  useEffect(() => {
    let res = getDraftById({ draftId, isSocketConnected });
    console.log("res", res);
    return () => {
      stopDraftSocket();
    };
  }, [isSocketConnected, user, window.location.pathname, draftId]);

  const draftData = useSelector((state) => state.draft.draftData);
  const captains = useSelector((state) => state.draft.captains);

  const [captainsList, setCaptainsList] = useState([]);
  const [draftDataList, setDraftDataList] = useState([]);

  useEffect(() => {
    if (draftData !== null) {
      setDraftDataList(draftData);
    }
  }, [draftData]);
  useEffect(() => {
    if (Array.isArray(captains) && captains.length > 0) {
      setCaptainsList(captains);
    }
  }, [captains]);

  return (
    <main className="flex-1 tournament_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      {/* <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div> */}
      {(
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="drafting__time-wrapper flex justify-center items-center mb-3">
            <h2 className="text-[7.5rem] font-bold font_oswald drafting__title-bg">
              {draftDataList?.data?.pickTimeSeconds !== undefined
                ? Math.floor(draftDataList.data.pickTimeSeconds / 60) + ":00"
                : ""}
            </h2>
          </div>
          <div className="drafting__final_teams-wrapper mb-5">
            <div className="drafting__teams-list-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {draftData && draftData.data && draftData.data.totalTeams &&
                Array.from({ length: draftData.data.totalTeams }).map((_, teamIdx) => (
                  <div className="drafting__teams-list" key={teamIdx}>
                    <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                      Team {teamIdx + 1}
                    </h2>
                    <div className="drafting__teams-list-block">
                      <div className="drafting__teams-item relative">
                        <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                          <img alt="Gold Crown" className="h-9" src="/src/assets/images/gold_crown.png" />
                        </span>

                        {/* <FirstPosCard_gold props={captainsList[teamIdx]} /> */}
                        {captainsList[teamIdx] && (
                          <FirstPosCard_gold
                            props={{
                              username: captainsList[teamIdx]?.userId?.username || "",
                              fullName: captainsList[teamIdx]?.userId?.fullName || "",
                              id: captainsList[teamIdx]?.userId?._id || "",
                              rep: captainsList[teamIdx]?.participant?.raputations?.wilsonScore || 0,
                              profilePic: getServerURL(captainsList[teamIdx]?.userId?.profilePicture || ""),
                              rank: captainsList[teamIdx]?.rank || "",
                              score: Math.round(captainsList[teamIdx]?.totalLeaguesScore || 0),
                            }}
                          />
                        )}
                      </div>
                      {/* {draftDataList && draftDataList?.data?.otherPlayers.length > 0 && (() => { */}
                      {draftDataList?.data?.otherPlayers?.length > 0 &&
                        (() => {
                          // Calculate the number of teams and picks
                          const totalTeams = draftDataList?.data?.totalTeams;
                          const picks = draftDataList?.data?.otherPlayers;
                          const numPicks = picks.length;

                          // Build the snake order: [0,1,2,3,3,2,1,0,0,1,2,3,...]
                          let snakeOrder = [];
                          let direction = 1; // 1 for forward, -1 for backward
                          while (snakeOrder.length < numPicks) {
                            for (let i = 0; i < totalTeams && snakeOrder.length < numPicks; i++) {
                              snakeOrder.push(direction === 1 ? i : totalTeams - 1 - i);
                            }
                            direction *= -1;
                          }

                          // const teamPicks = [];
                          // snakeOrder.forEach((teamIdxInOrder, pickIdx) => {
                          //   if (teamIdxInOrder === teamIdx && picks[pickIdx]) {
                          //     // Assign pickIdx starting from 1 instead of 0
                          //     teamPicks.push({ ...picks[pickIdx], pickIdx: pickIdx + 1 });
                          //   }
                          // });
                          // return teamPicks.map((pick, idx) => (
                          //   <div className="drafting__teams-item" key={pick.pickIdx}>
                          //     {pick.pickIdx % 2 === 0
                          //       ? <OddPosCard props={pick} />
                          //       : <EvenPosCard props={pick} />}
                          //   </div>
                          // ));
                          const teamPicks = snakeOrder.map((teamIdxInOrder, pickIdx) => {
                            if (teamIdxInOrder === teamIdx && picks[pickIdx]) {
                              return { ...picks[pickIdx], pickIdx: pickIdx + 1 };
                            }
                            return null;
                          })
                            .filter(Boolean); // remove nulls

                          return teamPicks.map((pick, index) => {
                            
                            const data = {
                              index : index,
                              username: pick?.userId?.username || "",
                              fullName: pick?.userId?.fullName || "",
                              id: pick?.userId?._id || "",
                              rep: pick?.raputations?.wilsonScore || 0,
                              profilePic: getServerURL(
                                pick?.userId?.profilePicture || ""
                              ),
                              rank: pick?.rank || "",
                              score: Math.round(pick?.totalLeaguesScore || 0),
                            };

                            return (
                              <>
                                <li
                                  key={pick.pickIdx}
                                  className={`drafting__teams-item list-none`}
                                // onMouseEnter={() => setHoveredIndex(index)}
                                // onMouseLeave={() => setHoveredIndex(null)}
                                >

                                  {pick.pickIdx % 2 === 0 ? (
                                    <OddPosCard props={data} />
                                  ) : (
                                    <EvenPosCard props={data} />
                                  )}
                                </li>
                              </>
                            )
                          })


                        })()}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="draft-picks-wrapper mb-8">
            <div className="draft-picks-wrapper-title text-center relative mb-4">
              <h2 className="text-[3.2rem] font-bold font_oswald drafting__title-bg relative inline-block">Draft Pick</h2>
            </div>
            <div className="draft-picks-wrapper-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8">
              {draftDataList?.data?.otherPlayers.length > 0 &&
                // draftDataList?.data?.otherPlayers.map((pick, idx) => (
                //   <div className="draft-picks-wrapper-item" key={idx}>
                //     {idx % 2 === 0 ? <OddPosCard props={pick} /> : <EvenPosCard props={pick} />}
                //   </div>
                // ))
                draftDataList.data.otherPlayers.map((pick, idx) => {
                  const data = {
                    index : idx,
                    username: pick?.userId?.username || "",
                    fullName: pick?.userId?.fullName || "",
                    id: pick?.userId?._id || "",
                    rep: pick?.participant?.raputations?.wilsonScore || 0,
                    profilePic: getServerURL(
                      pick?.userId?.profilePicture || ""
                    ),
                    rank: pick?.rank || "",
                    score: Math.round(pick?.totalLeaguesScore || 0),
                  };

                  return (
                    <div className="draft-picks-wrapper-item" key={idx}>
                      {idx % 2 === 0 ? (
                        <OddPosCard props={data} />
                      ) : (
                        <EvenPosCard props={data} />
                      )}
                    </div>
                  );
                })}

            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default DraftingDetail;
