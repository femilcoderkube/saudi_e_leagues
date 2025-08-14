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
import { useTranslation } from "react-i18next";

const HtpCardBig = ({ item }) => (
  <div className="game_card_wrap--link relative inline-flex flex-col justify-end self-end">
    <div
      className="htp_card--body inline-block relative !m-0 p-5 w-[37.5rem] !h-[12.01rem] !bg-[unset] !bg-[length:100%] !bg-no-repeat"
      style={{ backgroundImage: `url(${activeslideBG})` }}
    >
      <div className="game_mask--con pt-3 sm:pb-0 pb-5 relative h-full flex flex-col justify-end w-full">
        <h3 className="game_label !mb-0 md:text-[1.75rem] text-lg !font-bold  purple_light leading-tight sm:pb-6 pb-3 sm:pl-3 pl-1">
          {item.gameLabel}
        </h3>
        <p className="game_info !mb-0 md:text-2xl text-sm !font-semibold w-[24rem] purple_col pb-5 sm:pl-3 pl-1">
          Sign up and step into the world of real competition
        </p>
      </div>
      <div className="game_card--footer !m-0 flex justify-between items-center">
        <div
          className="match_date flex flex-col justify-center absolute ltr:right-[0] rtl:left-0 rtl:right-auto bottom-[0.3rem] h-[7.75rem] bg-[length:100%] !bg-no-repeat"
          style={{ backgroundImage: `url(${sliderBG})` }}
        >
          <h2 className="sm:text-[3.25rem] text-[1.75rem] match_date-con pt-1 pb-1 text-center !font-bold grad_text-clip">
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
        <h3 className="game_label !mb-0 md:text-[1.75rem] text-lg !font-bold purple_light leading-tight pb-0 sm:pl-3 pl-1">
          {item.gameLabel}
        </h3>
      </div>
      <div className="game_card--footer !m-0 flex justify-between items-center">
        <div
          className="match_date flex flex-col justify-center absolute ltr:right-[0] rtl:left-0 rtl:right-auto top-[1.5rem] !bg-no-repeat"
          style={{ backgroundImage: `url(${sliderBG_opp})` }}
        >
          <h2 className="sm:text-[3.25rem] text-[1.75rem] match_date-con pt-1 pb-1 text-center !font-bold grad_text-clip">
            {item.Step}
          </h2>
          <p className="sm:text-sm text-[0.85rem] purple_light font-semibold text-center uppercase">
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
  sliderId = "slider1", // ensure always non-empty
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const { i18n } = useTranslation();

  // Add a state to force rerender on language change
  const [langKey, setLangKey] = useState(i18n.language);

  useEffect(() => {
    setLangKey(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (
      mainSwiperRef.current &&
      mainSwiperRef.current.swiper &&
      prevRef.current &&
      nextRef.current
    ) {
      const swiper = mainSwiperRef.current.swiper;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [prevRef, nextRef, mainSwiperRef, thumbsSwiper, langKey]);

  const handleMainSlideChange = (swiper) => {
    if (thumbsSwiperRef.current && thumbsSwiperRef.current.swiper) {
      const nextSlideIndex = Math.min(
        swiper.activeIndex,
        HtpCardDetails.length
      );
      thumbsSwiperRef.current.swiper.slideTo(nextSlideIndex, 600);
    }
  };

  const renderBulletFn = (index, className) =>
    `<span class="${className || ""}">${index + 1}</span>`;

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

      {/* Main Swiper */}
      <Swiper
        className="big-card mySwiper2"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        slidesPerView={1}
        loop={false}
        speed={600}
        modules={[FreeMode, Navigation, Pagination]}
        key={`main-swiper-${langKey}`}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          el: `.custom-pagination-${sliderId}`,
          clickable: true,
          renderBullet: renderBulletFn,
        }}
        breakpoints={{
          0: {
            pagination: {
              el: `.custom-pagination-${sliderId}`,
              clickable: true,
              renderBullet: renderBulletFn,
            },
          },
          640: {
            pagination: {
              el: null, // clean disable
            },
          },
        }}
        onSwiper={(swiper) => {
          mainSwiperRef.current = { swiper };
          if (prevRef.current && nextRef.current) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        onSlideChange={handleMainSlideChange}
      >
        {HtpCardDetails.map((item, index) => (
          <SwiperSlide key={index}>
            <HtpCardBig item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile Pagination */}
      <div
        className={`custom-pagination-${sliderId} flex justify-end mt-4 gap-3 sm:hidden absolute ltr:right-0 rtl:left-0 !-bottom-[3rem] z-100`}
      ></div>

      {/* Thumbs Swiper */}
      <Swiper
        slidesPerView={1.5}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        speed={600}
        key={`thumbs-swiper-${langKey}`}
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
          thumbsSwiperRef.current = { swiper };
        }}
        loop={false}
        watchSlidesProgress={true}
        modules={[FreeMode]}
        className="mySwiper pointer-events-none"
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
