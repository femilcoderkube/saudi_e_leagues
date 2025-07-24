import { Link } from "react-router-dom";
import dota_game from "../../assets/images/dota-game.png";
import "../../assets/css/notification.css";

const Notification_box = () => {
  return (
      <div className="notification-box-wp relative polygon_border sd_before sd_after">
        <div className={`notification-box ${
    i18n.dir() === "rtl" ? "rtl" : ""
  }`}>
          <div className="notification-box-rotate h-[19rem] flex flex-col justify-between">
          <div className="notification-box-head-wp flex justify-between p-5 border-b border-[#262968]">
            <div className="notification-box-head flex items-center gap-4">
              <img src={rick_moon} alt="" style={{ width: "2.51rem" }} />
              <h6 className="text-xl sleading-6">RickMoon</h6>
            </div>
            <div>
              <span className="purple_col font-semibold">5m ago</span>
            </div>
          </div>
          <div className="notification-box-content px-5 py-6 flex flex-col justify-between">
            <h6 className="text-lg sleading-6 purple_col mb-1.5">
              The player invites you to a joint tournament:
            </h6>
            <h5 className="text-xl">The Radiant Uprising</h5>
            <div className="notification-box-head flex items-center gap-4 pt-2">
              <img src={dota_game} alt="" />
              <div className="box-game">
                <span className="purple_col text-sm font-semibold">Game</span>
                <h6 className="text-xl">Dota 2</h6>
              </div>
            </div>
            <div className="notification-box-btn flex gap-4 items-center mt-5">
              <button className="uppercase text-xl sleading-6 font_oswald font-medium w-[9.8rem] h-12 hover:opacity-70 duration-300">
                Deny
              </button>
              <button className="uppercase active-tab text-xl sleading-6 font_oswald font-medium w-[9.8rem] h-12 hover:opacity-70 duration-300">
                Accept
              </button>              
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 360 332"
            width="100%"
            height="100%"
          >
            <defs>
              <clipPath
                id="blob-clip"
                clipPathUnits="objectBoundingBox"
                transform="scale(0.00278,0.00301)"
              >
                <path d="M132 12H228L240 0H340L360 20V120L348 132V200L360 212V320L348 332H12L0 320V12L12 0H120L132 12Z" />
              </clipPath>
            </defs>

            <g filter="url(#inner-shadow)" clip-path="url(#blob-clip)">
              <rect width="360" height="332" fill="url(#blob-grad)" />
            </g>
          </svg>
          </div>
        </div>
      </div>
  );
};

export default Notification_box;
