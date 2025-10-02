import React from "react";
import splitBGOne from "../../../assets/images/splitBG_1.webp";
import splitBGTwo from "../../../assets/images/spilit-purple-bg.webp";
import splitBGThree from "../../../assets/images/spilit-orange-bg.webp";
import splitBGFour from "../../../assets/images/spilit-pink-bg.webp";
import { SparkIcon } from "../../ui/svg";
import spilit_1 from "../../../assets/images/spilit1.webp";
import spilit_2 from "../../../assets/images/spilit2.webp";
import spilit_3 from "../../../assets/images/spilit3.webp";
import spilit_4 from "../../../assets/images/spilit4.webp";
import { motion } from "motion/react";
// card animation start
const leftToRight = {
  hidden: { opacity: 0, x: -100 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 60,
    },
  }),
};

const rightToLeft = {
  hidden: { opacity: 0, x: 100 },
  visible: (i = 1) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 60,
    },
  }),
};
// card animation end
const TimelineCard_1 = () => {
  return (
    <div className="home_timecard grid grid-cols-2 gap-x-8 gap-y-10">
      <motion.div
        className="split_card--wrap relative sd_before sd_after polygon_border inline-block"
        variants={leftToRight}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="spilit-card-polygon w-full absolute h-full"></div>
        <div className="split_card--body relative">
          <div
            className="absolute split_card--bg w-full h-full z-9"
            style={{
              background: `url(${splitBGOne})`,
              backgroundSize: "auto",
              backgroundPosition: "left",
              opacity: "0.5",
            }}
          ></div>
          <img
            className="spilit-img absolute ltr:-right-14 rtl:-left-14 -top-3 h-[22rem] z-10"
            src={spilit_1}
            alt=""
          />
          <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
            <div className="relative -z-1 split_card-num pt-7">
              <svg
                className="absolute"
                width="0"
                height="0"
                viewBox="0 0 360 128"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="customClip">
                    <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                  </clipPath>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="#88C6F3"
                  clip-path="url(#customClip)"
                />
              </svg>
              {/* fliped  */}
              <p className="flex items-center sm:gap-5 gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <span className="sm:text-[7.35rem] text-[5rem] purple_grad-col grad_text-clip font-black">
                  01
                </span>
                <span className="uppercase text-[#B0D0F1] sm:text-[2.501rem] text-[2rem] sm:-mt-4 -mt-2 font-black">
                  Split
                </span>
              </p>
            </div>
            <div className="spilit_head-wp pb-3">
              <div className="split_head-con flex sm:justify-between gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4 border-b border-[#ffffff1f] pb-3">
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Division 1
                  </span>
                </p>
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Championship 1
                  </span>
                </p>
              </div>
              <div className="split_date-wrap flex sm:justify-between sm:gap-3 gap-1 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">6</span>{" "}
                    Apr
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">4</span>{" "}
                    Jun
                  </p>
                </div>
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">11</span>{" "}
                    May
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">19</span>{" "}
                    Jun
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- card svg clip path here --- */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 660 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute" }}
        >
          <defs>
            <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.001515, 0.003125)"
                d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z"
              />
            </clipPath>
          </defs>
        </svg>
        {/* flipped svg */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 660 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute" }}
        >
          <defs>
            <clipPath id="splitcardclip1" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(-0.001515, 0.003125) translate(-660, 0)"
                d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z"
              />
            </clipPath>
          </defs>
        </svg>
      </motion.div>
      <motion.div
        className="split_card--wrap-purple split_card--wrap relative sd_before sd_after polygon_border inline-block"
        variants={rightToLeft}
        custom={1} // delay: 1 * 0.2 = 0.2s
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="spilit-card-polygon w-full absolute h-full"></div>
        <div className="split_card--body relative">
          <div
            className="absolute split_card--bg w-full h-full z-9"
            style={{
              background: `url(${splitBGTwo})`,
              backgroundSize: "auto",
              backgroundPosition: "left",
              opacity: "0.5",
            }}
          ></div>
          <img
            className="spilit-img absolute ltr:-right-14 rtl:-left-14 -top-3 h-[22rem] z-10"
            src={spilit_2}
            alt=""
          />
          <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
            <div className="relative -z-1 split_card-num pt-7">
              <svg
                className="absolute"
                width="0"
                height="0"
                viewBox="0 0 360 128"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="customClip">
                    <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                  </clipPath>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="#88C6F3"
                  clip-path="url(#customClip)"
                />
              </svg>
              <p className="flex items-center sm:gap-5 gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <span className="sm:text-[7.35rem] text-[5rem] purple_grad-col grad_text-clip font-black">
                  02
                </span>
                <span className="uppercase text-[#C5B9F4] text-[2.501rem] -mt-4 font-black">
                  Split
                </span>
              </p>
            </div>
            <div className="spilit_head-wp pb-3">
              <div className="split_head-con flex sm:justify-between gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4 border-b border-[#ffffff1f] pb-3">
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Division 2
                  </span>
                </p>
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Championship 2
                  </span>
                </p>
              </div>
              <div className="split_date-wrap flex sm:justify-between sm:gap-3 gap-1 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">6</span>{" "}
                    Apr
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">4</span>{" "}
                    Jun
                  </p>
                </div>
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">11</span>{" "}
                    May
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">19</span>{" "}
                    Jun
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- card svg clip path here --- */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 660 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute" }}
        >
          <defs>
            <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.001515, 0.003125)"
                d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z"
              />
            </clipPath>
          </defs>
        </svg>
      </motion.div>
      <motion.div
        className="split_card--wrap-orange split_card--wrap relative sd_before sd_after polygon_border inline-block"
        variants={leftToRight}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="spilit-card-polygon w-full absolute h-full"></div>
        <div className="split_card--body relative">
          <div
            className="absolute split_card--bg w-full h-full z-9"
            style={{
              background: `url(${splitBGThree})`,
              backgroundSize: "auto",
              backgroundPosition: "left",
              opacity: "0.5",
            }}
          ></div>
          <img
            className="spilit-img absolute ltr:-right-14 rtl:-left-14 -top-3 h-[22rem] z-10"
            src={spilit_3}
            alt=""
          />
          <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
            <div className="relative -z-1 split_card-num pt-7">
              <svg
                className="absolute"
                width="0"
                height="0"
                viewBox="0 0 360 128"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="customClip">
                    <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                  </clipPath>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="#88C6F3"
                  clip-path="url(#customClip)"
                />
              </svg>
              <p className="flex items-center sm:gap-5 gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <span className="sm:text-[7.35rem] text-[5rem] purple_grad-col grad_text-clip font-black">
                  03
                </span>
                <span className="uppercase text-[#F1D3B0] text-[2.501rem] -mt-4 font-black">
                  Split
                </span>
              </p>
            </div>
            <div className="spilit_head-wp pb-3">
              <div className="split_head-con flex sm:justify-between gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4 border-b border-[#ffffff1f] pb-3">
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Division 3
                  </span>
                </p>
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Championship 3
                  </span>
                </p>
              </div>
              <div className="split_date-wrap flex sm:justify-between sm:gap-3 gap-1 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">6</span>{" "}
                    Apr
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">4</span>{" "}
                    Jun
                  </p>
                </div>
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">11</span>{" "}
                    May
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">19</span>{" "}
                    Jun
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- card svg clip path here --- */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 660 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute" }}
        >
          <defs>
            <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.001515, 0.003125)"
                d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z"
              />
            </clipPath>
          </defs>
        </svg>
      </motion.div>
      <motion.div
        className="split_card--wrap-pink split_card--wrap relative sd_before sd_after polygon_border inline-block"
        variants={rightToLeft}
        custom={4} // delay: 1 * 0.2 = 0.2s
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="spilit-card-polygon w-full absolute h-full"></div>
        <div className="split_card--body relative">
          <div
            className="absolute split_card--bg w-full h-full z-9"
            style={{
              background: `url(${splitBGFour})`,
              backgroundSize: "auto",
              backgroundPosition: "left",
              opacity: "0.5",
            }}
          ></div>
          <img
            className="spilit-img absolute ltr:-right-14 rtl:-left-14 -top-3 h-[22rem] z-10"
            src={spilit_4}
            alt=""
          />
          <div className="split_card--con relative z-20 w-[26.25rem] h-full flex flex-col justify-between pb-5">
            <div className="relative -z-1 split_card-num pt-7">
              <svg
                className="absolute"
                width="0"
                height="0"
                viewBox="0 0 360 128"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="customClip">
                    <path d="M0 128V24L24 0H360V20L352 28V52L360 60V88L336 112H16L0 128Z" />
                  </clipPath>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="#88C6F3"
                  clip-path="url(#customClip)"
                />
              </svg>
              <p className="flex items-center sm:gap-5 gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <span className="sm:text-[7.35rem] text-[5rem] purple_grad-col grad_text-clip font-black">
                  04
                </span>
                <span className="uppercase text-[#F1B0BB] text-[2.501rem] -mt-4 font-black">
                  Split
                </span>
              </p>
            </div>
            <div className="spilit_head-wp pb-3">
              <div className="split_head-con flex sm:justify-between gap-3 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4 border-b border-[#ffffff1f] pb-3">
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Division 4
                  </span>
                </p>
                <p className="flex sm:gap-3 gap-2 sm:text-xl text-base items-center">
                  <SparkIcon gradientColor="#D8DAFF" />
                  <span className="text-[#C0DEFF] font-semibold">
                    Championship 4
                  </span>
                </p>
              </div>
              <div className="split_date-wrap flex sm:justify-between sm:gap-3 gap-1 ltr:sm:pl-10 ltr:pl-4 rtl:sm:pr-10 rtl:pr-4">
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">6</span>{" "}
                    Apr
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">4</span>{" "}
                    Jun
                  </p>
                </div>
                <div className="split_date relative flex items-center">
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">11</span>{" "}
                    May
                  </p>
                  <span className="sm:w-3 w-2 sm:h-[0.188rem] h-[0.1444rem] bg-[#C0DEFF]"></span>
                  <p className="flex gap-2 sm:text-xl text-base p-2 sm:px-2 px-1 items-center !font-bold">
                    <span className="!font-black sm:text-2xl text-xl">19</span>{" "}
                    Jun
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- card svg clip path here --- */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 660 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute" }}
        >
          <defs>
            <clipPath id="splitcardclip" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.001515, 0.003125)"
                d="M660 308V244L648 232V192L660 180V12L648 0H24L0 24V160L8 168V232L0 240V300L8 308H228L240 320H648L660 308Z"
              />
            </clipPath>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};

export default TimelineCard_1;
