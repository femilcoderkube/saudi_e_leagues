import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setIsPopUpShow } from "../../../app/slices/constState/constStateSlice";
import { motion } from "framer-motion";
function AnnouncementBanner() {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleQueueClick = () => {
    if (doNotShowAgain) localStorage.setItem("skipAnnouncement", "true");
    dispatch(setIsPopUpShow(false));
  };
  let popUpdata = JSON.parse(localStorage.getItem("popups"));
  if (!popUpdata) return;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      <div
        className="absolute inset-0 bg-[var(--dark-color)]/60 backdrop-blur-sm"
        // onClick={() => dispatch(setAnnouncementBanner(false))}
      ></div>
      <motion.div
        className="queanouce-banner relative text-[var(--pure-white)] rounded-2xl shadow-xl sm:w-[100%] max-w-xl w-[calc(100%-30px)] md:px-8 md:py-10 p-5 z-50 border"        
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="ltr:text-left rtl:text-right">
          <div className="flex items-center gap-3 md:mb-8 mb-5">
            <h2 className="sm:text-xl text-lg !font-extrabold">
              {i18n.language == "en" ? popUpdata?.titleEn : popUpdata?.titleAr}
            </h2>
          </div>

          <div className="sm:text-xl text-lg text-[var(--pure-white)] md:mb-8 mb-10">
            <div className="sm:mb-5">
              {(i18n.language == "en"
                ? popUpdata?.descriptionEn
                : popUpdata?.descriptionAr
              )
                ?.split("\n")
                .map((line, idx) => (
                  <p key={idx} style={{ marginBottom: "1em" }}>
                    {line}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex gap-5 justify-between items-center flex-wrap">
            <label className="flex items-center gap-2 text-[var(--light-gray)] cursor-pointer">
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
                onClick={handleQueueClick}
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

export default AnnouncementBanner;
