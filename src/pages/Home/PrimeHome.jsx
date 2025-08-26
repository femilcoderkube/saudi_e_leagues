import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import "../../assets/css/homepage.css";

import VideoModal from "../../components/ModalPopUp/VideoModal.jsx";
import HeroLeftSection from "../../components/Home/HeroLeftSection.jsx";
import HeroRightSection from "../../components/Home/HeroRightSection.jsx";
import AboutLeftSection from "../../components/Home/AboutLeftSection.jsx";
import AboutRightSection from "../../components/Home/AboutRightSection.jsx";
import HowToPlaySection from "../../components/Home/HowToPlaySection.jsx";
import FaqSection from "../../components/Home/FaqSection.jsx";
import NotificationWindow from "../../components/ModalPopUp/NotificationWindow.jsx";
import { setNotificationwindow } from "../../app/slices/constState/constStateSlice.js";
import { useSelector } from "react-redux";

const usePageLoading = (delay = 300) => {
  useEffect(() => {
    document.body.classList.add("page-loading");

    const timer = setTimeout(() => {
      document.body.classList.remove("page-loading");
    }, delay);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("page-loading");
    };
  }, [delay]);
};

export default function PrimeHome() {
  const { id } = useParams();
  const { notificationWindow } = useSelector((state) => state.constState);
  const [showVideoModal, setShowVideoModal] = useState(false);

  usePageLoading();

  const handleVideoModalOpen = useCallback(() => {
    setShowVideoModal(true);
  }, []);

  const isBeforeDeadline = new Date() < new Date("2025-09-01T00:00:00Z");

  return (
    <main className="flex-1 md:pt-[0.5rem] pt-[1.5rem] home_page--wrapper pb-[5.25rem] sm:pb-0">
      <div
        className="main_con--bg absolute top-0 left-0 h-full bg-no-repeat"
        style={{ backgroundSize: "auto" }}
      />

      <div className="sd_home-wrapper">
        <section className="home_hero--sec relative flex lg:pt-[21.125rem] md:pt-[13rem] pt-[10rem] justify-between items-end">
          <HeroLeftSection
            id={id}
          />
          <HeroRightSection />
        </section>

        <section className="home_about--sec relative lg:pt-[7.5rem] pt-[2rem] lg:pb-[6rem] pb-[1rem] flex overflow-hidden">
          <AboutLeftSection />
          <AboutRightSection onPlayVideo={handleVideoModalOpen} />
        </section>

        <HowToPlaySection />

        <FaqSection />
      </div>

      {showVideoModal && (
        <VideoModal onClose={() => setShowVideoModal(false)} />
      )}
      {(
        !localStorage.getItem("skipAnnouncement") &&
        localStorage.getItem("user") &&
        notificationWindow &&
        isBeforeDeadline
      ) && (
          <NotificationWindow onClose={() => setNotificationwindow(false)} />
        )}
    </main>
  );
}
