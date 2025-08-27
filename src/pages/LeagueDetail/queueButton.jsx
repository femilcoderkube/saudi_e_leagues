import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmationPopUp,
  setLogin,
  setQueueConfirmation,
} from "../../app/slices/constState/constStateSlice";
import join_btn from "../../assets/images/join_btn.png";
import need_btn from "../../assets/images/needToLogin.png";
import Que_btn from "../../assets/images/quebtn.png";
import Open_btn from "../../assets/images/open.png";
import Drafting_btn from "../../assets/images/drafting.png";
import Cancel_btn from "../../assets/images/cancelbtn.png";
import {
  setRegistrationModal,
  // setVerificationModal
} from "../../app/slices/leagueDetail/leagueDetailSlice";
import { getQueueText } from "../../utils/constant";
import { stopReadyToPlaySocket } from "../../app/socket/socket";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GetQueueButton = () => {
  const { id } = useParams();
  const { leagueData, isJoinedUser, isQueueUser, isMatchJoind, userInQueue } =
    useSelector((state) => state.leagues);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const now = new Date();
  const end = new Date(leagueData?.endDate);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (user?._id == null || user?._id == undefined) {
    return (
      <div
        className="common-width lobby_btn mb-8 relative cursor-pointer flex items-center justify-center md:justify-center"
        onClick={() => {
          let type = localStorage.getItem("deviceType");
          if (type == "mobile") {
            window.AndroidInterface?.signInCallbackHandler(
              `${window.location.href}`
            );
            window.webkit?.messageHandlers?.signInCallbackHandler?.postMessage(
              `${window.location.href}`
            );
            console.log("signInCallbackHandler---- called");
          } else {
            dispatch(setLogin(true));
          }
        }}
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
          src={need_btn}
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
            src={Drafting_btn}
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
            src={Que_btn}
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
          src={join_btn}
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
          src={Cancel_btn}
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
            src={Que_btn}
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
            // if (user?.isVerified) {
            // sessionStorage.setItem("canAccessFindingMatch", "true");
            // navigate(`/${id}/lobby/${leagueData?._id}/finding-match`);
            // } else {
            // console.log("User is not verified");
            // dispatch(setVerificationModal({ open: true, module: "queue" }));
            // }
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
            src={Que_btn}
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
          {/* <img src={Que_btn} alt="" style={{ width: "30.5rem" }} />{" "} */}
          <img
            className="mx-auto"
            src={text.includes(t("images.opens_in")) ? Open_btn : Que_btn}
            alt=""
            style={{ width: "100%" }}
          />{" "}
        </div>
      );
    }
  }
};
export default GetQueueButton;
