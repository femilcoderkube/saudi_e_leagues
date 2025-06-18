import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import CardTopLeftShap from "../../assets/images/card_top_left-shap.png";
import { baseURL } from "../../utils/axios.js";
import { getDayFromISO, getMonthAbbreviation } from "../../utils/constant.js";

// Animation variants for the card wrapper
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1, // Exit in reverse order
    },
  },
};

// Animation variants for individual cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.3 } },
};

const GameCard = ({ leagues }) => {
  const { id } = useParams();

  return (
    <motion.div
      className="game_card--wrapper flex flex-wrap pt-14 gap-[2.188rem]"
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
            to={item?._id ? `/${id}/lobby/${item._id}` : "#"}
            state={{ league: item }}
          >
            <div className="card_top_left-shap absolute top-0">
              <img src={CardTopLeftShap} alt="" style={{ width: "11.25rem" }} />
            </div>
            <div className="card_participants absolute z-40">
              <h3 className="part_number text-[2rem] !font-bold leading-tight">
                {item.totalRegistrations}
              </h3>
              <p className="text-sm purple_light font-medium">Participants</p>
            </div>
            <div className="game_card--body inline-block relative">
              <div className="game_img--mask sd_before before:w-full before:h-full relative">
                <motion.div
                  className="game_image"
                  layout // Smoothly animate image position
                >
                  <img
                    src={`${baseURL}/api/v1/${item.logo}`}
                    alt=""
                    style={{
                      width: "18.5rem",
                      height: "22.5rem",
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
                <div className="game_mask--con absolute bottom-0 h-full flex flex-col justify-between">
                  <h2 className="league_price text-[2rem] !font-bold font_oswald yellow_grad-bg grad_text-clip pl-5 pt-5">
                    ${item.prizepool}
                  </h2>
                  <h3 className="game_label text-[2rem] !font-bold uppercase leading-tight pl-5">
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
                    src={`${baseURL}/api/v1/${item.game.logo}`}
                    alt=""
                    style={{ width: "2.5rem", height: "2.5rem" }}
                  />
                  <div className="game_intro-con">
                    <p className="text-sm purple_light font-medium">Game</p>
                    <h4 className="text-xl !font-bold">{item.game.name}</h4>
                  </div>
                </div>
              </div>
              <div className="match_date relative bg-no-repeat">
                <h2 className="text-[2rem] match_date-con text-[3.25rem] text-right pr-4 !font-extrabold grad_text-clip">
                  {getDayFromISO(item.endDate)}
                </h2>
                <p className="text-sm purple_light font-medium text-right pr-4 uppercase">
                  {getMonthAbbreviation(item.endDate)}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GameCard;
