import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import GamingLoader from "../../Loader/loader";
import { IMAGES } from "../../ui/images/images";

const Table = () => {
  const { t } = useTranslation();
  const { leagueData, leaderBoard } = useSelector((state) => state.leagues);
  const [visibleCount, setVisibleCount] = useState(20);

  let requestedUser = leaderBoard?.requestedUser || null;
  if (requestedUser) {
    let user = {
      username: requestedUser?.userId?.username,
      points: requestedUser?.totalLeaguesScore
        ? Math.round(requestedUser?.totalLeaguesScore) >= 0
          ? Math.round(requestedUser?.totalLeaguesScore)
          : 0
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
      user.bedgesrc = IMAGES.gold_bedge;
    } else if (requestedUser?.rank === 2) {
      user.badgeColor = "silver";
      user.bedgesrc = IMAGES.silver_bedge;
    } else if (requestedUser?.rank === 3) {
      user.badgeColor = "bronze";
      user.bedgesrc = IMAGES.bronze_bedge;
    } else {
      user.badgeColor = "blue";
      user.bedgesrc = IMAGES.blue_bedge;
    }
    requestedUser = user;
    // var index = requestedUser.rank - 1;
  }
  if (leaderBoard?.topUsers?.length === 0 && !requestedUser) {
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
  if (!leaderBoard) {
    return <GamingLoader />;
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  const hasMoreData = visibleCount < leaderBoard?.topUsers?.length;

  return (
    <div className="leaderboard-wrapper md:pt-8">
      <h2 className="text-xl sm:text-2xl !font-bold">
        {t("lobby.leaderboard")}
      </h2>
      <table className="leaderboard-table" style={{ width: "100%" }}>
        <TableHeader />
        {requestedUser && requestedUser.rank > 3 && (
          <TableRow
            user={requestedUser}
            isYou={true}
            playersPerTeam={leagueData.playersPerTeam}
          />
        )}
        {leaderBoard?.topUsers?.slice(0, visibleCount).map((data, index) => {
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
                ? IMAGES.gold_bedge
                : index === 1
                ? IMAGES.silver_bedge
                : index === 2
                ? IMAGES.bronze_bedge
                : IMAGES.blue_bedge,
            itsYou:
              data?.userId?._id === leaderBoard?.requestedUser?.userId?._id,
          };
          return (
            <TableRow
              key={user.rank}
              user={user}
              isYou={user.itsYou}
              playersPerTeam={leagueData.playersPerTeam}
            />
          );
        })}
      </table>

      {hasMoreData && (
        <div className="flex justify-center my-6 ">
         <button
            onClick={handleLoadMore}
            className="px-8 py-3 text-white font-semibold rounded-lg transition-all blue hover:opacity-80 "
          >
            {t("lobby.load_more")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
