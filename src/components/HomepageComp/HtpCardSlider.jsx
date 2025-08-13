// File: HtpCardSlider.jsx
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import playgameBG from "../../assets/images/playgameBG.png";
import sliderBG_opp from "../../assets/images/sliderBG_opp.png";
import activeslideBG from "../../assets/images/activeslideBG.png";
import sliderBG from "../../assets/images/sliderBG.png";

// import HtpCard from "./HtpCard"; // uncomment if using your actual card
const HtpCardBig = ({ item }) => (
  <div className="game_card_wrap--link relative inline-flex flex-col justify-end self-end">
    <div
      className="htp_card--body inline-block relative !m-0 p-5 w-[37.5rem] !h-[12.01rem] !bg-[unset] !bg-[length:100%] !bg-no-repeat"
      style={{ backgroundImage: `url(${activeslideBG})` }}
    >
      <div className="game_mask--con pt-3 sm:pb-0 pb-5 relative h-full flex flex-col justify-end w-full">
        <h3 className="game_label !mb-0 md:text-[1.75rem] text-lg !font-bold  purple_light leading-tight sm:pb-6 pb-3 sm:pl-3 pl-1">
          {" "}
          {item.gameLabel}{" "}
        </h3>
        <p className="game_info !mb-0 md:text-2xl text-sm !font-semibold w-[24rem] purple_col pb-5 sm:pl-3 pl-1">
          Sign up and step into the world of real competition
        </p>
      </div>
      <div className="game_card--footer !m-0 flex justify-between items-center ">
        <div
          className="match_date flex flex-col justify-center absolute ltr:right-[0] rtl:left-0 rtl:right-auto bottom-[0.3rem] h-[7.75rem] bg-[length:100%] !bg-no-repeat"
          style={{ backgroundImage: `url(${sliderBG})` }}
        >
          <h2 className="sm:text-[3.25rem] text-[1.75rem] match_date-con pt-1 pb-1  text-center !font-bold grad_text-clip">
            {item.Step}
          </h2>
          <p className="sm:text-sm text-[0.75rem] purple_light font-semibold text-center uppercase">
            Step
          </p>
        </div>
      </div>
    </div>
  </div>
);
const HtpCard = ({ item }) => (
  <div className="game_card_wrap--link relative inline-flex flex-col justify-end self-end">
    <div
      className="htp_card--body inline-block relative !m-0 p-5 w-[17.5rem] !h-[12.01rem] !bg-[unset] opacity-70 !bg-[length:100%] !bg-no-repeat"
      style={{ backgroundImage: `url(${playgameBG})` }}
    >
      <div className="game_mask--con pt-3 relative h-full flex flex-col justify-end w-full">
        <h3 className="game_label !mb-0 md:text-[1.75rem] text-lg !font-bold  purple_light leading-tight pb-0 sm:pl-3 pl-1">
          {" "}
          {item.gameLabel}{" "}
        </h3>
      </div>
      <div className="game_card--footer !m-0 flex justify-between items-center">
        <div
          className="match_date flex flex-col justify-center absolute ltr:right-[0] rtl:left-0 rtl:right-auto top-[1.5rem] !bg-no-repeat"
          style={{ backgroundImage: `url(${sliderBG_opp})` }}
        >
          <h2 className="sm:text-[3.25rem] text-[1.75rem] match_date-con pt-1 pb-1  text-center !font-bold grad_text-clip">
            {item.Step}
          </h2>
          <p className="sm:text-sm text-[0.85rem] purple_light font-semibold  text-center uppercase">
            Step
          </p>
        </div>
      </div>
    </div>
  </div>
);

const HtpCardSlider = ({
  HtpCardDetails,
  HtpCardDetails1 = [],
  sliderId = "",
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);

  // Ensure navigation refs are set after mount
  useEffect(() => {
    // Swiper's navigation expects DOM elements, so we need to update navigation when refs are ready
    if (
      mainSwiperRef.current &&
      mainSwiperRef.current.swiper &&
      prevRef.current &&
      nextRef.current
    ) {
      mainSwiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      mainSwiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      mainSwiperRef.current.swiper.navigation.init();
      mainSwiperRef.current.swiper.navigation.update();
    }
    // For thumbsSwiper, navigation is not needed, it will be synced via thumbs prop
  }, [prevRef, nextRef, mainSwiperRef, thumbsSwiper]);

  // Handle main slider slide change to sync thumbs slider
  const handleMainSlideChange = (swiper) => {
    if (thumbsSwiperRef.current && thumbsSwiperRef.current.swiper) {
      // Move thumbs slider to next slide (+1) when main slider changes
      const nextSlideIndex = Math.min(
        swiper.activeIndex,
        HtpCardDetails.length
      );
      thumbsSwiperRef.current.swiper.slideTo(nextSlideIndex, 600);
    }
  };

  return (
    <div className="relative htp_slider h-full flex gap-10">
      {/* Custom Nav */}
      <div className="swiper-navigation-wrapper absolute ltr:right-0 rtl:left-0 lg:top-[0rem] sm:top-[-5rem] top-[-2.5rem] z-10 flex gap-2 ltr:md:pr-[7.5rem] rtl:md:pl-[7.5rem] ltr:pr-[1rem] rtl:pl-[1rem]">
        <div
          ref={prevRef}
          className={`swiper-button-prev sd_prev-${sliderId} rtl:order-2 sd_prev-btn !relative ltr:!left-[auto] ltr:!right-[0.5rem] rtl:!left-[0.5rem] rtl:!right-[auto] custom-nav-btn`}
        />
        <div
          ref={nextRef}
          className={`swiper-button-prev sd_next-${sliderId} sd_next-btn !relative !right-[auto] custom-nav-btn`}
        />
      </div>
      {/* Main Swiper (Big Card) */}
      <Swiper
        className="big-card mySwiper2"
        slidesPerView={1}
        loop={false}
        speed={600}
        modules={[FreeMode, Navigation, Pagination]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          el: `.custom-pagination-${sliderId}`,
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}">${index + 1}</span>`;
          },
        }}
        breakpoints={{
          0: {
            pagination: {
              el: `.custom-pagination-${sliderId}`,
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}">${index + 1}</span>`;
              },
            },
          },
          640: {
            pagination: false,
          },
        }}
        onSwiper={(swiper) => {
          mainSwiperRef.current = { swiper };
        }}
        onSlideChange={handleMainSlideChange}
      >
        {HtpCardDetails.map((item, index) => (
          <SwiperSlide key={index}>
            <HtpCardBig item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Dots for Mobile */}
      {
        <div
          className={`custom-pagination-${sliderId} flex justify-end mt-4 gap-3 sm:hidden absolute ltr:right-0 rtl:left-0 !-bottom-[3rem] z-100`}
        ></div>
      }

      {/* Thumbs Swiper (Small Card) */}
      <Swiper
        slidesPerView={1.5}
        speed={600}
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
          thumbsSwiperRef.current = { swiper };
        }}
        loop={false}
        watchSlidesProgress={true}
        modules={[FreeMode]}
        className="mySwiper pointer-events-none"
        // No navigation here, thumbs will sync with main swiper
      >
        {HtpCardDetails1.map((item, index) => (
          <SwiperSlide key={index}>
            <HtpCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HtpCardSlider;
