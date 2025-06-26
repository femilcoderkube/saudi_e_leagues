import React from "react";
import timelineClock from "../../assets/images/timline_clock.png";
import { time } from "framer-motion";
import { formatDateToMonthDay } from "../../utils/constant";

const timelineSteps = [
  {
    title: "Registration Time",
    date: "Feb 01st – Feb 15th",
    status: "completed",
  },
  {
    title: "Open Qualifier",
    date: "Feb 23rd – Feb 26th",
    status: "completed",
  },
  {
    title: "Contract Uploading",
    date: "To be Announced",
    status: "disabled",
  },
];

const TimelineCard = ({timeLine}) => {

  return (
    <div className="timeline-card rounded-xl overflow-hidden bg-[#0E123A] text-white">
      <div className="timeline-card__header flex items-center gap-3 px-4 py-[1.4rem] border-b border-[#2A2F64]">
        <img src={timelineClock} alt="clock" style={{ width: "1.75rem" }} />
        <h3 className="timeline-card__title text-xl font_oswald ">Tournament Timeline</h3>
      </div>
      <div className="timeline_container custom_scroll">
        <div className="timeline-card__steps p-4 pr-18 flex flex-col gap-4 sd_before relative  ">
          {timeLine.map((step, index) => {
            let isActive  = new Date(step.endDate) < new Date() ? true : false;
            
            return (
            <div
              key={index}
              className={`timeline_wrap ${isActive ? "completed" : "disabled "} relative sd_after sd_before `}
            >
              <div className="timeline-step bg-no-repeat flex flex-col gap-2 py-[1rem] px-4">
                <div className="timeline-step__title text-lg">
                  {step.title}
                </div>
                <div className="timeline-step__date text-base purple_light">
                  {formatDateToMonthDay(step.startDate) +" - " +formatDateToMonthDay(step.endDate)}
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
