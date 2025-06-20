import React from "react";

import "../../assets/css/Matchmaking.css";
import Matchmakingcomp from "../../components/Matchmakingcomp/matchmakingcomp.jsx";
import { useParams } from "react-router-dom";
import { items } from "../../utils/constant.js";

const MatchMaking = () => {


  return (
    // <div className="flex-1 flex flex-col sd_main-content ml-[-2.5rem] relative bg-[#020326] rounded-l-[2.5rem] z-20">

      <>

<div className="match_loading--page h-full overflow-hidden relative">

{/* --- dashboard main content back groud --- */}
<div className="main_con--bg absolute top-0 left-0 h-full bg-no-repeat" style={{ backgroundSize: "100%" }}></div>

<div className="sd_match-wrapper ">
  {/* ===  === */}
  <div className="sd_matchmaching-comp">
    <Matchmakingcomp />
  </div>
</div>
</div>
      </>
    // </div>
  );
};

export default MatchMaking;
