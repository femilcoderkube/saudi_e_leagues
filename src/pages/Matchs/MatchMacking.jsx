import React, { useEffect, useState } from "react";

import "../../assets/css/Matchmaking.css";
import Matchmakingcomp from "../../components/Matchmakingcomp/matchmakingcomp.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { items } from "../../utils/constant.js";
import MatchLoader from "../../components/Loader/MatchLoader.jsx";
import { setMatchPage } from "../../app/slices/constState/constStateSlice.js";
import { useDispatch } from "react-redux";

const MatchMaking = () => {
const [matchLoading, setMatchLoading] = useState(false);
const navigate = useNavigate();
const { id } = useParams();
const dispatch = useDispatch();
const handleONLoadingEnd = (mId) => {
  setMatchLoading(true);
  setTimeout(() => {
    navigate(`/${id}/match/${mId}`);
    setMatchLoading(false);
  }, 3000);
}
  // Set match page and handle sockets
  useEffect(() => {
    // Set match page state in redux
    dispatch(setMatchPage(true));
    // Cleanup: remove socket listener and reset match page state
    return () => {
      // socket.off(SOCKET.JOINMATCH, handleJoinMatch);
      dispatch(setMatchPage(false));
    };
    // eslint-disable-next-line
  },[ dispatch]);
if(matchLoading){
  return MatchLoader();
}

  return (
    // <div className="flex-1 flex flex-col sd_main-content ml-[-2.5rem] relative bg-[#020326] rounded-l-[2.5rem] z-20">

      <>

<div className="match_loading--page h-full overflow-hidden relative">

{/* --- dashboard main content back groud --- */}
<div className="main_con--bg absolute top-0 left-0 h-full bg-no-repeat" style={{ backgroundSize: "100%" }}></div>

<div className="sd_match-wrapper ">
  {/* ===  === */}
  <div className="sd_matchmaching-comp">
    <Matchmakingcomp setMatchLoading={handleONLoadingEnd}/>
  </div>
</div>
</div>
      </>
    // </div>
  );
};

export default MatchMaking;
