import React from "react";
import { useSelector } from "react-redux";
import { getDigitList } from "../../utils/constant";

const ScoreTicker = () => {
  const { leagueData  } = useSelector((state) => state.leagues);
  let price = leagueData?.weekOfTheStarPrice
  return (
    <div className="sd_bedge_right-con md:ltr:pr-[2rem] md:rtl:pl-[2rem]">
      <div className="sd_score--ticker justify-center md:justify-start flex gap-2">
        {getDigitList(price).map((digit, index) => (
          <div
            key={index}
            className="sd_ticker-box flex items-center justify-center relative rounded-lg sd_after sd_before"
          >
            <span className="text-2xl font-extrabold">{digit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreTicker;
