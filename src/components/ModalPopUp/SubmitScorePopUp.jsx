import { useState } from "react";
import rules_icon from "../../assets/images/rules_icon.png";
import match_reg from "../../assets/images/match_reg.png";
import { Link } from "react-router-dom";
import { Popup_btn } from "../ui/svg/index.jsx";
import CustomFileUpload from "../ui/svg/UploadFile.jsx";

function SubmitPopUp({ showModal, handleClose }) {
  return (
    <>
      {/* Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 popup-overlay transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed modal_popup-con inset-0 overflow-y-auto flex justify-center items-center z-50">
            <div className="popup-wrap inline-flex items-center h-[fit-content] relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60">
              <div className="match_reg--popup submit_score--popup popup_bg relative sd_before sd_after !h-[40rem]">
                <div className="popup_header px-8 pt-4 flex items-start justify-end mt-3 text-center sm:mt-0 sm:text-left">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="pt-2 cursor-pointer"
                  >
                    <svg
                      width="1.125rem"
                      height="1.125rem"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 17L17 1M17 17L1 1"
                        stroke="#7B7ED0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="popup_body space-y-4 px-4 py-3 flex flex-col items-center">
                  <div className="text-center w-full">
                    <input
                      type="text"
                      id="first_name"
                      className="sd_custom-input px-4 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                      placeholder="Your Score"
                      required
                    />
                    <svg
                      width="0"
                      height="0"
                      viewBox="0 0 400 72"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ position: "absolute" }}
                    >
                      <defs>
                        <clipPath
                          id="inputclip"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path
                            transform="scale(0.0025, 0.0138889)"
                            d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className="text-center w-full">
                    <input
                      type="text"
                      id="first_name"
                      className="sd_custom-input px-4 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                      placeholder="Opponent Score"
                      required
                    />
                    <svg
                      width="0"
                      height="0"
                      viewBox="0 0 400 72"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ position: "absolute" }}
                    >
                      <defs>
                        <clipPath
                          id="inputclip"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path
                            transform="scale(0.0025, 0.0138889)"
                            d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className="text-center w-full">
                    <textarea
                      id="message"
                      rows="4"
                      class=" sd_custom-input pt-5 pl-4 !h-[5.5rem] pr-3 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                      placeholder="Dicription Box..."
                    ></textarea>
                    <svg
                      width="0"
                      height="0"
                      viewBox="0 0 400 72"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ position: "absolute" }}
                    >
                      <defs>
                        <clipPath
                          id="inputclip"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path
                            transform="scale(0.0025, 0.0138889)"
                            d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className="text-center w-[24rem]">
                    <CustomFileUpload />
                  </div>
                </div>
                <div className="popup_footer px-12 pt-6">
                  <Link
                    to={"#"}
                    className="popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400"
                  >
                    Submit Score
                  </Link>
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
        </>
      )}
    </>
  );
}

export default SubmitPopUp;
