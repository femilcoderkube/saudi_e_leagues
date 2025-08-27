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
import {
  setIsPopUpShow,
  setNotificationwindow,
} from "../../app/slices/constState/constStateSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getPopupData, shouldDisplayPopup } from "../../utils/constant.js";

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
  const { notificationWindow, isPopUpShow } = useSelector(
    (state) => state.constState
  );
  const [showVideoModal, setShowVideoModal] = useState(false);
  const dispatch = useDispatch();

  usePageLoading();

  const handleVideoModalOpen = useCallback(() => {
    setShowVideoModal(true);
  }, []);
  const fetchPopupData = async () => {
    try {
      // setIsLoadingPopup(true);
      const response = await getPopupData();
      const popups = response.data || response;
      const oldPopUp = JSON.parse(localStorage.getItem("popups"));
      let isSkip = localStorage.getItem("skipAnnouncement");
      const now = new Date();
      // Convert to Riyadh time (UTC+3)
      const riyadhNow = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Riyadh" })
      );
      const expireDate = new Date(
        new Date(popups?.expireDateTime).toLocaleString("en-US", {
          timeZone: "Asia/Riyadh",
        })
      );

      // Compare only the date part (year, month, day)
      const isSameOrBefore =
        riyadhNow.getFullYear() < expireDate.getFullYear() ||
        (riyadhNow.getFullYear() === expireDate.getFullYear() &&
          (riyadhNow.getMonth() < expireDate.getMonth() ||
            (riyadhNow.getMonth() === expireDate.getMonth() &&
              riyadhNow.getDate() <= expireDate.getDate())));

      if (popups?.updatedAt != oldPopUp?.updatedAt) {
        console.log("innnn");
        localStorage.setItem("skipAnnouncement", false);
        localStorage.setItem("popups", JSON.stringify(popups));
        isSkip = false;
      }
      if (isSkip != "true" && isSameOrBefore && popups.status == "active") {
        localStorage.setItem("popups", JSON.stringify(popups));
        dispatch(setIsPopUpShow(true));
      }
    } catch (error) {
      console.error("Error fetching popup data:", error);
    }
  };
  useEffect(() => {
    fetchPopupData();
  }, []);

  return (
    <main className="flex-1 md:pt-[0.5rem] pt-[1.5rem] home_page--wrapper pb-[5.25rem] sm:pb-0">
      <div
        className="main_con--bg absolute top-0 left-0 h-full bg-no-repeat"
        style={{ backgroundSize: "auto" }}
      />

      <div className="sd_home-wrapper">
        <section className="home_hero--sec relative flex lg:pt-[21.125rem] md:pt-[13rem] pt-[10rem] justify-between items-end">
          <HeroLeftSection id={id} />
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
      {isPopUpShow && (
        <NotificationWindow onClose={() => setNotificationwindow(false)} />
      )}
    </main>
  );
}
