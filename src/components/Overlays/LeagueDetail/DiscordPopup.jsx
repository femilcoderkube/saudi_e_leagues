import { useState } from "react";
import PDFViewer from "./PDFViewer";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../ui/images/images";
import { useSelector } from "react-redux";

function DiscordPopup() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const { tournamentData } = useSelector((state) => state.tournament);

  const { t } = useTranslation();

  return (
    <>
      {/* Trigger button */}

      <div className="sd_rules--btn md:mb-10 md:order-1 order-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (tournamentData?.discordId) {
              window.open(
                tournamentData.discordId,
                "_blank",
                "noopener,noreferrer"
              );
            }
          }}
          className="timeline-card__header w-full md:mt-5 flex items-center gap-3 rounded-xl cursor-pointer relative sd_before sd_after px-4 py-[1.4rem] bg-white hover:bg-gray-100 transition-colors"
        >
          <img
            src={IMAGES.discord}
            alt={t("images.rules_icon")}
            style={{ width: "1.75rem" }}
          />
          <h3 className="timeline-card__title text-base sm:text-xl font_oswald">
            {t("rules.discord_support")}
          </h3>
        </button>
      </div>
    </>
  );
}

export default DiscordPopup;
