import React from "react";
import User from "../assets/images/User.png";
import blue_bedge from "../assets/images/blue.png";
import gold_bedge from "../assets/images/gold.png";
import silver_bedge from "../assets/images/silver.png";
import bronze_bedge from "../assets/images/bronze.png";

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
    bedgesrc: blue_bedge ,
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
    bedgesrc: gold_bedge
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
    bedgesrc: silver_bedge
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
    bedgesrc: bronze_bedge
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
    bedgesrc: blue_bedge
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
    bedgesrc: blue_bedge
  },
];

const LeaderBoard = () => {
  return (
    <div className="leaderboard-wrapper pt-8">
      <h2 className="text-2xl !font-bold">Leaderboard</h2>
      <table className="leaderboard-table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th className="text-left py-3 px-3 purple_col text-lg !font-normal">Place</th>
            <th className="text-left py-3 px-3 purple_col text-lg !font-normal">User</th>
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">Points</th>
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">W/L</th>
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">Rep</th>
            <th className="text-center py-3 px-3 purple_col text-lg !font-normal">Win rate</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr
              key={index}
              className={`${user.badgeColor} overflow-hidden`}
            >
              <td
                className={`py-4 px-4 ${user.bedgeBG} ${
                    String(user.place).length === 1 ? "one_digit" : "two_digit"
                }`}
                >
                <img className="bedge_bg" src={user.bedgesrc} alt="" style={{ width: "3rem" }} />
                <div className="badge text-lg text-center pl-1 font-bold" style={{ width: "3rem" }}>
                    {user.place}
                </div>
                </td>


              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className="avtar_frame rounded-[2.5rem] overflow-hidden">
                    <img src={User} alt={user.username} style={{ width: "2.5rem" }} />
                  </div>
                  <span className="text-lg !font-bold">{user.username}</span>
                </div>
              </td>

              <td className="py-4 px-4 text-center text-lg !font-bold">{user.points}</td>

              <td className="py-4 px-4 text-center">
                <span className="win text-lg sky_col">{user.wins}</span> <b className="font-bold text-xs">/</b>{" "}
                <span className="loss text-lg text-[#FA4768]">{user.losses}</span>
              </td>

              <td className="avarage_score text-center text-lg font-bold">{user.rep} <span className="text-sm purple_col"> / 5</span></td>

              <td className="py-4 px-4 text-center text-lg">{user.winRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
