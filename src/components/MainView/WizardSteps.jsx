import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import * as Yup from "yup";
import { RoleOptions } from "../ui/svg/SelectMenu.jsx";
import CustomFileUpload from "../ui/svg/UploadFile.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGames,
  resetGamesState,
} from "../../app/slices/game/gamesSlice.js";
import {
  checkUsersExists,
  fetchUserById,
  sendOtp,
  verifyOtp,
} from "../../app/slices/auth/authSlice.js";
import { debounce } from "lodash";
import { countryData } from "../../utils/CountryCodes.js";
import { baseURL } from "../../utils/axios.js";
import { getServerURL } from "../../utils/constant.js";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import { setProfileVisible, setRegisteration } from "../../app/slices/constState/constStateSlice.js";

const WizardSteps = ({
  step,
  onNext,
  onBack,
  onSubmit,
  initialValues,
  loadingSubmit = false,
  isEdit = false,
  isVerified,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const { isRegisteration } = useSelector((state) => state.constState);
  const { user } = useSelector((state) => state.auth);


  const [previewImage, setPreviewImage] = useState(() => {
    const pic = initialValues?.profilePicture || null;
    if (typeof pic === "string" && pic.startsWith("uploads/")) {
      return getServerURL(pic);
    }
    return pic;
  });
  const TOTAL_STEPS = isEdit ? 0 : 4;
  const usernameCache = useMemo(() => new Map(), []);
  const emailCache = useMemo(() => new Map(), []);

  const debouncedCheckUsername = useMemo(
    () =>
      debounce(async (username, resolve) => {
        if (usernameCache.has(username)) {
          resolve(usernameCache.get(username));
          return;
        }
        try {
          const result = await dispatch(
            checkUsersExists({ userName: username })
          ).unwrap();
          const isAvailable = !result.exists;
          usernameCache.set(username, isAvailable);
          resolve(isAvailable);
        } catch (error) {
          usernameCache.set(username, false);
          resolve(false);
        }
      }, 500),
    [dispatch]
  );

  const debouncedCheckEmail = useMemo(
    () =>
      debounce(async (email, resolve) => {
        if (emailCache.has(email)) {
          resolve(emailCache.get(email));
          return;
        }
        try {
          const result = await dispatch(checkUsersExists({ email })).unwrap();
          const isAvailable = !result.exists;
          emailCache.set(email, isAvailable);
          resolve(isAvailable);
        } catch (error) {
          emailCache.set(email, false);
          resolve(false);
        }
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchGames());
    return () => {
      debouncedCheckUsername.cancel();
      debouncedCheckEmail.cancel();
    };
  }, [dispatch, debouncedCheckUsername, debouncedCheckEmail]);

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError("");
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6 && /^[0-9]{6}$/.test(otpValue)) {
      dispatch(verifyOtp({ otp: otpValue })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setShowOtpPopup(false);
          setOtp(["", "", "", "", "", ""]);
          setOtpError("");
          dispatch(fetchUserById(user?._id));
          if (isRegisteration) {
            dispatch(setRegisteration(false));
          } else {
            dispatch(setProfileVisible(false));
          }
        } else {
          setOtpError(action.payload || t("validation_messages.otp_invalid"));
        }
      });
    } else {
      setOtpError(t("validation_messages.otp_invalid"));
    }
  };

  const countryOptions = countryData.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const dialCodeOptions = countryData.map((country) => ({
    value: country.dial_code,
    label: `${country.dial_code} (${country.code})`,
  }));

  const gameOptions = games.map((game) => ({
    value: game._id,
    label: game.name,
  }));

  const validationSchemas = [
    Yup.object({
      username: isEdit
        ? Yup.string().notRequired()
        : Yup.string()
          .required(t("validation_messages.username_required"))
          .min(3, t("validation_messages.username_min_length"))
          .matches(
            /^[a-zA-Z0-9_]+$/,
            t("validation_messages.username_format")
          )
          .test(
            "check-username-exists",
            t("validation_messages.username_taken"),
            async (value, context) => {
              if (!value || (isEdit && value === initialValues.username))
                return true; // Skip for unchanged username in edit mode
              return new Promise((resolve) =>
                debouncedCheckUsername(value, resolve)
              );
            }
          ),
      firstName: Yup.string()
        .required(t("validation_messages.first_name_required"))
        .matches(/^[a-zA-Z]+$/, t("validation_messages.first_name_format")),
      lastName: Yup.string()
        .required(t("validation_messages.last_name_required"))
        .matches(/^[a-zA-Z]+$/, t("validation_messages.last_name_format")),
    }),
    Yup.object({
      email: Yup.string()
        .email(t("validation_messages.email_invalid"))
        .required(t("validation_messages.email_required"))
        .test(
          "check-email-exists",
          t("validation_messages.email_taken"),
          async (value, context) => {
            if (!value || (isEdit && value === initialValues.email))
              return true; // Skip for unchanged email in edit mode
            return new Promise((resolve) =>
              debouncedCheckEmail(value, resolve)
            );
          }
        ),
      password: isEdit
        ? Yup.string().notRequired() // Password optional for editing
        : Yup.string()
          .required(t("validation_messages.password_required"))
          .min(8, t("validation_messages.password_min_length"))
          .matches(/[A-Z]/, t("validation_messages.password_uppercase"))
          .matches(/[a-z]/, t("validation_messages.password_lowercase"))
          .matches(/[0-9]/, t("validation_messages.password_number"))
          .matches(
            /[!@#$%^&*()\-\_=+\{\}\[\]|\\:;\"'<,>\.\/\?~]/,
            t("validation_messages.password_special")
          ),
      nationality: isEdit
        ? Yup.string().notRequired()
        : Yup.object()
          .shape({
            value: Yup.string().required(),
            label: Yup.string().required(),
          })
          .required(t("validation_messages.nationality_required")),
      dialCode: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required(t("validation_messages.dial_code_required")),
      phoneNumber: Yup.string()
        .required(t("validation_messages.phone_required"))
        .test(
          "phone-digit-count",
          t("validation_messages.phone_digit_count"),
          (value) => {
            if (!value) return false;
            const digits = value.replace(/[^0-9]/g, "");
            return digits.length >= 7 && digits.length <= 15;
          }
        )
        .matches(/^[0-9\s\-\(\)]*$/, t("validation_messages.phone_format")),
    }),
    Yup.object({
      dateOfBirth: isEdit
        ? Yup.string().notRequired()
        : Yup.date()
          .required(t("validation_messages.dob_required"))
          .max(new Date(), t("validation_messages.dob_future"))
          .typeError(t("validation_messages.dob_invalid")),
      gender: isEdit
        ? Yup.string().notRequired()
        : Yup.string()
          .oneOf(["Male", "Female"], t("validation_messages.gender_required"))
          .required(t("validation_messages.gender_required")),
    }),
    Yup.object({
      favoriteGame: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required(t("validation_messages.favorite_game_required")),
      profilePicture: Yup.mixed().nullable(),
    }),
  ];

  const renderStepContent = (values, setFieldValue) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 mt-7">
            {["username", "firstName", "lastName"].map((field) => (
              <div key={field} className="text-start w-full pr-4">
                <Field
                  type="text"
                  name={field}
                  className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                  placeholder={t("form." + field)}
                />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-500 text-sm"
                />
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
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 mt-7">
            {["email", ...(isEdit ? [] : ["password"])].map((field) => (
              <div key={field} className="text-start w-full pr-4">
                <div className="relative">
                  <Field
                    type={
                      field === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : "email"
                    }
                    name={field}
                    className="sd_custom-input !w-full px-4 ltr:pr-10 rtl:pr-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                    placeholder={t("form." + field)}
                  // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                  {field === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute ltr:right-6 rtl:left-6 top-1/2 transform -translate-y-1/2 text-[#7B7ED0] hover:opacity-70"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {showPassword ? (
                          <>
                            <path
                              d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7z"
                              stroke="#7B7ED0"
                              strokeWidth="2"
                            />
                            <circle cx="12" cy="12" r="3" fill="#7B7ED0" />
                          </>
                        ) : (
                          <>
                            <path
                              d="M2 2l20 20M12 5c6.364 0 10 7 10 7s-1.432 2.432-3.568 4.432M9.568 9.568C10.432 8.432 11.568 8 12 8c2.21 0 4 2.79 4 4 0 .432-.132 1.568-1.432 2.432m-4.136 4.136C8.432 16.568 5 12 5 12s1.432-2.432 3.568-4.432"
                              stroke="#7B7ED0"
                              strokeWidth="2"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  )}
                </div>
                <ErrorMessage
                  name={field}
                  component="div"
                  className="text-red-500 text-sm"
                />
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
            ))}
            <div className="text-start w-full pr-4">
              <div className="flex gap-4">
                <div className="custom_select2 sd_select--menu w-1/3">
                  <Select
                    value={values.dialCode}
                    onChange={(option) => setFieldValue("dialCode", option)}
                    options={dialCodeOptions}
                    className="basic-multi-select focus:outline-0 focus:shadow-none"
                    classNamePrefix="select"
                  />
                  <ErrorMessage
                    name="dialCode"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="w-2/3">
                  <Field
                    type="text"
                    name="phoneNumber"
                    className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                    placeholder={t("form.phone_number")}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
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
            <div className="text-start w-full pr-4">
              <div className="custom_select2 sd_select--menu">
                <label className="flex gap-4 items-center h-10 rounded cursor-pointer">
                  {t("form.nationality")}
                </label>
                <Select
                  value={values.nationality}
                  onChange={(option) => setFieldValue("nationality", option)}
                  options={countryOptions}
                  className="basic-multi-select focus:outline-0 focus:shadow-none"
                  classNamePrefix="select"
                  placeholder={t("form.select_nationality")}
                />
                <ErrorMessage
                  name="nationality"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 mt-7">
            <div className="text-start w-full pr-4">
              <label className="flex gap-4 items-center h-10 rounded cursor-pointer">
                {t("form.date_of_birth")}
              </label>
              <Field
                type="date"
                name="dateOfBirth"
                className="sd_custom-input custom-date-icon !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder={t("form.date_of_birth")}
                max={new Date().toISOString().split("T")[0]}
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="text-red-500 text-sm"
              />
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
            <div className="text-start w-full mb-0 pr-4 flex gap-5">
              {["Male", "Female"].map((gender) => (
                <div key={gender} className="space-y-4">
                  <Field
                    type="radio"
                    id={`gender-${gender}`}
                    name="gender"
                    value={gender}
                    className="hidden"
                  />
                  <label
                    htmlFor={`gender-${gender}`}
                    className="flex gap-4 items-center h-10 rounded cursor-pointer"
                  >
                    <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]"></span>
                    <div className="text-base">
                      <span className="purple_light">
                        {t("form." + gender)}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 mt-7 text-start w-full pr-4">
            <div className="relative">
              <Field name="profilePicture">
                {({ form }) => (
                  <CustomFileUpload
                    isReg={true}
                    hasImage={!!previewImage}
                    onFileChange={(file) => {
                      form.setFieldValue("profilePicture", file);
                      setPreviewImage(file ? URL.createObjectURL(file) : null);
                    }}
                    previewImage={previewImage}
                    onRemove={() => {
                      form.setFieldValue("profilePicture", null);
                      setPreviewImage(null);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="profilePicture"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="custom_select2 sd_select--menu">
              <Select
                value={values.favoriteGame}
                onChange={(option) => setFieldValue("favoriteGame", option)}
                options={gameOptions}
                className="basic-multi-select focus:outline-0 focus:shadow-none"
                classNamePrefix="select"
                placeholder={t("form.select_favorite_game")}
              />
              <ErrorMessage
                name="favoriteGame"
                component="div"
                className="text-red-500 text-sm"
              />
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
          </div>
        );

      default:
        return null;
    }
  };

  const renderOtpPopup = () => (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#09092d] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-medium text-white mb-4 font_oswald">
          {t("form.verify_otp")}
        </h2>
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <>
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="sd_custom-input otp-input w-12 h-12 text-center text-lg text-[#7B7ED0] bg-[#1a1a3d] border-none focus:outline-0 focus:shadow-none"
              />
              <svg
                width="0"
                height="0"
                viewBox="0 0 400 72"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute" }}
              >
                <defs>
                  <clipPath id="inputclip1" clipPathUnits="objectBoundingBox">
                    <path
                      transform="scale(0.0025, 0.0138889)"
                      d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                    />
                  </clipPath>
                </defs>
              </svg>
            </>
          ))}
        </div>
        {otpError && (
          <div className="text-red-500 text-sm mb-4">{otpError}</div>
        )}
        <div className="flex justify-end gap-4 game_status--tab otp-input">
          <button
            type="button"
            onClick={() => {
              setShowOtpPopup(false);
              setOtp(["", "", "", "", "", ""]);
              setOtpError("");
            }}
            className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
          >
            {t("auth.cancel")}
          </button>
          <button
            type="button"
            onClick={handleOtpSubmit}
            className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
          >
            {t("auth.verify")}
          </button>
        </div>
      </div>
    </div>
  );
  const renderContent = (values, setFieldValue) => {
    return (
      <>
        <div className="space-y-4 mt-7">
          {["firstName", "lastName"].map((field) => (
            <div key={field} className="text-start w-full pr-4">
              <Field
                type="text"
                name={field}
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder={t("form." + field)}
              />
              <ErrorMessage
                name={field}
                component="div"
                className="text-red-500 text-sm"
              />
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
          ))}
        </div>

        <div className="space-y-4 mt-7">
          {["email", ...(isEdit ? [] : ["password"])].map((field) => (
            <div key={field} className="text-start w-full pr-4">
              <div className="relative">
                <Field
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "email"
                  }
                  name={field}
                  className="sd_custom-input !w-full px-4 ltr:pr-10 rtl:pr-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                  placeholder={t("form." + field)}
                // placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
                {field === "password" && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute ltr:right-6 rtl:left-6 top-1/2 transform -translate-y-1/2 text-[#7B7ED0] hover:opacity-70"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {showPassword ? (
                        <>
                          <path
                            d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7z"
                            stroke="#7B7ED0"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="12" r="3" fill="#7B7ED0" />
                        </>
                      ) : (
                        <>
                          <path
                            d="M2 2l20 20M12 5c6.364 0 10 7 10 7s-1.432 2.432-3.568 4.432M9.568 9.568C10.432 8.432 11.568 8 12 8c2.21 0 4 2.79 4 4 0 .432-.132 1.568-1.432 2.432m-4.136 4.136C8.432 16.568 5 12 5 12s1.432-2.432 3.568-4.432"
                            stroke="#7B7ED0"
                            strokeWidth="2"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                )}
                {field === "email" && !isVerified && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(sendOtp(values.email));
                        setShowOtpPopup(true);
                      }}
                      data-tooltip-id="otp-tooltip"
                      data-tooltip-content="Verify"
                      className="absolute ltr:right-6 rtl:left-6 top-1/2 transform -translate-y-1/2 text-yellow-500 hover:opacity-80"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
         10-4.48 10-10S17.52 2 12 2zm0 15a1.25 1.25 0 1 1 0-2.5
         1.25 1.25 0 0 1 0 2.5zm1-4h-2V7h2v6z"
                        />
                      </svg>
                    </button>
                    <Tooltip id="otp-tooltip" />
                  </>
                )}
              </div>
              <ErrorMessage
                name={field}
                component="div"
                className="text-red-500 text-sm"
              />
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
          ))}
          <div className="text-start w-full pr-4">
            <div className="flex gap-4">
              <div className="custom_select2 sd_select--menu w-1/3">
                <Select
                  value={values.dialCode}
                  onChange={(option) => setFieldValue("dialCode", option)}
                  options={dialCodeOptions}
                  className="basic-multi-select focus:outline-0 focus:shadow-none"
                  classNamePrefix="select"
                />
                <ErrorMessage
                  name="dialCode"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-2/3">
                <Field
                  type="text"
                  name="phoneNumber"
                  className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                  placeholder={t("form.phone_number")}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
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
        </div>

        <div className="space-y-4 mt-7 text-start w-full pr-4">
          <div className="relative">
            <Field name="profilePicture">
              {({ form }) => (
                <CustomFileUpload
                  isReg={true}
                  hasImage={!!previewImage}
                  onFileChange={(file) => {
                    form.setFieldValue("profilePicture", file);
                    setPreviewImage(file ? URL.createObjectURL(file) : null);
                  }}
                  previewImage={previewImage}
                  onRemove={() => {
                    form.setFieldValue("profilePicture", null);
                    setPreviewImage(null);
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="profilePicture"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="custom_select2 sd_select--menu">
            <Select
              value={values.favoriteGame}
              onChange={(option) => setFieldValue("favoriteGame", option)}
              options={gameOptions}
              className="basic-multi-select focus:outline-0 focus:shadow-none"
              classNamePrefix="select"
              placeholder={t("form.select_favorite_game")}
            />
            <ErrorMessage
              name="favoriteGame"
              component="div"
              className="text-red-500 text-sm"
            />
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
        </div>
      </>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[step - 1]}
      onSubmit={(values) => {
        if (isEdit) {
          const phone = values.dialCode
            ? `${values.dialCode.value}-${values.phoneNumber}`
            : values.phoneNumber;
          onSubmit({ ...values, phone });
        } else {
          if (step < TOTAL_STEPS) {
            onNext();
          } else {
            const phone = values.dialCode
              ? `${values.dialCode.value}-${values.phoneNumber}`
              : values.phoneNumber;
            onSubmit({ ...values, phone });
          }
        }
      }}
      enableReinitialize // Allow reinitialization when initialValues change
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          {showOtpPopup && renderOtpPopup()}
          {isEdit
            ? renderContent(values, setFieldValue)
            : renderStepContent(values, setFieldValue)}
          <div className="wizard_step--btn gap-5 flex justify-end sm:mt-14 mt-8 mb-8 mr-5">
            {step > 1 && (
              <div className="game_status--tab wizard_btn back_btn">
                <button
                  type="button"
                  onClick={onBack}
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
                  t("auth.submit")
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WizardSteps;
