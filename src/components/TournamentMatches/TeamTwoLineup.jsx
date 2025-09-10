import { getCards, getMobileCards } from "../Cards/MatchDetail/matchCards";
import { useSelector } from "react-redux";
import { getServerURL } from "../../utils/constant";
import { IMAGES } from "../ui/images/images";

export const TeamTwoLineup = () => {
  const { opponent2 } = useSelector((state) => state.tournamentMatch);
  const teamMembers = opponent2?.team?.members || [];

  let cards = getCards(opponent2?.team?.members.length, true);
  let mobileCards = getMobileCards(opponent2?.team?.members.length);

  return (
    <>
      <ul className="team_two--list  flex-col gap-5 mt-[-1rem] hidden xl:flex">
        {cards.map((Card, index) => {
          let player = teamMembers[index];

          let data = {
            index: player?.user?.userId?._id,
            username: player?.user?.userId?.username || "",
            gameID:
              player?.user?.userId?.firstName +
                " " +
                player?.user?.userId?.lastName || "",
            rep: player?.user?.wilsonScore || 0,
            profilePic: player?.user?.userId?.profilePicture
              ? getServerURL(player?.user?.userId?.profilePicture)
              : IMAGES.Dummy_Profile,
            score: "",
          };
          return (
            <li
              key={index}
              className={`team_score--card relative ${
                index === 0 ? "gold_rank" : ""
              }`}
            >
              {index === 0 && (
                <span className="gold_crown absolute top-[-3rem] sm:left-8 right-8 z-10">
                  <img
                    src={IMAGES.GoldCrown}
                    alt="Gold Crown"
                    className="h-10"
                  />
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
            gameID:
              player?.user?.userId?.firstName +
                " " +
                player?.user?.userId?.lastName || "",
            rep: player?.user?.wilsonScore || 0,
            profilePic: player?.user?.userId?.profilePicture
              ? getServerURL(player?.user?.userId?.profilePicture)
              : IMAGES.Dummy_Profile,
            score: "",
          };

          return (
            <li
              key={index}
              className={`team_score--card relative ${
                index === 0 ? "gold_rank" : ""
              }`}
            >
              {index === 0 && (
                <span className="gold_crown absolute top-[-3rem] right-8 z-10">
                  <img
                    src={IMAGES.GoldCrown}
                    alt="Gold Crown"
                    className="h-10"
                  />
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
