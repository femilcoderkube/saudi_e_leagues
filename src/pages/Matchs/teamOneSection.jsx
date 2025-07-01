import { useState } from "react";
import { getCards } from "../../components/MatchDeatilComponents/matchCards";

// ✅ Card list component for Team 1
const TeamOneScoreList = ({
    playerPerTeam,
    players,
    isMyMatch,
    isTeamOne,
    mId,
    uId,
    givedReputations,
  }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    console.log(playerPerTeam);
    let cards = getCards(playerPerTeam, false);
    const submitUpVote = (player) => {
      socket.emit(SOCKET.GIVEREPUTATION, {
        matchId: mId,
        giver: uId,
        receiver: player.participant.userId._id,
        reputation: 1,
      });
    };
    const submitDownVote = (player) => {
      socket.emit(SOCKET.GIVEREPUTATION, {
        matchId: mId,
        giver: uId,
        receiver: player.participant.userId._id,
        reputation: -1,
      });
    };
  
    return (
      <ul className="team_one--list flex flex-col gap-5 mt-[-1rem]">
        {cards.map((Card, index) => {
  
          let data = {
            username: players[index]?.participant?.userId?.username || "",
            gameID:players[index]?.participant?.gameId || "",
            rep : players[index]?.participant?.raputations?.wilsonScore || 0 ,
            profilePic: getServerURL( players[index]?.participant?.userId?.profilePicture || ""),
            score : players[index]?.leaguesScore || 0,
          }
        
          // if (!showIndexes.includes(index)) return null;
          let IsReputationGived = givedReputations.find(
            (rep) =>
              rep.giver == uId &&
              rep.receiver == players[index]?.participant?.userId?._id
          );
          // console.log("IsReputationGived:", IsReputationGived);
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
                players[index]?.participant?.userId?._id != uId && (
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
                          ? submitUpVote(players[index])
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
                          ? submitDownVote(players[index])
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