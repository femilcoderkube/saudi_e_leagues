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
    //  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
    //       <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full">
    //         {/* Close Button */}
    //         <button
    //           onClick={closePopup}
    //           className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200 hover:scale-110"
    //         >
    //           <X className="w-6 h-6" />
    //         </button>

    //         {/* Video Container */}
    //         <div className="relative">
    //           <video
    //             ref={videoRef}
    //             className="w-full h-auto max-h-[70vh] object-contain"
    //             src={videoUrl}
    //             muted={isMuted}
    //             onClick={togglePlay}
    //           />
              
    //           {/* Play/Pause Overlay */}
    //           {!isPlaying && (
    //             <div 
    //               className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-20 transition-opacity hover:bg-opacity-30"
    //               onClick={togglePlay}
    //             >
    //               <div className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200 hover:scale-110">
    //                 <Play className="w-12 h-12 text-gray-800" />
    //               </div>
    //             </div>
    //           )}
    //         </div>

    //         {/* Video Controls */}
    //         <div className="p-4 bg-gray-800">
    //           {/* Progress Bar */}
    //           <div className="mb-4">
    //             <input
    //               type="range"
    //               min="0"
    //               max="100"
    //               value={duration ? (currentTime / duration) * 100 : 0}
    //               onChange={handleProgressChange}
    //               className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
    //               style={{
    //                 background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${duration ? (currentTime / duration) * 100 : 0}%, #4b5563 ${duration ? (currentTime / duration) * 100 : 0}%, #4b5563 100%)`
    //               }}
    //             />
    //             <div className="flex justify-between text-sm text-gray-300 mt-1">
    //               <span>{formatTime(currentTime)}</span>
    //               <span>{formatTime(duration)}</span>
    //             </div>
    //           </div>

    //           {/* Control Buttons */}
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-center gap-3">
    //               <button
    //                 onClick={togglePlay}
    //                 className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-gray-700 rounded-full"
    //               >
    //                 {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
    //               </button>
                  
    //               <button
    //                 onClick={restartVideo}
    //                 className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-gray-700 rounded-full"
    //               >
    //                 <RotateCcw className="w-5 h-5" />
    //               </button>

    //               <div className="flex items-center gap-2">
    //                 <button
    //                   onClick={toggleMute}
    //                   className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-gray-700 rounded-full"
    //                 >
    //                   {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    //                 </button>
                    
    //                 <input
    //                   type="range"
    //                   min="0"
    //                   max="1"
    //                   step="0.1"
    //                   value={isMuted ? 0 : volume}
    //                   onChange={handleVolumeChange}
    //                   className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
    //                 />
    //               </div>
    //             </div>

    //             <button
    //               onClick={toggleFullscreen}
    //               className="text-white hover:text-purple-400 transition-colors p-2 hover:bg-gray-700 rounded-full"
    //             >
    //               <Maximize className="w-5 h-5" />
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
}

export default VideoModal; 