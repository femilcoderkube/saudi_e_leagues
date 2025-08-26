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
        className="relative text-white rounded-2xl shadow-xl w-[100%] max-w-xl p-10 z-50"
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
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold">
              {t("confirmation.matchmaking")}
            </h2>
          </div>

          <div className="space-y-4 text-gray-200 mb-5">
            <p>{t("confirmation.matchmakingmsg1")}</p>
          </div>

          <div className="flex gap-4 justify-between items-center flex-wrap">
            <label className="flex items-center gap-2 text-white text-sm sm:text-base cursor-pointer">
              <input
                type="checkbox"
                checked={doNotShowAgain}
                onChange={(e) => setDoNotShowAgain(e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              {t("confirmation.donotshow")}
            </label>
            <button
              className={`popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400
                }`}
            >
              {t("auth.continue")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NotificationWindow;
