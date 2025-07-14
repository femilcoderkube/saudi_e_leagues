import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import { DownArrow } from "../ui/svg/index.jsx";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(0); // 👈 default to 0 for first open
  let data = [1, 2, 3, 4, 5, 6];
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div
        className={`transition-colors faq_accordion px-8 mb-4 py-2 ${
          openIndex == 0 ? "active_accordion" : ""
        }`}
      >
        <button
          onClick={() => toggleAccordion(0)}
          className="w-full faq_head-con text-left py-3 font-semibold text-lg purple_light flex justify-between items-center"
        >
          {t("homepage.faq.q1")}
        </button>
        <div
          className={`pt-3 overflow-hidden transition-all text-base duration-300 ease-in-out pr-[5rem] ${
            openIndex == 0 ? "max-h-40 py-3" : "max-h-0"
          }`}
        >
          <p className="purple_col text-base">{t("homepage.faq.a1")}</p>
        </div>
      </div>
      <div
        className={`transition-colors faq_accordion px-8 mb-4 py-2 ${
          openIndex == 1 ? "active_accordion" : ""
        }`}
      >
        <button
          onClick={() => toggleAccordion(1)}
          className="w-full faq_head-con text-left py-3 font-semibold text-lg purple_light flex justify-between items-center"
        >
          {t("homepage.faq.q2")}
        </button>
        <div
          className={`pt-3 overflow-hidden transition-all text-base duration-300 ease-in-out pr-[5rem] ${
            openIndex == 1 ? "max-h-40 py-3" : "max-h-0"
          }`}
        >
          <p className="purple_col text-base">{t("homepage.faq.a2")}</p>
        </div>
      </div>
      <div
        className={`transition-colors faq_accordion px-8 mb-4 py-2 ${
          openIndex == 2 ? "active_accordion" : ""
        }`}
      >
        <button
          onClick={() => toggleAccordion(2)}
          className="w-full faq_head-con text-left py-3 font-semibold text-lg purple_light flex justify-between items-center"
        >
          {t("homepage.faq.q3")}
        </button>
        <div
          className={`pt-3 overflow-hidden transition-all text-base duration-300 ease-in-out pr-[5rem] ${
            openIndex == 2 ? "max-h-40 py-3" : "max-h-0"
          }`}
        >
          <p className="purple_col text-base">{t("homepage.faq.a3")}</p>
        </div>
      </div>
      <div
        className={`transition-colors faq_accordion px-8 mb-4 py-2 ${
          openIndex == 3 ? "active_accordion" : ""
        }`}
      >
        <button
          onClick={() => toggleAccordion(3)}
          className="w-full faq_head-con text-left py-3 font-semibold text-lg purple_light flex justify-between items-center"
        >
          {t("homepage.faq.q4")}
        </button>
        <div
          className={`pt-3 overflow-hidden transition-all text-base duration-300 ease-in-out pr-[5rem] ${
            openIndex == 3 ? "max-h-40 py-3" : "max-h-0"
          }`}
        >
          <p className="purple_col text-base">{t("homepage.faq.a4")}</p>
        </div>
      </div>
      <div
        className={`transition-colors faq_accordion px-8 mb-4 py-2 ${
          openIndex == 4 ? "active_accordion" : ""
        }`}
      >
        <button
          onClick={() => toggleAccordion(4)}
          className="w-full faq_head-con text-left py-3 font-semibold text-lg purple_light flex justify-between items-center"
        >
          {t("homepage.faq.q5")}
        </button>
        <div
          className={`pt-3 overflow-hidden transition-all text-base duration-300 ease-in-out pr-[5rem] ${
            openIndex == 4 ? "max-h-40 py-3" : "max-h-0"
          }`}
        >
          <p className="purple_col text-base">{t("homepage.faq.a5")}</p>
        </div>
      </div>
      <div
        className={`transition-colors faq_accordion px-8 mb-4 py-2 ${
          openIndex == 5 ? "active_accordion" : ""
        }`}
      >
        <button
          onClick={() => toggleAccordion(5)}
          className="w-full faq_head-con text-left py-3 font-semibold text-lg purple_light flex justify-between items-center"
        >
          {t("homepage.faq.q6")}
        </button>
        <div
          className={`pt-3 overflow-hidden transition-all text-base duration-300 ease-in-out pr-[5rem] ${
            openIndex == 5 ? "max-h-40 py-3" : "max-h-0"
          }`}
        >
          <p className="purple_col text-base">{t("homepage.faq.a6")}</p>
        </div>
      </div>
      <div
        className={`transition-colors faq_accordion px-8 mb-4 py-2 ${
          openIndex == 6 ? "active_accordion" : ""
        }`}
      >
        <button
          onClick={() => toggleAccordion(5)}
          className="w-full faq_head-con text-left  py-3 font-semibold text-lg purple_light flex justify-between items-center"
        >
          {t("homepage.faq.q7")}
        </button>
        <div
          className={`pt-3 overflow-hidden transition-all text-base duration-300 ease-in-out pr-[5rem] ${
            openIndex == 6 ? "max-h-40 py-3" : "max-h-0"
          }`}
        >
          <p className="purple_col text-base">{t("homepage.faq.a7")}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
