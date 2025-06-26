import React from "react";
import User from "../../assets/images/user.png";
import blue_bedge from "../../assets/images/blue.png";
import gold_bedge from "../../assets/images/gold.png";
import silver_bedge from "../../assets/images/silver.png";
import bronze_bedge from "../../assets/images/bronze.png";
import { baseURL } from "../../utils/axios";

const leaderboardData = [
  {
    place: 54,
    username: "You",
    points: "150.402",
    wins: 245,
    losses: 213,
    rep: "4",
    winRate: "54.4%",
    badgeColor: "blue",
    bedgesrc: blue_bedge,
  },
  {
    place: 1,
    username: "RickMoon",
    points: "289.059",
    wins: 361,
    losses: 292,
    rep: "5",
    winRate: "58.1%",
    badgeColor: "gold",
    bedgesrc: gold_bedge,
  },
  {
    place: 2,
    username: "JuliaBer_29",
    points: "272.077",
    wins: 353,
    losses: 321,
    rep: "5",
    winRate: "52.1%",
    badgeColor: "silver",
    bedgesrc: silver_bedge,
  },
  {
    place: 3,
    username: "Elon_Plush",
    points: "255.126",
    wins: 299,
    losses: 222,
    rep: "5",
    winRate: "53.0%",
    badgeColor: "bronze",
    bedgesrc: bronze_bedge,
  },
  {
    place: 4,
    username: "Ranger13",
    points: "150.402",
    wins: 245,
    losses: 213,
    rep: "4",
    winRate: "54.4%",
    badgeColor: "blue",
    bedgesrc: blue_bedge,
  },
  {
    place: 5,
    username: "Just Larry",
    points: "150.402",
    wins: 245,
    losses: 213,
    rep: "4",
    winRate: "54.4%",
    badgeColor: "blue",
    bedgesrc: blue_bedge,
  },
];

const LeaderBoard = ({ leaderBoard }) => {
  let requestedUser = leaderBoard?.requestedUser || null;
  if(requestedUser){
    let user = {
      username: requestedUser?.userId?.username,
      points: requestedUser?.totalScore,
      wins: requestedUser?.totalWins,
      losses: requestedUser?.totalLosses,
      rep: requestedUser?.wilsonScore,
      winRate: requestedUser?.winPercentage + "%",
      rank : requestedUser?.rank || 0,
      profilePic : requestedUser?.userId?.profilePic || null,
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
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">
              Rep
            </th>
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">
              Win rate
            </th>
          </tr>
        </thead>
        <tbody>
          {requestedUser && (
            <>
              <tr key={-1} className={`${requestedUser.badgeColor} overflow-hidden`}>
                <td
                  className={`py-4 px-4 ${requestedUser.bedgeBG} ${
                    String(requestedUser.rank).length === 1 ? "one_digit" : "two_digit"
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
                      <img
                        src={baseURL + "/api/v1/" + requestedUser.profilePic}
                        alt={requestedUser.username}
                        style={{ width: "2.5rem" }}
                      />
                    </div>
                    <span className="text-lg !font-bold">You</span>
                  </div>
                </td>

                <td className="py-4 px-4 text-center text-lg !font-bold">
                  {requestedUser.points}
                </td>

                <td className="py-4 px-4 text-center">
                  <span className="win text-lg sky_col">{requestedUser.wins}</span>{" "}
                  <b className="font-bold text-xs">/</b>{" "}
                  <span className="loss text-lg text-[#FA4768]">
                    {requestedUser.losses}
                  </span>
                </td>

                <td className="avarage_score text-center text-lg font-bold">
                  {requestedUser.rep} 
                </td>

                <td className="py-4 px-4 text-center text-lg">
                  {requestedUser.winRate}
                </td>
              </tr>
            </>
          )}
          {leaderBoard?.topUsers?.map((data, index) => {
            let user = {
              username: data?.userId?.username,
              points: data?.totalScore,
              wins: data?.totalWins,
              losses: data?.totalLosses,
              rep: data?.wilsonScore,
              winRate: data?.winPercentage + "%",
              profilePic : data?.userId?.profilePic || Null,
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
                <tr
                  key={index}
                  className={`${user.badgeColor} overflow-hidden`}
                >
                  <td
                    className={`py-4 px-4 ${user.bedgeBG} ${
                      String(index + 1).length === 1 ? "one_digit" : "two_digit"
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
                      {index + 1}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="avtar_frame rounded-[2.5rem] overflow-hidden">
                        <img
                           src={baseURL + "/api/v1/" + user.profilePic}
                          alt={user.username}
                          style={{ width: "2.5rem" }}
                        />
                      </div>
                      <span className="text-lg !font-bold">
                        {user.username}
                      </span>
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

                  <td className="avarage_score text-center text-lg font-bold">
                    {user.rep} 
                  </td>

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
