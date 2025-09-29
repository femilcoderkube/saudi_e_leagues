import { useState } from "react";
import PDFViewer from "./PDFViewer";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../ui/images/images";

function DiscordPopup() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { t } = useTranslation();

  return (
    <>
      {/* Trigger button */}
      <div className="sd_rules--btn md:mb-10 md:order-1 order-2">
        <a
          href="https://discord.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="timeline-card__header w-full md:mt-5 flex items-center gap-3 rounded-xl cursor-pointer relative sd_before sd_after px-2 py-[1rem] bg-white hover:bg-gray-100 transition-colors"
        >
          <span className="icon-discord flex items-center justify-center rounded-lg md:w-12 md:h-12 w-10 h-10 bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
            <img src={IMAGES.discord} />
          </span>
          <h3 className="timeline-card__title text-base sm:text-xl font_oswald">
            {t("rules.discord_support")}
          </h3>
        </a>
      </div>

      {/* Modal */}
      {showModal && <PDFViewer onClose={handleClose} />}
    </>
  );
}

export default DiscordPopup;
