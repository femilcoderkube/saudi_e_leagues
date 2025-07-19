import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import center_league from "../../assets/images/center_league.png";

function VideoModal({ videoUrl, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Trigger animation on mount
  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, []);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    console.error("Video failed to load");
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Responsive width: 90vw on mobile, 70vw on md+, max 1200px
  // Height: 50vh always
  // Centered with flex
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[999] m-0 transition-opacity duration-300"
      onClick={handleClose}
      style={{ minHeight: "100vh" }}
    >
      <div
        className={`bg-[#121331] rounded-2xl p-2 md:p-6 w-[90dvh] md:w-[70dvh] sm:h-[50%] relative overflow-hidden shadow-2xl flex flex-col items-center justify-center transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          
         
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
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
            <div className="absolute inset-0 flex items-center  justify-center bg-[#0a0a1a] rounded-lg z-10">
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
          <iframe
            src={`${videoUrl}`}
            title="Video Player"
            className="rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
            onError={handleVideoError}
            style={{
              display: isLoading ? "none" : "block",
              width: "100%",
              height: "100%",
              minHeight: "inherit",
              objectFit: "contain",
              background: "#000",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoModal; 