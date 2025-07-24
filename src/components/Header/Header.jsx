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
  NextArrow3,
} from "../ui/svg/index.jsx";
import country_us from "../../assets/images/country_us.png";
import country_ar from "../../assets/images/ar_lang.png";
import primeIcon from "../../assets/images/prime_hover.png";
import menuActiveIcon from "../../assets/images/menu_active_shape.svg";
import homeIcon from "../../assets/images/mobile_menu_icon_logo.svg";
import logo_ltr from "../../assets/images/logo-lrt.svg";
import lobyIcon from "../../assets/images/mobile_menu_icon_star.svg";
import mobile_menu_icon_user from "../../assets/images/LoginPersone.png";
import Dropdown from "../LobbyPageComp/User_menu.jsx";
import { checkParams, items } from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import SubmitScoreBtn from "../Matchmakingcomp/submitScoreButton.jsx";
import {
  setActiveTabIndex,
  setLogin,
  setProfileVisible,
  setRegisteration,
  setshowNotification,
  setSubmitModal,
} from "../../app/slices/constState/constStateSlice.js";
import ViewScoreBtn from "../Matchmakingcomp/viewScoreButton.jsx";
import { useTranslation } from "react-i18next";

{
  /* === BreadCrumb items array ==== */
}

const Header = () => {
  const { leagueData } = useSelector((state) => state.leagues);
  const { isActiveTab, showNotification, profileVisible } = useSelector(
    (state) => state.constState
  );
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
  const userUpdate = useSelector((state) => state.auth.userDetail);
  // console.log("user", user);

  const { i18n, t } = useTranslation();

  // Language toggle handler
  const handleLangToggle = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };
  // Language toggle handler
  const handleLangToggle2 = () => {
    dispatch(setshowNotification(!showNotification));
  };
  const breadcrumbItems = [];
  let path = new Set(window.location.pathname.split("/")).has("lobby");
  let profile = new Set(window.location.pathname.split("/")).has("profile");

  if (params.id) {
    let item = {
      label: t("navigation.home"),
      path: `/${params.id}`,
      icon: Prime,
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
  if (path) {
    let item = {
      label: t("navigation.lobby"),
      path: `/${params.id}/lobby`,
      icon: Lobby,
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
  if (params.lId) {
    if (breadcrumbItems.length === 3) {
      breadcrumbItems.pop(); // Remove the last item if it exists
    }
    let item = {
      label: i18n.language === "en" ? leagueData?.title : leagueData?.titleAr,
      path: `/${params.id}/lobby/${params.lId}`,
      icon: Champions,
      active: true,
    };
    if (
      breadcrumbItems.length === 2 ||
      breadcrumbItems[2].label !== item.label
    ) {
      breadcrumbItems[1].active = false; // Set the previous item to inactive
      breadcrumbItems.push(item);
    }
  }
  

  if (path) {
    dispatch(setActiveTabIndex(0));
  } else if (profile) {
    dispatch(setActiveTabIndex(2));
  } else {
    dispatch(setActiveTabIndex(1));
  }
  let mainItem = breadcrumbItems[breadcrumbItems.length - 1];
  if (checkParams("finding-match") || checkParams("match")) {
    if (params.mId) {
      return (
        <header
          key={location.pathname}
          className="header_teture--bg text-white py-[1.35rem] px-[1rem] md:px-[4.5rem] flex items-center justify-between sd_before before:w-full before:h-full relative "
          style={{
            background:
              "linear-gradient(180deg,rgba(94, 95, 184, 0.25) 0%, rgba(94, 95, 184, 0) 120%)",
          }}
        >
          <div className="flex items-center ">
            <div
              className="back_arrow absolute ltr:left-[1rem] rtl:right-[1rem] md:ltr:left-[5rem] md:rtl:right-[5rem] cursor-pointer"
              onClick={() => {
                navigator(`/${params.id}/lobby/${matchData?.league?._id}`);
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform:
                    i18n.language === "ar" ? "scaleX(1)" : "scaleX(-1)",
                }}
              >
                <NextArrow2 width="0.5rem" height="0.75rem" fill="#7378C0" />
              </span>
            </div>
            <h2 className="md:text-[2rem] text-[1.25rem] !font-black uppercase block ltr:ml-12 rtl:mr-12">
              {i18n.language === "en"
                ? matchData?.league?.title
                : matchData?.league?.titleAr || t("match.finding_matchmaking")}
            </h2>
          </div>
          <div className="flex items-center gap-15">
            {user && isCaptain && (!IsSubmited || isEditScore != null) && (
              <div
                className="submit_score-btn hidden sm:inline-flex btn_polygon--mask  max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400"
                onClick={() => {
                  dispatch(setSubmitModal(true));
                }}
              >
                <Link className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center">
                  {IsSubmited ? t("auth.view_score") : t("auth.submit_score")}
                </Link>
                <svg
                  width="0"
                  height="0"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute" }}
                >
                  <defs>
                    <clipPath
                      id="polygonClip"
                      clipPathUnits="objectBoundingBox"
                    >
                      <path
                        d="
              M1,0.1111
              V0.8889
              L0.9219,1
              H0.7266
              L0.6953,0.9028
              H0.3047
              L0.2734,1
              H0.0781
              L0,0.8889
              V0.1111
              L0.0781,0
              H0.2734
              L0.3047,0.0972
              H0.6953
              L0.7266,0
              H0.9219
              L1,0.1111
              Z
            "
                      />
                    </clipPath>
                  </defs>
                </svg>
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
              <div className="sm:flex hidden sd_uaser-menu ">
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
            {!user && (
              <div className="sm:hidden flex">
                <img
                  className="h-full"
                  src={mobile_menu_icon_user}
                  alt="user"
                />
              </div>
            )}
            {user && (
              <div className="sd_uaser-menu hidden sm:block">
                <Dropdown user={userUpdate ? userUpdate : user} />
              </div>
            )}
          </div>
          <div className="mob-logo sm:hidden block">
            <img className="w-18 h-auto" src={logo_ltr} alt="" />
          </div>
        </header>
      );
    } else {
      console.log("breadcrumbItems", breadcrumbItems);
      return (
        <header
          className="header_teture--bg text-white  sm:py-[2.35rem] py-[2rem] px-[4.5rem] flex items-center justify-center sd_before before:w-full before:h-full relative "
          style={{
            background:
              "linear-gradient(180deg,rgba(94, 95, 184, 0.25) 0%, rgba(94, 95, 184, 0) 120%)",
          }}
        >
          <div
            className="back_arrow absolute ltr:left-[5rem] rtl:right-[5rem] cursor-pointer"
            onClick={() => {
              navigator(-1);
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: i18n.language === "ar" ? "scaleX(1)" : "scaleX(-1)",
              }}
            >
              <NextArrow2 width="0.5rem" height="0.75rem" fill="#7378C0" />
            </span>
          </div>
          <h2 className="sm:text-[2rem] text-lg !font-black uppercase text-center block">
            {i18n.language === "en"
              ? leagueData?.title
              : leagueData?.titleAr || t("match.finding_matchmaking")}
          </h2>
          <div
            className={`navigation sm:hidden w-full h-[5rem] left-0 fixed bottom-0 z-100 ${
              breadcrumbItems.length == 3 ? "hidden" : ""
            }${user ? "" : "nav-condition"}`}
          >
            <div className="sq__main-wrap h-full">
              <ul className="listWrap h-full flex justify-around items-center">
                <li
                  className={`list flex-1 ${isActiveTab == 0 ? "active" : ""}`}
                  onClick={() => {
                    navigator(`/${params.id}/lobby`);
                    dispatch(setActiveTabIndex(0));
                    dispatch(setProfileVisible(false));
                  }}
                >
                  <a
                    href="javascript:void(0);"
                    className="flex flex-wrap gap-1 justify-center items-center"
                  >
                    <i className="icon inline text-center">
                      <img
                        className="w-[2rem] h-[2rem"
                        src={lobyIcon}
                        alt="lang"
                      />
                    </i>
                    <span className="text purple_col w-full text-center">
                      {t("navigation.lobby")}
                    </span>
                  </a>
                </li>
                <li
                  className={`list flex-1 ${isActiveTab == 1 ? "active" : ""}`}
                  onClick={() => {
                    navigator(`/${params.id}`);
                    dispatch(setActiveTabIndex(1));
                    dispatch(setProfileVisible(false));
                  }}
                >
                  <a
                    href="javascript:void(0);"
                    className="flex gap-1 flex-wrap justify-center items-center"
                  >
                    <i className="icon inline text-center">
                      <img
                        className="w-[2rem] h-[2rem"
                        src={homeIcon}
                        alt="lang"
                      />
                    </i>
                    <span className="text purple_col w-full text-center">
                      {t("navigation.home")}
                    </span>
                  </a>
                </li>
                {user && (
                  <li
                    className={`list flex-1 ${
                      isActiveTab == 2 ? "active" : ""
                    }`}
                    onClick={() => {
                      navigator(`/${params.id}/profile`);
                      dispatch(setActiveTabIndex(2));
                      dispatch(setProfileVisible(false));
                    }}
                  >
                    <a
                      href="javascript:void(0);"
                      className="flex gap-1 flex-wrap justify-center items-center"
                    >
                      <i className="icon inline text-center">
                        <img
                          className="w-[2rem] h-[2rem"
                          src={lobyIcon}
                          alt="lang"
                        />
                      </i>
                      <span class="text purple_col w-full text-center">
                        {t("navigation.profile")}
                      </span>
                    </a>
                  </li>
                )}
                <li className="m_menu__indicator">
                  <img src={menuActiveIcon} alt="lang" style={{ width: "" }} />
                </li>
                <div className="sq__shape-wrap"></div>
              </ul>
            </div>
          </div>
        </header>
      );
    }
  } else {
    return (
      <header className="text-white pt-4 sm:pt-[1.4rem] sm:pb-0 pb-4 px-4 md:px-[4.5rem] ltr:md:pr-7.5 rtl:md:pl-7.5 flex items-center justify-between">
        {/* === BreadCrumb HTML Block start ==== */}
        <nav className="breadcrumb flex-grow-1 lg:flex hidden">
          <ul className="breadcrumb-links flex  items-center gap-2.5 md:gap-5">
            {breadcrumbItems.map((item, index) => (
              <li
                key={index}
                className="sm:flex hidden items-center gap-2 sm:gap-4 md:gap-7 "
              >
                <div className="breadcrumb-box flex items-center gap-2">
                  <Link
                    to={item.path}
                    className={`breadcrumb-text flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-sm md:text-lg purple_col font-bold ${
                      item.active ? "sky_col font-semibold" : ""
                    }`}
                  >
                    {item.label && (
                      <item.icon
                        IsActive={item.active}
                        className="text-white"
                      />
                    )}

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
        <nav className="breadcrumb flex-grow-1">
          <ul className="breadcrumb-links sm:flex items-center gap-2.5 md:gap-5 lg:hidden">
           { checkParams("profile") && profileVisible ? 
           
           <li
              key={-3}
              className="flex items-center gap-2 sm:gap-4 md:gap-7"
              onClick={() => {
                dispatch(setActiveTabIndex(2));
                dispatch(setProfileVisible(false));
              }}
            >
              {i18n.language === "ar" ? <NextArrow2 /> : <NextArrow3 />}
              <div className="breadcrumb-box flex items-center gap-2">
                <Link
                  to={`/${params.id}/profile`}
                  className={`breadcrumb-text flex items-center gap-3 ltr:pl-2 rtl:pr-2 sm:gap-3 text-sm md:text-lg font-bold text-white text-[1.25rem]`}
                >
                 {t("navigation.profile")}

                 
                </Link>
              </div>
            </li>
           
           :  <li
              key={-1}
              className="flex items-center gap-2 sm:gap-4 md:gap-7"
              onClick={() => {
                if (
                  mainItem.label != t("navigation.lobby") &&
                  mainItem.label != t("navigation.home")
                ) {
                  navigator(-1);
                }
              }}
            >
              {mainItem.label !== t("navigation.lobby") &&
                mainItem.label !== t("navigation.home") &&
                (i18n.language === "ar" ? <NextArrow2 /> : <NextArrow3 />)}
              <div className="breadcrumb-box flex items-center gap-2">
                <Link
                  to={mainItem.path}
                  className={`breadcrumb-text flex items-center gap-3 ltr:pl-2 rtl:pr-2 sm:gap-3 text-sm md:text-lg font-bold text-white text-[1.25rem]`}
                >
                  {mainItem.label &&
                    (mainItem.label !== t("navigation.home") ? (
                      <mainItem.icon
                        IsActive={mainItem.active}
                        className="text-white"
                      />
                    ) : (
                      <img
                        src={primeIcon}
                        alt="prime"
                        className="text-white w-8 h-8"
                      />
                    ))}

                  {mainItem.label !== t("navigation.home")
                    ? mainItem.label
                    : t("navigation.prime")}

                  {mainItem.label == t("navigation.home") && (
                    <span className="text-[1.25rem] font-bold text-black ltr:ml-[12px] rtl:mr-[12px] bg-[#3ECCF3] px-3 rounded-[10px] min-h-[1.75rem] min-w-[4.063rem]">
                      {t("common.beta")}
                    </span>
                  )}
                </Link>
              </div>
            </li>}
          </ul>
        </nav>
        <div className="sd_notification-block self-center flex gap-4 ltr:ml-[1rem] xl:ltr:mr-[9rem] xl:rtl:ml-[9rem] sm:ltr:mr-[2rem]  sm:rtl:ml-[2rem] ">
          <div
            onClick={handleLangToggle}
            title={i18n.language === "en" ? "العربية" : "English"}
            className="inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before"
          >
            <img
              src={i18n.language === "ar" ? country_ar : country_us}
              alt="lang"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            onClick={handleLangToggle2}
            title={"Notification"}
            className="inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before"
          >
            <Notification />
          </div>
          {/* <NavLink
            to="#"
            className="notification_btn inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before"
          >
            <Notification />
          </NavLink> */}
        </div>

        {!user && (
          <div className=" sm:flex hidden sd_uaser-menu sm:pb-[1.4rem]">
            <div className="game_status_tab--wrap">
              <div>
                <button
                  className={`py-2 px-2.5 sm:px-4 text-sm sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300 w-[4rem] md:w-[10rem] md:h-[4rem] sm:w-[7rem] sm:h-[4rem]`}
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
        {!user && (
          <div
            className="sm:hidden flex ltr:ml-3 rtl:mr-3 "
            onClick={(e) => {
              e.preventDefault();
              dispatch(setLogin(true));
            }}
          >
            <img className="h-full" src={mobile_menu_icon_user} alt="user" />
          </div>
        )}
        {user && (
          <div className="sd_uaser-menu pb-[0] hidden sm:block">
            <Dropdown user={userUpdate ? userUpdate : user} />
          </div>
        )}
        <div
          className={`navigation sm:hidden w-full h-[5rem] left-0 fixed bottom-0 z-100 ${
            user ? "" : "nav-condition"
          }`}
        >
          <div className="sq__main-wrap h-full">
            <ul className="listWrap h-full flex justify-around items-center">
              <li
                className={`list flex-1 ${isActiveTab == 0 ? "active" : ""}`}
                onClick={() => {
                  navigator(`/${params.id}/lobby`);
                  dispatch(setActiveTabIndex(0));
                  dispatch(setProfileVisible(false));
                }}
              >
                <a
                  href="javascript:void(0);"
                  className="flex flex-wrap gap-1 justify-center items-center"
                >
                  <i className="icon inline text-center">
                    <img
                      className="w-[2rem] h-[2rem"
                      src={lobyIcon}
                      alt="lang"
                    />
                  </i>
                  <span className="text purple_col w-full text-center">
                    {t("navigation.lobby")}
                  </span>
                </a>
              </li>
              <li
                className={`list flex-1 ${isActiveTab == 1 ? "active" : ""}`}
                onClick={() => {
                  navigator(`/${params.id}`);
                  dispatch(setActiveTabIndex(1));
                  dispatch(setProfileVisible(false));
                }}
              >
                <a
                  href="javascript:void(0);"
                  className="flex gap-1 flex-wrap justify-center items-center"
                >
                  <i className="icon inline text-center">
                    <img
                      className="w-[2rem] h-[2rem"
                      src={homeIcon}
                      alt="lang"
                    />
                  </i>
                  <span className="text purple_col w-full text-center">
                    {t("navigation.home")}
                  </span>
                </a>
              </li>
              {user && (
                <li
                  className={`list flex-1 ${isActiveTab == 2 ? "active" : ""}`}
                  onClick={() => {
                    navigator(`/${params.id}/profile`);
                    dispatch(setActiveTabIndex(2));
                    dispatch(setProfileVisible(false));
                  }}
                >
                  <a
                    href="javascript:void(0);"
                    className="flex gap-1 flex-wrap justify-center items-center"
                  >
                    <i className="icon inline text-center">
                      <img
                        className="w-[2rem] h-[2rem"
                        src={lobyIcon}
                        alt="lang"
                      />
                    </i>
                    <span class="text purple_col w-full text-center">
                      {t("navigation.profile")}
                    </span>
                  </a>
                </li>
              )}
              <li className="m_menu__indicator">
                <img src={menuActiveIcon} alt="lang" style={{ width: "" }} />
              </li>
              <div className="sq__shape-wrap"></div>
            </ul>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
