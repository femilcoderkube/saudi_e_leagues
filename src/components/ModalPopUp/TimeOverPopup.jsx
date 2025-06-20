import match_reg from "../../assets/images/match_reg.png";
import { Popup_btn } from "../ui/svg/index.jsx";

function TimeOverPopup({ onYes, onNo }) {
  return (
    <div
      className="relative z-1000"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 popup-overlay transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 overflow-y-auto flex justify-center items-center">
        <div className="popup-wrap inline-flex items-center h-auto relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60">
          <div className="match_reg--popup relative sd_before sd_after">
            <div className="popup_header px-8 pt-8 pb-5 flex items-start justify-between mt-3 text-center sm:mt-0 sm:text-left">
              <img src={match_reg} alt="" style={{ width: "10rem" }} />
            </div>
            <div className="popup_body px-4 py-3 text-center">
              <h2 className="text-2xl font-bold mb-4 purple_col">Time is Over</h2>
              <p className="text-lg mb-6 purple_light">
                Didn't find enough players to do match.<br />
                Can you wait more or not?
              </p>
              <div className="popup_footer px-6 mt-5 pt-6 flex justify-center gap-6">
                <button
                  onClick={onYes}
                  className="popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400"
                >
                  Yes, Wait More
                </button>
                <button
                  onClick={onNo}
                  className="popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400 bg-red-500"
                >
                  No, Cancel
                </button>
                <Popup_btn />
              </div>
            </div>
            {/* === SVG Clip Path === */}
            <svg
              width="0"
              height="0"
              viewBox="0 0 480 416"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath id="myClipPath" clipPathUnits="objectBoundingBox">
                  <path
                    transform="scale(0.00208333, 0.00240385)"
                    d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L24 0H480V100Z"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeOverPopup; 