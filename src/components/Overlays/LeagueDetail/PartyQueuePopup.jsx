import React, { useState } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../ui/images/images";
import { useTranslation } from "react-i18next";

function PartyQueuePopup({ setShowPartyQueuePopup }) {
  const { t } = useTranslation();
  console.log("setShowPartyQueuePopup");
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      <div
        className="absolute inset-0 bg-[#010221]/60 backdrop-blur-sm"
        onClick={() => setShowPartyQueuePopup(false)}
      ></div>
      <motion.div
        className="relative text-white rounded-2xl shadow-xl sm:w-[100%] max-w-md w-[calc(100%-30px)] md:px-8 md:py-10 p-5 z-50 border border-[#FFFFFF33]"
        style={{
          background:
            "linear-gradient(180deg, rgba(23, 26, 67, 90%) 0%, rgba(9, 11, 44, 100%) 100%",
          minHeight: "500px"
        }}
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <img
              src={IMAGES.asideLogo_ltr}
              alt="logo"
              className="h-10"
            />
          </div>
          <button
            type="button"
            className="pt-2 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setShowPartyQueuePopup(false)}
          >
            <svg
              width="1.125rem"
              height="1.125rem"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 17L17 1M17 17L1 1"
                stroke="#7B7ED0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content Area - Currently blank as requested */}
        <div className="flex flex-col justify-start items-center gap-4 max-h-[20rem] custom_scroll overflow-y-auto">
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" />
            <span className="sm:text-lg text-base">Raj</span>
          </div>             
        </div>
        <div
        className="party-card h-full cursor-pointer"
        onClick={() => setShowSearchBar(true)}
      >
        <div className="flex gap-3 items-center justify-center h-full p-5">
          <span className="sm:text-lg text-base">Pic 2</span>
        </div>
      </div>

      {/* Search Bar (opens when card is clicked) */}
      {showSearchBar && (
        <div className="mt-4 p-4 border border-[#FFFFFF33] rounded-lg bg-[linear-gradient(0deg,rgba(34,35,86,0.2)_0%,rgba(94,95,184,0.2)_100%)]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border border-[#FFFFFF33] rounded"
          />
          <div className="flex items-center gap-2">
          <button
            className="mt-2 px-4 py-2 blue border border-[#FFFFFF33] text-white rounded cursor-pointer"
            onClick={() => setShowSearchBar(false)}
          >
            Close
          </button>
          <button
            className="mt-2 px-4 py-2 blue border border-[#FFFFFF33] text-white rounded cursor-pointer"
            onClick={() => setShowSearchBar(false)}
          >
            Invite
          </button>
          </div>
        </div>
      )}
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            {/* <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" /> */}
            <span className="sm:text-lg text-base">Pic 3</span>
          </div>             
        </div>
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            {/* <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" /> */}
            <span className="sm:text-lg text-base">Pic 4</span>
          </div>             
        </div>
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            {/* <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" /> */}
            <span className="sm:text-lg text-base">Pic 5</span>
          </div>             
        </div>
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            {/* <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" /> */}
            <span className="sm:text-lg text-base">Pic 6</span>
          </div>             
        </div>
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            {/* <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" /> */}
            <span className="sm:text-lg text-base">Pic 7</span>
          </div>             
        </div>
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            {/* <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" /> */}
            <span className="sm:text-lg text-base">Pic 8</span>
          </div>             
        </div>
        <div className="party-card h-full">
          <div className="flex gap-3 items-center justify-center h-full p-5">
            {/* <img className="w-10 h-10 rounded-full" src={IMAGES.defaultImg} alt="" /> */}
            <span className="sm:text-lg text-base">Pic 9</span>
          </div>             
        </div>
        </div>
     
        <svg
            width={0}
            height={0}
            viewBox="0 0 220 96"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
            }}
          >
            <clipPath id="custom-party-shape" clipPathUnits="objectBoundingBox">
              <path
                d="M92 8H208L220 20V84L208 96H12L0 84V0H84L92 8Z"
                transform="scale(0.004545,0.010417)"
              />
            </clipPath>
          </svg>
        {/* Footer with action button */}
        <div className="flex justify-center mt-6">
          <div className="game_status_tab--wrap">
            <div className="game_status--tab rounded-xl">
              <button
                className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300 active-tab polygon_border cursor-pointer"
                style={{ width: "10rem", height: "4rem" }}
                onClick={() => setShowPartyQueuePopup(false)}
              >
                {t("confirmation.cancel") || "Close"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PartyQueuePopup;
