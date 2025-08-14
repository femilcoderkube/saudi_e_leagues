import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import CardTopLeftShap from "../../assets/images/card_top_left-shap.png";
import { baseURL } from "../../utils/axios.js";
import {
  cardVariants,
  containerVariants,
  formatAmountWithCommas,
  getDayFromISO,
  getMonthAbbreviation,
  getServerURL,
} from "../../utils/constant.js";
import { useTranslation } from "react-i18next";

const GameCardGridView = ({ leagues }) => {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <div className="game-card-wp">
    <motion.div
      className="game_card--wrapper flex flex-wrap pt-14 gap-y-2 md:gap-y-[2.188rem] gap-[1.626rem] justify-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout // Enable layout animations
    >
      {leagues.map((item, index) => (
        <motion.div
          key={item._id} // Unique key for each card
          variants={cardVariants}
          layout // Enable layout animations for repositioning
          className="game_card_wrap--link relative inline-block"
        >
          <Link
            to={item?._id ? item.isLeague ? `/${id}/lobby/${item._id}`: `/${id}/lobby/tournament/${item._id}` : "#"}
            state={{ league: item }}
          >
            <div className="card_top_left-shap absolute top-0">
              <img
                src={CardTopLeftShap}
                alt={t("images.card_top_left_shape")}
                className="w-[7rem] md:w-[11.25rem]"
              />
            </div>
            <div className="card_participants absolute z-10">
              <h3 className="part_number text-[1.5rem] md:text-[2rem] !font-bold leading-tight">
                {item.totalRegistrations}
              </h3>
              <p className="text-sm purple_light font-medium">
                {t("league.participants")}
              </p>
            </div>
            <div className="game_card--body inline-block relative">
              <div className="game_img--mask sd_before before:w-full before:h-full relative">
                <motion.div
                  className="game_image"
                  layout // Smoothly animate image position
                >
                  <img
                    src={getServerURL(item.logo)}
                    alt={t("images.game_logo")}
                    className="w-64 h-60 md:w-[18.5rem] md:h-[22.5rem] object-cover"
                  />
                </motion.div>
                <div className="game_mask--con absolute bottom-0 h-full flex flex-col justify-between">
                  <h2 className="league_price text-[2rem] !font-bold font_oswald yellow_grad-bg grad_text-clip pl-5 pt-5">
                    <span className="icon-saudi_riyal !p-0"></span>
                    {formatAmountWithCommas(item?.prizepool)}
                  </h2>
                  <h3 className="game_label text-[2rem] !font-bold uppercase leading-tight ltr:pl-5 rtl:pr-5">
                    {item.title}
                  </h3>
                </div>
                <svg
                  width="0"
                  height="0"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute" }}
                >
                  <defs>
                    <clipPath id="cardclip" clipPathUnits="objectBoundingBox">
                      <path
                        d="
                          M0.918918918918919 0.5333333333333333
                          L0.9594594594594594 0.5666666666666667
                          V1H0
                          V0.06805555555555555
                          L0.08108108108108109 0.001388888888888889
                          L0.918918918918919 0.00012207118055555556
                          V0.5333333333333333
                          Z
                          M1 0.5444444444444444
                          L0.9594594594594594 0.5111111111111111
                          V0.2111111111111111
                          H1
                          V0.5444444444444444
                          Z
                          M1 0
                          L0.918918918918919 0.00012207118055555556
                          V0
                          H1
                          Z
                        "
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="game_card--footer relative flex justify-between items-center">
              <div className="game_intro bg-no-repeat">
                <div className="game_intro-con flex gap-5 relative bottom-1">
                  <img
                    src={getServerURL(item.game.logo)}
                    alt={t("images.game_logo")}
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  />
                  <div className="game_intro-con">
                    <p className="text-sm purple_light font-medium">
                      {t("games.game")}
                    </p>
                    <h4 className="text-xl !font-bold">{item.game.shortName}</h4>
                  </div>
                </div>
              </div>
              <div className="match_date relative bg-no-repeat">
                <h2 className="text-[2rem] match_date-con md:text-[3.25rem] ltr:text-right rtl:text-left ltr:pr-4 rtl:pl-4 !font-extrabold grad_text-clip">
                  {getDayFromISO(item.endDate)}
                </h2>
                <p className="text-sm purple_light font-medium ltr:text-right rtl:text-left ltr:pr-4 rtl:pl-4 uppercase">
                  {getMonthAbbreviation(item.endDate)}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
    </div>
  );
};

export default GameCardGridView;
