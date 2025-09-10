import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setshowNotification } from "../../app/slices/constState/constStateSlice.js";
import { notificationType } from "../../utils/constant.js";
import NotificationTab from "./NotificationTab.jsx";
import LeagueJoin from "./Notifications/LeagueJoin.jsx";
import UserRegistration from "./Notifications/UserRegistration.jsx";
import LeagueEnded from "./Notifications/LeagueEnded.jsx";
import MatchFound from "./Notifications/MatchFound.jsx";
import left_arrow from "../../assets/images/left-arrow.png";
import { useTranslation } from "react-i18next";
import { refreshNotificationCounts } from "../../app/slices/notificationSlice/notificationSlice.js";

const NotificationSidebar = () => {
  const { NotificationTabIndex } = useSelector((state) => state.constState);
  const { UnreadNotification, ReadNotification, unReadNotificationCount, notificationCount } = useSelector((state) => state.notification);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    dispatch(refreshNotificationCounts());
  }, [UnreadNotification, ReadNotification, dispatch]);

  const getTotalCount = () => {
    if (NotificationTabIndex === 0) {
      return unReadNotificationCount;
    } else {
      return notificationCount;
      // return unReadNotificationCount + notificationCount;
    }
  };
  const animationClass = i18n.language === "ar"
    ? isClosing ? "slide-out-left" : "slide-in-left"
    : isClosing ? "slide-out-right" : "slide-in-right";

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch(setshowNotification(false));
    }, 500);
  };

  const renderNotification = (item, index) => {
    const type = item.notificationId?.notificationtype;
    switch (type) {
      case notificationType.JOINING_PRIME_LEAGUE:
      case notificationType.QUEUE_OPENED:
        return <LeagueJoin key={`${type}-${index}`} data={item} />;
      case notificationType.ACCOUNT_CREATION:
        return <UserRegistration key={`${type}-${index}`} data={item} />;
      case notificationType.LEAGUE_ENDED:
        return <LeagueEnded key={`${type}-${index}`} data={item} />;
      case notificationType.MATCHMAKING_FOUND:
      case notificationType.SCORESUBMITTED:
      case notificationType.MATCH_IN_DISPUTE:
      case notificationType.CONFLICT_RESOLVED:
      case notificationType.FIRST_MATCH_WIN:
      case notificationType.FIRST_MATCH_LOSS:
        return <MatchFound key={`${type}-${index}`} data={item} />;
      default:
        return null;
    }
  };

  const getCurrentNotifications = () => {
    if (NotificationTabIndex === 0) {
      return UnreadNotification;
    } else {
      return [...ReadNotification];
      // return [...UnreadNotification, ...ReadNotification]; // IN ALL TAB SHOW BOTH NOTI. (UNREAD AND READ)
    }
  };
  const currentNotifications = getCurrentNotifications();

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
              {t("images.notifications")} <span className="purple_col">({getTotalCount()})</span>
            </h5>
          </div>
          <div className="pt-8">
            <NotificationTab />
          </div>
        </div>
        {/* <div className="flex flex-col gap-5 h-[calc(100%-13rem)] sm:h-[calc(100%-13rem)] custom_scroll overflow-y-auto px-5 mt-[12rem] xl:ltr:w-[calc(100%-0.18rem)] rtl:w-full">
          {(() => {
            const renderNotification = (item, index) => {
              const type = item.notificationId?.notificationtype;
              switch (type) {
                case notificationType.JOINING_PRIME_LEAGUE:
                case notificationType.QUEUE_OPENED:
                  return <LeagueJoin key={index} data={item} />;
                case notificationType.ACCOUNT_CREATION:
                  return <UserRegistration key={index} data={item} />;
                case notificationType.LEAGUE_ENDED:
                  return <LeagueEnded key={index} data={item} />;
                case notificationType.MATCHMAKING_FOUND:
                case notificationType.SCORESUBMITTED:
                case notificationType.MATCH_IN_DISPUTE:
                case notificationType.CONFLICT_RESOLVED:
                case notificationType.FIRST_MATCH_WIN:
                case notificationType.FIRST_MATCH_LOSS:
                  return <MatchFound key={index} data={item} />;
                default:
                  return null;
              }
            };
            const notifications = NotificationTabIndex == 0 ? UnreadNotification : ReadNotification;
            return notifications.map(renderNotification);
          })()}
        </div> */}
        <div className="flex flex-col gap-5 h-[calc(100%-13rem)] sm:h-[calc(100%-13rem)] custom_scroll overflow-y-auto px-5 mt-[12rem] xl:ltr:w-[calc(100%-0.18rem)] rtl:w-full">
          {currentNotifications.length > 0 ? (
            currentNotifications.map(renderNotification)
          ) : (
            <div className="text-center text-gray-400 mt-10">
              <p>{NotificationTabIndex === 0 ? 'No unread notifications' : 'No notifications'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSidebar;
