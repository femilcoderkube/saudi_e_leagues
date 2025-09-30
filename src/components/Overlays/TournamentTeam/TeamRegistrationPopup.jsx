// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React, { useState } from "react";
// import Select from "react-select";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import { countryData } from "../../../utils/CountryCodes.js";
// import { useTranslation } from "react-i18next";
// import { setTeamRegistrationPopup } from "../../../app/slices/TournamentTeam/TournamentTeamSlice.js";
// import CustomFileUpload from "../../ui/svg/UploadFile.jsx";

// const TeamRegistrationPopup = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const { showTeamRegistrationPopup } = useSelector((state) => state.tournamentTeam);
//   const [previewLogo, setPreviewLogo] = useState(null);
//   const [loadingSubmit, setLoadingSubmit] = useState(false);

//   const countryOptions = countryData.map((country) => ({
//     value: country.name,
//     label: country.name,
//   }));

//   const initialValues = {
//     teamName: "",
//     teamShortName: "",
//     teamLogo: null,
//     nationality: null,
//     socialMedia: {
//       twitter: "",
//       instagram: "",
//       twitch: "",
//       kick: "",
//       discord: "",
//       tiktok: "",
//     },
//   };

//   const validationSchema = Yup.object({
//     teamName: Yup.string()
//       .required(t("validation_messages.team_name_required") || "Team name is required")
//       .min(3, t("validation_messages.team_name_min") || "Team name must be at least 3 characters"),
//     teamShortName: Yup.string()
//       .required(t("validation_messages.team_short_name_required") || "Team short name is required")
//       .max(4, t("validation_messages.team_short_name_max") || "Team short name must be maximum 4 characters")
//       .matches(/^[A-Z0-9]+$/, t("validation_messages.team_short_name_format") || "Only uppercase letters and numbers allowed"),
//     teamLogo: Yup.mixed()
//       .required(t("validation_messages.team_logo_required") || "Team logo is required"),
//     nationality: Yup.object()
//       .shape({
//         value: Yup.string().required(),
//         label: Yup.string().required(),
//       })
//       .required(t("validation_messages.nationality_required") || "Nationality is required"),
//     socialMedia: Yup.object({
//       twitter: Yup.string().url(t("validation_messages.invalid_url") || "Invalid URL"),
//       instagram: Yup.string().url(t("validation_messages.invalid_url") || "Invalid URL"),
//       twitch: Yup.string().url(t("validation_messages.invalid_url") || "Invalid URL"),
//       kick: Yup.string().url(t("validation_messages.invalid_url") || "Invalid URL"),
//       discord: Yup.string().url(t("validation_messages.invalid_url") || "Invalid URL"),
//       tiktok: Yup.string().url(t("validation_messages.invalid_url") || "Invalid URL"),
//     }),
//   });

//   const handleSubmit = async (values) => {
//     setLoadingSubmit(true);
//     try {
//       // TODO: Dispatch your team creation action here
//       console.log("Team Data:", values);
      
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
      
//       // Close popup on success
//       dispatch(setTeamRegistrationPopup(false));
//       setPreviewLogo(null);
//     } catch (error) {
//       console.error("Error creating team:", error);
//     } finally {
//       setLoadingSubmit(false);
//     }
//   };

//   const handleClose = () => {
//     dispatch(setTeamRegistrationPopup(false));
//     setPreviewLogo(null);
//   };

//   if (!showTeamRegistrationPopup) return null;

//   return (
//     <>
//       <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40 " />
//       <div className="fixed inset-0 flex justify-center items-center z-50">
//         <motion.div
//           className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white rounded-xl w-full max-w-lg relative p-6 overflow-y-auto max-h-[400px]"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           initial={{ scale: 0.5, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.5, opacity: 0, y: 50 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         >
//           <style jsx="true">{`
//             @media (max-width: 767px) {
//               .match_reg--popup::-webkit-scrollbar {
//                 width: 6px;
//               }
//               .match_reg--popup::-webkit-scrollbar-thumb {
//                 background-color: #7b7ed0;
//                 border-radius: 4px;
//               }
//               .match_reg--popup::-webkit-scrollbar-track {
//                 background: transparent;
//               }
//             }
//           `}</style>

//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">
//               {t("team.create_team") || "Create Team"}
//             </h2>
//             <button
//               onClick={handleClose}
//               className="cursor-pointer hover:opacity-70 duration-300"
//             >
//               <svg width="18" height="18" fill="none" stroke="#7B7ED0">
//                 <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
//               </svg>
//             </button>
//           </div>

//           {/* Form */}
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ values, setFieldValue }) => (
//               <Form>
//                 <div className="space-y-4 mt-7">
//                   {/* Team Name */}
//                   <div className="text-start w-full pr-4">
//                     <Field
//                       type="text"
//                       name="teamName"
//                       className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
//                       placeholder={t("team.team_name") || "Team Name"}
//                     />
//                     <ErrorMessage
//                       name="teamName"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                     <svg
//                       width="0"
//                       height="0"
//                       viewBox="0 0 400 72"
//                       xmlns="http://www.w3.org/2000/svg"
//                       style={{ position: "absolute" }}
//                     >
//                       <defs>
//                         <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                           <path
//                             transform="scale(0.0025, 0.0138889)"
//                             d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                           />
//                         </clipPath>
//                       </defs>
//                     </svg>
//                   </div>

//                   {/* Team Short Name */}
//                   <div className="text-start w-full pr-4">
//                     <Field
//                       type="text"
//                       name="teamShortName"
//                       className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
//                       placeholder={t("team.team_short_name") || "Team Short Name (Max 4)"}
//                       maxLength={4}
//                       style={{ textTransform: "uppercase" }}
//                       onChange={(e) => {
//                         setFieldValue("teamShortName", e.target.value.toUpperCase());
//                       }}
//                     />
//                     <ErrorMessage
//                       name="teamShortName"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                     <svg
//                       width="0"
//                       height="0"
//                       viewBox="0 0 400 72"
//                       xmlns="http://www.w3.org/2000/svg"
//                       style={{ position: "absolute" }}
//                     >
//                       <defs>
//                         <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                           <path
//                             transform="scale(0.0025, 0.0138889)"
//                             d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                           />
//                         </clipPath>
//                       </defs>
//                     </svg>
//                   </div>

//                   {/* Team Logo */}
//                   <div className="text-start w-full pr-4">
//                     <Field name="teamLogo">
//                       {({ form }) => (
//                         <CustomFileUpload
//                           isReg={true}
//                           hasImage={!!previewLogo}
//                           onFileChange={(file) => {
//                             form.setFieldValue("teamLogo", file);
//                             setPreviewLogo(file ? URL.createObjectURL(file) : null);
//                           }}
//                           previewImage={previewLogo}
//                           onRemove={() => {
//                             form.setFieldValue("teamLogo", null);
//                             setPreviewLogo(null);
//                           }}
//                         />
//                       )}
//                     </Field>
//                     <ErrorMessage
//                       name="teamLogo"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>

//                   {/* Nationality */}
//                   <div className="text-start w-full pr-4">
//                     <div className="custom_select2 sd_select--menu">
//                       <label className="flex gap-4 items-center h-10 rounded cursor-pointer">
//                         {t("team.nationality") || "Team Nationality"}
//                       </label>
//                       <Select
//                         value={values.nationality}
//                         onChange={(option) => setFieldValue("nationality", option)}
//                         options={countryOptions}
//                         className="basic-multi-select focus:outline-0 focus:shadow-none"
//                         classNamePrefix="select"
//                         placeholder={t("team.select_nationality") || "Select Nationality"}
//                       />
//                       <ErrorMessage
//                         name="nationality"
//                         component="div"
//                         className="text-red-500 text-sm"
//                       />
//                       <svg
//                         width="0"
//                         height="0"
//                         viewBox="0 0 400 72"
//                         xmlns="http://www.w3.org/2000/svg"
//                         style={{ position: "absolute" }}
//                       >
//                         <defs>
//                           <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                             <path
//                               transform="scale(0.0025, 0.0138889)"
//                               d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                             />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                     </div>
//                   </div>

//                   {/* Social Media - Optional */}
//                   <div className="text-start w-full pr-4">
//                     <h3 className="text-[#7B7ED0] mb-3">
//                       {t("team.social_media") || "Social Media (Optional)"}
//                     </h3>
//                     {["twitter", "instagram", "twitch", "kick", "discord", "tiktok"].map(
//                       (platform) => (
//                         <div key={platform} className="mb-3">
//                           <Field
//                             type="text"
//                             name={`socialMedia.${platform}`}
//                             className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
//                             placeholder={
//                               t(`team.${platform}`) ||
//                               platform.charAt(0).toUpperCase() + platform.slice(1)
//                             }
//                           />
//                           <ErrorMessage
//                             name={`socialMedia.${platform}`}
//                             component="div"
//                             className="text-red-500 text-sm"
//                           />
//                           <svg
//                             width="0"
//                             height="0"
//                             viewBox="0 0 400 72"
//                             xmlns="http://www.w3.org/2000/svg"
//                             style={{ position: "absolute" }}
//                           >
//                             <defs>
//                               <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                                 <path
//                                   transform="scale(0.0025, 0.0138889)"
//                                   d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                                 />
//                               </clipPath>
//                             </defs>
//                           </svg>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="wizard_step--btn gap-5 flex justify-end sm:mt-14 mt-8 mb-8 mr-5">
//                   <div className="game_status--tab wizard_btn next_btn">
//                     <button
//                       type="submit"
//                       className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
//                       style={{ width: "8rem", height: "4rem" }}
//                       disabled={loadingSubmit}
//                     >
//                       {loadingSubmit ? (
//                         <>
//                           <svg
//                             className="animate-spin h-5 w-5 mr-2 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           {t("auth.loading") || "Loading..."}
//                         </>
//                       ) : (
//                         t("team.create") || "Create"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </motion.div>
//       </div>

//       <svg
//         width="0"
//         height="0"
//         viewBox="0 0 480 416"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ position: "absolute" }}
//       >
//         <defs>
//           <clipPath id="myClipPath" clipPathUnits="objectBoundingBox">
//             <path
//               transform="scale(0.00208333, 0.00240385)"
//               d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L24 0H480V100Z"
//             />
//           </clipPath>
//         </defs>
//       </svg>
//     </>
//   );
// };

// export default TeamRegistrationPopup;

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
} from "../../../app/slices/TournamentTeam/TournamentTeamSlice.js";
import CustomFileUpload from "../../ui/svg/UploadFile.jsx";
import { getServerURL } from "../../../utils/constant.js";

const TeamRegistrationPopup = ({ isEdit = false }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showTeamRegistrationPopup, showTeamEditPopup, currentTeam } =
    useSelector((state) => state.tournamentTeam);
  const { user } = useSelector((state) => state.auth);
  
  const [previewLogo, setPreviewLogo] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [step, setStep] = useState(1);

  const TOTAL_STEPS = 2;

  const countryOptions = countryData.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  // Initialize preview logo for edit mode
  useEffect(() => {
    if (isEdit && currentTeam?.logoImage) {
      const logoPath = currentTeam.logoImage;
      if (typeof logoPath === "string" && logoPath.startsWith("uploads/")) {
        setPreviewLogo(getServerURL(logoPath));
      } else {
        setPreviewLogo(logoPath);
      }
    }
  }, [isEdit, currentTeam]);

  const initialValues = {
    teamName: "",
    teamShortName: "",
    teamLogo: null,
    region: null,
    maxParticipants: 5,
    social: {
      twitterId: "",
      facebookId: "",
      youtubeChannelId: "",
      discordId: "",
      twitchId: "",
    },
  };

  // Pre-fill form values for editing
  const editInitialValues = currentTeam
    ? {
        teamName: currentTeam.teamName || "",
        teamShortName: currentTeam.teamShortName || "",
        teamLogo: currentTeam.logoImage || null,
        region: currentTeam.region
          ? countryOptions.find((option) => option.value === currentTeam.region)
          : null,
        maxParticipants: currentTeam.maxParticipants || 5,
        social: {
          twitterId: currentTeam.social?.twitterId || "",
          facebookId: currentTeam.social?.facebookId || "",
          youtubeChannelId: currentTeam.social?.youtubeChannelId || "",
          discordId: currentTeam.social?.discordId || "",
          twitchId: currentTeam.social?.twitchId || "",
        },
      }
    : initialValues;

  const step1ValidationSchema = Yup.object({
    teamName: Yup.string().required(t("validation_messages.team_name_required")),
    teamShortName: Yup.string()
      .required(t("validation_messages.team_short_name_required"))
      .max(4, t("validation_messages.team_short_name_max")),
    teamLogo: isEdit ? Yup.mixed().nullable() : Yup.mixed().required(t("validation_messages.team_logo_required")),
    region: Yup.object()
      .shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
      .required(t("validation_messages.region_required")),
    maxParticipants: Yup.number()
      .required(t("validation_messages.max_participants_required"))
      .min(2, t("validation_messages.max_participants_min"))
      .max(10, t("validation_messages.max_participants_max")),
  });

  const step2ValidationSchema = Yup.object({
    social: Yup.object({
      twitterId: Yup.string(),
      facebookId: Yup.string(),
      youtubeChannelId: Yup.string(),
      discordId: Yup.string(),
      twitchId: Yup.string(),
    }),
  });

  const validationSchemas = [step1ValidationSchema, step2ValidationSchema];

  const handleSubmit = async (values) => {
    console.log("values===========",values);
    
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
      return;
    }

    setLoadingSubmit(true);
    try {
      const formData = new FormData();
      
      Object.keys(values).forEach((key) => {
        
        console.log("key===========",key);
        if (key === "region") {
          formData.append(key, values[key]?.value || "");
        } else if (key === "social") {
          // Handle nested social object
          if (values[key]) {
            Object.keys(values[key]).forEach((socialKey) => {
              // If value not found, add as empty string
              formData.append(
                `social[${socialKey}]`,
                values[key][socialKey] ? values[key][socialKey] : ""
              );
            });
          }
        } else if (key === "teamLogo") {
          // Only append if it's a new file
          if (values[key] && typeof values[key] !== "string") {
            formData.append("logoImage", values[key]);
          }
        } else {
          formData.append(key, values[key]);
        }
      });

      // Add userId for team creation
      if (!isEdit) {
        formData.append("userId", user._id);
      }
      console.log("formData============",formData.entries());
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      let res;
      if (isEdit) {
        res = await dispatch(
          updateTournamentTeam({ id: currentTeam._id, formData })
        ).unwrap();
      } else {
        res = await dispatch(createTournamentTeam(formData)).unwrap();
      }

      if (res.success) {
        toast.success(
          res?.message ||
            t(isEdit ? "tourteam.team_updated" : "tourteam.team_created")
        );
        handleClose();
      }
    } catch (error) {
      console.error(`${isEdit ? "Update" : "Create"} team failed:`, error);
      toast.error(
        error?.message ||
          t(
            isEdit
              ? "tourteam.update_team_error"
              : "tourteam.create_team_error"
          )
      );
    } finally {
      setLoadingSubmit(false);
      setStep(1);
    }
  };

  const handleClose = () => {
    if (isEdit) {
      dispatch(setTeamEditPopup(false));
    } else {
      dispatch(setTeamRegistrationPopup(false));
    }
    setPreviewLogo(null);
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

            {/* Max Participants */}
            <div className="text-start w-full pr-4">
              <Field
                type="number"
                name="maxParticipants"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder={t("tourteam.max_participants")}
                min={2}
                max={10}
              />
              <ErrorMessage
                name="maxParticipants"
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
                    onFileChange={(file) => {
                      form.setFieldValue("teamLogo", file);
                      setPreviewLogo(file ? URL.createObjectURL(file) : null);
                    }}
                    previewImage={previewLogo}
                    onRemove={() => {
                      form.setFieldValue("teamLogo", null);
                      setPreviewLogo(null);
                    }}
                  />
                )}
              </Field>
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
                  {t("tourteam.region")}
                </label>
                <Select
                  value={values.region}
                  onChange={(option) => setFieldValue("region", option)}
                  options={countryOptions}
                  className="basic-multi-select focus:outline-0 focus:shadow-none"
                  classNamePrefix="select"
                  placeholder={t("tourteam.select_region")}
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
              {["twitterId", "facebookId", "youtubeChannelId", "discordId", "twitchId"].map(
                (platform) => (
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
                )
              )}
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
          className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white rounded-xl w-full max-w-lg relative p-6 overflow-y-auto max-h-[90vh]"
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
                <div className="wizard_step--btn gap-5 flex justify-end sm:mt-14 mt-8 mb-8 mr-5">
                  {step > 1 && (
                    <div className="game_status--tab wizard_btn back_btn">
                      <button
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                        style={{ width: "8rem", height: "4rem" }}
                        disabled={loadingSubmit}
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
                      disabled={loadingSubmit}
                    >
                      {step < TOTAL_STEPS ? (
                        t("auth.next")
                      ) : loadingSubmit ? (
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
      </div>
    </>
  );
};

export default TeamRegistrationPopup;

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React, { useState } from "react";
// import Select from "react-select";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import { countryData } from "../../../utils/CountryCodes.js";
// import { useTranslation } from "react-i18next";
// import { setTeamRegistrationPopup } from "../../../app/slices/TournamentTeam/TournamentTeamSlice.js";
// import CustomFileUpload from "../../ui/svg/UploadFile.jsx";

// const TeamRegistrationPopup = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const { showTeamRegistrationPopup } = useSelector((state) => state.tournamentTeam);
//   const [previewLogo, setPreviewLogo] = useState(null);
//   const [loadingSubmit, setLoadingSubmit] = useState(false);
//   const [step, setStep] = useState(1);

//   const TOTAL_STEPS = 2;

//   const countryOptions = countryData.map((country) => ({
//     value: country.name,
//     label: country.name,
//   }));

//   const initialValues = {
//     teamName: "",
//     teamShortName: "",
//     teamLogo: null,
//     nationality: null,
//     socialMedia: {
//       twitter: "",
//       instagram: "",
//       twitch: "",
//       kick: "",
//       discord: "",
//       tiktok: "",
//     },
//   };

//   const step1ValidationSchema = Yup.object({
//     teamName: Yup.string()
//       .required(t("validation_messages.team_name_required")),
//     teamShortName: Yup.string()
//       .required(t("validation_messages.team_short_name_required"))
//       .max(4, t("validation_messages.team_short_name_max")),
//     teamLogo: Yup.mixed()
//       .required(t("validation_messages.team_logo_required")),
//     nationality: Yup.object()
//       .shape({
//         value: Yup.string().required(),
//         label: Yup.string().required(),
//       })
//       .required(t("validation_messages.nationality_required")),
//   });

//   const step2ValidationSchema = Yup.object({
//     socialMedia: Yup.object({
//       twitter: Yup.string().url(t("validation_messages.invalid_url")),
//       instagram: Yup.string().url(t("validation_messages.invalid_url")),
//       twitch: Yup.string().url(t("validation_messages.invalid_url")),
//       kick: Yup.string().url(t("validation_messages.invalid_url")),
//       discord: Yup.string().url(t("validation_messages.invalid_url")),
//       tiktok: Yup.string().url(t("validation_messages.invalid_url")),
//     }),
//   });

//   const validationSchemas = [step1ValidationSchema, step2ValidationSchema];

//   const handleSubmit = async (values) => {
//     if (step < TOTAL_STEPS) {
//       setStep((prev) => prev + 1);
//       return;
//     }

//     setLoadingSubmit(true);
//     try {
//       console.log("Team Data:", values);
      
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
      
//       // Close popup on success
//       dispatch(setTeamRegistrationPopup(false));
//       setPreviewLogo(null);
//       setStep(1);
//     } catch (error) {
//       console.error("Error creating team:", error);
//     } finally {
//       setLoadingSubmit(false);
//     }
//   };

//   const handleClose = () => {
//     dispatch(setTeamRegistrationPopup(false));
//     setPreviewLogo(null);
//     setStep(1);
//   };

//   const renderStepContent = (values, setFieldValue) => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4 mt-7">
//             {/* Team Name */}
//             <div className="text-start w-full pr-4">
//               <Field
//                 type="text"
//                 name="teamName"
//                 className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
//                 placeholder={t("tourteam.team_name")}
//               />
//               <ErrorMessage
//                 name="teamName"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//               <svg
//                 width="0"
//                 height="0"
//                 viewBox="0 0 400 72"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ position: "absolute" }}
//               >
//                 <defs>
//                   <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                     <path
//                       transform="scale(0.0025, 0.0138889)"
//                       d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </div>

//             {/* Team Short Name */}
//             <div className="text-start w-full pr-4">
//               <Field
//                 type="text"
//                 name="teamShortName"
//                 className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
//                 placeholder={t("tourteam.team_short_name")}
//                 maxLength={4}
//                 // style={{ textTransform: "uppercase" }}
//                 onChange={(e) => {
//                   setFieldValue("teamShortName", e.target.value.toUpperCase());
//                 }}
//               />
//               <ErrorMessage
//                 name="teamShortName"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//               <svg
//                 width="0"
//                 height="0"
//                 viewBox="0 0 400 72"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{ position: "absolute" }}
//               >
//                 <defs>
//                   <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                     <path
//                       transform="scale(0.0025, 0.0138889)"
//                       d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </div>

//             {/* Team Logo */}
//             <div className="text-start w-full pr-4">
//               <Field name="teamLogo">
//                 {({ form }) => (
//                   <CustomFileUpload
//                     isReg={true}
//                     hasImage={!!previewLogo}
//                     onFileChange={(file) => {
//                       form.setFieldValue("teamLogo", file);
//                       setPreviewLogo(file ? URL.createObjectURL(file) : null);
//                     }}
//                     previewImage={previewLogo}
//                     onRemove={() => {
//                       form.setFieldValue("teamLogo", null);
//                       setPreviewLogo(null);
//                     }}
//                   />
//                 )}
//               </Field>
//               <ErrorMessage
//                 name="teamLogo"
//                 component="div"
//                 className="text-red-500 text-sm"
//               />
//             </div>

//             {/* Nationality */}
//             <div className="text-start w-full pr-4">
//               <div className="custom_select2 sd_select--menu">
//                 <label className="flex gap-4 items-center h-10 rounded cursor-pointer">
//                   {t("tourteam.nationality")}
//                 </label>
//                 <Select
//                   value={values.nationality}
//                   onChange={(option) => setFieldValue("nationality", option)}
//                   options={countryOptions}
//                   className="basic-multi-select focus:outline-0 focus:shadow-none"
//                   classNamePrefix="select"
//                   placeholder={t("tourteam.select_nationality")}
//                 />
//                 <ErrorMessage
//                   name="nationality"
//                   component="div"
//                   className="text-red-500 text-sm"
//                 />
//                 <svg
//                   width="0"
//                   height="0"
//                   viewBox="0 0 400 72"
//                   xmlns="http://www.w3.org/2000/svg"
//                   style={{ position: "absolute" }}
//                 >
//                   <defs>
//                     <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                       <path
//                         transform="scale(0.0025, 0.0138889)"
//                         d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                       />
//                     </clipPath>
//                   </defs>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-4 mt-7">
//             {/* Social Media - Optional */}
//             <div className="text-start w-full pr-4">
//               <h3 className="text-[#7B7ED0] mb-3">
//                 {t("tourteam.social_media")}
//               </h3>
//               {["twitter", "instagram", "twitch", "kick", "discord", "tiktok"].map(
//                 (platform) => (
//                   <div key={platform} className="mb-3">
//                     <Field
//                       type="text"
//                       name={`socialMedia.${platform}`}
//                       className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
//                       placeholder={
//                         t(`tourteam.${platform}`) ||
//                         platform.charAt(0).toUpperCase() + platform.slice(1)
//                       }
//                     />
//                     <ErrorMessage
//                       name={`socialMedia.${platform}`}
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                     <svg
//                       width="0"
//                       height="0"
//                       viewBox="0 0 400 72"
//                       xmlns="http://www.w3.org/2000/svg"
//                       style={{ position: "absolute" }}
//                     >
//                       <defs>
//                         <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
//                           <path
//                             transform="scale(0.0025, 0.0138889)"
//                             d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
//                           />
//                         </clipPath>
//                       </defs>
//                     </svg>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (!showTeamRegistrationPopup) return null;

//   return (
//     <>
//       <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
//       <div className="fixed inset-0 flex justify-center items-center z-50">
//         <motion.div
//           className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white rounded-xl w-full max-w-lg relative p-6 overflow-y-auto max-h-[90vh]"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//           initial={{ scale: 0.5, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           exit={{ scale: 0.5, opacity: 0, y: 50 }}
//           transition={{ duration: 0.5, ease: "easeInOut" }}
//         >
//           <style jsx="true">{`
//             @media (max-width: 767px) {
//               .match_reg--popup::-webkit-scrollbar {
//                 width: 6px;
//               }
//               .match_reg--popup::-webkit-scrollbar-thumb {
//                 background-color: #7b7ed0;
//                 border-radius: 4px;
//               }
//               .match_reg--popup::-webkit-scrollbar-track {
//                 background: transparent;
//               }
//             }
//           `}</style>

//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">
//               {t("tourteam.create_team")}
//             </h2>
//             <button
//               onClick={handleClose}
//               className="cursor-pointer hover:opacity-70 duration-300"
//             >
//               <svg width="18" height="18" fill="none" stroke="#7B7ED0">
//                 <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
//               </svg>
//             </button>
//           </div>

//           {/* Form */}
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[step - 1]}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {({ values, setFieldValue }) => (
//               <Form>
//                 {renderStepContent(values, setFieldValue)}

//                 {/* Navigation Buttons */}
//                 <div className="wizard_step--btn gap-5 flex justify-end sm:mt-14 mt-8 mb-8 mr-5">
//                   {step > 1 && (
//                     <div className="game_status--tab wizard_btn back_btn">
//                       <button
//                         type="button"
//                         onClick={() => setStep((prev) => prev - 1)}
//                         className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
//                         style={{ width: "8rem", height: "4rem" }}
//                         disabled={loadingSubmit}
//                       >
//                         {t("auth.back")}
//                       </button>
//                     </div>
//                   )}
//                   <div className="game_status--tab wizard_btn next_btn">
//                     <button
//                       type="submit"
//                       className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
//                       style={{ width: "8rem", height: "4rem" }}
//                       disabled={loadingSubmit}
//                     >
//                       {step < TOTAL_STEPS ? (
//                         t("auth.next")
//                       ) : loadingSubmit ? (
//                         <>
//                           <svg
//                             className="animate-spin h-5 w-5 mr-2 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           {t("auth.loading") || "Loading..."}
//                         </>
//                       ) : (
//                         t("tourteam.create")
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </motion.div>
//       </div>

//       <svg
//         width="0"
//         height="0"
//         viewBox="0 0 480 416"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ position: "absolute" }}
//       >
//         <defs>
//           <clipPath id="myClipPath" clipPathUnits="objectBoundingBox">
//             <path
//               transform="scale(0.00208333, 0.00240385)"
//               d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L24 0H480V100Z"
//             />
//           </clipPath>
//         </defs>
//       </svg>
//     </>
//   );
// };

// export default TeamRegistrationPopup;