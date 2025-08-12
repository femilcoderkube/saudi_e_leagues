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
export const TournamentteamTwoSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { matchData, isTeamOne, isMyMatch, winnerScore } = useSelector(
    (state) => state.matchs
  );
  const { opponent2 } = useSelector((state) => state.tournamentMatch);
  // console.log("Opponent 2 Data:", opponent2);
  const teamMembers = opponent2?.team?.members || [];

  let cards = getCards(opponent2?.team?.members.length, true);
  let mobileCards = getMobileCards(opponent2?.team?.members.length);

  const { t } = useTranslation();

  return (
    <>
      <ul className="team_two--list  flex-col gap-5 mt-[-1rem] hidden xl:flex">
        {cards.map((Card, index) => {
          let player = teamMembers[index];

          let data = {
            index: player?.user?.userId?._id,
            username: player?.user?.userId?.username || "",
            gameID: player?.user?.userId?.firstName + " " + player?.user?.userId?.lastName || "",
            rep: player?.user?.wilsonScore || 0,
            profilePic: getServerURL(
              player?.user?.userId?.profilePicture || "uploads/1754645183520-1752162007321-DefualtPartnerLogo2.png"
            ),
            score: "",
          };
          return (
            <li
              key={index}
              className={`team_score--card relative ${index === 0 ? "gold_rank" : ""
                }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {index === 0 && (
                <span className="gold_crown absolute top-[-3rem] sm:left-8 right-8 z-10">
                  <img src={GoldCrown} alt="Gold Crown" className="h-10" />
                </span>
              )}
              <Card player={data} />
            </li>
          );
        })}
      </ul>
      <ul className="team_two--list flex flex-col gap-1 mt-[-1rem] xl:hidden">
        {mobileCards.map((Card, index) => {
          let player = teamMembers[index];
          let data = {
            index: player?.user?.userId?._id,
            username: player?.user?.userId?.username || "",
            gameID: player?.user?.userId?.firstName + " " + player?.user?.userId?.lastName || "",
            rep: player?.user?.wilsonScore || 0,
            profilePic: getServerURL(
              player?.user?.userId?.profilePicture || "uploads/1754645183520-1752162007321-DefualtPartnerLogo2.png"
            ),
            score: "",
          };


          return (
            <li
              key={index}
              className={`team_score--card relative ${index === 0 ? "gold_rank" : ""
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

            </li>
          );
        })}
      </ul>
    </>
  );
};
