import { useState } from 'react';
import rules_icon from "../../assets/images/rules_icon.png";
import match_reg from "../../assets/images/match_reg.png";
import { Link } from "react-router-dom";
import { Popup_btn } from "../ui/svg/index.jsx";


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
          className="timeline-card__header w-full mt-5 flex items-center gap-3 rounded-xl cursor-pointer relative sd_before sd_after px-4 py-[1.4rem]"
        >
          <img src={rules_icon} alt="" style={{width:'1.75rem'}} />
          <h3 className="timeline-card__title text-xl font_oswald">Rules and Regulations</h3>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 popup-overlay transition-opacity" aria-hidden="true"></div>

          <div className="fixed modal_popup-con inset-0 overflow-y-auto flex justify-center items-center">
            <div className="popup-wrap inline-flex items-center h-[fit-content] relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60">

              <div className="match_reg--popup relative sd_before sd_after">
                  <div className="popup_header px-8 pt-8 pb-5 flex items-start justify-between mt-3 text-center sm:mt-0 sm:text-left">
                      <img src={match_reg} alt="" style={{width:'10rem'}} />
                        <button type="button" onClick={handleClose} className="pt-2 cursor-pointer">
                        <svg width="1.125rem" height="1.125rem" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 17L17 1M17 17L1 1" stroke="#7B7ED0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>                      
                  </div>
                  <div className="popup_body px-4 py-3 ">                   
                      <div className="text-center w-full">
                          <input type="text" id="first_name" className="sd_custom-input px-4 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]" placeholder="Input ID" required />
                          <svg width="0" height="0" viewBox="0 0 400 72" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute'}}>
                            <defs>
                              <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
                                <path transform="scale(0.0025, 0.0138889)"
                                  d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                      </div>
                      
                        <div className='px-4 pt-6'>
                          <input className="hidden" type="checkbox" id="check-round01"></input>
                          <label className="flex gap-4 items-center h-10 px-2 rounded cursor-pointer" htmlFor="check-round01">
                            <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]">
                            </span>
                            <div className='text-base flex-[1]'>
                              <span className="purple_light">By Registering a Match I agree 
                                <br/>
                                to </span>  
                                <Link
                                to={'#'} className='underline text-[#46ABF8]'>
                                  Terms and Conditions
                                </Link>
                                <span className='purple_light'> and </span>
                                <Link
                                to={'#'} className='underline text-[#46ABF8]'>
                                  Privacy Policy
                                </Link>                              
                            </div>
                          </label>
                        </div>

                  </div>     
                  <div className="popup_footer px-12 pt-6">
                    <Link
                      to={'#'} className='popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400'>
                      Input ID
                    </Link>
                    <Popup_btn />
                  </div>           
              </div>

              {/* === SVG Clip Path === */}
              <svg width="0" height="0" viewBox="0 0 480 416" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute" }}>
                <defs>
                  <clipPath id="myClipPath" clipPathUnits="objectBoundingBox">
                    <path transform="scale(0.00208333, 0.00240385)"
                      d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L24 0H480V100Z"
                    />
                  </clipPath>
                </defs>
              </svg>


            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopUp;
