import React from "react";
import { motion } from "framer-motion";
import Accordation from "../Accordation.jsx";
import { leftToRight, rightToLeft } from "../../Animation/animation.jsx";
import { useTranslation } from "react-i18next";

const Faqs = () => {
    const { t } = useTranslation();

    return (
        <section className="home_faq--sec pt-[5rem] pb-[5rem] pl-[7.5rem] relative flex justify-end ">
            <motion.div
                className="faq_left--con w-full absolute ltr:left-0 rtl:right-0 h-full top-[2rem]"
                variants={leftToRight}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            ></motion.div>

            <motion.div
                className="faq_right--con max-w-[65%] flex-[0_0_65%] ltr:pr-[6.5rem] rtl:pr-[8.5rem] relative"
                variants={rightToLeft}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            >
                <h2 className="md:text-[4rem] text-[2rem] purple_grad-col mt-[-1rem] grad_text-clip leading-none items-center tracking-wider !font-black md:pb-10 pb-8">
                    {t("homepage.faq.faq")}
                </h2>
                <div className="sd_faq-con">
                    <Accordation />
                </div>
            </motion.div>
        </section>
    );
};

export default React.memo(Faqs);
