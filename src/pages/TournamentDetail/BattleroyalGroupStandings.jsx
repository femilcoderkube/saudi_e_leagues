import React from "react";
import { useSelector } from "react-redux";
import { getRandomColor, getServerURL } from "../../utils/constant";
import { cardVariantsAni } from "../../components/Animation/animation.jsx";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function BattleRoyalStanding() {

  const { t } = useTranslation();

  const { battleRoyalGroup } = useSelector(
    (state) => state.tournament
  );

  return (
    <>
      <motion.div className="battle-wp lg:pt-5 pt-2"
        initial="hidden"
        whileInView="visible"
        variants={cardVariantsAni}
        viewport={{ once: true, amount: 0 }}
      >
        {/* Battle Table Heading */}
        <div className="battle-head flex">
          {/* Headings */}
          <p className="text-[var(--blue-bell-color)] text-sm font-semibold xl:px-6 lg:px-4 px-2 py-2 max-w-[5.5%] w-full">
            {t("tournament.place")}
          </p>
          <p className="text-[var(--blue-bell-color)] text-sm font-semibold md:px-15 sm:px-9 px-3 py-2 md:max-w-[44.5%] sm:max-w-[40.5%] max-w-[35%] w-full ltr:text-left rtl:text-right">
            {t("tournament.team")}
          </p>
          <p className="text-[var(--blue-bell-color)] text-sm font-semibold px-6 py-2 max-w-[13%] w-full text-center">
            {t("tournament.points")}
          </p>
          <p className="text-[var(--blue-bell-color)] text-sm font-semibold xl:px-6 px-2 py-2 md:max-w-[13%] max-w-[15%] w-full text-center">
            <span className="md:block hidden">{t("tournament.placement_points")}</span>
            <span className="md:hidden block">{t("tournament.pp")}</span>
          </p>
          <p className="text-[var(--blue-bell-color)] text-sm font-semibold lg:px-6 px-3 py-2 max-w-[13%] w-full text-center">
            <span className="md:block hidden">{t("tournament.kill_points")}</span>
            <span className="block md:hidden">{t("tournament.kp")}</span>
          </p>
          <p className="text-[var(--blue-bell-color)] text-sm font-semibold px-6 py-2 ltr:lg:pr-14 rtl:lg:pl-14 max-w-[13%] w-full ltr:text-right rtl:text-left">
            {t("tournament.victory")}
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
              <div className="mob-battel-img lg:px-15 sm:px-7 px-3 py-4 flex items-center gap-4 md:max-w-[44.5%] sm:max-w-[40.5%] w-full">
                {player?.participant?.team?.logoImage ? (
                  <img
                    src={getServerURL(
                      player?.participant?.team?.logoImage
                    )}
                    alt={player?.participant?.team?.teamName}
                    className="md:w-8 md:h-8 h-6 w-6 rounded-2xl"
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
                <span className="inline-block md:text-lg text-base font-bold text-[var(--white-col)]">
                  {player?.participant?.team?.teamName}
                </span>
              </div>
              <div className="px-6 py-4 text-center max-w-[13%] w-full">
                <span className="inline-block text-lg font-bold text-[var(--green-color)]">
                  {player.totalPoints || 0}
                </span>
              </div>
              <div className="px-6 py-4 text-center max-w-[13%] w-full">
                <span className="inline-block md:text-lg text-base font-bold text-[var(--white-col)]">
                  {player.totalPlacePoints?.toFixed(2) || 0}
                </span>
              </div>
              <div className="px-6 py-4 text-center max-w-[13%] w-full">
                <span className="inline-block md:text-lg text-base font-bold text-[var(--white-col)]">
                  {player.totalKillPoints?.toFixed(2) || 0}
                </span>
              </div>
              <div className="px-6 ltr:lg:pr-16 rtl:lg:pl-16 ltr:pr-7 rtl:pl-7 py-4 ltr:text-right rtl:text-left max-w-[13%] w-full">
                <span className="inline-block md:text-lg text-base font-bold text-[var(--white-col)]">
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
