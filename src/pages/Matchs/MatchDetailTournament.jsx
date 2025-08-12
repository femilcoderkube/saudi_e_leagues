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
  getMatchDetailTById,
  sendMatchMsg,
  startMatchUpdate,
  stopMatchDetailTSocket,
  stopMatchUpdate,
} from "../../app/socket/socket";

import MatchLoader from "../../components/Loader/MatchLoader";

import { TeamOneScoreList } from "./teamOneSection";
import { TeamTwoScoreList } from "./teamTwoSection";
import { useTranslation } from "react-i18next";
import { setShowCancelBtn, setshowMobileChat } from "../../app/slices/MatchSlice/matchDetailSlice";
import { setSubmitModal } from "../../app/slices/constState/constStateSlice";
import { TournamentteamOneSection } from "../Matchs/TournamentteamOneSection";
import { TournamentteamTwoSection } from "../Matchs/TournamentteamTwoSection";

const MatchDetailTournament = () => {
  const { id, mId } = useParams();
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const { matchData } = useSelector((state) => state.tournamentMatch);
  console.log("Match Data:", matchData);

  const user = useSelector((state) => state.auth.user);
  const [messageInput, setMessageInput] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  // console.log("opponent1 Data:", opponent1);
  // console.log("opponent2 Data:", opponent2);

  //  Match found: {
  //    _id: new ObjectId('6895dbd94451966b213fe2b5'),
  //    tournament: new ObjectId('6895dae84451966b213fdc0f'),
  //    stageRoundId: new ObjectId('6895dbd94451966b213fe29f'),
  //    stageId: new ObjectId('6895db544451966b213fdec3'),
  //    opponent1: new ObjectId('6895db364451966b213fdd80'),
  //    opponent2: new ObjectId('6895db364451966b213fddcb'),
  //    winner: 'opponent2',
  //    isScoreVerified: true,
  //    status: 'completed',
  //    isDeleted: false,
  //    startTime: 2025-08-07T18:30:00.000Z,
  //    endTime: 2025-08-08T18:30:00.000Z,
  //    config: {
  //      id: 0,
  //      number: 1,
  //      stage_id: 0,
  //      group_id: 0,
  //      round_id: 0,
  //      child_count: 0,
  //      status: 5,
  //      opponent1: {
  //        id: '6895db364451966b213fdd80',
  //        position: 1,
  //        score: '0',
  //        result: 'loss'
  //      },
  //      opponent2: {
  //        id: '6895db364451966b213fddcb',
  //        position: 2,
  //        score: '2',
  //        result: 'win'
  //      },
  //      _id: '6895dbd94451966b213fe2b5'
  //    },
  //    matchScores: [
  //      {
  //        opponent1Score: 2,
  //        opponent2Score: 0,
  //        description: '',
  //        attachment: [],
  //        submittedBy: 'admin',
  //        submittedAt: 2025-08-08T11:16:05.712Z,
  //        winner: 'opponent1',
  //        isActive: false,
  //        _id: new ObjectId('6895dc754451966b213fe92a')
  //      },
  //      {
  //        opponent1Score: 0,
  //        opponent2Score: 2,
  //        description: '',
  //        attachment: [],
  //        submittedBy: 'admin',
  //        submittedAt: 2025-08-08T11:16:19.326Z,
  //        winner: 'opponent2',
  //        isActive: true,
  //        _id: new ObjectId('6895dc834451966b213fe976')
  //      }
  //    ],
  //    createdAt: 2025-08-08T11:13:29.692Z,
  //    updatedAt: 2025-08-08T20:18:20.308Z
  //  }

  useEffect(() => {
    if (isSocketConnected) {
      getMatchDetailTById({ mId, isSocketConnected });
    }
    return () => {
      stopMatchDetailTSocket();
    };
  }, [isSocketConnected, user, window.location.pathname]);

  // useEffect(() => {
  //   if (timeout) {
  //     const timer = setTimeout(() => {
  //       dispatch(setShowCancelBtn(false));
  //     }, timeout);
  //   }
  // }, [timeout])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // useEffect(() => {
  //   if (isSocketConnected) {
  //     startMatchUpdate(mId, user);
  //   }
  //   return () => {
  //     stopMatchUpdate();
  //   };
  // }, [isSocketConnected, mId, user]);

  // const OnMsgSend = (msg) => {
  //   if (isSocketConnected) {
  //     sendMatchMsg({
  //       roomId: mId,
  //       msg: msg,
  //       senderId: user?._id,
  //       isTeam1: isTeamOne || false,
  //     });
  //   }
  // };

  // const handleSendMessage = () => {
  //   if (messageInput.trim()) {
  //     OnMsgSend(messageInput);
  //     setMessageInput("");
  //   }
  // };

  // const scrollAnchorRef = useRef(null);

  // useEffect(() => {
  //   // Scroll to the invisible anchor (which is at the top due to flex-col-reverse)
  //   if (scrollAnchorRef.current && !showMobileChat) {
  //     scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  //   else if (scrollAnchorRef.current && showMobileChat) {
  //     scrollAnchorRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // }, [chatData]);

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
            {/* <TeamOneScoreList /> */}
            <TournamentteamOneSection />
          </div>


          {/* Team 2 */}
          <div className="team_score--wrap max-w-[24.625rem] order-3 xl:order-3">
            <h2 className="grad_head--txt max-w-full ltr:md:text-[4rem] rtl:md:text-[3.75rem] text-[2.5rem] sm:pr-[2rem] pl-[2rem] grad_text-clip font_oswald tracking-wide !font-medium xl:text-right text-left leading-none uppercase">
              {t("match.team_two")}
            </h2>
            {/* <TeamTwoScoreList /> */}
            <TournamentteamTwoSection />

          </div>
        </div>
      </section>
    </main>
  );
};

export default MatchDetailTournament;
