import React from "react";
import CardTopLeftShap from "../../assets/images/card_top_left-shap.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setActiveTabIndex } from "../../app/slices/constState/constStateSlice";
import { useDispatch } from "react-redux";

const SliderCard = ({ item }) => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="game_card--con slider_card p-3" onClick={()=>{
      navigate(`/${params.id}/lobby`);
      dispatch(setActiveTabIndex(0));
    }}>
      <div className="card_top_left-shap absolute bottom-2 ltr:left-0 rtl:right-0">
        <img
          src={CardTopLeftShap}
          alt={t("images.card_top_left_shape")}
          style={{ width: "11.25rem" }}
        />
      </div>
      <div className="game_card--body inline-block relative !m-0">
        <div className="game_img--mask relative sd_after sd_before mask-border">
          <div
            className="game_image mask_img-border flex sd_before before:w-full before:h-full  relative"
            style={{  width: "100%", height: "auto" }}
          >
            <img
              src={item.imgsrc}
              alt={t("images.game_image")}
              style={{ objectFit: "cover" }}
              className="w-full"
            />
          </div>
          <div className="game_mask--con pt-3 absolute bottom-3 z-40 w-full">
            <Link
              to={item.path}
              className="game_card_wrap--link block ml-4 relative  uppercase md:text-xl text-base sm:text-lg !font-bold sd_before"
            >
              <span className="flex items-center gap-3">
                {" "}
                {t("homepage.join_now")}
                <svg
                  width="1.25rem"
                  height="1.25rem"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4297 3.92999L18.4997 9.99999L12.4297 16.07"
                    stroke="#F4F7FF"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.5 10H18.33"
                    stroke="#F4F7FF"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <svg
              width="0"
              height="0"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath
                  id="customHeaderClip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    d="
                    M0.058,0 
                    H1 
                    V1 
                    H0 
                    V0.286 
                    L0.058,0 
                    Z
                  "
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <svg
            width="0"
            height="0"
            viewBox="0 0 300 360"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute" }}
          >
            <defs>
              <clipPath id="slidercardClip" clipPathUnits="objectBoundingBox">
                <path
                  transform="scale(0.00333, 0.00278)"
                  d="M288 0V56L278 66L277 193L288 204L288.924 337.846V360H0V22.1543L23.0771 0H288ZM300 196L288 184.5V76L300 64V196Z"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="game_card--footer absolute bottom-2 ltr:right-0 rtl:left-0 !m-0 flex justify-between items-center ">
      <img
              src={item.gameLogo}
              alt={t("images.game_image")}
              style={{ objectFit: "contain", width: "2.5rem", height: "2.5rem" }}
              className="w-full h-full"
            />
      </div>
    </div>
  );
};

export default SliderCard;
