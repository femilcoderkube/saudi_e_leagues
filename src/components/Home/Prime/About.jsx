import React from "react";
import { motion } from "motion/react";

import Primetxt from "../../../assets/images/Prime.png";
import { leftToRight } from "../../Animation/animation.jsx";
import { useTranslation } from "react-i18next";

const About = React.memo(() => {
    const { t } = useTranslation();

    const ANIMATION_VIEWPORT_CONFIG = { once: true, amount: 0.4 };

    return (
        <motion.div
            className="about_left--con max-w-[45%]"
            variants={leftToRight}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={ANIMATION_VIEWPORT_CONFIG}
        >
            <h3 className="md:text-[2.375rem] text-2xl uppercase !font-black mb-5">
                {t("homepage.about")}
            </h3>
            <img
                src={Primetxt}
                alt={t("images.prime_logo")}
                style={{ width: "42.5rem" }}
            />
            <div className="about-con">
                <h4 className="purple_light md:text-2xl text-lg md:pb-5 pb-4 !font-semibold mt-[-1rem]">
                    <span className="uppercase !font-bold sky_col">Prime </span>{" "}
                    {t("homepage.prime_description_1")}
                </h4>
                <p className="md:text-xl text-base purple_col md:mb-12 mb-8">
                    {t("homepage.prime_description_2")}
                </p>
                <h4 className="purple_light md:text-2xl text-lg  md:pb-5 pb-4 !font-semibold">
                    {t("homepage.prime_description_3")}
                </h4>
                <p className="md:text-xl text-base purple_col">
                    {t("homepage.prime_description_4")}
                </p>
                <h4 className="purple_light md:text-2xl text-lg  md:pb-5 pb-4 !font-semibold md:mt-10 mt-8">
                    {t("homepage.prime_description_5")}
                </h4>
            </div>
        </motion.div>
    );
});

export default About;
