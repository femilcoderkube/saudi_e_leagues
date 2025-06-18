// File: HeroCardSlider.jsx
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SliderCard from "./SliderCard";
import DotaBG from "../../assets/images/dotaBG.jpg";
import Valorant_card_bg from "../../assets/images/valorant_card_bg.jpg";
import { ValorantIcon } from "../ui/svg/index.jsx";

// Card data here
const SliderCardDetails = [
  {
    paht: "#",
    imgsrc: Valorant_card_bg,
    gameLogo: <ValorantIcon />,
  },
  {
    paht: "#",
    imgsrc: DotaBG,
    gameLogo: <ValorantIcon />,
  },
  {
    paht: "#",
    imgsrc: Valorant_card_bg,
    gameLogo: <ValorantIcon />,
  },
  {
    paht: "#",
    imgsrc: DotaBG,
    gameLogo: <ValorantIcon />,
  },
];

const HeroCardSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="game-slider-container relative">
      {/* Custom Navigation Wrapper */}
      <div className="swiper-navigation-wrapper absolute right-18 top-[-5rem] z-10 flex gap-2">
        <div
          ref={prevRef}
          className="swiper-button-prev sd_prev-btn !relative !left-[auto] !right-[0.5rem] custom-nav-btn"
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
        speed={600}
        // style={{ overflow: 'visible' }}
        onSwiper={(swiper) => {
          // Assign navigation manually after refs are set
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
