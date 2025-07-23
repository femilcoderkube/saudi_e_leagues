import { Link } from "react-router-dom";
import left_arrow from "../../assets/images/left-arrow.png";

import "../../assets/css/notification.css";
import Notification_box_One from "./notificationboxone.jsx";
import Notification_box from "./notificationbox.jsx";
import NotificationTab from "./NotificationTab.jsx";
import LeaguesJoinNotification from "./LeagueJoinNotificatioCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setshowNotification } from "../../app/slices/constState/constStateSlice.js";
import { notificationType } from "../../utils/constant.js";
import UserRegistrationNotification from "./UserRegistrationNotification.jsx";

const Notification_Sidebar = () => {
  const { NotificationTabIndex } = useSelector((state) => state.constState);
  const { UnreadNotification, ReadNotification } = useSelector((state) => state.notification);
  const dispatch = useDispatch()
  return (
    <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40"
    onClick={()=> dispatch(setshowNotification(false))}
    >
    <div className="notification-sidebar w-[25.6rem] h-full text-white fixed ltr:right-0 rtl:left-0 top-0 "
    onClick={(e)=> e.stopPropagation()}>
      <div className="notification-head-wp fixed t-0 z-101 w-full bg-[#0d0f3b] px-5 pt-9">
      <div className="notification-head flex items-center gap-5 "
      
      onClick={()=> dispatch(setshowNotification(false))}
      
      >
        <img src={left_arrow} alt="" />
        <h5 className="uppercase text-2xl tracking-wide">
          Notification <span className="purple_col">(267)</span>
        </h5>
      </div>
      <div className="pt-8">
        <NotificationTab />
      </div>
      </div>
      <div className="flex flex-col gap-5 h-[calc(100%+8rem)] custom_scroll overflow-y-auto px-5 mt-[12rem] xl:ltr:w-[calc(100%-0.18rem)] rtl:w-full">
       
        {NotificationTabIndex == 0 ? UnreadNotification.map((item,index)=>{
          console.log("item",item);
          if(item.notificationId.notificationtype == notificationType.JOINING_PRIME_LEAGUE){
            return <LeaguesJoinNotification key={index} data={item}/>
          }else if(item.notificationId.notificationtype == notificationType.ACCOUNT_CREATION){
            return <UserRegistrationNotification key={index} data={item}/>
          }
          return <></>
        }) : ReadNotification.map((item,index)=>{
          console.log("item",item);
          if(item.notificationId.notificationtype == notificationType.JOINING_PRIME_LEAGUE){
            return <LeaguesJoinNotification key={index} data={item}/>
          }
          return <></>
        })}
      
      </div>
    </div>
    </div>
  );
};

export default Notification_Sidebar;
