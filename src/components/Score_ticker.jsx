import React from "react";

const ScoreTicker = () => {
  const digits = [0, 1, 5, 6, 2, 9];

  return (
    <div className="sd_bedge_right-con pr-[2rem]">
      <div className="sd_score--ticker flex gap-2">
        {digits.map((digit, index) => (
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
