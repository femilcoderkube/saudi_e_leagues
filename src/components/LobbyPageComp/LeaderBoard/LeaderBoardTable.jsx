import React from "react";
import blue_bedge from "../../../assets/images/blue.png";
import gold_bedge from "../../../assets/images/gold.png";
import silver_bedge from "../../../assets/images/silver.png";
import bronze_bedge from "../../../assets/images/bronze.png";
// import { getSmile } from "../MatchDeatilComponents/matchCards";
// import { getRandomColor, getServerURL } from "../../utils/constant";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LeaderBoardHeader from "./LeaderBoardHeader";
import LeaderBoardRow from "./LeaderBoardRow";

const LeaderBoard = () => {
  const { t } = useTranslation();
  const { leagueData } = useSelector((state) => state.leagues);
  let requestedUser = leagueData?.leaderBoard?.requestedUser || null;
  if (requestedUser) {
    let user = {
      username: requestedUser?.userId?.username,
      points: requestedUser?.totalLeaguesScore
        ? Math.round(requestedUser?.totalLeaguesScore) >= 0 ? Math.round(requestedUser?.totalLeaguesScore) : 0
        : 0,
      wins: requestedUser?.totalWins,
      losses: requestedUser?.totalLosses,
      rep: requestedUser?.wilsonScore,
      winRate: requestedUser?.winPercentage?.toFixed(0) + "%",
      rank: requestedUser?.rank || 0,
      profilePic: requestedUser?.userId?.profilePicture || null,
    };

    if (requestedUser?.rank === 1) {
      user.badgeColor = "gold";
      user.bedgesrc = gold_bedge;
    } else if (requestedUser?.rank === 2) {
      user.badgeColor = "silver";
      user.bedgesrc = silver_bedge;
    } else if (requestedUser?.rank === 3) {
      user.badgeColor = "bronze";
      user.bedgesrc = bronze_bedge;
    } else {
      user.badgeColor = "blue";
      user.bedgesrc = blue_bedge;
    }
    requestedUser = user;
    // var index = requestedUser.rank - 1;
  }
  if (leagueData?.leaderBoard?.topUsers?.length === 0 && !requestedUser) {
    return (
      <div className="leaderboard-wrapper md:pt-8">
        <h2 className="text-center md:text-start text-2xl !font-bold">
          {t("lobby.leaderboard")}
        </h2>
        <p className="text-lg text-center mt-4">
          {t("lobby.no_data_available")}
        </p>
      </div>
    );
  }
  return (
    <div className="leaderboard-wrapper md:pt-8">
      <h2 className="text-xl sm:text-2xl !font-bold">{t("lobby.leaderboard")}</h2>
      <table className="leaderboard-table" style={{ width: "100%" }}>
        <LeaderBoardHeader />
        {requestedUser && requestedUser.rank > 3 && (
          <LeaderBoardRow
            user={requestedUser}
            isYou={true}
            playersPerTeam={leagueData.playersPerTeam}
          />
        )}
        {leagueData?.leaderBoard?.topUsers?.map((data, index) => {
          let user = {
            username: data?.userId?.username,
            points: data?.totalLeaguesScore
              ? Math.max(Math.round(data?.totalLeaguesScore), 0)
              : 0,
            wins: data?.totalWins,
            losses: data?.totalLosses,
            rep: data?.wilsonScore,
            winRate: data?.winPercentage?.toFixed(0) + "%",
            profilePic: data?.userId?.profilePicture || "",
            rank: data?.rank || index + 1,
            badgeColor:
              index === 0
                ? "gold mob-leader-board"
                : index === 1
                  ? "silver mob-leader-board"
                  : index === 2
                    ? "bronze mob-leader-board"
                    : "blue",
            bedgesrc:
              index === 0
                ? gold_bedge
                : index === 1
                  ? silver_bedge
                  : index === 2
                    ? bronze_bedge
                    : blue_bedge,
            itsYou:
              data?.userId?._id === leagueData?.leaderBoard?.requestedUser?.userId?._id,
          };
          return (
            <LeaderBoardRow
              key={user.rank}
              user={user}
              isYou={user.itsYou}
              playersPerTeam={leagueData.playersPerTeam}
            />
          );
        })}
      </table>
    </div>
  );
};

export default LeaderBoard;
