import { useFormik } from "formik";
import * as Yup from "yup";
import rules_icon from "../../assets/images/rules_icon.png";
import match_reg from "../../assets/images/match_reg.png";
import { Link } from "react-router-dom";
import { Popup_btn } from "../ui/svg/index.jsx";
import CustomFileUpload from "../ui/svg/UploadFile.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../app/slices/MatchSlice/matchDetailSlice.js";
import { socket } from "../../app/socket/socket.js";
import { SOCKET } from "../../utils/constant.js";

function SubmitPopUp({ showModal, handleClose }) {
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  // Temporary variable for URL
  const { fileUploadLoading } = useSelector((state) => state.matchs); // Get loading state from Redux
  const { matchData } = useSelector((state) => state.matchs);
  const [team, setTeam] = useState(null);
  const [participantId, setParticipantId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      yourScore: "",
      opponentScore: "",
      description: "",
      file: null,
    },
    validationSchema: Yup.object({
      yourScore: Yup.number()
        .typeError("Please enter a valid number")
        .required("Your score is required")
        .min(0, "Score cannot be negative"),
      opponentScore: Yup.number()
        .typeError("Please enter a valid number")
        .required("Opponent score is required")
        .min(0, "Score cannot be negative"),
      description: Yup.string(), // Optional field
      file: Yup.mixed().required("An image is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Upload the file
        const uploadResult = await dispatch(uploadFile(values.file)).unwrap();
        let data = {
          team:team,
          matchId: matchData?._id || "", // Use matchData from Redux state
          yourScore: values.yourScore,
          opponentScore: values.opponentScore,
          description: values.description,
          attachment: uploadResult.data,
          submittedBy: user?._id,
        }
        console.log("Submit Data:", data);
        socket.emit(SOCKET.ONSUBMIT, data);
        // Clear form and close modal after successful upload
        formik.resetForm();
        handleClose();
      } catch (error) {
        console.error('File upload failed:', error);
        // Optionally show error message to user
      }
    },
  });

  const handleFileChange = (file) => {
    formik.setFieldValue("file", file); // Update Formik file field
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set preview image
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRemove = () => {
    formik.setFieldValue("file", null); // Clear file in Formik
    setPreviewImage(null); // Clear preview
  };

  const handlePointInput = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    e.target.value = value;
    formik.handleChange(e);
  };

  const handlePointKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      ".", // Allow decimal point
    ];
    if (
      allowedKeys.includes(e.key) ||
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) ||
      // Allow only digits (0-9), block minus sign
      (/^\d$/.test(e.key) && e.key !== "-")
    ) {
      return;
    }
    e.preventDefault();
  };

  useEffect(()=>{
    const isInTeam1 = matchData?.team1?.some(
      (participant) => participant?.participant?.userId?._id === user?._id
    );
    setTeam(isInTeam1 ? "team1" : "team2");

  },[])
  // Determine if the submit button should be disabled
  const isSubmitDisabled = !formik.isValid || !formik.dirty || fileUploadLoading;

  return (
    
        <>
          <div
            className="fixed inset-0 popup-overlay transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed modal_popup-con inset-0 overflow-y-auto flex justify-center items-center z-50">
            <div className="popup-wrap inline-flex items-center h-[fit-content] relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60">
              <div className="match_reg--popup submit_score--popup popup_bg relative sd_before sd_after !h-[42rem]">
                <div className="popup_header px-8 pt-4 flex items-start justify-end mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="flex items-center gap-2 absolute left-12 top-5">
                    <span className="text-[#7B7ED0] font-bold text-lg">
                      {team}
                    </span>
                  </div>
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
                  <div className="text-center w-full relative">
                    <input
                      type="text"
                      id="your_score"
                      name="yourScore"
                      value={formik.values.yourScore}
                      onChange={handlePointInput}
                      onKeyDown={handlePointKeyDown}
                      onBlur={formik.handleBlur}
                      className="sd_custom-input px-4 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                      placeholder="Your Score"
                    />
                    <span className="text-red-500 text-xl absolute right-10 top-3">
                      *
                    </span>
                    {formik.touched.yourScore && formik.errors.yourScore && (
                      <p className="text-red-500 text-sm mt-1 text-left ml-8">
                        {formik.errors.yourScore}
                      </p>
                    )}
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

                  <div className="text-center w-full relative">
                    <input
                      type="text"
                      id="opponent_score"
                      name="opponentScore"
                      value={formik.values.opponentScore}
                      onChange={handlePointInput}
                      onKeyDown={handlePointKeyDown}
                      onBlur={formik.handleBlur}
                      className="sd_custom-input px-4 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                      placeholder="Opponent Score"
                    />
                    <span className="text-red-500 text-xl absolute right-10 top-3">
                      *
                    </span>
                    {formik.touched.opponentScore &&
                      formik.errors.opponentScore && (
                        <p className="text-red-500 text-sm mt-1 text-left ml-8">
                          {formik.errors.opponentScore}
                        </p>
                      )}
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
                      id="description"
                      name="description"
                      rows="4"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="sd_custom-input pt-5 pl-4 !h-[5.5rem] pr-3 text-xl focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0]"
                      placeholder="Description Box..."
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
                    <div className="relative">
                      <CustomFileUpload
                        hasImage={!!previewImage}
                        onFileChange={handleFileChange}
                        previewImage={previewImage}
                        onRemove={handleRemove}
                      />
                      <p className="text-[#7B7ED0] text-sm mt-1">
                        Upload Photo <span className="text-red-500">*</span>
                      </p>
                      {formik.touched.file && formik.errors.file && (
                        <p className="text-red-500 text-sm mt-1 text-left ml-8">
                          {formik.errors.file}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="popup_footer px-12 pt-6">
                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    disabled={isSubmitDisabled}
                    className={`popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400 flex items-center justify-center ${
                      isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {fileUploadLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {fileUploadLoading ? "Uploading..." : "Submit Score"}
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
        </>
      
  );
}

export default SubmitPopUp;