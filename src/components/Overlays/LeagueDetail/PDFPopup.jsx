import { useState } from "react";
import PDFViewer from "./PDFViewer";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../ui/images/images";

function PDFPopup() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { t } = useTranslation();

  return (
    <>
      {/* Trigger button */}
      <div className="sd_rules--btn md:mb-10 mb-8 md:order-1 order-2">
        <button
          onClick={handleOpen}
          className="timeline-card__header w-full md:mt-5 flex items-center gap-3 rounded-xl cursor-pointer relative sd_before sd_after px-4 py-[1.4rem] bg-white hover:bg-gray-100 transition-colors"
        >
          <img
            src={IMAGES.rules_icon}
            alt={t("images.rules_icon")}
            style={{ width: "1.75rem" }}
          />
          <h3 className="timeline-card__title text-base sm:text-xl font_oswald">
            {t("rules.rules_and_regulations")}
          </h3>
        </button>
      </div>

      {/* Modal */}
      {showModal && <PDFViewer onClose={handleClose} />}
    </>
  );
}

export default PDFPopup;
