import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  clearResetPasswordState,
  loginUser,
  resetPassword,
} from "../../app/slices/auth/authSlice";
import { toast } from "react-toastify";
import {
  setLogin,
  setAnnouncementBanner,
  setRegisteration,
} from "../../app/slices/constState/constStateSlice";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const { resetPasswordSuccess } = useSelector((state) => state.auth);

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const forgotInitialValues = {
    email: "",
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation_messages.email_invalid"))
      .required(t("validation_messages.email_required")),
    password: Yup.string()
      .required(t("validation_messages.password_required"))
      .min(8, t("validation_messages.password_min_length")),
  });

  const forgotValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation_messages.email_invalid"))
      .required(t("validation_messages.email_required")),
  });

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        ...values,
      };
      const res = await dispatch(loginUser(payload)).unwrap();
      if (res.status === 203) {
        toast.error(res.message || t("auth.login_failed"));
        return;
      } else {
        if (res.data.violation && res.data.banMessage) {
          let message = `${res.data.banMessage} <br/>violation : ${res.data.violation}`;
          toast.error(<span dangerouslySetInnerHTML={{ __html: message }} />);
        } else {
          toast.success(res.message);
        }
      }
      dispatch(setLogin(false));
      dispatch(setAnnouncementBanner(true));
    } catch (error) {
      toast.error(error.message || t("auth.login_failed"));
      console.error("Login failed:", error);
      dispatch(setLogin(false));
    } finally {
      setSubmitting(false);
    }
  };

  if (resetPasswordSuccess) {
    dispatch(clearResetPasswordState());
  }

  const handleForgotSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(resetPassword(values?.email)).unwrap();
      toast.success(t("auth.forgot_email_sent"));
      setVisible(false);
    } catch (error) {
      toast.error(error.message || t("auth.forgot_failed"));
      console.error("Forgot password failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed inset-0 flex justify-center items-center z-[999]">
        <motion.div
          className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white p-6 rounded-xl w-full max-w-lg relative m-4 md:m-0"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {visible ? t("auth.forgot_password") : t("auth.login")}
            </h2>
            <button
              onClick={() => dispatch(setLogin(false))}
              className="cursor-pointer hover:opacity-70 duration-300"
            >
              <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {visible ? (
            // Forgot Password Form
            <Formik
              initialValues={forgotInitialValues}
              validationSchema={forgotValidationSchema}
              onSubmit={handleForgotSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 mt-7">
                  <div className="text-start w-full pr-4">
                    {/* <Field
                      type="email"
                      name="email"
                      className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                      placeholder={t("form.email")}
                    /> */}
                    <ErrorMessage
                      name="email"
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
                  <div className="flex items-center justify-end gap-2 mt-4 game_status--tab ">
                    <button
                      type="button"
                      onClick={() => setVisible(false)}
                      className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300 polygon_border active-tab"
                      style={{ width: "10rem", height: "4rem" }}
                    >
                      {t("auth.back_to_login")}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300 polygon_border active-tab"
                      style={{ width: "10rem", height: "4rem" }}
                    >
                      {isSubmitting ? (
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
                      ) : (
                        t("auth.send_email")
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            // Login Form
            <Formik
              initialValues={loginInitialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4 mt-7">
                  <div className="text-start w-full pr-4">
                    <Field
                      type="email"
                      name="email"
                      className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                      placeholder={t("form.email")}
                    />
                    <ErrorMessage
                      name="email"
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
                  <div className="text-start w-full mt-4 pr-4">
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="sd_custom-input !w-full px-4 ltr:pr-10 rtl:pr-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                        placeholder={t("form.password")}
                      />
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
                    </div>
                    <ErrorMessage
                      name="password"
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
                  <div className="flex gap-2 sm:hidden">
                    <span className="text-sm text-white">
                      {t("auth.donthaveaccount")}
                    </span>
                    <div
                      className="text-sm text-blue-500 cursor-pointer"
                      onClick={() => {
                        dispatch(setLogin(false));
                        dispatch(setRegisteration(true));
                      }}
                    >
                      {t("auth.create_account")}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVisible(true)}
                    className="text-sm text-blue-500 cursor-pointer hover:opacity-70"
                  >
                    {t("auth.lblForgot")}
                  </button>
                  <div className="wizard_step--btn flex justify-end">
                    <div className="game_status--tab wizard_btn mt-10 mb-8 mr-5 login-btn">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border flex items-center justify-center"
                        style={{ width: "10rem", height: "4rem" }}
                      >
                        {isSubmitting ? (
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
                        ) : (
                          t("auth.login")
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </motion.div>
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
              d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L24 0H480V100Z"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default Login;
