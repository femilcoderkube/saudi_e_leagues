import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "../../assets/css/main_content.css";
import "../../assets/css/select_game.css";
import {
  Prime,
  Lobby,
  NextArrow,
  Notification,
  Champions,
  NextArrow2,
} from "../ui/svg/index.jsx";
import country_us from "../../assets/images/country_us.png";
import Dropdown from "../LobbyPageComp/User_menu.jsx";
import { checkParams, items } from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import SubmitScoreBtn from "../Matchmakingcomp/submitScoreButton.jsx";
import {
  setLogin,
  setRegisteration,
  setSubmitModal,
} from "../../app/slices/constState/constStateSlice.js";
import ViewScoreBtn from "../Matchmakingcomp/viewScoreButton.jsx";
import { useTranslation } from "react-i18next";

{
  /* === BreadCrumb items array ==== */
}

const Header = () => {
  const { leagueData } = useSelector((state) => state.leagues);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { matchData, isCaptain, IsSubmited, isEditScore } = useSelector(
    (state) => state.matchs
  );

  // const isMatchMaking = useSelector((state) => state.constState.isMatchMaking);

  const user = useSelector((state) => state.auth.user);
  let params = useParams();
  useEffect(() => {}, [matchData, user, location]);
  const userUpdate = useSelector((state) => state.users.userDetail);
  console.log("user", user);

  const { i18n, t } = useTranslation();

  // Language toggle handler
  const handleLangToggle = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  if (checkParams("finding-match") || checkParams("match")) {
    if (params.mId) {
      return (
        <header
          key={location.pathname}
          className="header_teture--bg text-white  py-[1.35rem] px-[4.5rem] flex items-center justify-between sd_before before:w-full before:h-full relative "
          style={{
            background:
              "linear-gradient(180deg,rgba(94, 95, 184, 0.25) 0%, rgba(94, 95, 184, 0) 120%)",
          }}
        >
          <div className="flex items-center ">
            <div
              className="back_arrow absolute left-[5rem] scale-x-[-1] cursor-pointer"
              onClick={() => {
                navigator(`/${params.id}/lobby/${matchData?.league?._id}`);
              }}
            >
              <NextArrow2 width="0.5rem" height="0.75rem" fill="#7378C0" />
            </div>
            <h2 className="text-[2rem] !font-black uppercase block ml-12">
              {i18n.language === "en"
                ? matchData?.league?.title
                : matchData?.league?.titleAr || t("match.finding_matchmaking")}
            </h2>
          </div>
          <div className="flex items-center gap-15">
            {user && isCaptain && (!IsSubmited || isEditScore != null) && (
              <div
                className="submit_score-btn btn_polygon--mask inline-flex max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400"
                onClick={() => {
                  dispatch(setSubmitModal(true));
                }}
              >
                <Link className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center">
                  {IsSubmited ? t("auth.view_score") : t("auth.submit_score")}
                </Link>
              </div>
            )}
            {/* {user && isCaptain && IsSubmited && !matchData?.winner && (
              <ViewScoreBtn
                onClick={(e) => {
                  e.preventDefault();
                  setViewModal(true);
                }}
              />
            )} */}
            {!user && (
              <div className="sd_uaser-menu flex ">
                <div className="game_status_tab--wrap">
                  <div>
                    <button
                      className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300`}
                      style={{ width: "10rem", height: "4rem" }}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setLogin(true));
                      }}
                    >
                      {t("auth.log_in")}
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
                        dispatch(setRegisteration(true));
                      }}
                    >
                      {t("auth.registration")}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {user && (
              <div className="sd_uaser-menu">
                <Dropdown user={userUpdate ? userUpdate : user} />
              </div>
            )}
          </div>
        </header>
      );
    } else {
      return (
        <header
          className="header_teture--bg text-white  py-[2.35rem] px-[4.5rem] flex items-center justify-center sd_before before:w-full before:h-full relative "
          style={{
            background:
              "linear-gradient(180deg,rgba(94, 95, 184, 0.25) 0%, rgba(94, 95, 184, 0) 120%)",
          }}
        >
          <div
            className="back_arrow absolute left-[5rem] scale-x-[-1] cursor-pointer"
            onClick={() => {
              navigator(-1);
            }}
          >
            <NextArrow2 width="0.8rem" height="1.5rem" fill="#7378C0" />
          </div>
          <h2 className="text-[2rem] !font-black uppercase text-center block">
            {leagueData?.title || t("match.finding_matchmaking")}
          </h2>
        </header>
      );
    }
  } else {
    const breadcrumbItems = [];
    let path = new Set(window.location.pathname.split("/")).has("lobby");
    if (path) {
      let item = {
        label: t("navigation.lobby"),
        path: `/${params.id}/lobby`,
        icon: Lobby,
        active: true,
      };
      if (
        breadcrumbItems.length === 0 ||
        breadcrumbItems[0].label !== item.label
      ) {
        // breadcrumbItems[0].active = false; // Set the previous item to inactive
        breadcrumbItems.push(item);
      }
    }
    if (params.lId) {
      if (breadcrumbItems.length === 2) {
        breadcrumbItems.pop(); // Remove the last item if it exists
      }
      let item = {
        label: leagueData?.title,
        path: `/${params.id}/lobby/${params.lId}`,
        icon: Champions,
        active: true,
      };
      if (
        breadcrumbItems.length === 1 ||
        breadcrumbItems[1].label !== item.label
      ) {
        breadcrumbItems[0].active = false; // Set the previous item to inactive
        breadcrumbItems.push(item);
      }
    }

    return (
      <header className="text-white pt-4 sm:pt-[1.4rem] px-4 md:px-[4.5rem] md:pr-7.5 flex items-center justify-between">
        {/* === BreadCrumb HTML Block start ==== */}
        <nav className="breadcrumb flex-grow-1">
          <ul className="breadcrumb-links flex items-center gap-2.5 md:gap-5">
            {breadcrumbItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 sm:gap-4 md:gap-7"
              >
                <div className="breadcrumb-box flex items-center gap-2">
                  <Link
                    to={item.path}
                    className={`breadcrumb-text flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-sm md:text-lg purple_col font-bold ${
                      item.active ? "sky_col font-semibold" : ""
                    }`}
                  >
                    {item.label && <item.icon className="text-white" />}

                    {item.label}
                  </Link>
                </div>

                {/* Add arrow only if it's NOT the last item */}
                {index < breadcrumbItems.length - 1 && (
                  <NextArrow className="text-white" />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sd_notification-block flex gap-4 ltr:ml-[1rem] md:ltr:mr-[9rem] rtl:ml-[1rem] md:rtl:ml-[9rem]">
          <button
            onClick={handleLangToggle}
            title={i18n.language === "en" ? "العربية" : "English"}
            className="inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg"
            style={{ border: "none", background: "none" }}
          >
            <img src={country_us} alt="lang" style={{ width: "1.5rem" }} />
            <span className="font-bold mt-0.5 block">
              {i18n.language === "en" ? "EN" : "AR"}
            </span>
          </button>
          {/* <NavLink
            to="#"
            className="notification_btn inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before"
          >
            <Notification />
          </NavLink> */}
        </div>

        {!user && (
          <div className="sd_uaser-menu flex pb-[1.4rem]">
            <div className="game_status_tab--wrap">
              <div>
                <button
                  className={`py-2 px-2.5 sm:px-4 text-sm sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300 w-[4rem] sm:w-[10rem] sm:h-[4rem]`}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setLogin(true));
                  }}
                >
                  {t("auth.log_in")}
                </button>
              </div>
            </div>
            <div className="game_status_tab--wrap">
              <div className="game_status--tab rounded-xl">
                <button
                  className={`py-2 px-2.5 sm:px-4 text-sm sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300
             active-tab polygon_border w-[6.2rem] h-[2.5rem] sm:w-[10rem] sm:h-[4rem]
            `}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setRegisteration(true));
                  }}
                >
                  {t("auth.registration")}
                </button>
              </div>
            </div>
          </div>
        )}

        {user && (
          <div className="sd_uaser-menu pb-[1.4rem]">
            <Dropdown user={userUpdate ? userUpdate : user} />
          </div>
        )}
      </header>
    );
  }
};

export default Header;
