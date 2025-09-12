import { useDispatch, useSelector } from "react-redux";
import {
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
import MobileEvent from "../../../hooks/mobileevents.js"

const GetQueueButton = () => {
  const { id } = useParams();
  const { leagueData, isJoinedUser, isQueueUser, isMatchJoind, userInQueue } =
    useSelector((state) => state.leagues);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const now = new Date();
  const end = new Date(leagueData?.endDate);
  const { t, i18n } = useTranslation();

  const handleLoginClick = () => {
    const currentUrl = window.location.href;
    MobileEvent.onLoginClick(currentUrl, dispatch);
  };

  if (user?._id == null || user?._id == undefined) {
    return (
      <div
        className="common-width lobby_btn mb-8 relative cursor-pointer flex items-center justify-center md:justify-center"
        onClick={handleLoginClick}
      >
        <span
          className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-lg sm:text-2xl opacity-50"
          style={{
            fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
            fontWeight: "bold",
            color: "#BABDFF",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("images.need_login")}
        </span>
        <img
          src={IMAGES.need_btn}
          alt={t("images.need_login")}
          style={{ width: "100%" }}
        />{" "}
      </div>
    );
  } else if (end < now) {
    // if (leagueData?.draft?.isPublished && leagueData?.draft?.startTime && new Date(leagueData?.draft?.startTime) > now) {
    if (
      leagueData?.draft?.isPublished &&
      leagueData?.draft?.isDeactivate == false
    ) {
      return (
        <div
          className="common-width mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-pointer"
          onClick={() => {
            navigate(`/${id}/lobby/drafting/${leagueData?.draft?._id}`);
          }}
        >
          <span
            className="mob-common-btn absolute top-[2rem] left-0 w-full mb-3 text-center text-xl sm:text-3xl"
            style={{
              fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
              fontWeight: "bold",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {t("league.drafting_phase")}
          </span>
          <img
            className="mx-auto"
            src={IMAGES.Drafting_btn}
            alt=""
            style={{ width: "100%" }}
          />{" "}
        </div>
      );
    } else {
      return (
        <div className="common-width mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-not-allowed">
          <span
            className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-3xl"
            style={{
              fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
              fontWeight: "bold",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {t("league.league_ended")}
          </span>
          <img
            className="mx-auto"
            src={IMAGES.Que_btn}
            alt=""
            style={{ width: "100%" }}
          />{" "}
        </div>
      );
    }
  } else if (!isJoinedUser) {
    return (
      <div
        onClick={() => dispatch(setRegistrationModal(true))}
        className="common-width join_btn hover:opacity-60 duration-300 mb-8 block sd_before relative cursor-pointer"
      >
        <span
          className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-3xl"
          style={{
            fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
            fontWeight: "bold",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("images.join_button")}
        </span>
        <img
          className="mx-auto"
          src={IMAGES.join_btn}
          alt=""
          style={{ width: "100%" }}
        />
      </div>
    );
  } else if (isQueueUser) {
    return (
      <div
        className="common-width mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-pointer"
        onClick={() => {
          stopReadyToPlaySocket({
            lId: leagueData?._id,
            user,
            isSocketConnected,
          });
        }}
      >
        <span
          className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-3xl"
          style={{
            fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
            fontWeight: "bold",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("images.cancel_button")}
        </span>
        <img
          className="mx-auto"
          src={IMAGES.Cancel_btn}
          alt=""
          style={{ width: "100%" }}
        />{" "}
      </div>
    );
  } else {
    let text = getQueueText(leagueData, t);
    if (
      isMatchJoind?.currentMatch != null ||
      isMatchJoind?.currentMatch != undefined
    ) {
      return (
        <Link
          className="common-width mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before"
          to={`/${id}/match/${isMatchJoind?.currentMatch}`}
        >
          <span
            className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-3xl"
            style={{
              fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
              fontWeight: "bold",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {t("league.view_match")}
          </span>
          <img
            className="mx-auto"
            src={IMAGES.Que_btn}
            alt=""
            style={{ width: "100%" }}
          />{" "}
        </Link>
      );
    } else if (text == t("images.queue")) {
      return (
        <div
          className="common-width mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-pointer"
          onClick={() => {
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
          }}
        >
          <span
            className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-3xl"
            style={{
              fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
              fontWeight: "bold",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {t("images.queue")}
          </span>
          <img
            className="mx-auto"
            src={IMAGES.Que_btn}
            alt=""
            style={{ width: "100%" }}
          />{" "}
        </div>
      );
    } else {
      return (
        <div className="common-width mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-not-allowed">
          <span
            className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center text-xl sm:text-3xl"
            style={{
              fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
              fontWeight: "bold",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {text}
          </span>
          <img
            className="mx-auto"
            src={
              text.includes(t("images.opens_in"))
                ? IMAGES.Open_btn
                : IMAGES.Que_btn
            }
            alt=""
            style={{ width: "100%" }}
          />{" "}
        </div>
      );
    }
  }
};
export default GetQueueButton;