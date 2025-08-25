import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { setActiveTabIndex } from "../../app/slices/constState/constStateSlice";
import { leftToRight } from "../../components/Animation/animation.jsx";
import GetStartedBtn from "../../assets/images/get_started_btn.png";
import GetStartedBtnAr from "../../assets/images/get_started_btn_ar.png";
import GetStartedBtnAr_1 from "../../assets/images/mobile_get_start_ar.png";
import GetStartedBtn_1 from "../../assets/images/mob_start_btn.png";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeroLeftSection = React.memo(({ id }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ANIMATION_VIEWPORT_CONFIG = { once: true, amount: 0.4 };

    const handleGetStartedClick = useCallback(() => {
        dispatch(setActiveTabIndex(0));
        navigate(`/${id}/lobby`);
    }, [dispatch, navigate, id]);

    const getStartedImage = useMemo(() => {
        return i18n.language === "ar" ? GetStartedBtnAr : GetStartedBtn;
    }, [i18n.language]);

    const mobileGetStartedImage = useMemo(() => {
        return i18n.language === "ar" ? GetStartedBtnAr_1 : GetStartedBtn_1;
    }, [i18n.language]);

    return (
        <motion.div
            className="home_hero_left-con h-full flex justify-end flex-col"
            variants={leftToRight}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={ANIMATION_VIEWPORT_CONFIG}
        >
            <h3 className="xl:text-[2.375rem] text-[1.75rem] uppercase !font-black">
                {t("homepage.level_up")}
            </h3>
            <h1 className="flex xl:text-[4rem] text-[2.88rem] gap-3 uppercase leading-none mb-2 items-center tracking-wide !font-black">
                {t("homepage.your_game")} -
                <span className="xl:text-[1.75rem] text-[1.25rem] leading-none">
                    {t("homepage.join")} <br />
                    {t("homepage.epic")}
                </span>
            </h1>
            <h2 className="xl:text-[4rem] text-[3rem] uppercase leading-none items-center tracking-wider !font-black">
                {t("homepage.matchmaking")}
            </h2>
            <p className="purple_col lg:text-2xl md:text-[1.07rem] font-semibold pt-7 pb-5 md:pt-10 md:pb-10">
                {t("homepage.tagline")}
            </p>
            <div
                onClick={handleGetStartedClick}
                className="ml-[-0.5rem] hover:opacity-70 duration-300"
            >
                <img
                    className="hidden md:inline-block"
                    src={getStartedImage}
                    alt={t("images.get_started_button")}
                    style={{ width: "21rem" }}
                />
                <img
                    className="md:hidden inline-block"
                    src={mobileGetStartedImage}
                    alt={t("images.get_started_button")}
                />
            </div>
        </motion.div>
    );
});

export default HeroLeftSection;
