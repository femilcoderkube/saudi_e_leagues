import { Link } from "react-router-dom";
import left_arrow from "../../assets/images/left-arrow.png";
import rick_moon from "../../assets/images/rickmooon.png";
import dota_game from "../../assets/images/dota-game.png";

import "../../assets/css/notification.css";
import Notification_box_One from "./notificationboxone.jsx";
import Notification_box from "./notificationbox.jsx";
import NotificationTab from "./NotificationTab.jsx";

const Notification_Sidebar = () => {
  return (
    <div className="notification-sidebar sm:w-[25.6rem] h-full text-white fixed ltr:right-0 rtl:left-0 top-0 px-5 pt-10 custom_scroll">
      <div className="notification-head flex items-center gap-5">
        <img src={left_arrow} alt="" />
        <h5 className="uppercase text-2xl tracking-wide">
          Notification <span className="purple_col">(267)</span>
        </h5>
      </div>
      <div className="pt-8">
        <NotificationTab />
      </div>
      <div className="flex flex-col gap-5">
        <Notification_box_One />
        <Notification_box />
      </div>
    </div>
  );
};

export default Notification_Sidebar;
