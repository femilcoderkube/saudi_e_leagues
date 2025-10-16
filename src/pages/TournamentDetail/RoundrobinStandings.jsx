import React from "react";
import { useSelector } from "react-redux";
import { getRandomColor, getServerURL } from "../../utils/constant";
import { cardVariantsAni } from "../../components/Animation/animation.jsx";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function RoundRobinStanding() {
  const { t } = useTranslation();
  const { activeStage, tournamentStages } = useSelector(
    (state) => state.tournament
  );

  // Extract participants, matches, and groups from tournamentStages config
  const participants = tournamentStages?.config?.participant || [];
  const matches = tournamentStages?.config?.match || [];
  const groups = tournamentStages?.config?.group || [];

  // Helper function to get participants for a specific group
  const getGroupParticipants = (groupId) => {
    // Collect unique participant IDs from matches for the given group
    const participantIds = new Set();
    matches
      .filter((match) => match.group_id === groupId)
      .forEach((match) => {
        if (match.opponent1?.id) participantIds.add(match.opponent1.id);
        if (match.opponent2?.id) participantIds.add(match.opponent2.id);
      });
    // Filter participants to include only those in the group
    return participants.filter((p) => participantIds.has(p.id));
  };

  // Calculate standings for each group
  const calculateStandings = (groupId) => {
    // Get participants for this group
    const groupParticipants = getGroupParticipants(groupId);

    // Initialize standings for group participants
    const standings = groupParticipants.map((participant) => ({
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
      forfeits: 0,
      scoreFor: 0,
      scoreAgainst: 0,
      points: 0,
    }));

    // Process matches for the given group
    matches
      .filter((match) => match.group_id === groupId && match.status === 4) // Completed matches
      .forEach((match) => {
        const { opponent1, opponent2 } = match;

        // Find participants in standings
        const team1 = standings.find((s) => s.participant._id === opponent1.id);
        const team2 = standings.find((s) => s.participant._id === opponent2.id);

        if (team1 && team2) {
          // Increment played matches
          team1.played += 1;
          team2.played += 1;

          // Update scores
          team1.scoreFor += opponent1.score || 0;
          team2.scoreFor += opponent2.score || 0;
          team1.scoreAgainst += opponent2.score || 0;
          team2.scoreAgainst += opponent1.score || 0;

          // Update wins/losses based on result
          if (opponent1.result === "win") {
            team1.wins += 1;
            team2.losses += 1;
            team1.points += 3; // 3 points for a win
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
          // Forfeits are not present in data, so remain 0
        }
      });

    // Sort standings by points, then score difference, then score for
    return standings.sort((a, b) => {
      const scoreDiffA = a.scoreFor - a.scoreAgainst;
      const scoreDiffB = b.scoreFor - b.scoreAgainst;
      return (
        b.points - a.points ||
        scoreDiffB - scoreDiffA ||
        b.scoreFor - a.scoreFor
      );
    });
  };

  // Render standings for each group
  const renderGroupStandings = (group) => {
    const groupStandings = calculateStandings(group.id);

    return (
      <div key={group.id} className="group-standings">
        <h3 className="text-[#F4F7FF] text-lg font-bold mb-4">
          {t("tournament.group")} {group.number}
        </h3>

        {/* Desktop View */}
        <div className="hidden lg:block">
          {/* Battle Table Heading */}
          <div className="battle-head flex mb-4">
            <p className="text-[#9EA7CC] text-sm font-semibold xl:px-6 lg:px-4 px-2 py-2 max-w-[5.5%] w-full">
              {t("tournament.place")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-15 py-2 max-w-[44.5%] w-full ltr:text-left rtl:text-right">
              {t("tournament.team")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.played")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.wins")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.draws")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.losses")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.forfeits")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.scoreFor")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.scoreAgainst")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 max-w-[10%] w-full text-center">
              {t("tournament.scoreDifference")}
            </p>
            <p className="text-[#9EA7CC] text-sm font-semibold px-6 py-2 ltr:lg:pr-14 rtl:lg:pl-14 max-w-[10%] w-full ltr:text-right rtl:text-left">
              {t("tournament.points")}
            </p>
          </div>

          <div className="battle-body flex flex-col gap-4">
            {groupStandings.map((player, index) => (
              <div
                className="battle-body-wp flex w-full"
                key={player.participant._id}
              >
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
                <div className="mob-battel-img px-15 py-4 flex items-center gap-4 max-w-[44.5%] w-full">
                  {player.participant.team.logoImage ? (
                    <img
                      src={getServerURL(player.participant.team.logoImage)}
                      alt={player.participant.team.teamName}
                      className="w-8 h-8 rounded-2xl"
                    />
                  ) : (
                    <div
                      className="w-8 h-8"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: getRandomColor(player.participant._id),
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        borderRadius: "50%",
                      }}
                    >
                      {player.participant.team.teamName
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                    </div>
                  )}
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.participant.team.teamName}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.played}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.wins}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.draws}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.losses}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.forfeits}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.scoreFor}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.scoreAgainst}
                  </span>
                </div>
                <div className="px-6 py-4 text-center max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#F4F7FF]">
                    {player.scoreFor - player.scoreAgainst}
                  </span>
                </div>
                <div className="px-6 ltr:lg:pr-16 rtl:lg:pl-16 py-4 ltr:text-right rtl:text-left max-w-[10%] w-full">
                  <span className="inline-block text-lg font-bold text-[#1DED85]">
                    {player.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View - Card Layout */}
        <div className="lg:hidden space-y-3">
          {groupStandings.map((player, index) => (
            <div
              key={player.participant._id}
              className="battle-body-wp bg-opacity-10 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="battle-common px-3 py-2 flex items-center justify-center">
                    <p className="text-sm font-black grad_text-clip uppercase">
                      {index === 0
                        ? "1st"
                        : index === 1
                        ? "2nd"
                        : index === 2
                        ? "3rd"
                        : `${index + 1}th`}
                    </p>
                  </div>
                  {player.participant.team.logoImage ? (
                    <img
                      src={getServerURL(player.participant.team.logoImage)}
                      alt={player.participant.team.teamName}
                      className="w-6 h-6 rounded-2xl"
                    />
                  ) : (
                    <div
                      className="w-6 h-6"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: getRandomColor(player.participant._id),
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        borderRadius: "50%",
                      }}
                    >
                      {player.participant.team.teamName
                        ?.charAt(0)
                        ?.toUpperCase() || "?"}
                    </div>
                  )}
                  <span className="text-base font-bold text-[#F4F7FF]">
                    {player.participant.team.teamName}
                  </span>
                </div>
                <span className="text-base font-bold text-[#1DED85]">
                  {player.points} pts
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-sm">
                <div>
                  <p className="text-[#9EA7CC] text-xs">
                    {t("tournament.played")}
                  </p>
                  <p className="text-[#F4F7FF] font-bold">{player.played}</p>
                </div>
                <div>
                  <p className="text-[#9EA7CC] text-xs">
                    {t("tournament.wins")}
                  </p>
                  <p className="text-[#F4F7FF] font-bold">{player.wins}</p>
                </div>
                <div>
                  <p className="text-[#9EA7CC] text-xs">
                    {t("tournament.draws")}
                  </p>
                  <p className="text-[#F4F7FF] font-bold">{player.draws}</p>
                </div>
                <div>
                  <p className="text-[#9EA7CC] text-xs">
                    {t("tournament.losses")}
                  </p>
                  <p className="text-[#F4F7FF] font-bold">{player.losses}</p>
                </div>
                <div>
                  <p className="text-[#9EA7CC] text-xs">
                    {t("tournament.scoreDifference")}
                  </p>
                  <p className="text-[#F4F7FF] font-bold">
                    {player.scoreFor - player.scoreAgainst}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="battle-wp lg:pt-5 pt-2 w-full"
      initial="hidden"
      whileInView="visible"
      variants={cardVariantsAni}
      viewport={{ once: true, amount: 0 }}
    >
      {/* Render standings for each group in a two-column grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {groups.map((group) => renderGroupStandings(group))}
      </div>
    </motion.div>
  );
}
