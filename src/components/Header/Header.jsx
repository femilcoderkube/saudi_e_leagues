import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/main_content.css";
import "../../assets/css/select_game.css";
import {
  Prime,
  Lobby,
  NextArrow,
  Notification,
  Champions,
} from "../ui/svg/index.jsx";
import country_us from "../../assets/images/country_us.png";
import Dropdown from "../LobbyPageComp/User_menu.jsx";

{
  /* === BreadCrumb items array ==== */
}
const breadcrumbItems = [
  { label: "Home", path: "#", icon: Prime },
  { label: "Lobby", path: "#", icon: Lobby },
  {
    label: "Champions of the League",
    path: "#",
    icon: Champions,
    active: true,
  },
];

const Header = ({ selectedItem, setShowModal }) => {
  return (
    <header className="text-white pt-[1.4rem] px-[4.5rem] flex items-center justify-between items-center">
      {/* === BreadCrumb HTML Block start ==== */}
      <nav className="breadcrumb flex-grow-1">
        <ul className="breadcrumb-links flex items-center gap-5">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center gap-7">
              <div className="breadcrumb-box flex items-center gap-2">
                <a
                  href={item.path}
                  className={`breadcrumb-text flex items-center gap-3 text-lg purple_col font-bold ${
                    item.active ? "sky_col font-semibold" : ""
                  }`}
                >
                  <item.icon className="text-white" />

                  {item.label}
                </a>
              </div>

              {/* Add arrow only if it's NOT the last item */}
              {index < breadcrumbItems.length - 1 && (
                <NextArrow className="text-white" />
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sd_notification-block flex gap-4 mr-[9rem]">
        <NavLink
          to="#"
          className="inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg"
        >
          <img src={country_us} alt="" style={{ width: "1.5rem" }} />
        </NavLink>
        <NavLink
          to="#"
          className="notification_btn inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before"
        >
          <Notification />
        </NavLink>
      </div>

      <div className="sd_uaser-menu flex">
        <div className="game_status_tab--wrap">
          <div>
            <button
              className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300`}
              style={{ width: "10rem", height: "4rem" }}
            >
              Login In
            </button>
          </div>
        </div>
        <div className="game_status_tab--wrap">
          <div className="game_status--tab rounded-xl">
            <button
              className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300
             active-tab polygon_border
            `}
              style={{ width: "10rem", height: "4rem" }}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              Registreation
            </button>
          </div>
        </div>
      </div>

      {/* <div className="sd_uaser-menu">
  
        <Dropdown />
      </div> */}
    </header>
  );
};

export default Header;
