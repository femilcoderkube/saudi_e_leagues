import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import rules_icon from "../../assets/images/rules_icon.png";
import match_reg from "../../assets/images/match_reg.png";
import { Link, useParams } from "react-router-dom";
import { Popup_btn } from "../../components/ui/svg/index.jsx";
import { socket } from "../../app/socket/socket.js";
import { SOCKET } from "../../utils/constant.js";
import { setIsAgreedToJoin, setRegistrationModal } from "../../app/slices/leagueDetail/leagueDetailSlice.js";
import { useDispatch, useSelector } from "react-redux";

const RegistrationModel = () => {
  const { isAgreedToJoin } = useSelector((state) => state.leagues);
  const { lId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const validationSchema = Yup.object({
    inputId: Yup.string()
      .min(2, "Input ID must be at least 2 characters")
      .required("Input ID is required"),
  });

  const handleSubmit = (values) => {
    socket.emit(SOCKET.LEAGUEJOIN, {
      Lid: lId,
      userId: user._id,
      gameId: values.inputId,
    });
    dispatch(setRegistrationModal(false));
  };

  return (
    <>
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

        <div className="fixed  inset-0 overflow-y-auto flex justify-center items-center">
          <div className="popup-wrap inline-flex items-center h-auto relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60">
            <div className="match_reg--popup relative sd_before sd_after">
              <div className="popup_header px-8 pt-8 pb-5 flex items-start justify-between mt-3 text-center sm:mt-0 sm:text-left">
                <img src={match_reg} alt="" style={{ width: "10rem" }} />
                <button
                  type="button"
                  onClick={() => dispatch(setRegistrationModal(false))}
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
              <div className="popup_body px-4 py-3">
                <Formik
                  initialValues={{ inputId: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isValid }) => (
                    <Form>
                      <div className="text-center w-full">
                        <Field
                          type="text"
                          id="inputId"
                          name="inputId"
                          className="sd_custom-input px-4 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                          placeholder="Input ID"
                        />
                        <div className="text-start px-7">
                          <ErrorMessage
                            name="inputId"
                            component="div"
                            className="text-red-500  text-sm mt-1"
                          />
                        </div>
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

                      <div className="px-4 pt-6">
                        <input
                          className="hidden"
                          type="checkbox"
                          id="check-round01"
                          checked={isAgreedToJoin}
                          onChange={() => dispatch(setIsAgreedToJoin(!isAgreedToJoin))}
                        />
                        <label
                          className="flex gap-4 items-center h-10 px-2 rounded cursor-pointer"
                          htmlFor="check-round01"
                        >
                          <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]"></span>
                          <div className="text-base flex-[1]">
                            <span className="purple_light">
                              By Registering a Match I agree
                              <br />
                              to{" "}
                            </span>
                            <Link to={"#"} className="underline text-[#46ABF8]">
                              Terms and Conditions
                            </Link>
                            <span className="purple_light"> and </span>
                            <Link to={"#"} className="underline text-[#46ABF8]">
                              Privacy Policy
                            </Link>
                          </div>
                        </label>
                      </div>

                      <div className="popup_footer px-6 mt-5 pt-6">
                        <button
                          type="submit"
                          disabled={!isAgreedToJoin || !isValid}
                          className={`popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400 ${
                            !isAgreedToJoin || !isValid
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          Input ID
                        </button>
                        <Popup_btn />
                      </div>
                    </Form>
                  )}
                </Formik>
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
    </>
  );
}

export default RegistrationModel;
