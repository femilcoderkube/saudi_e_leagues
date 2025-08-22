import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setshowNotification } from "../../app/slices/constState/constStateSlice.js";
import { notificationType } from "../../utils/constant.js";
import NotificationTab from "./NotificationTab.jsx";
import LeaguesJoinNotification from "./LeagueJoinNotificatioCard.jsx";
import UserRegistrationNotification from "./UserRegistrationNotification.jsx";
import LeagueEndedNotification from "./LeagueEndedNotification.jsx";
import MatchFindNotification from "./MatchFindNotification.jsx";
import left_arrow from "../../assets/images/left-arrow.png";
import { useTranslation } from "react-i18next";

const Notification_Sidebar = () => {
  const { NotificationTabIndex } = useSelector((state) => state.constState);
  const { UnreadNotification, ReadNotification, unReadNotificationCount, notificationCount } = useSelector((state) => state.notification);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [isClosing, setIsClosing] = useState(false);

  const animationClass = i18n.language === "ar"
    ? isClosing ? "slide-out-left" : "slide-in-left"
    : isClosing ? "slide-out-right" : "slide-in-right";

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(setshowNotification(false));
    }, 500); // match animation-duration
  };

  return (
    <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40"
      onClick={handleClose}
    >
      <div
        className={`notification-sidebar w-[25.6rem] h-full text-white fixed ltr:right-0 rtl:left-0 top-0 ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notification-head-wp fixed t-0 z-101 w-full bg-[#0d0f3b] px-5 pt-9">
          <div className="notification-head flex items-center gap-5" onClick={handleClose}>
            <img src={left_arrow} alt="" />
            <h5 className="uppercase text-2xl tracking-wide">
              {t("images.notifications")} <span className="purple_col">({unReadNotificationCount + notificationCount})</span>
            </h5>
          </div>
          <div className="pt-8">
            <NotificationTab />
          </div>
        </div>
        <div className="flex flex-col gap-5 h-[calc(100%-13rem)] sm:h-[calc(100%-13rem)] custom_scroll overflow-y-auto px-5 mt-[12rem] xl:ltr:w-[calc(100%-0.18rem)] rtl:w-full">
          {(() => {
            const renderNotification = (item, index) => {
              const type = item.notificationId?.notificationtype;
              switch (type) {
                case notificationType.JOINING_PRIME_LEAGUE:
                case notificationType.QUEUE_OPENED:
                  return <LeaguesJoinNotification key={index} data={item} />;
                case notificationType.ACCOUNT_CREATION:
                  return <UserRegistrationNotification key={index} data={item} />;
                case notificationType.LEAGUE_ENDED:
                  return <LeagueEndedNotification key={index} data={item} />;
                case notificationType.MATCHMAKING_FOUND:
                case notificationType.SCORESUBMITTED:
                case notificationType.MATCH_IN_DISPUTE:
                case notificationType.CONFLICT_RESOLVED:
                case notificationType.FIRST_MATCH_WIN:
                case notificationType.FIRST_MATCH_LOSS:
                  return <MatchFindNotification key={index} data={item} />;
                default:
                  return null;
              }
            };
            const notifications = NotificationTabIndex == 0 ? UnreadNotification : ReadNotification;
            return notifications.map(renderNotification);
          })()}
        </div>
      </div>
    </div>
  );
};

export default Notification_Sidebar;
