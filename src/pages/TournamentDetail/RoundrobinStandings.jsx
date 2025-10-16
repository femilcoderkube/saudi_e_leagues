import React from "react";
import { useTranslation } from "react-i18next";
import { getRandomColor, getServerURL } from "../../utils/constant";
import { cardVariantsAni } from "../../components/Animation/animation.jsx";
import { motion } from "framer-motion";

export default function RoundRobinStanding({ groupData, groupNumber }) {
  const { t } = useTranslation();

  // Compute standings from groupData (matches and participants)
  const computeStandings = () => {
    const participantsMap = {};

    // Initialize participants
    groupData.participants.forEach((participant) => {
      participantsMap[participant.id] = {
        participant: {
          team: {
            logoImage: participant.imageUrl,
            teamName: participant.name,
          },
          _id: participant.id,
        },
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        scoreFor: 0,
        scoreAgainst: 0,
        points: 0, // Points: 3 for win, 1 for draw, 0 for loss
      };
    });

    // Process matches to aggregate scores, wins, losses, and draws
    groupData.matches.forEach((match) => {
      if (match.status === 4) {
        // Only consider completed matches
        const { opponent1, opponent2 } = match;

        if (opponent1 && opponent1.id && opponent2 && opponent2.id) {
          const team1 = participantsMap[opponent1.id];
          const team2 = participantsMap[opponent2.id];

          if (team1 && team2) {
            // Increment played matches
            team1.played += 1;
            team2.played += 1;

            // Update scores
            team1.scoreFor += opponent1.score || 0;
            team2.scoreFor += opponent2.score || 0;
            team1.scoreAgainst += opponent2.score || 0;
            team2.scoreAgainst += opponent1.score || 0;

            // Update wins/losses/draws based on result
            if (opponent1.result === "win") {
              team1.wins += 1;
              team2.losses += 1;
              team1.points += 3;
            } else if (opponent2.result === "win") {
              team2.wins += 1;
              team1.losses += 1;
              team2.points += 3;
            } else if (
              opponent1.result === "draw" &&
              opponent2.result === "draw"
            ) {
              team1.draws += 1;
              team2.draws += 1;
              team1.points += 1;
              team2.points += 1;
            }
          }
        }
      }
    });

    // Sort by points, then score difference, then score for
    return Object.values(participantsMap).sort((a, b) => {
      const scoreDiffA = a.scoreFor - a.scoreAgainst;
      const scoreDiffB = b.scoreFor - b.scoreAgainst;
      return (
        b.points - a.points ||
        scoreDiffB - scoreDiffA ||
        b.scoreFor - a.scoreFor
      );
    });
  };

  const standings = computeStandings();

  return (
    <motion.div
      className="battle-wp lg:pt-5 pt-2 w-full"
      initial="hidden"
      whileInView="visible"
      variants={cardVariantsAni}
      viewport={{ once: true, amount: 0 }}
    >
      <h2 className="robinround-title !font-black sm:text-2xl text-xl pb-6 mb-5 border-b grad_text-clip">Group 1</h2>
      {/* Battle Table Heading */}
      <div className="battle-head flex">
        <p className="text-[#9EA7CC] text-sm font-semibold xl:px-6 lg:px-4 px-2 py-2 max-w-[5.5%] w-full">
          {t("tournament.place")}
        </p>
        <p className="text-[#9EA7CC] text-sm font-semibold md:px-15 sm:px-9 px-3 py-2 md:max-w-[44.5%] sm:max-w-[40.5%] max-w-[30%] w-full ltr:text-left rtl:text-right">
          {t("tournament.team")} (Group {groupNumber})
        </p>
        <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[13%] w-full text-center">
          {t("tournament.points")}
        </p>
        <p className="text-[#9EA7CC] text-sm font-semibold xl:px-6 px-2 py-2 md:max-w-[13%] max-w-[15%] w-full text-center">
          <span className="md:block hidden">W-L-D</span>
          <span className="md:hidden block">WLD</span>
        </p>
        <p className="text-[#9EA7CC] text-sm font-semibold lg:px-6 px-3 py-2 max-w-[13%] w-full text-center">
          <span className="md:block hidden">+:-</span>
          <span className="block md:hidden">+:-</span>
        </p>
        <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 ltr:lg:pr-14 rtl:lg:pl-14 max-w-[13%] w-full ltr:text-right rtl:text-left">
          SD
        </p>
      </div>

      {/* Battle Table Rows */}
      <div className="battle-body flex flex-col gap-4">
        {standings?.map((player, index) => (
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
                  src={getServerURL(player?.participant?.team?.logoImage)}
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
                    background: getRandomColor(player?.participant?._id),
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
                {player.points || 0}
              </span>
            </div>
            <div className="px-6 py-4 text-center max-w-[13%] w-full">
              <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                {player.wins}-{player.losses}-{player.draws}
              </span>
            </div>
            <div className="px-6 py-4 text-center max-w-[13%] w-full">
              <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                {player.scoreFor}:{player.scoreAgainst}
              </span>
            </div>
            <div className="px-6 ltr:lg:pr-16 rtl:lg:pl-16 ltr:pr-7 rtl:pl-7 py-4 ltr:text-right rtl:text-left max-w-[13%] w-full">
              <span className="inline-block md:text-lg text-base font-bold text-[#F4F7FF]">
                {player.scoreFor - player.scoreAgainst}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
