import { useDispatch, useSelector } from "react-redux";
import { getServerURL, items } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { getLastMatchesSocket } from "../../app/socket/socket";
import { use, useEffect } from "react";
import tournament_thumbnail from "../../assets/images/large_prime.png";
import tournament_vs_icon from "../../assets/images/tournament_vs_icon.png";
import tournament_bg_img from "../../assets/images/tournament_bg_img.jpg";
import leage_shape from "../../assets/images/leage_shape.png";
import footer_card_icon from "../../assets/images/footer-card-icon.png";
import vs_img from "../../assets/images/vs_img.png";
import { setLastMatch } from "../../app/slices/notificationSlice/notificationSlice";

const TournamentScheduleCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lastMatchs } = useSelector((state) => state.notification);
  const user = useSelector((state) => state.auth.user);
  const id = items[0].id;

  useEffect(() => {
    if (user?._id) {
      getLastMatchesSocket(user?._id);
    } else {
      dispatch(setLastMatch([]));
    }
  }, [user]);

  console.log("lastMatchs", lastMatchs);

  return (
    <div className="main-card-duty-wp flex flex-col mt-5">
      {user &&
        lastMatchs?.map((match) => {
          console.log("MATCH", match);

          return (
            <div
              key={match.matchId}
              className="card-duty-wp relative main-tournament-schedule-card-wrapper cursor-pointer !mb-5"
              onClick={() => navigate(`${id}/match/${match.matchId}`)}
            >
              <div className="tournament-schedule-card-header-time absolute bottom-0 left-0 z-10 w-full flex items-center justify-center ">
                <h2
                  className="text-[0.7rem] font-bold text-[#BABDFF] px-10 pt-1 pb-[0.35rem] relative"
                  dir="ltr"
                >
                  {new Date(match.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                  <span className="inline-block text-[#7B7ED0]  pl-2 ml-1 relative">
                    {new Date(match.createdAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </h2>
              </div>
              <div className="tournament-schedule-card-footer flex justify-between items-center h-[2rem] md:h-[2.5rem] p-3  absolute top-0 w-full">
                <div className="tournament-schedule-card-footer-left flex items-center gap-3">
                  <img
                    className="w-5 h-5"
                    src={getServerURL(match.game.logo)}
                    alt={match.game.name}
                  />
                  <h2 className="text-sm grad_text-clip font-bold">
                    {match.game.name}
                  </h2>
                </div>
                <div className="tournament-schedule-card-footer-right text-right">
                  {match?.status === "in_progress" ? (
                    <button className="common-process px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                      {match?.status
                        ?.replace("_", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </button>
                  ) : match?.userScore === 0 ? (
                    <div className="tournament-schedule-card-footer-right text-right">
                      <button className="common-process px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                        Score{" "}
                        <span className="font-normal">
                          ({match?.userScore})
                        </span>
                      </button>
                    </div>
                  ) : match?.userScore > 0 ? (
                    <div className="tournament-schedule-card-footer-right text-right">
                      <button className="common-green px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                        Win{" "}
                        <span className="font-normal">
                          ({match?.userScore})
                        </span>
                      </button>
                    </div>
                  ) : (
                    <button className="common-red px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                      Lose{" "}
                      <span className="font-normal">({match?.userScore})</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="tournament-schedule-card-wrapper relative  p-2  md:px-3 ">
                <div className="tournament-schedule-card-header flex justify-between items-center relative gap-6 mt-4">
                  <div className="tournament-schedule-card-header-left flex items-center gap-3 md:gap-4 relative z-10">
                    <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
                      <img
                        src={
                          match.game.logo
                            ? getServerURL(match.game.logo)
                            : "https://github.com/user-attachments/assets/457309ad-0905-48da-86a1-6e73ced7a07c"
                        }
                        alt="tournament-schedule"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-[2rem] grad_text-clip font-bold font_oswald text-white">
                      {match.teamOneScore}
                    </h2>
                  </div>
                  <div className="tournament-schedule-card-header-center shrink-0">
                    <img
                      className="w-7 h-20 object-contain"
                      src={vs_img}
                      alt=""
                    />
                  </div>
                  <div className="tournament-schedule-card-header-right flex items-center gap-4 relative z-10">
                    <h2 className="text-[2rem] grad_text-clip  font-bold text-white font_oswald">
                      {match.teamTwoScore}
                    </h2>
                    <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
                      <img
                        src={
                          match.game.logo
                            ? getServerURL(match.game.logo)
                            : "https://github.com/user-attachments/assets/457309ad-0905-48da-86a1-6e73ced7a07c"
                        }
                        alt="tournament-schedule"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* card bottom shape */}
                <svg
                  width={0}
                  height={0}
                  viewBox="0 0 112 20"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                  }}
                >
                  <defs>
                    <clipPath
                      id="duty_bottom1"
                      clipPathUnits="objectBoundingBox"
                    >
                      <path d="         M0,1         H1         L0.82143,0         H0.17857         L0,1         Z       " />
                    </clipPath>
                  </defs>
                </svg>
                {/* card main shape */}
                <svg
                  width={0}
                  height={0}
                  viewBox="0 0 232 132"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                  }}
                >
                  <defs>
                    <clipPath id="duty_main2" clipPathUnits="objectBoundingBox">
                      <path d="         M1,0.93939         L0.96552,1         H0.77586         L0.67241,0.81818         H0.32759         L0.22414,1         H0.03448         L0,0.93939         V0.30303         H1         V0.93939         Z       " />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              {/* card top shape */}
              <svg
                width={0}
                height={0}
                viewBox="0 0 232 40"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                }}
              >
                <defs>
                  <clipPath id="duty_top1" clipPathUnits="objectBoundingBox">
                    <path d="         M1,0.2         V1 H0 V0.2         L0.03448,0 H0.96552 L1,0.2 Z       " />
                  </clipPath>
                </defs>
              </svg>
            </div>
          );
        })}
    </div>
  );
};

export default TournamentScheduleCard;
