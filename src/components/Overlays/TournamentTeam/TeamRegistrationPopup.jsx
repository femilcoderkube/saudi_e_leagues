import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { countryData } from "../../../utils/CountryCodes.js";
import { useTranslation } from "react-i18next";
import {
  setTeamRegistrationPopup,
  setTeamEditPopup,
  createTournamentTeam,
  updateTournamentTeam,
  getTeamData,
} from "../../../app/slices/TournamentTeam/TournamentTeamSlice.js";
import { uploadFile } from "../../../app/slices/MatchSlice/matchDetailSlice.js";
import CustomFileUpload from "../../ui/svg/UploadFile.jsx";
import { getServerURL } from "../../../utils/constant.js";

const TeamRegistrationPopup = ({ isEdit = false }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { showTeamRegistrationPopup, showTeamEditPopup, currentTeam } =
    useSelector((state) => state.tournamentTeam);
  const { fileUploadLoading, fileUploadError, fileUploadResult } = useSelector(
    (state) => state.matchs
  );

  const [previewLogo, setPreviewLogo] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [step, setStep] = useState(1);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState(null);

  const TOTAL_STEPS = 2;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

  const countryOptions = countryData.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const defaultNationality = countryOptions.find(
    (option) => option.value === "Saudi Arabia"
  );

  // Initialize preview logo for edit mode
  useEffect(() => {
    if (isEdit && currentTeam?.logoImage) {
      const logoPath = currentTeam.logoImage;
      const previewUrl =
        typeof logoPath === "string" && logoPath.startsWith("uploads/")
          ? getServerURL(logoPath)
          : logoPath;
      setPreviewLogo(previewUrl);
      setUploadedLogoUrl(logoPath); // Set initial logo URL
    } else {
      setPreviewLogo(null);
      setUploadedLogoUrl(null);
    }
  }, [isEdit, currentTeam]);

  const initialValues = {
    teamName: "",
    teamShortName: "",
    teamLogo: null,
    region: defaultNationality,
    social: {
      twitterId: "",
      instagramId: "",
      twitchId: "",
      kickId: "",
      discordId: "",
      facebookId: "",
      tiktokId: "",
    },
  };

  const editInitialValues = currentTeam
    ? {
        teamName: currentTeam.teamName || "",
        teamShortName: currentTeam.teamShortName || "",
        teamLogo: currentTeam.logoImage || null,
        region: currentTeam.region
          ? countryOptions.find((option) => option.value === currentTeam.region)
          : null,
        social: {
          twitterId: currentTeam.social?.twitterId || "",
          instagramId: currentTeam.social?.instagramId || "",
          twitchId: currentTeam.social?.twitchId || "",
          kickId: currentTeam.social?.kickId || "",
          discordId: currentTeam.social?.discordId || "",
          facebookId: currentTeam.social?.facebookId || "",
          tiktokId: currentTeam.social?.tiktokId || "",
        },
      }
    : initialValues;

  const step1ValidationSchema = Yup.object({
    teamName: Yup.string().required(
      t("validation_messages.team_name_required")
    ),
    teamShortName: Yup.string()
      .required(t("validation_messages.team_short_name_required"))
      .max(4, t("validation_messages.team_short_name_max")),
    teamLogo: isEdit
      ? Yup.mixed().nullable()
      : Yup.mixed().required(t("validation_messages.team_logo_required")),
    region: Yup.object()
      .shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
      .required(t("validation_messages.region_required")),
  });

  const urlValidation = Yup.string()
    .trim()
    .nullable()
    .test(
      "is-url-or-empty",
      t("validation_messages.valid_url_required"),
      (value) => {
        // Allow empty values (optional field)
        if (!value) return true;
        // Must pass URL test
        try {
          // Allow both https and http
          const url = new URL(value);
          return ["https:", "http:"].includes(url.protocol);
        } catch (err) {
          return false;
        }
      }
    );

  const step2ValidationSchema = Yup.object({
    social: Yup.object({
      twitterId: urlValidation,
      instagramId: urlValidation,
      twitchId: urlValidation,
      kickId: urlValidation,
      discordId: urlValidation,
      facebookId: urlValidation,
      tiktokId: urlValidation,
    }),
  });

  const validationSchemas = [step1ValidationSchema, step2ValidationSchema];

  const handleFileChange = async (file, setFieldValue) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(t("upload.too_large", { limit: "10MB" }));
        return;
      }

      try {
        const result = await dispatch(uploadFile(file)).unwrap();
        setUploadedLogoUrl(result.data); // Store the uploaded image URL
        setFieldValue("teamLogo", result.data); // Set Formik field to uploaded URL
        setPreviewLogo(URL.createObjectURL(file)); // Set preview
      } catch (error) {
        toast.error(t("upload.upload_failed"));
      }
    } else {
      setFieldValue("teamLogo", null); // Clear Formik field
      setPreviewLogo(null); // Clear preview
      setUploadedLogoUrl(null); // Clear uploaded URL
    }
  };

  const handleSubmit = async (values) => {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
      return;
    }

    setLoadingSubmit(true);
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === "region") {
          formData.append(key, values[key]?.value || "");
        } else if (key === "social") {
          if (values[key]) {
            Object.keys(values[key]).forEach((socialKey) => {
              formData.append(
                `social[${socialKey}]`,
                values[key][socialKey] ? values[key][socialKey] : ""
              );
            });
          }
        } else if (key === "teamLogo") {
          // Use uploadedLogoUrl if available, otherwise use Formik value (null or existing URL)
          formData.append("logoImage", uploadedLogoUrl || values[key] || "");
        } else {
          formData.append(key, values[key]);
        }
      });

      formData.append("userId", user._id);

      let res;
      if (isEdit) {
        res = await dispatch(
          updateTournamentTeam({ id: currentTeam._id, formData })
        ).unwrap();
      } else {
        res = await dispatch(createTournamentTeam(formData)).unwrap();
      }

      if (res.success) {
        handleClose();
        dispatch(getTeamData(user?._id));
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(
        `${isEdit ? "Update" : "Create"} team failed:`,
        error.response?.data?.error || error
      );
      toast.error(
        error.response?.data?.error ||
          t(
            isEdit ? "tourteam.update_team_error" : "tourteam.create_team_error"
          )
      );
    } finally {
      setLoadingSubmit(false);
      dispatch(getTeamData(user._id));
      setStep(1);
      handleClose();
    }
  };

  const handleClose = () => {
    if (isEdit) {
      dispatch(setTeamEditPopup(false));
    } else {
      dispatch(setTeamRegistrationPopup(false));
    }
    setPreviewLogo(null);
    setUploadedLogoUrl(null);
    setStep(1);
  };

  const renderStepContent = (values, setFieldValue) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 mt-7">
            {/* Team Name */}
            <div className="text-start w-full pr-4">
              <Field
                type="text"
                name="teamName"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder={t("tourteam.team_name")}
              />
              <ErrorMessage
                name="teamName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Team Short Name */}
            <div className="text-start w-full pr-4">
              <Field
                type="text"
                name="teamShortName"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder={t("tourteam.team_short_name")}
                maxLength={4}
                onChange={(e) => {
                  setFieldValue("teamShortName", e.target.value.toUpperCase());
                }}
              />
              <ErrorMessage
                name="teamShortName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Team Logo */}
            <div className="text-start w-full pr-4">
              <Field name="teamLogo">
                {({ form }) => (
                  <CustomFileUpload
                    isReg={true}
                    hasImage={!!previewLogo}
                    onFileChange={(file) =>
                      handleFileChange(file, form.setFieldValue)
                    }
                    previewImage={previewLogo}
                    onRemove={() => {
                      form.setFieldValue("teamLogo", null); // Clear Formik field
                      setPreviewLogo(null); // Clear preview
                      setUploadedLogoUrl(null); // Clear uploaded URL
                    }}
                    disabled={fileUploadLoading}
                  />
                )}
              </Field>
              {fileUploadError && (
                <p className="text-red-500 text-sm mt-1">{fileUploadError}</p>
              )}
              <ErrorMessage
                name="teamLogo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Region */}
            <div className="text-start w-full pr-4">
              <div className="custom_select2 sd_select--menu">
                <label className="flex gap-4 items-center h-10 rounded cursor-pointer">
                  {t("tourteam.nationality")}
                </label>
                <Select
                  value={values.region}
                  onChange={(option) => setFieldValue("region", option)}
                  options={countryOptions}
                  className="basic-multi-select focus:outline-0 focus:shadow-none"
                  classNamePrefix="select"
                  placeholder={t("tourteam.select_nationality")}
                />
                <ErrorMessage
                  name="region"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 mt-7">
            <div className="text-start w-full pr-4">
              <h3 className="text-[#7B7ED0] mb-3">
                {t("tourteam.social_media")} ({t("tourteam.optional")})
              </h3>
              {[
                "twitterId",
                "instagramId",
                "twitchId",
                "kickId",
                "discordId",
                "facebookId",
                "tiktokId",
              ].map((platform) => (
                <div key={platform} className="mb-3">
                  <Field
                    type="text"
                    name={`social.${platform}`}
                    className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                    placeholder={t(`tourteam.${platform}`) || platform}
                  />
                  <ErrorMessage
                    name={`social.${platform}`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!showTeamRegistrationPopup && !showTeamEditPopup) return null;

  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <motion.div
          className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white rounded-xl w-full max-w-lg relative p-6 overflow-y-auto md:max-h-[90vh] max-h-[80vh]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {isEdit ? t("tourteam.edit_team") : t("tourteam.create_team")}
            </h2>
            <button
              onClick={handleClose}
              className="cursor-pointer hover:opacity-70 duration-300"
            >
              <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <Formik
            initialValues={isEdit ? editInitialValues : initialValues}
            validationSchema={validationSchemas[step - 1]}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => (
              <Form>
                {renderStepContent(values, setFieldValue)}

                {/* Navigation Buttons */}
                <div className="wizard_step--btn sm:gap-5 gap-3 flex justify-end sm:mt-14 mt-8 mb-8 mr-5 flex-wrap">
                  {step > 1 && (
                    <div className="game_status--tab wizard_btn back_btn">
                      <button
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                        style={{ width: "8rem", height: "4rem" }}
                        disabled={loadingSubmit || fileUploadLoading}
                      >
                        {t("auth.back")}
                      </button>
                    </div>
                  )}
                  <div className="game_status--tab wizard_btn next_btn">
                    <button
                      type="submit"
                      className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                      style={{ width: "8rem", height: "4rem" }}
                      disabled={loadingSubmit || fileUploadLoading}
                    >
                      {step < TOTAL_STEPS ? (
                        t("auth.next")
                      ) : loadingSubmit || fileUploadLoading ? (
                        <>
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
                          {t("auth.loading")}
                        </>
                      ) : isEdit ? (
                        t("auth.update")
                      ) : (
                        t("tourteam.create")
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
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
      </div>
    </>
  );
};

export default TeamRegistrationPopup;
