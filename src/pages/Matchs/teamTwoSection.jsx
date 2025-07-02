import { useState } from "react";
import { getCards } from "../../components/MatchDeatilComponents/matchCards";
import { giveReputation } from "../../app/socket/socket";
import { useSelector } from "react-redux";
import { getServerURL } from "../../utils/constant";
import LikeIcon from "../../assets/images/like_icon.png";
import DisLikeIcon from "../../assets/images/dislike_icon.png";
import GoldCrown from "../../assets/images/gold_crown.png";
// ✅ Card list component for Team 1
export const TeamTwoScoreList = ({

}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { matchData, isTeamOne, isMyMatch } = useSelector(
    (state) => state.matchs
  );
  let cards = getCards(matchData?.league?.playersPerTeam, true);
  const submitUpVote = (player) => {
    giveReputation({
      matchId: matchData?._id,
      giver: user?._id,
      receiver: player.participant.userId._id,
      reputation: 1,
    });
  };
  const submitDownVote = (player) => {
    giveReputation({
      matchId: matchData?._id,
      giver: user?._id,
      receiver: player.participant.userId._id,
      reputation: -1,
    });
  };
  return (
    <ul className="team_two--list flex flex-col gap-5 mt-[-1rem]">
      {cards.map((Card, index) => {
        let player = matchData?.team2[index];
        let data = {
          username: player?.participant?.userId?.username || "",
          gameID: player?.participant?.gameId || "",
          rep: player?.participant?.raputations?.wilsonScore || 0,
          profilePic: getServerURL(
            player?.participant?.userId?.profilePicture || ""
          ),
          score: player?.leaguesScore || 0,
        };
        let IsReputationGived = matchData?.givedReputations?.find(
          (rep) =>
            rep.giver == user?._id &&
            rep.receiver == player?.participant?.userId?._id
        );
        // if (!showIndexes.includes(index)) return null;
        return (
          <li
            key={index}
            className={`team_score--card relative ${
              index === 0 ? "gold_rank" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {index === 0 && (
              <span className="gold_crown absolute top-[-3rem] left-8 z-10">
                <img src={GoldCrown} alt="Gold Crown" className="h-10" />
              </span>
            )}
            <Card player={data} />
            {isMyMatch &&
              !isTeamOne &&
              player?.participant?.userId?._id != user?._id && (
                <div
                  className={`review_score--con sd_before absolute top-[0rem] right-[-3.5rem] flex gap-3 flex-col transition-opacity duration-300 ease-in-out ${
                    hoveredIndex === index
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div
                    onClick={() =>
                      IsReputationGived?.reputation != 1
                        ? submitUpVote(player)
                        : null
                    }
                    className={`like_icon duration-400 ${
                      IsReputationGived?.reputation == 1
                        ? "opacity-50 visible"
                        : "hover:opacity-70"
                    }`}
                  >
                    <img
                      src={LikeIcon}
                      alt="Like"
                      style={{ width: "2.625rem" }}
                    />
                  </div>
                  <div
                    onClick={() =>
                      IsReputationGived?.reputation != -1
                        ? submitDownVote(player)
                        : null
                    }
                    className={`like_icon duration-400 ${
                      IsReputationGived?.reputation == -1
                        ? "opacity-50 visible"
                        : "hover:opacity-70"
                    }`}
                  >
                    <img
                      src={DisLikeIcon}
                      alt="Dislike"
                      style={{ width: "2.625rem" }}
                    />
                  </div>
                </div>
              )}
          </li>
        );
      })}
    </ul>
  );
};

