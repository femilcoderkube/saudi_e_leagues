import React from "react";
import { motion } from "motion/react";
import { rightToLeft } from "../../components/Animation/animation.jsx";
import { useTranslation } from "react-i18next";
import HeroCardSlider from "./HeroCardSlider.jsx";

const HeroRightSection = React.memo(() => {
    const { t } = useTranslation();

    const ANIMATION_VIEWPORT_CONFIG = { once: true, amount: 0.4 };

    return (
        <motion.div
            className="home_hero_right-con h-full relative"
            variants={rightToLeft}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={ANIMATION_VIEWPORT_CONFIG}
        >
            <div className="slider_header--con md:pb-[2.2rem] pb-8 md:inline-block flex gap-1">
                <h3 className="purple_col md:text-lg text-2xl !font-black leading-none text-right uppercase">
                    {t("homepage.choose_your")}
                </h3>
                <h2 className="md:text-[4rem] text-2xl !font-black leading-none">
                    {t("homepage.game")}
                </h2>
            </div>
            <HeroCardSlider />
        </motion.div>
    );
});

export default HeroRightSection;
