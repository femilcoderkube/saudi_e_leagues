import { useState } from "react";
import rules_icon from "../../assets/images/rules_icon.png";
import PdfModal from "./PdfModal";

function PopUp() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {/* Trigger button */}
      <div className="sd_rules--btn">
        <button
          onClick={handleOpen}
          className="timeline-card__header w-full mt-5 flex items-center gap-3 rounded-xl cursor-pointer relative sd_before sd_after px-4 py-[1.4rem] bg-white hover:bg-gray-100 transition-colors"
        >
          <img src={rules_icon} alt="Rules icon" style={{ width: "1.75rem" }} />
          <h3 className="timeline-card__title text-xl font_oswald">
            Rules and Regulations
          </h3>
        </button>
      </div>

      {/* Modal */}
      {showModal && <PdfModal onClose={handleClose} />}
    </>
  );
}

export default PopUp;