import React, { useState, Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationTabIndex } from "../../app/slices/constState/constStateSlice";
import { startNotificationSocket } from "../../app/socket/socket";

export const Tabs = ({ children }) => {
  const dispatch = useDispatch();
  const { NotificationTabIndex } = useSelector((state) => state.constState);
  const { user } = useSelector((state) => state.auth);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  useEffect(() => {
    if (isSocketConnected && user?._id) {
      startNotificationSocket({
        userId: user?._id,
        isRead: NotificationTabIndex == 0 ? false : true,
      });
    }
  }, [isSocketConnected, NotificationTabIndex]);
  const tabs = Children.toArray(children);

  return (
    <div className="game_status_tab--wrap">
      {/* Tab Headers */}
      <div className="game_status--tab rounded-xl overflow-hidden absolute top-1 right-32 inline-flex mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => dispatch(setNotificationTabIndex(index))}
            className={`py-2 px-4 sm:text-xl text-base font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
              ${
                NotificationTabIndex === index
                  ? "active-tab hover:opacity-100 polygon_border"
                  : "inactive-tab"
              }
            `}
            style={{ width: "10rem", height: "4rem" }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export const TabPanel = ({ children }) => {
  return <div className="sd_tab_cont--wrap pb-10">{children}</div>;
};
