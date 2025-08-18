import React, { useState } from "react";
import "../../assets/css/homepage.css";
import team_falcons from "../../assets/images/team-falcons.png";
import pubg_icon from "../../assets/images/pubg_icon.png";
import { useSelector } from "react-redux";
import { getRandomColor, getServerURL } from "../../utils/constant";
import { leftToRight, rightToLeft,cardVariantsAni } from "../../components/Animation/animation.jsx";
import { motion } from "motion/react";

export default function BattleRoyalStanding() {
  // ✅ Move this data OUTSIDE return
  const { battleRoyalGroup } = useSelector(
    (state) => state.tournament
  );

  return (
    <>
      <motion.div className="battle-wp lg:pt-5 pt-2"
      initial="hidden"
      whileInView="visible"
      variants={cardVariantsAni}
      viewport={{ once: true, amount: 0.3 }}
      >
        {/* Battle Table Heading */}
        <div className="battle-head flex">
          {/* Headings */}
          <p className="text-[#9EA7CC] text-sm font-semibold xl:px-6 lg:px-4 px-2 py-2 max-w-[5.5%] w-full">
            Place
          </p>
          <p className="text-[#9EA7CC] text-sm font-semibold md:px-15 sm:px-9 px-3 py-2 md:max-w-[44.5%] max-w-[40.5%] w-full ltr:text-left rtl:text-right">
            Team
          </p>
          <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[13%] w-full text-center">
            Points
          </p>
          <p className="text-[#9EA7CC] text-sm font-semibold xl:px-6 px-2 py-2 md:max-w-[13%] max-w-[15%] w-full text-center">
            <span className="md:block hidden">Placement Points (PP)</span>
            <span className="md:hidden block">PP</span>
          </p>
          <p className="text-[#9EA7CC] text-sm font-semibold lg:px-6 px-3 py-2 max-w-[13%] w-full text-center">
            <span className="md:block hidden">Kill Points (KP)</span>
            <span className="block md:hidden">KP</span>
          </p>
          <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 ltr:lg:pr-14 rtl:lg:pl-14 max-w-[13%] w-full ltr:text-right rtl:text-left">
            Victory
          </p>
        </div>

        {/* Battle Table Rows */}
        <div className="battle-body flex flex-col gap-4">
          {battleRoyalGroup?.map((player, index) => (
            <div className="battle-body-wp flex w-full" key={index}>
              <div className="battle-common px-6 py-4 max-w-[5.5%] w-full flex items-center justify-center">
                <p className="text-base font-black grad_text-clip uppercase">
                  {index === 0
                    ? "1st"
                    : index === 1
                    ? "2nd"
                    : index === 2
                    ? "3rd"
                    : `${index + 1}th`}
                </p>
              </div>
              <div className="lg:px-15 sm:px-7 px-3 py-4 flex items-center gap-4 md:max-w-[44.5%] max-w-[40.5%] w-full">
              {player?.participant?.team?.logoImage ? (
                                      <img
                                        src={getServerURL(
                                          player?.participant?.team?.logoImage
                                        )}
                                        alt={player?.participant?.team?.teamName}
                                        className="md:w-8 md:h-8 h-6 w-6"
                                      />
                                    ) : (
                                      <div
                                        className="md:w-8 md:h-8 h-6 w-6"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          background: getRandomColor(
                                            player?.participant?._id
                                          ),
                                          color: "#fff",
                                          fontWeight: "bold",
                                          fontSize: "1.5rem",
                                          borderRadius: "50%",
                                        }}
                                      >
                                        {player?.participant?.team?.teamName
                                          ?.charAt(0)
                                          ?.toUpperCase() || "?"}
                                      </div>
                                    )}
                <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                  {player?.participant?.team?.teamName}
                </span>
              </div>
              <div className="px-6 py-4 text-center max-w-[13%] w-full">
                <span className="inline-block text-lg font-bold text-[#1DED85]">
                  {player.totalPoints || 0}
                </span>
              </div>
              <div className="px-6 py-4 text-center max-w-[13%] w-full">
                <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                {player.totalPlacePoints || 0}
                </span>
              </div>
              <div className="px-6 py-4 text-center max-w-[13%] w-full">
                <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                {player.totalKillPoints || 0}
                </span>
              </div>
              <div className="px-6 ltr:lg:pr-16 rtl:lg:pl-16 ltr:pr-7 rtl:pl-7 py-4 ltr:text-right rtl:text-left max-w-[13%] w-full">
                <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                {player.totalVictory || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>     
    </>
  );
}
