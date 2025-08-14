import tournament_thumbnail from "../../assets/images/large_prime.png";
import tournament_vs_icon from "../../assets/images/tournament_vs_icon.png";
import tournament_bg_img from "../../assets/images/tournament_bg_img.jpg";
import leage_shape from "../../assets/images/leage_shape.png";
import footer_card_icon from "../../assets/images/footer-card-icon.png";
import { useSelector } from "react-redux";
import { getServerURL } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";

const TournamentScheduleCard = ({ item }) => {
  return (
    <div className="flex flex-col mt-5">
    <div className="card-duty-wp relative main-tournament-schedule-card-wrapper cursor-pointer !mb-5">
      <div className="tournament-schedule-card-header-time absolute bottom-0 left-0 z-10 w-full flex items-center justify-center ">
        <h2 className="text-[0.7rem] font-bold text-[#BABDFF] px-10 pt-1 pb-[0.35rem] relative">
          12 Jul
          <span className="inline-block text-[#7B7ED0]  pl-2 ml-1 relative">
            08:30 PM
          </span>
        </h2>
      </div>
      <div className="tournament-schedule-card-footer flex justify-between items-center h-[2rem] md:h-[2.5rem] p-3  absolute top-0 w-full">
          <div className="tournament-schedule-card-footer-left flex items-center gap-3">
            <img src={footer_card_icon} alt="" />
            <h2 className="text-sm grad_text-clip font-bold">
              Valorant
            </h2>
          </div>
          <div className="tournament-schedule-card-footer-right text-right">
            <button className="common-process px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">Progress</button>
          </div>
        </div>
      <div className="tournament-schedule-card-wrapper relative  p-2  md:px-3 ">
        <div className="tournament-schedule-card-header flex justify-between items-center relative gap-6 mt-2">
          <div className="tournament-schedule-card-header-left flex items-center gap-3 md:gap-4 relative z-10">
            <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
                alt="tournament-schedule"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[2rem] grad_text-clip font-bold font_oswald text-white">
              2
            </h2>
          </div>
          <div className="tournament-schedule-card-header-center">
            <img
              className="w-5.5 h-10 shrink-0 object-cover"
              src={tournament_thumbnail}
              alt=""
            />
          </div>
          <div className="tournament-schedule-card-header-right flex items-center gap-4 md:gap-8 relative z-10">
            <h2 className="text-[2rem] grad_text-clip  font-bold text-white font_oswald">
              0
            </h2>
            <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
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
            <clipPath id="duty_bottom1" clipPathUnits="objectBoundingBox">
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
    <div className="card-duty-wp relative main-tournament-schedule-card-wrapper cursor-pointer !mb-5">
      <div className="tournament-schedule-card-header-time absolute bottom-0 left-0 z-10 w-full flex items-center justify-center ">
        <h2 className="text-[0.7rem] font-bold text-[#BABDFF] px-10 pt-1 pb-[0.35rem] relative">
          12 Jul
          <span className="inline-block text-[#7B7ED0]  pl-2 ml-1 relative">
            08:30 PM
          </span>
        </h2>
      </div>
      <div className="tournament-schedule-card-footer flex justify-between items-center h-[2rem] md:h-[2.5rem] p-3  absolute top-0 w-full">
          <div className="tournament-schedule-card-footer-left flex items-center gap-3">
            <img src={footer_card_icon} alt="" />
            <h2 className="text-sm grad_text-clip font-bold">
              Valorant
            </h2>
          </div>
          <div className="tournament-schedule-card-footer-right text-right">
            <button className="common-green px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">Progress</button>
          </div>
        </div>
      <div className="tournament-schedule-card-wrapper relative  p-2  md:px-3 ">
        <div className="tournament-schedule-card-header flex justify-between items-center relative gap-6 mt-2">
          <div className="tournament-schedule-card-header-left flex items-center gap-3 md:gap-4 relative z-10">
            <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
                alt="tournament-schedule"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[2rem] grad_text-clip font-bold font_oswald text-white">
              2
            </h2>
          </div>
          <div className="tournament-schedule-card-header-center">
            <img
              className="w-5.5 h-10 shrink-0 object-cover"
              src={tournament_thumbnail}
              alt=""
            />
          </div>
          <div className="tournament-schedule-card-header-right flex items-center gap-4 md:gap-8 relative z-10">
            <h2 className="text-[2rem] grad_text-clip  font-bold text-white font_oswald">
              0
            </h2>
            <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
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
            <clipPath id="duty_bottom1" clipPathUnits="objectBoundingBox">
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
    <div className="card-duty-wp relative main-tournament-schedule-card-wrapper cursor-pointer  !mb-5">
      <div className="tournament-schedule-card-header-time absolute bottom-0 left-0 z-10 w-full flex items-center justify-center ">
        <h2 className="text-[0.7rem] font-bold text-[#BABDFF] px-10 pt-1 pb-[0.35rem] relative">
          12 Jul
          <span className="inline-block text-[#7B7ED0]  pl-2 ml-1 relative">
            08:30 PM
          </span>
        </h2>
      </div>
      <div className="tournament-schedule-card-footer flex justify-between items-center h-[2rem] md:h-[2.5rem] p-3  absolute top-0 w-full">
          <div className="tournament-schedule-card-footer-left flex items-center gap-3">
            <img src={footer_card_icon} alt="" />
            <h2 className="text-sm grad_text-clip font-bold">
              Valorant
            </h2>
          </div>
          <div className="tournament-schedule-card-footer-right text-right">
            <button className="common-red px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">Progress</button>
          </div>
        </div>
      <div className="tournament-schedule-card-wrapper relative  p-2  md:px-3 ">
        <div className="tournament-schedule-card-header flex justify-between items-center relative gap-6 mt-2">
          <div className="tournament-schedule-card-header-left flex items-center gap-3 md:gap-4 relative z-10">
            <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
                alt="tournament-schedule"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[2rem] grad_text-clip font-bold font_oswald text-white">
              2
            </h2>
          </div>
          <div className="tournament-schedule-card-header-center">
            <img
              className="w-5.5 h-10 object-cover shrink-0"
              src={tournament_thumbnail}
              alt=""
            />
          </div>
          <div className="tournament-schedule-card-header-right flex items-center gap-4 md:gap-8 relative z-10">
            <h2 className="text-[2rem] grad_text-clip  font-bold text-white font_oswald">
              0
            </h2>
            <div className="sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] rounded-lg overflow-hidden">
              <img
                src={tournament_thumbnail}
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
            <clipPath id="duty_bottom1" clipPathUnits="objectBoundingBox">
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
    </div>
  );
};

export default TournamentScheduleCard;
