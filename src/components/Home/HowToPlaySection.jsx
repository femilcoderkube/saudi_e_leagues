import React, { useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import GameStepsSlider from "./GameStepsSlider.jsx";
import { leftToRight, rightToLeft } from "../../components/Animation/animation.jsx";
import { logout } from "../../app/slices/auth/authSlice.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const HowToPlaySection = React.memo(() => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const ANIMATION_VIEWPORT_CONFIG = { once: true, amount: 0.4 };

    const handleGoPlayNow = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const howToPlayCards = useMemo(
        () => [
            {
                gameLabel: t("games.game_1"),
                gameName: t("games.valorant"),
                gameDiscription: t("games.disc_1"),
                Step: "01",
            },
            {
                gameLabel: t("games.game_2"),
                gameName: t("games.dota2"),
                gameDiscription: t("games.disc_2"),
                Step: "02",
            },
            {
                gameLabel: t("games.game_3"),
                gameName: t("games.csgo"),
                gameDiscription: t("games.disc_3"),
                Step: "03",
            },
            {
                gameLabel: t("games.game_4"),
                gameName: t("games.apex"),
                gameDiscription: t("games.disc_4"),
                Step: "04",
            },
        ],
        [t]
    );

    const alternateHowToPlayCards = useMemo(
        () => [
            {
                gameLabel: t("games.game_2"),
                gameName: t("games.dota2"),
                Step: "02",
            },
            {
                gameLabel: t("games.game_3"),
                gameName: t("games.csgo"),
                Step: "03",
            },
            {
                gameLabel: t("games.game_4"),
                gameName: t("games.apex"),
                gameDiscription: t("games.disc_4"),
                Step: "04",
            },
            {
                gameLabel: t("games.game_1"),
                gameName: t("games.valorant"),
                gameDiscription: t("games.disc_1"),
                Step: "01",
            },
            {
                gameLabel: t("games.game_2"),
                gameName: t("games.dota2"),
                Step: "02",
            },
        ],
        [t]
    );

    return (
        <section className="htp_slider-sec flex xl:gap-0 sm:gap-10 gap-0 ">
            {/* Left content */}
            <motion.div
                className="htp_left-con h-full flex justify-end flex-col max-w-[27.5%] basis-[27.5%]"
                variants={leftToRight}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={ANIMATION_VIEWPORT_CONFIG}
            >
                <h2 className="grad_head--txt max-w-full xl:text-[5rem] text-[3rem] tracking-wide !font-black leading-none uppercase">
                    {t("homepage.how")}
                </h2>
                <h2 className="xl:text-[4rem] lg:text-[3.5rem] text-[2.5rem] mt-[-1rem] grad_text-clip uppercase leading-none items-center tracking-wider !font-black md:pb-10 pb-8">
                    {t("homepage.to_play")}
                </h2>
                <div className="btn_polygon--mask sm:inline-flex hidden max-w-[fit-content] justify-center my-6 sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
                    <div
                        className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
                        onClick={handleGoPlayNow}
                    >
                        {t("homepage.go_play_now")}
                    </div>
                </div>
                {/* SVG for clip path */}
                <svg
                    width="0"
                    height="0"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute" }}
                >
                    <defs>
                        <clipPath id="polygonClip" clipPathUnits="objectBoundingBox">
                            <path
                                d="
                 M1,0.1111
                 V0.8889
                 L0.9219,1
                 H0.7266
                 L0.6953,0.9028
                 H0.3047
                 L0.2734,1
                 H0.0781
                 L0,0.8889
                 V0.1111
                 L0.0781,0
                 H0.2734
                 L0.3047,0.0972
                 H0.6953
                 L0.7266,0
                 H0.9219
                 L1,0.1111
                 Z
               "
                            />
                        </clipPath>
                    </defs>
                </svg>
            </motion.div>

            <motion.div
                className="htp_right-con relative max-w-[75%] basis-[72.5%]"
                variants={rightToLeft}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={ANIMATION_VIEWPORT_CONFIG}
            >
                <GameStepsSlider
                    sliderId="one"
                    mainSteps={howToPlayCards}
                    secondarySteps={alternateHowToPlayCards}
                />
            </motion.div>

            <div className="btn_polygon--mask how-to-play-mb-btn inline-flex sm:hidden  max-w-[fit-content] justify-center relative hover:opacity-70 duration-400">
                <Link
                    to={"#"}
                    className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
                >
                    {t("homepage.go_play_now")}
                </Link>
            </div>

            <svg
                width="0"
                height="0"
                style={{ position: "absolute" }}
                viewBox="0 0 182 52"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <clipPath id="customClipPathmob" clipPathUnits="objectBoundingBox">
                        <path d="M1,0.1538 V1 H0.04396 L0,0.8462 V0.07692 L0.02198,0 H0.95604 L1,0.1538 Z" />
                    </clipPath>
                </defs>
            </svg>
        </section>
    );
});

export default HowToPlaySection;
