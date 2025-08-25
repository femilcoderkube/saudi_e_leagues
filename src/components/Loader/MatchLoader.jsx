import React, { useEffect } from "react";
import "../../assets/css/Matchmaking.css";
import one_vs_one from "../../assets/images/1-vs-1.png";
import blue_right from "../../assets/images/blue_right_bg.png";
import pink_left from "../../assets/images/pink_left_bg.png";
import vs_animate from "../../assets/images/vs_animate.png";
import { motion, useAnimation } from "motion/react";

const MatchLoader = () => {
  const controls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      // fade in once after delay
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { delay: 1, duration: 0.8, ease: "easeOut" },
      });

      // then run infinite pulse
      controls.start({
        opacity: [1, 0.85, 1],
        scale: [1, 1.08, 1],
        rotate: [0, 1.5, -1.5, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      });
    };

    startAnimation();
  }, [controls]);

  return (
    <div className="flex-1 flex flex-col sd_main-content relative bg-[#020326] rounded-b-[0] z-20">
      <main className="flex-1 match_loading--wrapper overflow-hidden relative ">
        <div className="loading-not-finish-wp h-[88%] flex justify-center items-center">
          {/* Pink background */}
          <motion.img
            className="pink-left absolute left-0 top-0 w-full sm:h-[88%] h-[92%]"
            src={pink_left}
            alt=""
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Blue background */}
          <motion.img
            className="blue-right absolute right-0 top-0 w-[67%] sm:h-[88%] h-[92%]"
            src={blue_right}
            alt=""
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* VS image */}
          <motion.img
            className="vs-in relative md:-left-3 one-vs-one h-[15.5rem] sm:h-[18rem] md:h-[20rem] lg:h-[22rem] z-100"
            src={one_vs_one}
            alt=""
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              type: "spring",
              stiffness: 120,
            }}
          />

          {/* Smooth glow without blink */}
          <motion.img
            className="animate-vs absolute left-0 top-0 w-full sm:h-[88%] h-[92%] pointer-events-none"
            src={vs_animate}
            alt=""
            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
          />
        </div>
      </main>
    </div>
  );
};

export default MatchLoader;
