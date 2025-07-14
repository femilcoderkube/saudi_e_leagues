import { useState } from "react";
import rules_icon from "../../assets/images/rules_icon.png";
import PdfModal from "./PdfModal";
import { useTranslation } from "react-i18next";

function PopUp() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { t } = useTranslation();

  return (
    <>
      {/* Trigger button */}
      <div className="sd_rules--btn md:mb-10">
        <button
          onClick={handleOpen}
          className="timeline-card__header w-full mt-5 flex items-center gap-3 rounded-xl cursor-pointer relative sd_before sd_after px-4 py-[1.4rem] bg-white hover:bg-gray-100 transition-colors"
        >
          <img
            src={rules_icon}
            alt={t("images.rules_icon")}
            style={{ width: "1.75rem" }}
          />
          <h3 className="timeline-card__title text-base sm:text-xl font_oswald">
            {t("rules.rules_and_regulations")}
          </h3>
        </button>
      </div>

      {/* Modal */}
      {showModal && <PdfModal onClose={handleClose} />}
    </>
  );
}

export default PopUp;
