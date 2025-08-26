import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationwindow } from "../../app/slices/constState/constStateSlice";
import Que_btn from "../../assets/images/quebtn.png";
import { motion } from "framer-motion";
function NotificationWindow() {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const { notificationWindow } = useSelector((state) => state.constState);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  if (!notificationWindow) return null;

  const handleQueueClick = () => {
    if (doNotShowAgain) localStorage.setItem("skipQueueConfirmation", "true");
    dispatch(setNotificationwindow(false));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      <div
        className="absolute inset-0 bg-[#010221]/60 backdrop-blur-sm"
        onClick={() => dispatch(setNotificationwindow(false))}
      ></div>
      <motion.div
        className="relative text-white rounded-2xl shadow-xl w-[100%] max-w-xl md:px-8 md:py-10 p-5 z-50 border border-[#FFFFFF33]"
        style={{
          background:
            "linear-gradient(180deg, rgba(23, 26, 67, 90%) 0%, rgba(9, 11, 44, 100%) 100%",
        }}
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="text-left">
          <div className="flex items-center gap-3 md:mb-8 mb-5">
            <h2 className="text-xl !font-extrabold">
              {t("confirmation.matchmaking")}
            </h2>
          </div>

          <div className="text-xl text-white md:mb-8 mb-5">
            <p>{t("confirmation.matchmakingmsg1")}</p>
          </div>

          <div className="flex gap-4 justify-between items-center flex-wrap">
            <label className="flex items-center gap-2 text-[#A2A2A2] cursor-pointer">
              <input
                type="checkbox"
                checked={doNotShowAgain}
                onChange={(e) => setDoNotShowAgain(e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              {t("confirmation.donotshow")}
            </label>
            <div className="game_status--tab rounded-xl">
            <button
              className={` py-2 px-4 text-xl font-black transition-all sd_after sd_before relative hover:opacity-50 duration-300 active-tab polygon_border
                }`}
                style={{ width: "10rem", height: "4rem" }}
            >
              {t("auth.continue")}
            </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NotificationWindow;
