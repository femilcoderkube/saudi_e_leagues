import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
  DraftingIcon,
} from "../ui/svg/index.jsx";
import Dropdown from "../LeagueDetail/User_menu.jsx";
import { checkParams } from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTabIndex,
  setConfirmationPopUp,
  setGameMatchLoader,
  setLogin,
  setProfileVisible,
  setRegisteration,
  setshowNotification,
  setSubmitModal,
} from "../../app/slices/constState/constStateSlice.js";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../ui/images/images.js";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleLangToggle = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    let type = localStorage.getItem("deviceType");
    if (type == "mobile") {
      window.AndroidInterface?.languageCallbackHandler(`${newLang}`);
      window.webkit?.messageHandlers?.languageCallbackHandler?.postMessage(
        `${newLang}`
      );
    }
  };

  return (
    <div
      onClick={handleLangToggle}
      title={i18n.language === "en" ? "العربية" : "English"}
      className="inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before"
    >
      <img
        src={i18n.language === "ar" ? IMAGES.country_ar : IMAGES.country_us}
        alt="lang"
        style={{
          width: "1.5rem",
          height: "1.5rem",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

// Notification Icon Component
const NotificationIcon = ({ user }) => {
  const dispatch = useDispatch();
  const { showNotification } = useSelector((state) => state.constState);
  const { unReadNotificationCount } = useSelector(
    (state) => state.notification
  );

  const handleNotificationToggle = () => {
    dispatch(setshowNotification(!showNotification));
  };

  if (!user) return null;

  return (
    <div
      onClick={handleNotificationToggle}
      title="Notification"
      className="inline-block p-[0.75rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg relative sd_before notification-icon-wp"
    >
      <sup className="notification-icon flex justify-center items-center rounded-full absolute sm:-top-[0.2rem] sm:right-[-0.2rem] -top-[0.3rem] right-[-0.1rem] text-black font-bold">
        {unReadNotificationCount}
      </sup>
      <Notification />
    </div>
  );
};

// Authentication Buttons Component
const AuthButtons = ({ isMobile = false }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (isMobile) {
    return (
      <div
        className="sm:hidden flex ltr:ml-3 rtl:mr-3"
        onClick={(e) => {
          e.preventDefault();
          let type = localStorage.getItem("deviceType");
          if (type == "mobile") {
            window.AndroidInterface?.signInCallbackHandler(
              `${window.location.href}`
            );
            window.webkit?.messageHandlers?.signInCallbackHandler?.postMessage(
              `${window.location.href}`
            );
          } else {
            dispatch(setLogin(true));
          }
        }}
      >
        <img className="h-full" src={IMAGES.mobile_menu_icon_user} alt="user" />
      </div>
    );
  }

  return (
    <div className="sm:flex hidden sd_uaser-menu sm:pb-[1.4rem]">
      <div className="game_status_tab--wrap">
        <div>
          <button
            className="py-2 px-2.5 sm:px-4 text-sm sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300 w-[4rem] md:w-[10rem] md:h-[4rem] sm:w-[7rem] sm:h-[4rem]"
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
            className="py-2 px-2.5 sm:px-4 text-sm sm:text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300 active-tab polygon_border w-[6.2rem] h-[2.5rem] sm:w-[10rem] sm:h-[4rem]"
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
  );
};

// User Menu Component
const UserMenu = ({ user, userUpdate }) => {
  if (!user) return null;

  return (
    <div className="sd_uaser-menu pb-[0] hidden sm:block">
      <Dropdown user={userUpdate ? userUpdate : user} />
    </div>
  );
};

// Back Button Component
const BackButton = ({ onClick, className = "" }) => {
  const { i18n } = useTranslation();

  return (
    <div className={`back_arrow cursor-pointer ${className}`} onClick={onClick}>
      <span
        style={{
          display: "inline-block",
          transform: i18n.language === "ar" ? "scaleX(1)" : "scaleX(-1)",
        }}
      >
        <NextArrow2 width="0.5rem" height="0.75rem" fill="#7378C0" />
      </span>
    </div>
  );
};

// Match Controls Component
const MatchControls = ({
  user,
  isCaptain,
  IsSubmited,
  isEditScore,
  showCancelBtn,
  cancelMatchCount,
  isMatchCanceled,
  matchData,
  myTeam,
  isSubmitBtnShow,
  isMyMatch,
  isEditScoreT,
  isScoreSubmited,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!user) return null;

  if (checkParams(`tournament`) && checkParams(`match`)) {
    return (
      <div className="flex items-center gap-3">
        {isSubmitBtnShow && !isScoreSubmited && (
          <div
            className="submit_score-btn hidden sm:inline-flex btn_polygon--mask max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400"
            onClick={() => dispatch(setSubmitModal(true))}
          >
            <Link className="btn_polygon-link font_oswald font-medium relative sd_before sd_after vertical_center">
              {!isEditScoreT ? t("auth.submit_score") : t("auth.view_score")}
            </Link>
            <svg
              width="0"
              height="0"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath id="polygonClip" clipPathUnits="objectBoundingBox">
                  <path d="M1,0.1111 V0.8889 L0.9219,1 H0.7266 L0.6953,0.9028 H0.3047 L0.2734,1 H0.0781 L0,0.8889 V0.1111 L0.0781,0 H0.2734 L0.3047,0.0972 H0.6953 L0.7266,0 H0.9219 L1,0.1111 Z" />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-3">
        {isMyMatch &&
          (!IsSubmited || isEditScore != null) &&
          !matchData?.isCanceled &&
          showCancelBtn && (
            <div
              className={`cancel-score-btn submit_score-btn hidden sm:inline-flex btn_polygon--mask max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400 ${
                isMatchCanceled ? "!cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() =>
                isMatchCanceled ? null : dispatch(setConfirmationPopUp(2))
              }
            >
              <div className="btn_polygon-link font_oswald font-medium relative sd_before sd_after vertical_center">
                {t("match.cancel_match")} {cancelMatchCount}
              </div>
              <svg
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute" }}
              >
                <defs>
                  <clipPath id="polygonClip" clipPathUnits="objectBoundingBox">
                    <path d="M1,0.1111 V0.8889 L0.9219,1 H0.7266 L0.6953,0.9028 H0.3047 L0.2734,1 H0.0781 L0,0.8889 V0.1111 L0.0781,0 H0.2734 L0.3047,0.0972 H0.6953 L0.7266,0 H0.9219 L1,0.1111 Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
        {isCaptain &&
          (!IsSubmited || isEditScore != null) &&
          !matchData?.isCanceled && (
            <div
              className="submit_score-btn hidden sm:inline-flex btn_polygon--mask max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400"
              onClick={() => dispatch(setSubmitModal(true))}
            >
              <Link className="btn_polygon-link font_oswald font-medium relative sd_before sd_after vertical_center">
                {IsSubmited ? t("auth.view_score") : t("auth.submit_score")}
              </Link>
              <svg
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute" }}
              >
                <defs>
                  <clipPath id="polygonClip" clipPathUnits="objectBoundingBox">
                    <path d="M1,0.1111 V0.8889 L0.9219,1 H0.7266 L0.6953,0.9028 H0.3047 L0.2734,1 H0.0781 L0,0.8889 V0.1111 L0.0781,0 H0.2734 L0.3047,0.0972 H0.6953 L0.7266,0 H0.9219 L1,0.1111 Z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
      </div>
    );
  }
};

// Breadcrumb Component
const BreadcrumbNavigation = ({
  breadcrumbItems,
  mainItem,
  profileVisible,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const params = useParams();

  return (
    <>
      {/* Desktop Breadcrumb */}
      <nav className="breadcrumb flex-grow-1 lg:flex hidden">
        <ul className="breadcrumb-links flex items-center gap-2.5 md:gap-5">
          {breadcrumbItems.map((item, index) => (
            <li
              key={index}
              className="sm:flex hidden items-center gap-2 sm:gap-4 md:gap-7"
            >
              <div className="breadcrumb-box flex items-center gap-2">
                <Link
                  to={item.path}
                  className={`breadcrumb-text flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-sm md:text-lg purple_col font-bold ${
                    item.active ? "sky_col font-semibold" : ""
                  }`}
                >
                  {item.label && (
                    <item.icon IsActive={item.active} className="text-white" />
                  )}
                  {item.label}
                </Link>
              </div>
              {index < breadcrumbItems.length - 1 && (
                <NextArrow className="text-white" />
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Breadcrumb */}
      <nav className="breadcrumb flex-grow-1">
        <ul className="breadcrumb-links sm:flex items-center gap-2.5 md:gap-5 lg:hidden">
          {checkParams("profile") && profileVisible ? (
            <li
              key={-3}
              className="flex items-center gap-2 sm:gap-4 md:gap-7"
              onClick={() => {
                dispatch(setActiveTabIndex(2));
                dispatch(setProfileVisible(false));
                dispatch(setGameMatchLoader(false));
              }}
            >
              {i18n.language === "ar" ? <NextArrow2 /> : <NextArrow3 />}
              <div className="breadcrumb-box flex items-center gap-2">
                <Link
                  to={`/${params.id}/profile`}
                  className="breadcrumb-text flex items-center gap-3 ltr:pl-2 rtl:pr-2 sm:gap-3 text-sm md:text-lg font-bold text-white text-[1.25rem]"
                >
                  {t("navigation.profile")}
                </Link>
              </div>
            </li>
          ) : checkParams("team") ? (
            <li
              key={-4}
              className="flex items-center gap-2 sm:gap-4 md:gap-7"
              onClick={() => {
                dispatch(setActiveTabIndex(2));
                dispatch(setProfileVisible(false));
                dispatch(setGameMatchLoader(false));
              }}
            >
              {i18n.language === "ar" ? <NextArrow2 /> : <NextArrow3 />}
              <div className="breadcrumb-box flex items-center gap-2">
                <Link
                  to={`/${params.id}/profile`}
                  className="breadcrumb-text flex items-center gap-3 ltr:pl-2 rtl:pr-2 sm:gap-3 text-sm md:text-lg font-bold text-white text-[1.25rem]"
                >
                  {t("navigation.myteam")}
                </Link>
              </div>
            </li>
          ) : (
            <li
              key={-1}
              className="flex items-center gap-2 sm:gap-4 md:gap-7"
              onClick={() => {
                if (
                  mainItem.label != t("navigation.lobby") &&
                  mainItem.label != t("navigation.home")
                ) {
                  navigator(-1);
                  dispatch(setGameMatchLoader(false));
                }
              }}
            >
              {mainItem.label !== t("navigation.lobby") &&
                mainItem.label !== t("navigation.home") &&
                (i18n.language === "ar" ? <NextArrow2 /> : <NextArrow3 />)}
              <div className="breadcrumb-box flex items-center gap-2">
                <Link
                  to={mainItem.path}
                  className="breadcrumb-text flex items-center gap-3 ltr:pl-2 rtl:pr-2 sm:gap-3 text-sm md:text-lg font-bold text-white text-[1.25rem]"
                >
                  {mainItem.label &&
                    (mainItem.label !== t("navigation.home") ? (
                      <mainItem.icon
                        IsActive={mainItem.active}
                        className="text-white"
                      />
                    ) : (
                      <img
                        src={IMAGES.primeIcon}
                        alt="prime"
                        className="text-white w-8 h-8"
                      />
                    ))}
                  {mainItem.label !== t("navigation.home")
                    ? mainItem.label
                    : t("navigation.prime")}
                  {/* {mainItem.label == t("navigation.home") && (
                    <span className="text-[1.25rem] font-bold text-black ltr:ml-[12px] rtl:mr-[12px] bg-[#3ECCF3] px-3 rounded-[10px] min-h-[1.75rem] min-w-[4.063rem]">
                      {t("common.beta")}
                    </span>
                  )} */}
                </Link>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

// Mobile Navigation Component
const MobileNavigation = ({ user, isActiveTab, breadcrumbItems }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const params = useParams();

  const navigationItems = [
    {
      id: 0,
      label: t("navigation.lobby"),
      icon: IMAGES.lobyIcon,
      path: `/${params.id}/lobby`,
    },
    {
      id: 1,
      label: t("navigation.home"),
      icon: IMAGES.homeIcon,
      path: `/${params.id}`,
    },
  ];

  if (user) {
    navigationItems.push({
      id: 2,
      label: t("navigation.profile"),
      icon: IMAGES.lobyIcon,
      path: `/${params.id}/profile`,
    });
  }

  const handleNavClick = (item) => {
    navigator(item.path);
    dispatch(setActiveTabIndex(item.id));
    dispatch(setProfileVisible(false));
    dispatch(setGameMatchLoader(false));
  };

  return (
    <div
      className={`navigation sm:hidden w-full h-[5rem] left-0 fixed bottom-0 z-100 ${
        breadcrumbItems?.length == 3 ? "hidden " : ""
      }${user ? "" : "nav-condition"}`}
    >
      <div className="sq__main-wrap h-full">
        <ul className="listWrap h-full flex justify-around items-center">
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className={`list flex-1 ${
                isActiveTab == item.id ? "active" : ""
              }`}
              onClick={() => handleNavClick(item)}
            >
              <a
                href="javascript:void(0);"
                className="flex flex-wrap gap-1 justify-center items-center"
              >
                <i className="icon inline text-center">
                  <img
                    className="w-[2rem] h-[2rem]"
                    src={item.icon}
                    alt={item.label}
                  />
                </i>
                <span className="text purple_col w-full text-center">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
          <li className="m_menu__indicator">
            <img
              src={IMAGES.menuActiveIcon}
              alt="indicator"
              style={{ width: "" }}
            />
          </li>
          <div className="sq__shape-wrap"></div>
        </ul>
      </div>
    </div>
  );
};

// Main Header Component
const Header = () => {
  const { leagueData } = useSelector((state) => state.leagues);
  const { tournamentData } = useSelector((state) => state.tournament);
  const { isActiveTab, showNotification, profileVisible } = useSelector(
    (state) => state.constState
  );
  const { draftData } = useSelector((state) => state.draft);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    matchData,
    isCaptain,
    IsSubmited,
    isEditScore,
    myPId,
    showCancelBtn,
    cancelMatchCount,
    isMyMatch,
    isMatchCanceled,
  } = useSelector((state) => state.matchs);
  const { matchDataT, myTeam, isSubmitBtnShow, isEditScoreT, isScoreSubmited } =
    useSelector((state) => state.tournamentMatch);

  const user = useSelector((state) => state.auth.user);
  let params = useParams();
  const userUpdate = useSelector((state) => state.auth.user);
  useEffect(() => {}, [
    matchData,
    matchDataT,
    user,
    userUpdate,
    isSubmitBtnShow,
    location,
    isEditScoreT,
    isScoreSubmited,
  ]);

  const { i18n, t } = useTranslation();

  // Build breadcrumb items
  const breadcrumbItems = [];
  let path = new Set(window.location.pathname.split("/")).has("lobby");
  let profile = new Set(window.location.pathname.split("/")).has("profile");
  let team = new Set(window.location.pathname.split("/")).has("team");

  if (params.id) {
    let item = {
      label: t("navigation.home"),
      path: `/${params.id}`,
      icon: Prime,
      active: path ? false : true,
    };
    let item2 = {
      label: t("navigation.lobby"),
      path: `/${params.id}/lobby`,
      icon: Lobby,
      active: path && !checkParams("team") ? true : false,
    };
    if (
      breadcrumbItems.length === 0 ||
      breadcrumbItems[0].label !== item.label
    ) {
      breadcrumbItems.push(item);
      breadcrumbItems.push(item2);
    }
  }

  if (params.lId) {
    if (breadcrumbItems.length === 3) {
      breadcrumbItems.pop();
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
      breadcrumbItems[1].active = false;
      breadcrumbItems.push(item);
    }
  } else if (params.tId) {
    if (breadcrumbItems.length === 3) {
      breadcrumbItems.pop();
    }
    let item = {
      label:
        i18n.language === "en"
          ? tournamentData?.title
          : tournamentData?.titleAr,
      path: `/${params.id}/lobby/tournament/${params.tId}`,
      icon: Champions,
      active: true,
    };
    if (
      breadcrumbItems.length === 2 ||
      breadcrumbItems[2].label !== item.label
    ) {
      breadcrumbItems[1].active = false;
      breadcrumbItems.push(item);
    }
  } else if (params.draftId && draftData) {
    if (breadcrumbItems.length === 3) {
      breadcrumbItems.pop();
    }
    let item = {
      label:
        i18n.language === "en"
          ? draftData?.leagueId?.title
          : draftData?.leagueId?.titleAr,
      path: `/${params.id}/lobby/${draftData?.leagueId?._id}`,
      icon: Champions,
      active: false,
    };
    let item1 = {
      label: t("drafting.drafting"),
      path: ``,
      icon: DraftingIcon,
      active: true,
    };
    if (
      breadcrumbItems.length === 2 ||
      breadcrumbItems[2].label !== item.label
    ) {
      breadcrumbItems[1].active = false;
      breadcrumbItems.push(item);
      breadcrumbItems.push(item1);
    }
  }

  useEffect(() => {
    if (path && !team) {
      dispatch(setActiveTabIndex(0));
    } else if (profile) {
      dispatch(setActiveTabIndex(2));
    } else if (team) {
      dispatch(setActiveTabIndex(2));
    } else if (checkParams(params.id)) {
      dispatch(setActiveTabIndex(1));
    }
  }, [path, profile, team, checkParams(params.id)]);

  let mainItem = breadcrumbItems[breadcrumbItems.length - 1];

  // Match page header
  if (
    checkParams("finding-match") ||
    checkParams("finding-partymatch") ||
    checkParams("match")
  ) {
    // Extract common data
    const isEnglish = i18n.language === "en";
    const isTournament = checkParams("tournament");

    // Get title based on language and type
    const getTitle = () => {
      if (isTournament) {
        return isEnglish
          ? matchDataT?.tournament?.title
          : matchDataT?.tournament?.titleAr;
      }
      return isEnglish ? matchData?.league?.title : matchData?.league?.titleAr;
    };

    // Get match ID
    const getMatchId = () => {
      if (isTournament && matchDataT?.config?.id != null)
        return `#${matchDataT?.config?.id + 1}`;
      return matchData?.matchTempId || "#";
    };

    // Get path ID
    const getPathId = () => {
      return isTournament
        ? `/${params.id}/lobby/tournament/${matchDataT?.tournament?._id}`
        : `/${params.id}/lobby/${matchData?.league?._id}`;
    };

    const title = getTitle();
    const matchId = getMatchId();
    const pathId = getPathId();

    // Common header styles
    const headerStyles = {
      background:
        "linear-gradient(180deg,rgba(94, 95, 184, 0.25) 0%, rgba(94, 95, 184, 0) 120%)",
    };

    const baseHeaderClass =
      "header_teture--bg text-white flex items-center sd_before before:w-full before:h-full relative";

    // Render match header (when params.mId exists)
    if (params.mId) {
      return (
        <header
          key={location.pathname}
          className={`${baseHeaderClass} py-[1.28rem] px-[1rem] md:px-[4.5rem] justify-between`}
          style={headerStyles}
        >
          <div className="flex items-center">
            <BackButton
              className="absolute ltr:left-[1rem] rtl:right-[1rem] md:ltr:left-[5rem] md:rtl:right-[5rem]"
              onClick={() => {
                if (isTournament) {
                  navigator(pathId);
                } else {
                  navigator(-1);
                }
                dispatch(setGameMatchLoader(false));
              }}
            />
            <h2 className="lg:text-[2rem] text-[1.25rem] !font-black uppercase block ltr:ml-12 rtl:mr-12">
              {title || t("match.finding_matchmaking")} - {t("match.match")}{" "}
              {matchId}
            </h2>
          </div>

          <div className="flex items-center lg:gap-15 gap-3">
            <MatchControls
              user={user}
              isCaptain={isCaptain}
              IsSubmited={IsSubmited}
              isEditScore={isEditScore}
              showCancelBtn={showCancelBtn}
              cancelMatchCount={cancelMatchCount}
              isMatchCanceled={isMatchCanceled}
              matchData={matchData}
              myTeam={myTeam}
              isSubmitBtnShow={isSubmitBtnShow}
              isEditScoreT={isEditScoreT}
              isScoreSubmited={isScoreSubmited}
              isMyMatch={isMyMatch}
            />
            {!user && (
              <>
                <AuthButtons />
                <AuthButtons isMobile />
              </>
            )}
            <UserMenu user={user} userUpdate={userUpdate} />
          </div>

          <div className="mob-logo sm:hidden block">
            <img className="w-18 h-auto" src={IMAGES.logo_ltr} alt="" />
          </div>
        </header>
      );
    }

    // Render simple header (when params.mId doesn't exist)
    return (
      <header
        className={`${baseHeaderClass} sm:py-[2.35rem] py-[2rem] px-[4.5rem] justify-center`}
        style={headerStyles}
      >
        <BackButton
          className="absolute sm:ltr:left-[5rem] sm:rtl:right-[5rem] ltr:left-[1.9rem] rtl:right-[1.9rem]"
          onClick={() => {
            navigator(-1);
            dispatch(setGameMatchLoader(false));
          }}
        />
        <h2 className="sm:text-[2rem] text-lg !font-black uppercase text-center block">
          {isEnglish
            ? leagueData?.title
            : leagueData?.titleAr || t("match.finding_matchmaking")}
        </h2>
        <MobileNavigation
          user={user}
          isActiveTab={isActiveTab}
          breadcrumbItems={breadcrumbItems}
        />
      </header>
    );
  } else {
    // Regular header
    return (
      <header className="text-white pt-4 sm:pt-[1.4rem] sm:pb-0 pb-4 px-4 md:px-[4.5rem] ltr:md:pr-7.5 rtl:md:pl-7.5 flex items-center justify-between">
        <BreadcrumbNavigation
          breadcrumbItems={breadcrumbItems}
          mainItem={mainItem}
          profileVisible={profileVisible}
        />

        <div className="sd_notification-block self-center flex sm:gap-4 ltr:gap-2 rtl:gap-4 ltr:ml-[1rem] xl:ltr:mr-[9rem] xl:rtl:ml-[9rem] sm:ltr:mr-[2rem] sm:rtl:ml-[2rem]">
          <LanguageToggle />
          <NotificationIcon user={user} />
        </div>

        {!user && <AuthButtons />}
        {!user && <AuthButtons isMobile />}
        <UserMenu user={user} userUpdate={userUpdate} />

        <MobileNavigation
          user={user}
          isActiveTab={isActiveTab}
          breadcrumbItems={breadcrumbItems}
        />
      </header>
    );
  }
};

export default Header;
