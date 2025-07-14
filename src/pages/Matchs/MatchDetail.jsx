import React, { useEffect, useState } from "react";

import "../../assets/css/Matchmaking.css";

import MatchMakingBG from "../../assets/images/matchmakingBG.png";
import { useParams } from "react-router-dom";
import { getPartnerById, getRandomColor } from "../../utils/constant";

import { useSelector } from "react-redux";
import {
  sendMatchMsg,
  startMatchUpdate,
  stopMatchUpdate,
} from "../../app/socket/socket";

import MatchLoader from "../../components/Loader/MatchLoader";

import { TeamOneScoreList } from "./teamOneSection";
import { TeamTwoScoreList } from "./teamTwoSection";
import { useTranslation } from "react-i18next";
const MatchDetail = () => {
  const { id, mId } = useParams();
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { matchData, chatData, isTeamOne, isShowChat, winnerScore } =
    useSelector((state) => state.matchs);
  const user = useSelector((state) => state.auth.user);
  const [messageInput, setMessageInput] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isSocketConnected) {
      startMatchUpdate(mId, user);
    }
    return () => {
      stopMatchUpdate();
    };
  }, [isSocketConnected, mId, user]);

  const OnMsgSend = (msg) => {
    if (isSocketConnected) {
      sendMatchMsg({
        roomId: mId,
        msg: msg,
        senderId: user?._id,
        isTeam1: isTeamOne || false,
      });
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      OnMsgSend(messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const LargePrime = getPartnerById(id).logo;
  if (showLoader || !matchData) {
    return <MatchLoader />;
  }
  return (
    <main
      className="flex-1 pt-[0.5rem] match_page--wrapper h-full"
      style={{ background: `url(${MatchMakingBG})`, backgroundSize: "100%" }}
    >
      <section className="match_team--wrap flex pt-[6rem] justify-between items-end pl-[7.5rem] pr-[7.5rem] ">
        <div className="team_score--con flex justify-between w-full gap-10">
          {/* Team 1 */}
          <div className="team_score--wrap">
            <h2 className="grad_head--txt max-w-full text-[4rem] pl-[2rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
              {t("match.team_one")}
            </h2>
            <TeamOneScoreList />
          </div>

          {/* Score */}
          <div className="match_center-con flex-1">
            <h2 className="text-[4rem] mt-[-1rem] grad_text-clip uppercase leading-none items-center text-center tracking-wider !font-black pb-[4rem]">
              <>
                <span>{winnerScore.teamOne}</span>:
                <span>{winnerScore.teamTwo}</span>
              </>
            </h2>

            <div className="prime_logo--con flex justify-center sd_before gradiant_bg relative">
              <img
                src={LargePrime}
                alt={t("images.large_prime")}
                style={{ width: "17.5rem" }}
              />
            </div>

            <div className="xl-hidden block">
               <div className="submit_score-btn btn_polygon--mask inline-flex max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400">     
    </div>
            </div>

            {isShowChat && (
              <div className="chat_block--con pt-[1rem] h-[25rem] sd_before relative flex flex-col max-w-lg mx-auto">
                <div
                  className="flex-1 chat_msg--con custom_scroll overflow-y-auto pr-4 pb-4"
                  // style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
                >
                  <div className="flex flex-col space-y-1">
                    {chatData?.map((chat, chatIdx) => {
                      if (chat.isSystemMsg) {
                        console.log("chat", chat?.randomMessages);
                      }
                      if (
                        chat.isSystemMsg &&
                        Array.isArray(chat.messages) &&
                        chat.messages.length > 0
                      ) {
                        // Render each system message as a separate div
                        return chat.messages.map((msg, msgIdx) => (
                          <div className={`block send_msg-con`}>
                            <div className="px-2 py-1 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span
                                  className="!font-bold"
                                  style={{
                                    color: "red", // Apply random color based on senderId
                                  }}
                                >
                                  {t("match.system")} :{""}
                                </span>
                                <span
                                  key={`system-msg-${chatIdx}`}
                                  className="txt_purple_light"
                                  dangerouslySetInnerHTML={{
                                    __html: msg,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ));
                      }

                      if (
                        chat.isSystemMsg &&
                        Array.isArray(chat.randomMessages) &&
                        chat.randomMessages.length > 0
                      ) {
                        // console.log("chat----", chat);
                        return chat.randomMessages.map((msg, msgIdx) => {
                        
                          return (
                            <div className={`block send_msg-con`}>
                              <div className="px-2 py-1 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="!font-bold"
                                    style={{
                                      color: "red", // Apply random color based on senderId
                                    }}
                                  >
                                    {t("match.system")} : {""}
                                  </span>
                                  <span
                                    key={`system-randomMessages-${msgIdx}`}
                                    className="txt_purple_light"
                                    dangerouslySetInnerHTML={{
                                      __html: msg.randomText,
                                    }}
                                  />
                                  <span className="text-white text-lg font-bold">
                                    {": "}{msg.tags}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        });
                      }
                      return (
                        <div
                          className={`block ${
                            user?._id == chat.senderId?._id
                              ? "send_msg-con"
                              : "reply_msg-con"
                          }`}
                        >
                          <div className="px-2 py-1 rounded-lg">
                            <p className="text-white text-lg font-light">
                              {!chat.isMsg && (
                                <span
                                  className="!font-bold"
                                  style={{
                                    color: chat?.isAdmin
                                      ? "red"
                                      : getRandomColor(chat?.senderId?._id), // Apply random color based on senderId
                                  }}
                                >
                                  {chat?.isAdmin
                                    ? t("match.admin")
                                    : chat?.senderId?.username}{" "}
                                  :{" "}
                                </span>
                              )}
                              {chat.isMsg === true ? (
                                <span className="flex justify-center w-full">
                                  {chat.msg}
                                </span>
                              ) : (
                                chat.msg
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="py-2 flex items-center">
                  <input
                    type="text"
                    placeholder={t("match.chat_message")}
                    className="chat_msg-input rtl:text-right text-lg placeholder:text-[#7B7ED0] placeholder:font-semibold placeholder:opacity-65 flex-1 px-4 py-3 rounded-md focus:outline-none"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="absolute ltr:right-0 rtl:left-0 text-white cursor-pointer hover:opacity-65 duration-400 rounded-full p-2 ml-2 focus:outline-none"
                    onClick={handleSendMessage}
                  >
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.34505 2.24501C2.49432 2.11534 2.67867 2.03283 2.87482 2.00791C3.07097 1.98299 3.2701 2.01678 3.44705 2.10501L21.447 11.105C21.6135 11.1879 21.7534 11.3156 21.8513 11.4737C21.9491 11.6318 22.001 11.8141 22.001 12C22.001 12.1859 21.9491 12.3682 21.8513 12.5263C21.7534 12.6844 21.6135 12.8121 21.447 12.895L3.44705 21.895C3.27011 21.9835 3.07089 22.0176 2.87459 21.9929C2.6783 21.9681 2.49374 21.8857 2.34429 21.7561C2.19484 21.6264 2.0872 21.4554 2.035 21.2645C1.98281 21.0737 1.98839 20.8717 2.05105 20.684L4.61305 13H10C10.2653 13 10.5196 12.8946 10.7072 12.7071C10.8947 12.5196 11 12.2652 11 12C11 11.7348 10.8947 11.4804 10.7072 11.2929C10.5196 11.1054 10.2653 11 10 11H4.61305L2.05005 3.31601C1.98771 3.12842 1.98237 2.92656 2.0347 2.73594C2.08703 2.54532 2.19568 2.37448 2.34505 2.24501Z"
                        fill="#7B7ED0"
                        fillOpacity="0.4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="team_score--wrap">
            <h2 className="grad_head--txt max-w-full text-[4rem] pr-[2rem] grad_text-clip font_oswald tracking-wide !font-medium text-right leading-none uppercase">
              {t("match.team_two")}
            </h2>
            <TeamTwoScoreList />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MatchDetail;
