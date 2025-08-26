import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setQueueConfirmation } from "../../app/slices/constState/constStateSlice";
import { useNavigate, useParams } from "react-router-dom";
import Que_btn from "../../assets/images/quebtn.png";
import { motion } from "framer-motion";
function QueueConfirmationPopUp() {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const { id } = useParams();
  const { queueConfimation } = useSelector((state) => state.constState);
  const { leagueData } = useSelector((state) => state.leagues);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (!queueConfimation) return null;

  const handleQueueClick = () => {
    if (doNotShowAgain) localStorage.setItem("skipQueueConfirmation", "true");
    sessionStorage.setItem("canAccessFindingMatch", "true");
    navigate(`/${id}/lobby/${leagueData?._id}/finding-match`);
    dispatch(setQueueConfirmation(false));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      <div
        className="absolute inset-0 bg-[#010221]/60 backdrop-blur-sm"
        onClick={() => dispatch(setQueueConfirmation(false))}
      ></div>
      <motion.div
        className="relative text-white rounded-2xl shadow-xl sm:w-[100%] max-w-xl w-[calc(100%-30px)] md:px-8 md:py-10 p-5 z-50 border border-[#FFFFFF33]"
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
            <h2 className="sm:text-xl text-lg !font-extrabold">
              {t("confirmation.matchmaking")}
            </h2>
          </div>

          <div className="sm:text-xl text-lg text-white md:mb-8 mb-5">
            <p className="sm:mb-2">{t("confirmation.matchmakingmsg1")}</p>
            <p className="sm:mb-2">{t("confirmation.matchmakingmsg2")}</p>
            <p>{t("confirmation.matchmakingmsg3")}</p>
          </div>

          <div className="flex gap-4 justify-between items-center flex-wrap">
            <label className="flex items-center gap-2 text-[#A2A2A2] text-sm sm:text-base cursor-pointer">
              <input
                type="checkbox"
                checked={doNotShowAgain}
                onChange={(e) => setDoNotShowAgain(e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              {t("confirmation.donotshow")}
            </label>
            <div
              className="w-[52%] relative que_btn hover:opacity-60 duration-300 block sd_before cursor-pointer"
              onClick={handleQueueClick}
            >
              <span
                // className="mob-common-btn absolute -top-1 w-full text-center md:text-lg text-base"
                className="mob-common-btn absolute top-[2.3rem] left-0 w-full text-center md:text-lg text-base"
                style={{
                  fontFamily: i18n.language === "ar" ? "Cairo" : "Yapari",
                  fontWeight: "bold",
                  textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                {t("images.queue")}
              </span>
              <img
                className="mx-auto"
                src={Que_btn}
                alt=""
                style={{ width: "100%" }}
              />{" "}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default QueueConfirmationPopUp;
