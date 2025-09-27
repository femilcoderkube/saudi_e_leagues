import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getServerURL, getTimeAgo } from "../../../utils/constant";
import { setshowNotification } from "../../../app/slices/constState/constStateSlice";
import {
  acceptInvitation,
  readNotificationSocket,
} from "../../../app/socket/socket";
import { IMAGES } from "../../ui/images/images";
import { toast } from "react-toastify";

const PartyQueue = ({ data }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMatchJoind, isQueueUser } = useSelector((state) => state.leagues);

  const langIsEn = i18n.language === "en";
  const notificationId = data.notificationId;
  const extras = data.extras;

  const subject = langIsEn
    ? notificationId.Subject.toString().replace(`{PlayerName}`, extras.name)
    : notificationId.SubjectAr.toString().replace(`{PlayerName}`, extras.name);

  const body = langIsEn
    ? notificationId.Body.toString()
        .replace(`{PlayerName}`, extras.name)
        .replace(`{LeagueName}`, extras.leagueName)
    : notificationId.BodyAr.toString()
        .replace(`{PlayerName}`, extras.name)
        .replace(`{LeagueName}`, extras.leagueName);

  const imageUrl =
    notificationId?.notificationtype === 12 ? extras?.gameLogo : "";
  const notificationData = {
    image: imageUrl ? getServerURL(imageUrl) : null,
    gameName: extras.gameName,
    createdAt: getTimeAgo(data.createdAt),
    subject,
    body,
    buttonText: langIsEn
      ? notificationId.ActionButton.toString()
      : notificationId.ActionButtonAr.toString(),
    isRead: data.isRead,
  };

  const expiryTime = extras.expiry ? new Date(extras.expiry) : null;
  const currentTime = new Date();
  const isExpired = expiryTime && expiryTime < currentTime;

  const baseClasses =
    "relative overflow-hidden pl-0 go-btn uppercase flex items-center justify-center gap-3 text-lg z-10 sleading-6 font_oswald font-medium w-[9.8rem] h-12 duration-300";
  let dynamicClasses = "";
  if (isExpired) {
    dynamicClasses += " expire-btn cursor-not-allowed";
    if (data.isRead) {
      dynamicClasses += " expireButton";
    }
  } else {
    dynamicClasses += " active-tab hover:opacity-70";
    if (data.isRead) {
      dynamicClasses += " singleButton";
    }
  }
  const buttonClasses = `${baseClasses}${dynamicClasses}`;
  const buttonText = isExpired ? t("Expired") : notificationData.buttonText;

  const handleAcceptInvite = () => {
    if (isExpired) {
      return;
    }
    if (
      isQueueUser ||
      !(
        isMatchJoind?.currentMatch == null ||
        isMatchJoind?.currentMatch == undefined
      )
    ) {
      toast.error(`${t("party.validation_msg")}`);
      return;
    }
    navigate(`/${id}/lobby/${extras.leagueId}`);
    acceptInvitation({
      userId: data.userId._id,
      Lid: extras.leagueId,
      teamId: extras.teamId,
    });
    readNotificationSocket(data._id);
    dispatch(setshowNotification(false));
  };

  return (
    <div className="notification-box-wp relative polygon_border sd_before sd_after">
      <div className="notification-box">
        <div className="notification-box-rotate">
          <div className="notification-box-head-wp flex justify-between p-5 border-b border-[#262968]">
            <div className="notification-box-head flex items-center gap-4">
              <img
                src={notificationData.image || IMAGES.defaultImg}
                alt=""
                style={{
                  width: "2.51rem",
                  height: "2.51rem",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div className="box-game">
                <span className="purple_col text-sm font-semibold">Game</span>
                <h6 className="sm:text-xl text-lg">
                  {notificationData.gameName}
                </h6>
              </div>
            </div>
            <div>
              <span className="purple_col font-semibold">
                {notificationData.createdAt}
              </span>
            </div>
          </div>
          <div className="notification-box-content p-5notification-box-content p-5 flex flex-col h-full justify-between">
            <h5 className="text-xl mb-1.5">{notificationData.subject}</h5>
            <h6 className="text-lg sleading-6 purple_col line-clamp-3">
              {notificationData.body}
            </h6>
            <div className="notification-box-btn flex gap-4 items-center mt-5">
              {!data.isRead && (
                <button
                  className="uppercase text-xl sleading-6 font_oswald font-medium w-[9.8rem] h-12 hover:opacity-70 duration-300"
                  onClick={() => {
                    readNotificationSocket(data._id);
                  }}
                >
                  {t("images.skip")}
                </button>
              )}
              <button
                className={buttonClasses}
                onClick={handleAcceptInvite}
                disabled={isExpired}
              >
                {buttonText}
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
            <g filter="url(#inner-shadow)" clipPath="url(#blob-clip)">
              <rect width="360" height="332" fill="url(#blob-grad)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PartyQueue;
