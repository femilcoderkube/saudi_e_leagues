import React from "react";
import { motion } from "motion/react";
import Playbtn from "../../../assets/images/playbtn.png";
import { rightToLeft } from "../../Animation/animation.jsx";
import { useTranslation } from "react-i18next";

const Video = React.memo(({ onPlayVideo }) => {
    const { t } = useTranslation();

    const ANIMATION_VIEWPORT_CONFIG = { once: true, amount: 0.4 };

    return (
        <motion.div
            className="about_right--con w-full sd_before sd_after relative"
            variants={rightToLeft}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={ANIMATION_VIEWPORT_CONFIG}
        >
            <div className="sd_play-link relative sd_before before:w-full before:h-full flex flex-col items-center h-full justify-center">
                <button
                    onClick={onPlayVideo}
                    className="dropdown-header relative hover:opacity-70 duration-400 flex flex-col items-center cursor-pointer bg-transparent border-none"
                >
                    <img
                        src={Playbtn}
                        alt={t("images.play_button")}
                        style={{ width: "9rem" }}
                    />
                    <span className="md:text-2xl text-lg font-semibold purple_col">
                        {t("homepage.watch_video")}
                    </span>
                </button>
            </div>
        </motion.div>
    );
});

export default Video;
