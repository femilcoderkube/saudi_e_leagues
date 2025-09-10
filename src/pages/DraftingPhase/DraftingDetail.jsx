import React, { useEffect, useState } from "react";
import {
  FirstPosCard_gold,
  EvenPosCard,
  OddPosCard,
} from "../../components/Cards/DraftingDetail/DraftTeams.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDraftById, setPickedPlayer, socket, stopDraftSocket } from "../../app/socket/socket";
import { checkIsCurrentCaptainTurn, getIntervalCountdown, getServerURL } from "../../utils/constant";
import GamingLoader from "../../components/Loader/loader";
import GoldCrown from "../../assets/images/gold_crown.png";
import moment from "moment";
import { setConfirmationPopUp, setSelectedPlayerData } from "../../app/slices/constState/constStateSlice";
import { t } from "i18next";
import { clearData } from "../../app/slices/draft/draftSlice";
import {
  cardVariantsAni,
} from "../../components/Animation/animation.jsx";
import { motion } from "motion/react";
import ConfirmationPopUp from "../../components/Overlays/ConfirmationPopUp.jsx";

const DraftingDetail = () => {
  const { draftId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { draftData, picks, teams, otherPlayers, isUserCaptain, isCurrentTurn } = useSelector((state) => state.draft);
  const [countdown, setCountdown] = useState("00:00");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    dispatch(clearData());
    if (isSocketConnected) {
      getDraftById({ draftId, isSocketConnected, user });
    }
    return () => {
      stopDraftSocket({ draftId });
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
        setCountdown(initialCountdown || "00:00");
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
        setCountdown(realTimeCountdown || "00:00");
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

  const handlePlayerClick = (Playerdata) => {
    if (isUserCaptain && isCurrentTurn) {
      dispatch(setSelectedPlayerData(Playerdata));
      dispatch(setConfirmationPopUp(3)); // 3 for player selection confirmation
    } else {
      if (!isUserCaptain) {
        setValidationMessage("You are not a captain!");
        return;
      }

      if (!isCurrentTurn) {
        setValidationMessage("It's not your turn to pick!");
        return;
      }
    }
  }

  if (isInitialLoading || !draftData || !teams || !otherPlayers) {
    return (
      <GamingLoader />
    );
  }

  return (
    <main className="flex-1 tournament_page--wrapper pb-[5.25rem] sm:pb-0">
      {validationMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="font-semibold">{validationMessage}</p>
        </div>
      )}
      {
        <div className="sd_content-wrapper max-w-full">
          <motion.div className="drafting__time-wrapper flex justify-center items-center mb-3"
          initial="hidden"
          whileInView="visible"
          variants={cardVariantsAni}
          viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-[7.5rem] font-bold font_oswald drafting__title-bg">
              {otherPlayers.length > 0 ? countdown : "00:00"}
            </h2>
          </motion.div>

          {new Date() < new Date(draftData?.startTime) ?
            <motion.div className="text-center py-8"
            initial="hidden"
            whileInView="visible"
            variants={cardVariantsAni}
            viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mx-auto max-w-[40rem] sd_before sd_after relative polygon_border">
                <div className="px-6 py-4">
                  <p className="text-2xl font_oswald font-bold uppercase yellow_grad-bg grad_text-clip">
                    {t("drafting.draft_not_started")}
                  </p>
                  <p className="text-white mt-1">
                    {t("drafting.draft_will_begin")}
                    {moment(draftData.startTime).local().format("DD/MM/YYYY hh:mm A")}
                  </p>
                </div>
              </div>
            </motion.div>
            : ""}

          {draftData?.otherPlayers.length === 0 ?
            <motion.div className="text-center py-8"
            initial="hidden"
            whileInView="visible"
            variants={cardVariantsAni}
            viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mx-auto max-w-[40rem] sd_before sd_after relative polygon_border">
                <div className="px-6 py-4">
                  <p className="text-2xl font_oswald font-bold uppercase yellow_grad-bg grad_text-clip">
                    {t("drafting.draft_finished")}
                  </p>
                </div>
              </div>
            </motion.div>
            : ""}

          <motion.div className="drafting__final_teams-wrapper mb-5"
          initial="hidden"
            whileInView="visible"
            variants={cardVariantsAni}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="drafting__teams-list-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {teams?.map((team, teamIdx) => {
                const draftComplete = teams.every(team =>
                  team.players.every(p => !!p.username)
                );
                const isCurrentCaptainTurn = checkIsCurrentCaptainTurn(draftComplete, draftData, teams, teamIdx);

                return (
                  <div className="drafting__teams-list" key={teamIdx}>
                    <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                      {t("drafting.teams")} {teamIdx + 1}
                    </h2>
                    <div className="drafting__teams-list-block">
                      <div className={`drafting__teams-item relative ${isCurrentCaptainTurn && new Date() > new Date(draftData?.startTime) ? 'captain_turn' : ''}`}>
                        <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                          <img
                            alt={t("drafting.gold_crown")}
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
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div className="draft-picks-wrapper mb-8"
                initial="hidden"
                whileInView="visible"
                variants={cardVariantsAni}
                viewport={{ once: true, amount: 0.3 }}
          >
            <div className="draft-picks-wrapper-title text-center relative mb-4">
              <h2 className="text-[3.2rem] font-bold font_oswald drafting__title-bg relative inline-block">
                {otherPlayers.length > 0 ? t("drafting.drafting_picks") : t("drafting.no_draft_picks")}
              </h2>
            </div>

            {(() => {
              const isDraftNotStarted = new Date() < new Date(draftData?.startTime);
              const isClickable = isUserCaptain && isCurrentTurn && !isDraftNotStarted;

              const containerClasses = `draft-picks-wrapper-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8 ${isDraftNotStarted ? 'opacity-50 pointer-events-none' : ''
                }`;

              const content = otherPlayers.length > 0 && (
                picks.map((data, rowIdx) => (
                  <div
                    className={isDraftNotStarted ? "draft-row" : ""}
                    key={isDraftNotStarted ? rowIdx + "A" : rowIdx}
                  >
                    <div className="draft-picks-wrapper-item" key={isDraftNotStarted ? data.index : undefined}>
                      {rowIdx % 2 === 0 ? (
                        <OddPosCard
                          props={data}
                          onClick={isClickable ? () => handlePlayerClick(data) : undefined}
                        />
                      ) : (
                        <EvenPosCard
                          props={data}
                          onClick={isClickable ? () => handlePlayerClick(data) : undefined}
                        />
                      )}
                    </div>
                  </div>
                ))
              );

              if (isDraftNotStarted) {
                return (
                  <div className="text-center py-8">
                    <div className={containerClasses}>
                      {otherPlayers.length > 0 && content}
                    </div>
                  </div>
                );
              }

              return <div className={containerClasses}>{content}</div>;
            })()}

            <ConfirmationPopUp
              onPlayerSelect={({ draftId, Playerdata, isSocketConnected }) => {
                if (isSocketConnected) {
                  setPickedPlayer({ draftId, Playerdata, isSocketConnected });
                  setValidationMessage("");
                }
              }}
              draftId={draftId}
              isSocketConnected={isSocketConnected}
            />

          </motion.div>
        </div >
      }
    </main >
  );
};

export default DraftingDetail;
