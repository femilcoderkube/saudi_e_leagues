import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getServerURL, getTimeAgo } from "../../../utils/constant";
import { setshowNotification } from "../../../app/slices/constState/constStateSlice";
import { readNotificationSocket } from "../../../app/socket/socket";

const UserRegistration = ({data}) => {
  const { t,i18n } = useTranslation();
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let notificationData = {
    image: getServerURL(data.userId.profilePicture),
    username: data.userId.username,
    createdAt: getTimeAgo(data.createdAt),
    subject: i18n.language == "en" ? data.notificationId.Subject.toString(): data.notificationId.SubjectAr.toString(),
    body: i18n.language == "en" ? data.notificationId.Body.toString(): data.notificationId.BodyAr.toString(),
    buttonText: i18n.language == "en" ? data.notificationId.ActionButton.toString(): data.notificationId.ActionButtonAr.toString(),
    isRead: data.isRead,
  }
  
  return (
      <div className="notification-box-wp relative polygon_border sd_before sd_after">
        <div className={`notification-box ${
    i18n.dir() === "rtl" ? "rtl" : ""
  }`}>
          <div className="notification-box-rotate h-[19rem] flex flex-col justify-between">
          <div className="notification-box-head-wp flex justify-between p-5 border-b border-[var(--notification-border)]">
            <div className="notification-box-head flex items-center gap-4">
              <img src={notificationData.image} alt="" style={{ width: "2.51rem" , height: "2.51rem" , borderRadius: "50%", objectFit :"cover"}} />
              <h6 className="text-xl sleading-6">{notificationData.username}</h6>
            </div>
            <div>
              <span className="purple_col font-semibold">{notificationData.createdAt}</span>
            </div>
          </div>
          <div className="notification-box-content px-5 py-6 flex flex-col justify-between">
            <h5 className="text-xl mb-1.5">{notificationData.subject}</h5>
            <h6 className="text-lg sleading-6 purple_col line-clamp-3">
              {notificationData.body}
            </h6>
            <div className="notification-box-btn flex gap-4 items-center mt-5">
            {!data.isRead && <button className="uppercase text-xl sleading-6 font_oswald font-medium w-[9.8rem] h-12 hover:opacity-70 duration-300"
              
              onClick={()=>{
                readNotificationSocket(data._id);
              }}>
                {t("images.skip")}
              </button>}
              <button className={`relative overflow-hidden pl-0 go-btn uppercase flex items-center justify-center gap-3 active-tab text-lg z-10 sleading-6 font_oswald font-medium w-[9.8rem] h-12 hover:opacity-70 duration-300 ${data.isRead ? "singleButton" : ""}`}
              onClick={() => {
                navigate(`/${id}/lobby`);
                readNotificationSocket(data._id);
                dispatch(setshowNotification(false));
              }}>
                {notificationData.buttonText}
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

export default UserRegistration;
