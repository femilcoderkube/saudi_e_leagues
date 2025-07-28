import { useState } from "react";
import { getCards, getMobileCards } from "../../components/MatchDeatilComponents/matchCards";
import { giveReputation } from "../../app/socket/socket";
import { useSelector } from "react-redux";
import { getServerURL } from "../../utils/constant";
import LikeIcon from "../../assets/images/like_icon.png";
import DisLikeIcon from "../../assets/images/dislike_icon.png";
import GoldCrown from "../../assets/images/gold_crown.png";
import { useTranslation } from "react-i18next";
// ✅ Card list component for Team 1
export const TeamOneScoreList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { matchData, isTeamOne, isMyMatch, winnerScore } = useSelector(
    (state) => state.matchs
  );
  let cards = getCards(matchData?.league?.playersPerTeam, false);
  // let mobileCards = getMobileCards(matchData?.league?.playersPerTeam);
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
  const { t } = useTranslation();

  return (
    <>
    <ul className="team_one--list  flex-col gap-5 mt-[-1rem] flex">
      {cards.map((Card, index) => {
        let player = matchData?.team1[index];
        let data = {
          username: player?.participant?.userId?.username || "",
          gameID: player?.participant?.gameId || "",
          rep: player?.participant?.raputations?.wilsonScore || 0,
          profilePic: getServerURL(
            player?.participant?.userId?.profilePicture || ""
          ),
          score: Math.round(player?.leaguesScore || 0),
        };

        let IsReputationGived = matchData?.givedReputations?.find(
          (rep) =>
            rep.giver == user?._id &&
            rep.receiver == player?.participant?.userId?._id
        );
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
              <span className="gold_crown absolute top-[-3rem] right-8 z-10">
                <img src={GoldCrown} alt="Gold Crown" className="h-10" />
              </span>
            )}
            <Card player={data} />
            {isMyMatch &&
              isTeamOne &&
              winnerScore?.teamOne == "-" &&
              player?.participant?.userId?._id != user?._id && (
                <div
                  className={`review_score--con sd_before absolute top-[0rem] left-[-3.5rem] flex gap-3 flex-col transition-opacity duration-300 ease-in-out ${
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
                      alt={t("match.like")}
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
                      alt={t("match.dislike")}
                      style={{ width: "2.625rem" }}
                    />
                  </div>
                </div>
              )}
          </li>
        );
      })}
    </ul>
    {/* <ul className="team_one--list flex flex-col gap-1 mt-[-1rem] xl:hidden">
      {mobileCards.map((Card, index) => {
        let player = matchData?.team1[index];
        let data = {
          username: player?.participant?.userId?.username || "",
          gameID: player?.participant?.gameId || "",
          rep: player?.participant?.raputations?.wilsonScore || 0,
          profilePic: getServerURL(
            player?.participant?.userId?.profilePicture || ""
          ),
          score: Math.round(player?.leaguesScore || 0),
        };

        let IsReputationGived = matchData?.givedReputations?.find(
          (rep) =>
            rep.giver == user?._id &&
            rep.receiver == player?.participant?.userId?._id
        );
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
              <span className="gold_crown absolute top-[-3rem] right-8 z-10">
                <img src={GoldCrown} alt="Gold Crown" className="h-10" />
              </span>
            )}
            <Card player={data} />
            {isMyMatch &&
              isTeamOne &&
              winnerScore?.teamOne == "-" &&
              player?.participant?.userId?._id != user?._id && (
                <div
                  className={`review_score--con sd_before absolute top-[0rem] left-[-3.5rem] flex gap-3 flex-col transition-opacity duration-300 ease-in-out ${
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
                      alt={t("match.like")}
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
                      alt={t("match.dislike")}
                      style={{ width: "2.625rem" }}
                    />
                  </div>
                </div>
              )}
          </li>
        );
      })}
    </ul> */}
    </>
  );
};
