import React from "react";
import "../../assets/css/Matchmaking.css";
import one_vs_one from "../../assets/images/1-vs-1.png";
import blue_right from "../../assets/images/blue_right_bg.png";
import pink_left from "../../assets/images/pink_left_bg.png";
import bolt_center from "../../assets/images/bolt_center_img.png";

const MatchLoader = () => {
  return (
    <div className="flex-1 flex flex-col sd_main-content relative bg-[#020326] rounded-b-[0] z-20">


      <main className="flex-1 match_loading--wrapper overflow-hidden relative">
        {/* --- dashboard main content back groud --- */}
        <div className="loading-not-finish-wp">          
          <img
            className="pink-left absolute left-0 top-0 w-[60.6rem]"
            src={pink_left}
            alt=""
          />
          <img
            className="blue-right absolute right-0 top-0 w-[60.6rem]"
            src={blue_right}
            alt=""
          />
          <img
            className="vs-in bolt-center absolute left-1/2 top-0 w-[32.89rem]"
            src={bolt_center}
            alt=""
          />
          <img
            className="vs-in one-vs-one absolute left-1/2 top-1/2 w-[17rem]"
            src={one_vs_one}
            alt=""
          />
        </div>
      </main>
    </div>
  );
};

export default MatchLoader;
