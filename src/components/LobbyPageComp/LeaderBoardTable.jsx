import React from "react";
import blue_bedge from "../../assets/images/blue.png";
import gold_bedge from "../../assets/images/gold.png";
import silver_bedge from "../../assets/images/silver.png";
import bronze_bedge from "../../assets/images/bronze.png";
import { getSmile } from "../MatchDeatilComponents/matchCards";
import { getServerURL, getRandomColor } from "../../utils/constant";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const { leagueData } = useSelector((state) => state.leagues);
  let requestedUser = leagueData?.leaderBoard?.requestedUser  || null;
  if (requestedUser) {
    let user = {
      username: requestedUser?.userId?.username,
      points: requestedUser?.totalScore
        ? Math.round(requestedUser?.totalScore)
        : 0,
      wins: requestedUser?.totalWins,
      losses: requestedUser?.totalLosses,
      rep: requestedUser?.wilsonScore,
      winRate: requestedUser?.winPercentage?.toFixed(2) + "%",
      rank: requestedUser?.rank || 0,
      profilePic: requestedUser?.userId?.profilePic || null,
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
      <div className="leaderboard-wrapper pt-8">
        <h2 className="text-2xl !font-bold">Leaderboard</h2>
        <p className="text-lg text-center mt-4">No data available</p>
      </div>
    );
  }
  return (
    <div className="leaderboard-wrapper pt-8">
      <h2 className="text-2xl !font-bold">Leaderboard</h2>
      <table className="leaderboard-table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th className="text-left py-3 px-3 purple_col text-lg !font-normal">
              Place
            </th>
            <th className="text-left py-3 px-3 purple_col text-lg !font-normal">
              User
            </th>
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">
              Points
            </th>
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">
              W/L
            </th>
           { leagueData.playersPerTeam != 1 && <th className="text-center py-3 px-3 purple_col text-lg !font-normal">
              Rep
            </th>}
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">
              Win rate
            </th>
          </tr>
        </thead>
        <tbody>
          {requestedUser && requestedUser.rank > 3 && (
            <>
              <tr className={`${requestedUser.badgeColor} overflow-hidden`}>
                <td
                  className={`py-4 px-4 w-[6rem] ${requestedUser.bedgeBG} ${
                    String(requestedUser.rank).length === 1
                      ? "one_digit"
                      : "two_digit"
                  }`}
                >
                  <img
                    className="bedge_bg"
                    src={requestedUser.bedgesrc}
                    alt=""
                    style={{ width: "3rem" }}
                  />
                  <div
                    className="badge text-lg text-center pl-1 font-bold"
                    style={{ width: "3rem" }}
                  >
                    {requestedUser.rank}
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="avtar_frame rounded-[2.5rem] overflow-hidden">
                       {requestedUser.profilePic ? (
                          <img
                            src={getServerURL(requestedUser.profilePic)}
                            alt={requestedUser.username}
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: getRandomColor(requestedUser.username),
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              borderRadius: "50%",
                            }}
                          >
                            {requestedUser.username?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                        )}
                    </div>
                    <span className="text-lg !font-bold">
                        {requestedUser.username}
                      </span>
                     <span className="text-base purple_col font-medium">(You)</span>
                  </div>
                </td>

                <td className="py-4 px-4 text-center text-lg !font-bold">
                  {requestedUser.points}
                </td>

                <td className="py-4 px-4 text-center">
                  <span className="win text-lg sky_col">
                    {requestedUser.wins}
                  </span>{" "}
                  <b className="font-bold text-xs">/</b>{" "}
                  <span className="loss text-lg text-[#FA4768]">
                    {requestedUser.losses}
                  </span>
                </td>

               {leagueData.playersPerTeam != 1 &&  <td className="py-4 px-4">
                  <div className="flex items-center justify-center">
                    <div className="avtar_frame rounded-[2.5rem] overflow-hidden">
                      <img
                        src={getSmile(requestedUser.rep)}
                        alt={requestedUser.username}
                        style={{ width: "1.5rem" }}
                      />
                    </div>
                  </div>
                </td>}

                <td className="py-4 px-4 text-center text-lg">
                  {requestedUser.winRate}
                </td>
              </tr>
            </>
          )}
          {leagueData?.leaderBoard?.topUsers?.map((data, index) => {
            let user = {
              username: data?.userId?.username,
              points: data?.totalScore ? Math.round(data?.totalScore) : 0,
              wins: data?.totalWins,
              losses: data?.totalLosses,
              rep: data?.wilsonScore,
              winRate: data?.winPercentage?.toFixed(2) + "%",
              profilePic: data?.userId?.profilePic || "",
              rank: data?.rank || index + 1,
              itsYou: data?.userId?._id == leagueData?.leaderBoard?.requestedUser?.userId?._id,
            };

            if (index == 0) {
              user.badgeColor = "gold";
              user.bedgesrc = gold_bedge;
            } else if (index == 1) {
              user.badgeColor = "silver";
              user.bedgesrc = silver_bedge;
            } else if (index == 2) {
              user.badgeColor = "bronze";
              user.bedgesrc = bronze_bedge;
            } else {
              user.badgeColor = "blue";
              user.bedgesrc = blue_bedge;
            }
            return (
              <>
                <tr className={`${user.badgeColor} overflow-hidden`}>
                  <td
                    className={`py-4 px-4 ${user.bedgeBG} ${
                      String(user.rank).length === 1 ? "one_digit" : "two_digit"
                    }`}
                  >
                    <img
                      className="bedge_bg"
                      src={user.bedgesrc}
                      alt=""
                      style={{ width: "3rem" }}
                    />
                    <div
                      className="badge text-lg text-center pl-1 font-bold"
                      style={{ width: "3rem" }}
                    >
                      {user.rank}
                    </div>
                  </td>

                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="avtar_frame rounded-[2.5rem] overflow-hidden">
                        {user.profilePic ? (
                          <img
                            src={getServerURL(user.profilePic)}
                            alt={user.username}
                            style={{ width: "2.5rem", height: "2.5rem" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: getRandomColor(user.username),
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              borderRadius: "50%",
                            }}
                          >
                            {user.username?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <span className="text-lg !font-bold">
                        {user.username}
                      </span>
                      {user.itsYou && <span className="text-base purple_col font-medium">(You)</span>}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center text-lg !font-bold">
                    {user.points}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="win text-lg sky_col">{user.wins}</span>{" "}
                    <b className="font-bold text-xs">/</b>{" "}
                    <span className="loss text-lg text-[#FA4768]">
                      {user.losses}
                    </span>
                  </td>
                  {leagueData.playersPerTeam != 1 && <td className="py-4 px-4">
                    <div className="flex items-center justify-center">
                      <div className="avtar_frame rounded-[2.5rem] overflow-hidden">
                        <img
                          src={getSmile(user.rep)}
                          alt={user.rep}
                          style={{ width: "1.5rem" }}
                        />
                      </div>
                    </div>
                  </td>}

                  <td className="py-4 px-4 text-center text-lg">
                    {user.winRate}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
