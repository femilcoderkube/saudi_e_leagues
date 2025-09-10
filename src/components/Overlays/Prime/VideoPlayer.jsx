import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import center_league from "../../../assets/images/center_league.png";

function VideoPlayer({ onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const videoRef = useRef(null);

  const videoUrl =
    "https://backend.primeeleague.com/api/v1/uploads/homepageVideo.mp4";

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    console.error("Video failed to load");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        className="fixed inset-0 flex items-center justify-center z-[999] m-0 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          key="modal-content"
          className="bg-[#121331] rounded-2xl p-2 md:p-6 w-[90dvh] md:w-[70dvh] h-[50%] relative overflow-hidden shadow-2xl flex flex-col items-center justify-center"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-300 hover:text-white transform hover:rotate-90 hover:scale-110 transition-all duration-200 z-11"
            aria-label="Close modal"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Video Container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ minHeight: "inherit" }}
          >
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a1a] rounded-lg z-10">
                <div className="flex flex-col items-center">
                  <img
                    className="center-league-loader animate-pulse ml-8 w-10"
                    src={center_league}
                    alt="Loading..."
                  />
                  <p className="text-white text-lg mt-4 animate-pulse">
                    {t("common.loading_video") || "Loading video..."}
                  </p>
                </div>
              </div>
            )}

            {/* Video Player */}
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay={true}
              className="rounded-lg"
              onCanPlay={handleVideoLoad}
              onError={handleVideoError}
              style={{
                display: isLoading ? "none" : "block",
                width: "100%",
                height: "100%",
                minHeight: "inherit",
                objectFit: "contain",
                background: "#000",
              }}
            >
              {t("common.video_not_supported") ||
                "Your browser does not support the video tag."}
            </video>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default VideoPlayer;
