// File: HtpCardSlider.jsx
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import HtpCard from "./HtpCard"; // uncomment if using your actual card

const HtpCard = ({ item }) => (

    <div  className="game_card_wrap--link relative inline-block w-full">                   
                    
        <div className="htp_card--body inline-block relative !m-0 p-5 w-full">
                <div className="game_mask--con pt-3 relative h-full flex flex-col justify-between w-full">
                    <h3 className="game_label !mb-0 text-2xl !font-bold uppercase leading-tight pl-5"> {item.gameLabel} </h3>
                </div>
                <svg width="0" height="0" viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute'}} >
                    <defs>
                        <clipPath id="customClipPath" clipPathUnits="userSpaceOnUse">
                        <path d="M484 368V268L516 236H588L600 224V160L588 148V108L600 96V24L576 0H24L0 24V180L8 188V252L0 260V360L8 368H268L280 380H472L484 368Z" />
                        </clipPath>
                    </defs>
                </svg>  
                {/* <div className="game_card--footer !m-0 flex justify-between items-center ">                        
                    <div className="match_date absolute right-[0] bottom-[0.3rem] bg-no-repeat">                    
                        <p className='text-xs purple_light font-medium  text-center'>Ends:</p>               
                        <h2 className="text-[2rem] match_date-con pt-1 pb-1  text-center !font-extrabold grad_text-clip">{item.Step}</h2>     
                        <p className='text-xs purple_light font-medium  text-center uppercase'>Step</p>               
                    </div>
                </div> */}
        </div>
    </div>
);

const HtpCardSlider = ({ HtpCardDetails = [], sliderId = "" }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper && swiper.params && swiper.navigation) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <div className="relative htp_slider h-full">
      {/* Custom Nav */}
      <div className="swiper-navigation-wrapper absolute right-0 top-[-5rem] z-10 flex gap-2 pr-[7.5rem]">
        <div
          ref={prevRef}
          className={`swiper-button-prev sd_prev-${sliderId} sd_prev-btn !relative !left-[auto] !right-[0.5rem] custom-nav-btn`}
        />
        <div
          ref={nextRef}
          className={`swiper-button-prev sd_next-${sliderId} sd_next-btn !relative !right-[auto] custom-nav-btn`}
        />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2.5}
        loop={true}
        speed={600}
        // slidesOffsetAfter={-200} 
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
