import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SliderCard from "./SliderCard";

const SliderCardDetails = [
  {
    paht: "#",
    imgsrc: "https://backend.primeeleague.com/api/v1/uploads/1752507756022-cod.jpg",
    gameLogo: "https://backend.primeeleague.com/api/v1/uploads/1752008880358-CoD.png",
  },
  {
    paht: "#",
    imgsrc: "https://backend.primeeleague.com/api/v1/uploads/1752507723419-fifa.jpg",
    gameLogo: "https://backend.primeeleague.com/api/v1/uploads/1752009843866-FC25.png",
  },
  {
    paht: "#",
    imgsrc: "https://backend.primeeleague.com/api/v1/uploads/1752507747372-rocket-league.jpg",
    gameLogo: "https://backend.primeeleague.com/api/v1/uploads/1752008907915-RL.png",
  },
  {
    paht: "#",
    imgsrc: "https://backend.primeeleague.com/api/v1/uploads/1752507803859-pubg.jpg",
    gameLogo: "https://backend.primeeleague.com/api/v1/uploads/1752008897490-PUBGM.png",
  },
];

const HeroCardSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="game-slider-container relative">
      <div className="swiper-navigation-wrapper absolute ltr:right-18 rtl:left-18 top-[-5rem] z-10 md:flex hidden gap-2">
        <div
          ref={prevRef}
          className="swiper-button-prev sd_prev-btn rtl:order-2 !relative !left-[auto] !right-[0.5rem]  custom-nav-btn"
        />
        <div
          ref={nextRef}
          className="swiper-button-next sd_next-btn !relative !right-[auto] custom-nav-btn"
        />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={2.5}
        centeredSlides={false}
        loop={true}
        style={{ position: 'relative' }}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          640: {
            slidesPerView: 2.5,
          },
        }}
        speed={600}
        onSwiper={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {SliderCardDetails.map((item, index) => (
          <SwiperSlide key={index}>
            <SliderCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCardSlider;
