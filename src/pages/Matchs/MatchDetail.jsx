import React, { useEffect, useRef, useState } from "react";

import "../../assets/css/Matchmaking.css";

import MatchMakingBG from "../../assets/images/matchmakingBG.png";
import ChatIcon from "../../assets/images/chat_icon.png";
import ChatArr from "../../assets/images/chat_arr.png";
import { Link, useParams } from "react-router-dom";
import {
  getPartnerById,
  getRandomColor,
  getServerURL,
} from "../../utils/constant";

import { useDispatch, useSelector } from "react-redux";
import {
  sendMatchMsg,
  startMatchUpdate,
  stopMatchUpdate,
} from "../../app/socket/socket";

import MatchLoader from "../../components/Loader/MatchLoader";

import { TeamOneScoreList } from "./teamOneSection";
import { TeamTwoScoreList } from "./teamTwoSection";
import { useTranslation } from "react-i18next";
import { setShowCancelBtn, setshowMobileChat } from "../../app/slices/MatchSlice/matchDetailSlice";
import { setSubmitModal } from "../../app/slices/constState/constStateSlice";
const MatchDetail = () => {
  const { id, mId } = useParams();
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const {
    matchData,
    chatData,
    isTeamOne,
    isShowChat,
    winnerScore,
    showMobileChat,
    isCaptain,
    IsSubmited,
    isEditScore,
    showCancelBtn,
    timeout,
  } = useSelector((state) => state.matchs);
  const user = useSelector((state) => state.auth.user);
  const [messageInput, setMessageInput] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();

useEffect(()=>{
  if(timeout){
    const timer = setTimeout(() => {
      dispatch(setShowCancelBtn(false));
    }, timeout);
  }
},[timeout])

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
  const scrollAnchorRef = useRef(null);
  useEffect(() => {
    // Scroll to the invisible anchor (which is at the top due to flex-col-reverse)
    if (scrollAnchorRef.current && !showMobileChat) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    } 
    else if (scrollAnchorRef.current && showMobileChat) {
      scrollAnchorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [chatData]);
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
      className="flex-1 pt-[0.5rem] match_page--wrapper h-full "
      style={{ background: `url(${MatchMakingBG})`, backgroundSize: "100%" }}
    >
      <section className="match_team--wrap flex pt-[5rem] justify-between items-end sm:pl-[7.5rem] sm:pr-[7.5rem] pl-[3rem] pr-[3rem]  pb-[5.25rem] sm:pb-0">
        <div className="team_score--con flex xl:flex-row flex-col justify-between w-full gap-10 items-center xl:items-start">
          {/* Team 1 */}
          <div className="team_score--wrap max-w-[24.625rem] order-2 xl:order-1">
            <h2 className="grad_head--txt max-w-full ltr:md:text-[4rem] rtl:md:text-[3.75rem] text-[2.5rem] sm:pr-[2rem] pl-[2rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
              {t("match.team_one")}
            </h2>
            <TeamOneScoreList />
          </div>

          {/* Score */}
          <div className="match_center-con flex-1 order-1 xl:order-2">
            <h2 className="text-[4rem] mt-[-1rem] grad_text-clip uppercase leading-none items-center text-center tracking-wider !font-black pb-[4rem]">
              <>
                <span>{winnerScore.teamOne}</span>:
                <span>{winnerScore.teamTwo}</span>
              </>
            </h2>

            <div className="prime_logo--con sm:flex hidden justify-center sd_before gradiant_bg relative">
              <img
                src={LargePrime}
                alt={t("images.large_prime")}
                style={{ width: "17.5rem" }}
              />
            </div>
            <div className="mob-sub-btn flex items-center justify-center flex-wrap gap-6 mb-[1rem]">
            {showCancelBtn && <div className="cancel-score-btn mob-btn_polygon-link submit_score-btn chat_score_btn btn_polygon--mask inline-flex sm:hidden max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
                  <div                    
                    className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center cursor-pointer"
                  >
                    Cancel Match
                  </div>
                  <svg
                    width="0"
                    height="0"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute" }}
                  >
                    <defs>
                      <clipPath
                        id="polygonClip12"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path
                          d="
              M1,0.1111
              V0.8889
              L0.9219,1
              H0.7266
              L0.6953,0.9028
              H0.3047
              L0.2734,1
              H0.0781
              L0,0.8889
              V0.1111
              L0.0781,0
              H0.2734
              L0.3047,0.0972
              H0.6953
              L0.7266,0
              H0.9219
              L1,0.1111
              Z
            "
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>}
              {user && isCaptain && (!IsSubmited || isEditScore != null) && (                
                <div className="mob-btn_polygon-link submit_score-btn chat_score_btn btn_polygon--mask inline-flex sm:hidden max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
                  <div
                    onClick={() => {
                      dispatch(setSubmitModal(true));
                    }}
                    // onClick={}
                    className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center cursor-pointer"
                  >
                    {IsSubmited ? t("auth.view_score") : t("auth.submit_score")}
                  </div>
                  <svg
                    width="0"
                    height="0"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute" }}
                  >
                    <defs>
                      <clipPath
                        id="polygonClip12"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path
                          d="
              M1,0.1111
              V0.8889
              L0.9219,1
              H0.7266
              L0.6953,0.9028
              H0.3047
              L0.2734,1
              H0.0781
              L0,0.8889
              V0.1111
              L0.0781,0
              H0.2734
              L0.3047,0.0972
              H0.6953
              L0.7266,0
              H0.9219
              L1,0.1111
              Z
            "
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              )}
              {isShowChat && (
                <div className="sm:hidden chat-btn-wp">
                  <div
                    className="inline-flex gap-4 items-center justify-center chat-btn w-[9.95rem] h-[3.5rem] cursor-pointer"
                    onClick={() => dispatch(setshowMobileChat(true))}
                  >
                    <img src={ChatIcon} alt="" />
                    <span className="purple_col text-base font-bold">
                      {t("match.chat")} <span className="text-[#BABDFF]"></span>
                    </span>
                    <img src={ChatArr} alt="" />
                  </div>
                </div>
              )}
            </div>
            <div className="sm:block hidden">
              {isShowChat && (
                <div className="chat_block--con pt-[1rem] h-[25rem] sd_before relative flex flex-col max-w-lg mx-auto">
                  <div
                    className="flex-1 flex flex-col-reverse mx-h-[20rem] chat_msg--con custom_scroll overflow-y-auto pr-4 pb-4"
                    // style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
                  >
                    <div ref={scrollAnchorRef}></div>
                    <div className="flex flex-col space-y-1">
                      {chatData?.map((chat, chatIdx) => {
                        if (chat.isSystemMsg) {
                          // console.log("chat", chat?.randomMessages);
                        }
                        if (
                          chat.isSystemMsg &&
                          Array.isArray(chat.messages) &&
                          chat.messages.length > 0
                        ) {
                          // Render each system message as a separate div
                          return chat.messages
                            .filter((msg) => msg)
                            .map((msg, msgIdx) => (
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
                          return chat.randomMessages
                            .filter((msg) => msg.randomText)
                            .map((msg, msgIdx) => (
                              <div
                                className={`block send_msg-con`}
                                key={`system-randomMessages-${msgIdx}`}
                              >
                                <div className="px-2 py-1 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="!font-bold"
                                      style={{
                                        color: "red", // Apply random color based on senderId
                                      }}
                                    >
                                      {t("match.system")} :{" "}
                                    </span>
                                    <span
                                      className="txt_purple_light"
                                      dangerouslySetInnerHTML={{
                                        __html: msg.randomText,
                                      }}
                                    />
                                    <span className="text-white text-lg font-bold">
                                      {": "}
                                      {msg.tags}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ));
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
            {showMobileChat && (
              <div
                className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-100"
                onClick={() => dispatch(setshowMobileChat(false))}
              >
                <div
                  className="mob-chat-wp sm:hidden w-full max-w-[19rem] fixed top-0 ltr:right-0 rtl:left-0 z-11 bg-slate-900 text-white  flex flex-col justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="block">
                    <div
                      className="mob-chat-head p-6 border-b"
                      onClick={() => dispatch(setshowMobileChat(false))}
                    >
                      <div className="flex gap-4 items-center">
                        <img className="cursor-pointer" src={ChatArr} alt="" />
                        <h1 className="text-lg font-extrabold text-white tracking-wide">
                          {t("match.match_chat")}
                        </h1>
                      </div>
                    </div>
                    {/* Chat Functionlity */}
                    <div className="h-[100dvh] overflow-y-auto custom_scroll p-6 py-[6.5rem]">

                      {chatData?.map((chat, chatIdx) => {
                        console.log("chat", chat?.senderId);
                        if (chat.isSystemMsg) {
                          // console.log("chat", chat?.randomMessages);
                        }
                        if (
                          chat.isSystemMsg &&
                          Array.isArray(chat.messages) &&
                          chat.messages.length > 0
                        ) {
                          // Render each system message as a separate div
                          return chat.messages
                            .filter((msg) => msg)
                            .map((msg, msgIdx) => (
                              <div className={`block send_msg-con`}>
                                <div className="px-2 py-1 rounded-lg">
                                  <div className="flex flex-col items-center gap-1">
                                    <span
                                      className="!font-bold"
                                      style={{
                                        color: "red", // Apply random color based on senderId
                                      }}
                                    >
                                      {t("match.system")}
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
                          return chat.randomMessages
                            .filter((msg) => msg.randomText)
                            .map((msg, msgIdx) => (
                              <div
                                className={`block send_msg-con`}
                                key={`system-randomMessages-${msgIdx}`}
                              >
                                <div className="px-2 py-1 rounded-lg">
                                  <div className="flex flex-col items-center gap-1">
                                    <span
                                      className="!font-bold"
                                      style={{
                                        color: "red", // Apply random color based on senderId
                                      }}
                                    >
                                      {t("match.system")}
                                    </span>
                                    <span
                                      className="txt_purple_light"
                                      dangerouslySetInnerHTML={{
                                        __html: msg.randomText,
                                      }}
                                    />
                                    <span className="text-white text-lg font-bold">
                                      {msg.tags}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ));
                        }
                        return (
                          <div className="flex items-center gap-4 pb-6">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-cente flex-shrink-0`}
                            >
                              <span className="text-lg  rounded-full">
                                {chat?.isAdmin ? (
                                  <div
                                    style={{
                                      width: "2.5rem",
                                      height: "2.5rem",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      background: "#181b45",
                                      color: "red",
                                      fontWeight: "bold",
                                      fontSize: "1.5rem",
                                      borderRadius: "50%",
                                    }}
                                  >
                                    {"A"}
                                  </div>
                                ) : (
                                  <img
                                    src={getServerURL(
                                      chat?.senderId?.profilePicture
                                    )}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                )}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div
                                className="font-bold text-base"
                                style={{
                                  color: chat?.isAdmin
                                    ? "red"
                                    : getRandomColor(chat?.senderId?._id), // Apply random color based on senderId
                                }}
                              >
                                {chat?.isAdmin
                                  ? t("match.admin")
                                  : chat?.senderId?.username}
                              </div>
                              <div className="text-white text-sm leading-relaxed break-words">
                                {chat.msg}
                              </div>
                            </div>
                          </div>

                          // <div
                          //   className={`block ${
                          //     user?._id == chat.senderId?._id
                          //       ? "send_msg-con"
                          //       : "reply_msg-con"
                          //   }`}
                          // >
                          //   <div className="px-2 py-1 rounded-lg">
                          //     <p className="text-white text-lg font-light">
                          //       {!chat.isMsg && (
                          //         <span
                          //           className="!font-bold"
                          //           style={{
                          //             color: chat?.isAdmin
                          //               ? "red"
                          //               : getRandomColor(chat?.senderId?._id), // Apply random color based on senderId
                          //           }}
                          //         >
                          //           {chat?.isAdmin
                          //             ? t("match.admin")
                          //             : chat?.senderId?.username}{" "}
                          //           :{" "}
                          //         </span>
                          //       )}
                          //       {chat.isMsg === true ? (
                          //         <span className="flex justify-center w-full">
                          //           {chat.msg}
                          //         </span>
                          //       ) : (
                          //         chat.msg
                          //       )}
                          //     </p>
                          //   </div>
                          // </div>
                        );
                      })}
                      <div ref={scrollAnchorRef}></div>
                    </div>
                    {/* Messages Container */}
                    {/* <div className="flex flex-col gap-6 p-6 overflow-y-auto custom_scroll h-[43.3rem]">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-cente flex-shrink-0`}
                    >
                      <span className="text-lg">
                        <img src={ProfileMsg} alt="" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-base text-[#F8D372]">
                        Elon Plush
                      </div>
                      <div className="text-white text-sm leading-relaxed break-words">
                        GG HF
                      </div>
                    </div>
                  </div>
                </div> */}
                  </div>
                  <div className="mob-chat-box p-6 flex items-center">
                    <input
                      type="text"
                      placeholder={t("match.chat_message")}
                      className="chat_msg-input rtl:text-right sm:text-lg text-base placeholder:text-[#7B7ED0] placeholder:font-semibold placeholder:opacity-65 flex-1 px-4 py-3 rounded-md focus:outline-none"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      className="absolute ltr:right-8 rtl:left-8 text-white cursor-pointer hover:opacity-65 duration-400 rounded-full p-2 ml-2 focus:outline-none"
                      onClick={handleSendMessage}
                    >
                      <svg
                        width="1rem"
                        height="1rem"
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
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="team_score--wrap max-w-[24.625rem] order-3 xl:order-3">
            <h2 className="grad_head--txt max-w-full ltr:md:text-[4rem] rtl:md:text-[3.75rem] text-[2.5rem] sm:pr-[2rem] pl-[2rem] grad_text-clip font_oswald tracking-wide !font-medium sm:text-right leading-none uppercase">
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
