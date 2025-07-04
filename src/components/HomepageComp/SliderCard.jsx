// SliderCard.jsx
import React from "react";
import CardTopLeftShap from "../../assets/images/card_top_left-shap.png";
import { Link } from "react-router-dom";

const SliderCard = ({ item }) => {
  return (
    <div className="game_card--con slider_card p-5">
        <div className="card_top_left-shap absolute bottom-2 left-0">
          <img src={CardTopLeftShap} alt="" style={{ width: "11.25rem" }} />
        </div>
      <div className="game_card--body inline-block relative !m-0">
        <div className="game_img--mask relative sd_after sd_before mask-border">
          <div className="game_image mask_img-border flex sd_before before:w-full before:h-full  relative" style={{ width: "18.75rem", height: "22.5rem" }}>
            <img src={item.imgsrc} alt="" style={{ objectFit: "cover" }} className="w-full"/>
          </div>
          <div className="game_mask--con pt-3 absolute bottom-3 z-40 w-full">
            <Link to={item.path} className="game_card_wrap--link block ml-4 relative  uppercase text-xl  !font-bold sd_before">
               <span className="flex items-center gap-3"> Join Now 
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.4297 3.92999L18.4997 9.99999L12.4297 16.07" stroke="#F4F7FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.5 10H18.33" stroke="#F4F7FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
               </span>
            </Link>
            <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute" }}>
              <defs>
                <clipPath id="customHeaderClip" clipPathUnits="objectBoundingBox">
                  <path d="
                    M0.058,0 
                    H1 
                    V1 
                    H0 
                    V0.286 
                    L0.058,0 
                    Z
                  " />
                </clipPath>
              </defs>
            </svg>

          </div>
            <svg width="0" height="0" viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute" }}>
                <defs>
                    <clipPath id="slidercardClip" clipPathUnits="objectBoundingBox">
                    
                    <path transform="scale(0.00333, 0.00278)" d="M288 0V56L278 66L277 193L288 204L288.924 337.846V360H0V22.1543L23.0771 0H288ZM300 196L288 184.5V76L300 64V196Z"/>
                    </clipPath>
                </defs>
            </svg>

        </div>
      </div>
      <div className="game_card--footer absolute bottom-2 right-0 !m-0 flex justify-between items-center ">
          {item.gameLogo} 
      </div>
    </div>
  );
};

export default SliderCard;
