import tournament_thumbnail from "../../assets/images/tournament_thumbnail.png";
import tournament_vs_icon from "../../assets/images/tournament_vs_icon.png";
import tournament_bg_img from "../../assets/images/tournament_bg_img.jpg";
import leage_shape from "../../assets/images/leage_shape.png";
import footer_card_icon from "../../assets/images/footer-card-icon.png";

const TournamentScheduleCard = ({ item }) => {
  if (!item?.startTime) {
    return <div></div>;
  }
  let data = {
    time: item?.startTime
      ? new Date(item.startTime)
          .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toLowerCase()
      : "",
    team1: item?.opponent1.team || item?.opponent1.user,
    team2: item?.opponent2.team || item?.opponent2.user,
    acticeScore:
      item?.matchScores?.find((score) => score.isActive === true) || {},
  };

  return (
    <div className="relative main-tournament-schedule-card-wrapper cursor-pointer">
      {" "}
      <div className="tournament-schedule-card-header-time absolute top-0 left-0 z-10 w-full flex items-center justify-center ">
        <h2 className="sm:text-base text-sm font-bold text-[#BABDFF] px-10 pt-1 pb-[0.35rem] relative">
          {data?.time}{" "}
          <span className="inline-block text-[#7B7ED0] pl-2 ml-1 relative">
            08:30 PM
          </span>
        </h2>
      </div>
      <div className="tournament-schedule-card-wrapper relative">
        <div className="tournament-schedule-card-header flex justify-between items-center p-4 md:pt-10 md:pb-6 md:px-8 relative">
          <img
            src={tournament_bg_img}
            alt="tournament-schedule"
            className="w-full h-full object-cover absolute top-0 left-0 z-0 opacity-4 "
          />
          <div className="tournament-schedule-card-header-left flex items-center gap-4 md:gap-8 relative z-10">
            <div className="sm:w-[5rem] sm:h-[5rem] w-[4rem] h-[4rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
                alt="tournament-schedule"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[2rem] grad_text-clip font-bold font_oswald text-white">
              {data?.acticeScore?.opponent1Score || "-"}
            </h2>
          </div>
          <div className="tournament-schedule-card-header-center">
            <img className="w-11.5 h-11.5" src={leage_shape} alt="" />
          </div>
          <div className="tournament-schedule-card-header-right flex items-center gap-4 md:gap-8 relative z-10">
            <h2 className="text-[2rem] grad_text-clip  font-bold text-white font_oswald">
              {data?.acticeScore?.opponent2Score || "-"}
            </h2>
            <div className="sm:w-[5rem] sm:h-[5rem] w-[4rem] h-[4rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
                alt="tournament-schedule"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="tournament-schedule-card-footer flex justify-between items-center h-[3rem] md:h-[4rem] px-4 md:px-8 py-4 overflow-hidden relative">
          <div className="tournament-schedule-card-footer-left">
            <h2 className="text-base md:text-lg grad_text-clip font-bold">
              {data?.team1.teamName || data?.team1.username}
            </h2>
          </div>
          <div className="tournament-schedule-card-footer-center w-[2rem] md:w-[3rem]">
            <img
              src={tournament_vs_icon}
              alt="tournament-schedule"
              className="mix-blend-luminosity"
            />
          </div>
          <div className="tournament-schedule-card-footer-right text-right">
            <h2 className="text-base md:text-lg grad_text-clip font-bold">
              {data?.team2.teamName || data?.team2.username}
            </h2>
          </div>
        </div>
        {/* <div className="tournament-schedule-card-footer tournament-schedule-card-footer-hover flex justify-center items-center h-[3rem] md:h-[4rem] px-4 md:px-8 md:pb-6 py-4 overflow-hidden relative">
          <div className="tournament-schedule-card-footer-left flex gap-2 items-center ">
            <h2 className="text-base md:text-xl font-semibold text-[#3ECCF3]">Match Page</h2>
            <img src={footer_card_icon} alt="" />
          </div>
        </div> */}

        {/* card bottom shape */}
        <svg
          width={0}
          height={0}
          viewBox="0 0 448 64"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
          }}
        >
          <defs>
            <clipPath id="clipPathBanner" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.00223214, 0.015625)"
                d="M448 8V48L432 64H272L264 56H184L176 64H16L0 48V8L8 0H440L448 8Z"
              />
            </clipPath>
          </defs>
        </svg>
        {/* card main shape */}
        <svg
          width={0}
          height={0}
          viewBox="0 0 448 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
          }}
        >
          <defs>
            <clipPath id="scalableClipPath" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.00223214, 0.005)"
                d="M144 36H304L336 0H432L448 16V184L432 200H272L264 192H184L176 200H16L0 184V16L16 0H112L144 36Z"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      {/* card top shape */}
      <svg
        width="0%"
        height="0%"
        viewBox="0 0 212 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
        }}
      >
        <defs>
          <clipPath id="scalable-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 L0.8679,1 H0.1321 L0,0 Z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default TournamentScheduleCard;
