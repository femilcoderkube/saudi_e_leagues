import React from "react";
import { NavLink, useParams } from "react-router-dom";
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
import { items } from "../../utils/constant.js";
import { useSelector } from "react-redux";

{
  /* === BreadCrumb items array ==== */
}
const breadcrumbItems = [
];

const Header = ({ selectedItem, setShowModal, setShowLoginModal }) => {
  const { leagueData } = useSelector((state) => state.leagues);
  const user = localStorage.getItem("user");
  let params = useParams();
  let path = new Set( window.location.pathname.split("/")).has("lobby");
  if(params.id) {
    const partner = items.find((item) => item.id === params.id);
    if(partner){
      let item = {label : "Home", path: `/${partner.id}`, icon: partner.headerIcon , active: true};
      if(breadcrumbItems.length === 0 || breadcrumbItems[0].label !== item.label) {
      breadcrumbItems.push(item);
      }
    }

  }
  if(path) {
    let item = { label: "Lobby", path: `/${params.id}/lobby`, icon: Lobby , active: true};
    if (breadcrumbItems.length === 1 || breadcrumbItems[1].label !== item.label) {
      breadcrumbItems[0].active = false; // Set the previous item to inactive
      breadcrumbItems.push(item);
    }
  }
  if(params.lId){
    if(breadcrumbItems.length ===3 )
    {
      breadcrumbItems.pop(); // Remove the last item if it exists
    }
    let item = { label: leagueData?.title , path: `/${params.id}/lobby/${params.lId}`, icon: Champions , active: true};
    if (breadcrumbItems.length === 2 || breadcrumbItems[2].label !== item.label) {
      breadcrumbItems[1].active = false; // Set the previous item to inactive
      breadcrumbItems.push(item);
    }
  }
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

     {!user && <div className="sd_uaser-menu flex">
        <div className="game_status_tab--wrap">
          <div>
            <button
              className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300`}
              style={{ width: "10rem", height: "4rem" }}
              onClick={(e) => {
                e.preventDefault();
                setShowLoginModal(true);
              }}
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
              Registration
            </button>
          </div>
        </div>
      </div>}

      {user && <div className="sd_uaser-menu">
  
        <Dropdown user={user} />
      </div> }
    </header>
  );
};

export default Header;
