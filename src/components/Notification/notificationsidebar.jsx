// import { Link } from "react-router-dom";
// import left_arrow from "../../assets/images/left-arrow.png";
// import rick_moon from "../../assets/images/rickmooon.png";
// import dota_game from "../../assets/images/dota-game.png";

import "../../assets/css/notification.css";
import Notification_box_One from "./notificationboxone";
import NotificationTab from "./NotificationTab";

const Notification_sidebar = () => {
  return (
    <div className="notification-sidebar w-[25.6rem] h-full text-white fixed right-0 top-0 px-5 pt-10 custom_scroll">
      <div className="notification-head flex items-center gap-5">
        <img src={"left_arrow"} alt="" />
        <h5 className="uppercase text-2xl tracking-wide">
          Notification <span className="purple_col">(267)</span>
        </h5>
      </div>
      <div className="pt-8">
        <NotificationTab />
      </div>
      <div className="flex flex-col gap-5">
        {/* <NotificationBox /> */}
        <Notification_box_One />
        {/* <NotificationBox /> */}
      </div>
    </div>
  );
};

export default Notification_sidebar;
