import React from "react";
import { useSelector } from "react-redux";
import { getDigitList } from "../../utils/constant";

const ScoreTicker = ({date}) => {
  const [digits, setDigits] = React.useState(['0','0','0','0','0','0','0','0']);

  React.useEffect(() => {
    if (!date?.futureEndDate) {
      return;
    }

    const timer = setInterval(() => {
      // Get current time in Asia/Riyadh timezone
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })
      ).getTime();

      // Parse futureEndDate as Riyadh time
      const futureDate = new Date(
      date.futureEndDate
      ).getTime();

      const distance = futureDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setDigits(['0','0','0','0','0','0','0','0']);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

      setDigits([...days.split(''), ...hours.split(''), ...minutes.split(''), ...seconds.split('')]);

    }, 1000);

    return () => clearInterval(timer);
  }, [date?.futureEndDate]);

  return (
    <div className="sd_bedge_right-con mt-4">
      <div className="sd_score--ticker justify-between flex gap-2">
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
