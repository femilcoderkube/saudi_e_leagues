import { useFormik } from "formik";
import * as Yup from "yup";
import rules_icon from "../../assets/images/rules_icon.png";
import match_reg from "../../assets/images/match_reg.png";
import { Link } from "react-router-dom";
import { Popup_btn } from "../ui/svg/index.jsx";
import CustomFileUpload from "../ui/svg/UploadFile.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubmitScoreLoading, uploadFile } from "../../app/slices/MatchSlice/matchDetailSlice.js";
import { socket } from "../../app/socket/socket.js";
import { getServerURL, SOCKET } from "../../utils/constant.js";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function SubmitPopUp({ handleClose }) {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
 
  const dispatch = useDispatch();
  const { fileUploadLoading, submitScoreLoading } = useSelector((state) => state.matchs);
  const { matchData, isEditScore } = useSelector((state) => state.matchs);
  const initialAttachments = isEditScore?.attachment || [];
  const [previewImages, setPreviewImages] = useState(
    initialAttachments.length > 0
      ? initialAttachments.map((attachment) =>
          attachment ? getServerURL(attachment) : null
        )
      : [null]
  );
  const [fileError, setFileError] = useState(null);
 
  const [uploadCount, setUploadCount] = useState(
    initialAttachments.filter((attachment) => attachment !== null).length
  ); // Count only non-null attachments
  const [team, setTeam] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      yourScore: isEditScore?.yourScore || "",
      opponentScore: isEditScore?.opponentScore || "",
      description: isEditScore?.description || "",
      scoreProofs:
        initialAttachments.length > 0
          ? [...initialAttachments] // Preserve nulls from the array
          : [null],
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
      description: Yup.string(),
      scoreProofs: Yup.array()
        .of(Yup.mixed().nullable())
        .test(
          "at-least-one-file",
          "At least one score proof is required",
          (value) => value.some((file) => file !== null)
        ),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setSubmitScoreLoading(true));
        const uploadPromises = values.scoreProofs.map((file, index) =>
          file && file !== (isEditScore?.attachment?.[index] || null)
            ? dispatch(uploadFile(file)).unwrap()
            : Promise.resolve({ data: file })
        );
        const uploadResults = await Promise.all(uploadPromises);
        const uploadedFiles = uploadResults.map((result) => result?.data);

        let data = {
          team: team,
          matchId: matchData?._id || "",
          yourScore: values.yourScore,
          opponentScore: values.opponentScore,
          description: values.description,
          attachment: uploadedFiles,
          submittedBy: user?._id,
        };
        socket.emit(SOCKET.ONSUBMIT, data);
        formik.resetForm();
        setPreviewImages([null]);
        setUploadCount(0);
        handleClose();
        dispatch(setSubmitScoreLoading(false));
      } catch (error) {
        console.error("File upload failed:", error);
      }
    },
  });

  const handleFileChange = (index, file) => {
    const currentFiles = formik.values.scoreProofs.filter(
      (f) => f !== null
    ).length;

      // Validate file size
      if (file && file.size > MAX_FILE_SIZE) {
        setFileError(t("upload.too_large", { limit: "10MB" }));
        return;
      }
      // Clear file error if validation passes
      setFileError(null);
    if (uploadCount >= 5 && file && formik.values.scoreProofs[index] === null) {
      return; // Prevent new uploads beyond 5, but allow replacements
    }

    const newScoreProofs = [...formik.values.scoreProofs];
    const newPreviewImages = [...previewImages];

    if (file) {
      if (newScoreProofs[index] === null) {
        setUploadCount((prev) => prev + 1); // Increment only for new uploads in null slots
      }
      newScoreProofs[index] = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewImages[index] = reader.result;
        setPreviewImages(newPreviewImages);
      };
      reader.readAsDataURL(file);
    } else {
      newScoreProofs[index] = null;
      newPreviewImages[index] = null;
      setPreviewImages(newPreviewImages);
    }

    formik.setFieldValue("scoreProofs", newScoreProofs);
  };

  const handleRemove = (index) => {
    const newScoreProofs = [...formik.values.scoreProofs];
    newScoreProofs[index] = null;
    formik.setFieldValue("scoreProofs", newScoreProofs);

    const newPreviewImages = [...previewImages];
    newPreviewImages[index] = null;
    setPreviewImages(newPreviewImages);
    if (formik.values.scoreProofs[index] !== null) {
      setUploadCount((prev) => prev - 1); // Decrement uploadCount only if removing a non-null file
    }
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
      ".",
    ];
    if (
      allowedKeys.includes(e.key) ||
      (e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) ||
      (/^\d$/.test(e.key) && e.key !== "-")
    ) {
      return;
    }
    e.preventDefault();
  };

  useEffect(() => {
    const isInTeam1 = matchData?.team1?.some(
      (participant) => participant?.participant?.userId?._id === user?._id
    );
    setTeam(isInTeam1 ? "team1" : "team2");
  }, []);

  const isSubmitDisabled =
    !formik.isValid || !formik.dirty || submitScoreLoading;

  // Render exactly 3 slots, handling null values
  const renderSlots = [0, 1, 2];

  return (
    <>
      <div
        className="fixed inset-0 popup-overlay transition-opacity submit__score--popup z-50"
        aria-hidden="true"
      ></div>

      <div className="fixed modal_popup-con inset-0 flex justify-center items-center z-50">
        <motion.div className="popup-wrap inline-flex items-center justify-center h-[fit-content] relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60"
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="match_reg--popup submit_score--popup popup_bg relative sd_before sd_after !h-auto text-white 
    h-full max-h-[90vh] px-6 py-[3rem] sm:py-6 overflow-x-hidden sm:overflow-y-auto">
            <div className="popup_header px-8 pt-4 flex items-start ltr:justify-end mt-3 text-center sm:mt-0 sm:text-left rtl:justify-start rtl:text-right">
              <div className="flex items-center gap-2 absolute left-12 top-5">
                <span className="text-[#7B7ED0] font-bold text-lg">{team}</span>
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
                  placeholder={t("score.your_score")}
                />
                <span className="text-red-500 text-xl absolute ltr:right-10 rtl:left-10 top-3">
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
                    <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
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
                  placeholder={t("score.opponent_score")}
                />
                <span className="text-red-500 text-xl absolute ltr:right-10 rtl:left-10 top-3">
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
                    <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
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
                  placeholder={t("score.notes")}
                ></textarea>
                <svg
                  width="0"
                  height="0"
                  viewBox="0 0 400 72"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute" }}
                >
                  <defs>
                    <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
                      <path
                        transform="scale(0.0025, 0.0138889)"
                        d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="upload-pic text-center max-w-full w-[24rem] flex flex-row sm:gap-4 gap-2 justify-center">
                {renderSlots.map((index) => (
                  <div key={index} className="relative flex-1">
                    <CustomFileUpload
                      hasImage={!!previewImages[index]}
                      onFileChange={(file) => handleFileChange(index, file)}
                      previewImage={previewImages[index]}
                      onRemove={() => handleRemove(index)}
                      disabled={uploadCount >= 5 && !previewImages[index]}
                    />
                    <p className="text-[#7B7ED0] text-sm mt-8">
                      {t("upload.score_proof")}
                      {index === 0 && <span className="text-red-500">*</span>}
                    </p>
                  </div>
                ))}
              </div>
              {fileError && (
                <p className="text-red-500 text-sm mt-1 text-left ml-8">
                  {fileError}
                </p>
              )}
              {uploadCount >= 5 && !fileError && (
                <p className="text-red-500 text-sm mt-1 text-left ml-8">
                  {t("upload.max_upload_limit", { limit: 5 })}
                </p>
              )}
              {formik.touched.scoreProofs && formik.errors.scoreProofs && (
                <p className="text-red-500 text-sm mt-1 text-left ml-8">
                  {formik.errors.scoreProofs}
                </p>
              )}
            </div>
            <div className="popup_footer px-5  pt-6">
              <button
                type="submit"
                onClick={formik.handleSubmit}
                disabled={isSubmitDisabled}
                className={`popup_submit-btn text-xl uppercase purple_col font-medium font_oswald hover:opacity-70 duration-400 flex items-center justify-center ${
                  isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitScoreLoading ? (
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
                {submitScoreLoading
                  ? t("common.uploading")
                  : isEditScore?.yourScore
                  ? t("auth.update")
                  : t("auth.submit_score")}
              </button>
              <Popup_btn />
            </div>
          </div>

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
                  d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L16 0H480V100Z"
                />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
      </div>
    </>
  );
}

export default SubmitPopUp;
