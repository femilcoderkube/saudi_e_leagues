import {  useNavigate, useParams } from "react-router-dom";

import right_arrow from "../../assets/images/right-arrow.png";

import { getServerURL, getTimeAgo } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import { readNotificationSocket } from "../../app/socket/socket";
import { setshowNotification } from "../../app/slices/constState/constStateSlice";
import { useDispatch } from "react-redux";

const LeaguesJoinNotification = ({ data }) => {
  const { t ,i18n } = useTranslation();
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let notificationData = {
    image: getServerURL(data.extras.gameLogo),
    gameName: data.extras.gameName,
    createdAt: getTimeAgo(data.createdAt),
    subject: i18n.language == "en" ? data.notificationId.Subject.toString().replace(data.extras.key, data.extras.valEN || data.extras.val) : data.notificationId.SubjectAr.toString().replace(data.extras.key, data.extras.valAR || data.extras.val),
    body: i18n.language == "en" ? data.notificationId.Body.toString().replace(data.extras.key, data.extras.valEN || data.extras.val) : data.notificationId.BodyAr.toString().replace(data.extras.key, data.extras.valAR || data.extras.val),
    buttonText: i18n.language == "en" ? data.notificationId.ActionButton.toString(): data.notificationId.ActionButtonAr.toString(),
    isRead: data.isRead,
  }
  return (
    <div className="notification-box-wp relative polygon_border sd_before sd_after">
      <div className={`notification-box ${
    i18n.dir() === "rtl" ? "rtl" : ""
  }`}>
        <div className="notification-box-rotate h-[19rem] flex flex-col justify-between">
          <div className="notification-box-head-wp flex justify-between p-5 border-b border-[#262968]">
            <div className="notification-box-head flex items-center gap-4 pt-2">
              <img
                src={notificationData.image}
                alt=""
                className="w-10 h-10"
              />
              <div className="box-game">
                <span className="purple_col text-sm font-semibold">Game</span>
                <h6 className="sm:text-xl text-lg">{notificationData.gameName}</h6>
              </div>
            </div>
            <div>
              <span className="purple_col font-semibold">{notificationData.createdAt}</span>
            </div>
          </div>

          <div className="notification-box-content px-5 py-6 flex flex-col justify-between">
            <div>
              <h5 className="sm:text-xl text-lg mb-3 line-clamp-1">
                {notificationData.subject }
              </h5>
              <h6 className="notification-text text-base sleading-6 purple_col mb-1.5 line-clamp-2">
                {notificationData.body}
              </h6>
            </div>
            <div className="notification-box-btn flex gap-4 items-center mt-5 justify-center">
              {!data.isRead && <button className="uppercase text-xl sleading-6 font_oswald font-medium w-[9.8rem] h-12 hover:opacity-70 duration-300"
              
              onClick={()=>{
                readNotificationSocket(data._id);
              }}>
                {t("images.skip")}
              </button>}
              <button className={`relative overflow-hidden pl-0 go-btn uppercase flex items-center justify-center gap-3 active-tab text-lg z-10 sleading-6 font_oswald font-medium w-[9.8rem] h-12 hover:opacity-70 duration-300 ${data.isRead ? "singleButton" : ""}`}
              onClick={()=>{
                navigate(`/${id}/lobby/${data.extras.leagueId}`);
                readNotificationSocket(data._id);
                dispatch(setshowNotification(false));
              }}
              >
                <span>{notificationData.buttonText}</span> 
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

            <g filter="url(#inner-shadow)" clip-path="url(#blob-clip)">
              <rect width="360" height="332" fill="url(#blob-grad)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LeaguesJoinNotification;
