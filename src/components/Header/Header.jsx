import React from "react";
import { NavLink } from "react-router-dom";
import '../../assets/css/main_content.css'
import { Prime, Lobby, NextArrow ,Notification } from "../ui/svg/index.jsx";
import champ_league from "../../assets/images/champ_league.png";
import country_us from "../../assets/images/country_us.png";
import Dropdown from "../Dropdown/user_menu.jsx";

{/* === BreadCrumb items array ==== */}
const breadcrumbItems = [
  { label: "Home", path: "#", icon: Prime },
  { label: "Lobby", path: "#", icon: Lobby },
  { label: "Champions of the League", path: "#", icon: champ_league, isImage: true, active: true },
];

const Header = ({ selectedItem }) => {
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
                  {item.isImage ? (
                    <img src={item.icon} alt="" style={{width:"2.5rem"}} />
                  ) : (
                    <item.icon className="text-white" />
                  )}
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
          <NavLink to='#' className="inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg">
            <img src={country_us} alt="" style={{width:"1.5rem"}} />
          </NavLink>
          <NavLink to='#' className="notification_btn inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before">
            <Notification />
          </NavLink>
      </div>

      <div className="sd_uaser-menu">
          <Dropdown />
      </div>
      
    </header>
  );
};

export default Header;
