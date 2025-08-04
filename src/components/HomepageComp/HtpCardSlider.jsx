// File: HtpCardSlider.jsx
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import playgameBG from "../../assets/images/playgameBG.png";
import sliderBG_opp from "../../assets/images/sliderBG_opp.png";
import activeslideBG from "../../assets/images/activeslideBG.png";
import sliderBG from "../../assets/images/sliderBG.png";

// import HtpCard from "./HtpCard"; // uncomment if using your actual card
const HtpCardBig = ({ item }) => (
  <div className="game_card_wrap--link relative inline-flex flex-col justify-end self-end">
    <div
      className="htp_card--body inline-block relative !m-0 p-5 w-[37.5rem] !h-[23.75rem] !bg-[unset] !bg-[length:100%] !bg-no-repeat"
      style={{ backgroundImage: `url(${activeslideBG})` }}
    >
      <div className="game_mask--con pt-3 relative h-full flex flex-col justify-end w-full">
        <h3 className="game_label !mb-0 text-2xl !font-semibold  purple_light leading-tight pb-4 pl-3">
          {" "}
          {item.gameLabel}{" "}
        </h3>
        <p className="game_info !mb-0 text-xl !font-semibold purple_col pb-5 pl-3">
          Sign up and step into the world of real competition
        </p>
      </div>
      <div className="game_card--footer !m-0 flex justify-between items-center ">
        <div
          className="match_date flex flex-col justify-center absolute ltr:right-[0] rtl:left-0 rtl:right-auto bottom-[0.3rem] h-[7.75rem] bg-[length:100%] !bg-no-repeat"
          style={{ backgroundImage: `url(${sliderBG})` }}
        >
          <h2 className="text-[3.25rem] match_date-con pt-1 pb-1  text-center !font-extrabold grad_text-clip">
            {item.Step}
          </h2>
          <p className="text-sm purple_light font-medium  text-center uppercase">
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
      className="htp_card--body inline-block relative !m-0 p-5 w-[17.5rem] !h-[20.5rem] !bg-[unset] opacity-70 !bg-[length:100%] !bg-no-repeat"
      style={{ backgroundImage: `url(${playgameBG})` }}
    >
      <div className="game_mask--con pt-3 relative h-full flex flex-col justify-end w-full">
        <h3 className="game_label !mb-0 text-2xl !font-semibold  purple_light leading-tight pb-4 pl-3">
          {" "}
          {item.gameLabel}{" "}
        </h3>
      </div>
      <div className="game_card--footer !m-0 flex justify-between items-center ">
        <div
          className="match_date flex flex-col justify-center absolute ltr:right-[0] rtl:left-0 rtl:right-auto top-[1.5rem] !bg-no-repeat"
          style={{ backgroundImage: `url(${sliderBG_opp})` }}
        >
          <h2 className="text-[3.25rem] match_date-con pt-1 pb-1  text-center !font-extrabold grad_text-clip">
            {item.Step}
          </h2>
          <p className="text-sm purple_light font-medium  text-center uppercase">
            Step
          </p>
        </div>
      </div>
    </div>
  </div>
);

const HtpCardSlider = ({ HtpCardDetails = [], sliderId = "" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);

  // Set navigation for both swipers using Swiper's Navigation module
  // Both swipers will be controlled by the same navigation buttons
  // The main swiper (big) will be the controller, the thumbs will be synced via thumbs prop

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

  return (
    <div className="relative htp_slider h-full flex gap-[2.5rem]">
      {/* Custom Nav */}
      <div className="swiper-navigation-wrapper absolute ltr:right-0 rtl:left-0 top-[0rem] z-10 flex gap-2 md:pr-[7.5rem] pr-[1rem]">
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
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        speed={600}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          mainSwiperRef.current = { swiper };
        }}
      >
        {HtpCardDetails.map((item, index) => (
          <SwiperSlide key={index}>
            <HtpCardBig item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbs Swiper (Small Card) */}
      <Swiper
        spaceBetween={40}
        slidesPerView={1.5}
        speed={600}
        onSwiper={setThumbsSwiper}
        loop={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper pointer-events-none"
        breakpoints={{
          640: {
            slidesPerView: 1.5, // 👈 tablets and up
          },
          0: {
            slidesPerView: 1, // 👈 Mobile
          },
        }}
        // No navigation here, thumbs will sync with main swiper
      >
        {HtpCardDetails.map((item, index) => (
          <SwiperSlide key={index}>
            <HtpCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HtpCardSlider;
