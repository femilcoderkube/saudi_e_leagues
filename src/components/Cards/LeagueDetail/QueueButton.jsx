import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setQueueConfirmation,
} from "../../../app/slices/constState/constStateSlice";
import {
  setQueuePlayers,
  setRegistrationModal,
} from "../../../app/slices/leagueDetail/leagueDetailSlice";
import { getQueueText } from "../../../utils/constant";
import { stopReadyToPlaySocket } from "../../../app/socket/socket";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../ui/images/images";

const GetQueueButton = () => {
  const { id } = useParams();
  const { leagueData, isJoinedUser, isQueueUser, isMatchJoind, userInQueue } =
    useSelector((state) => state.leagues);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const now = new Date();
  const end = new Date(leagueData?.endDate);
  const isLoggedIn = user?._id != null && user?._id != undefined;
  const isLeagueEnded = end < now;

  // Common button styles and classes
  const commonButtonClass = "common-width mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before";
  const commonSpanClass = "mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-3xl";
  const loginSpanClass = "mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-lg sm:text-2xl opacity-50";
  
  const getSpanStyle = (isLogin = false) => ({
    fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
    fontWeight: "bold",
    textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
    ...(isLogin && { color: "#BABDFF" })
  });

  const handleLoginClick = () => {
    const deviceType = localStorage.getItem("deviceType");
    if (deviceType === "mobile") {
      const currentUrl = window.location.href;
      window.AndroidInterface?.signInCallbackHandler(currentUrl);
      window.webkit?.messageHandlers?.signInCallbackHandler?.postMessage(currentUrl);
    } else {
      dispatch(setLogin(true));
    }
  };

  const handleQueueClick = () => {
    dispatch(setQueuePlayers(1));
    if (userInQueue) {
      dispatch(setQueueConfirmation(true));
    } else {
      if (localStorage.getItem("skipQueueConfirmation")) {
        sessionStorage.setItem("canAccessFindingMatch", "true");
        navigate(`/${id}/lobby/${leagueData?._id}/finding-match`);
      } else {
        dispatch(setQueueConfirmation(true));
      }
    }
  };

  const renderButton = (text, imageSrc, onClick = null, className = commonButtonClass, spanClass = commonSpanClass, isLogin = false) => {
    const buttonClass = onClick ? `${className} cursor-pointer` : `${className} cursor-not-allowed`;
    
    return (
      <div className={buttonClass} onClick={onClick}>
        <span className={spanClass} style={getSpanStyle(isLogin)}>
          {text}
        </span>
        <img
          className="mx-auto"
          src={imageSrc}
          alt={isLogin ? text : ""}
          style={{ width: "100%" }}
        />
      </div>
    );
  };

  // Login required
  if (!isLoggedIn) {
    return renderButton(
      t("images.need_login"),
      IMAGES.need_btn,
      handleLoginClick,
      "common-width lobby_btn mb-8 relative cursor-pointer flex items-center justify-center md:justify-center",
      loginSpanClass,
      true
    );
  }

  // League ended
  if (isLeagueEnded) {
    // Check for drafting phase
    if (leagueData?.draft?.isPublished && leagueData?.draft?.isDeactivate === false) {
      return renderButton(
        t("league.drafting_phase"),
        IMAGES.Drafting_btn,
        () => navigate(`/${id}/lobby/drafting/${leagueData?.draft?._id}`),
        commonButtonClass,
        "mob-common-btn absolute top-[2rem] left-0 w-full mb-3 text-center text-xl sm:text-3xl"
      );
    }
    
    return renderButton(t("league.league_ended"), IMAGES.Que_btn);
  }

  // User not joined
  if (!isJoinedUser) {
    return renderButton(
      t("images.join_button"),
      IMAGES.join_btn,
      () => dispatch(setRegistrationModal(true)),
      "common-width join_btn hover:opacity-60 duration-300 mb-8 block sd_before relative cursor-pointer"
    );
  }

  // User in queue
  if (isQueueUser) {
    return renderButton(
      t("images.cancel_button"),
      IMAGES.Cancel_btn,
      () => stopReadyToPlaySocket({
        lId: leagueData?._id,
        user,
        isSocketConnected,
      })
    );
  }

  // User has current match
  if (isMatchJoind?.currentMatch != null && isMatchJoind?.currentMatch != undefined) {
    return (
      <Link
        className={commonButtonClass}
        to={`/${id}/match/${isMatchJoind?.currentMatch}`}
      >
        <span className={commonSpanClass} style={getSpanStyle()}>
          {t("league.view_match")}
        </span>
        <img
          className="mx-auto"
          src={IMAGES.Que_btn}
          alt=""
          style={{ width: "100%" }}
        />
      </Link>
    );
  }

  // Default queue state
  const queueText = getQueueText(leagueData, t);
  
  if (queueText === t("images.queue")) {
    return renderButton(t("images.queue"), IMAGES.Que_btn, handleQueueClick);
  }

  // Queue not available
  const imageSrc = queueText.includes(t("images.opens_in")) ? IMAGES.Open_btn : IMAGES.Que_btn;
  return renderButton(queueText, imageSrc);
};

export default GetQueueButton;