import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  clearResetPasswordState,
  resetPassword,
} from "../../app/slices/auth/authSlice";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  fetchInviteLink,
  resetInviteLink,
} from "../../app/slices/teamInvitationSlice/teamInvitationSlice";

const InviteBaseUrl = "https://staging.primeeleague.com";

const InvitePlayerModel = ({ close }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { resetPasswordSuccess } = useSelector((state) => state.auth);
  const {
    link: inviteLink,
    loading,
    error,
  } = useSelector((state) => state.teamInvitation);
  const { currentTeam } = useSelector((state) => state.tournamentTeam);

  const forgotInitialValues = { email: "" };
  const forgotValidationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation_messages.email_invalid"))
      .required(t("validation_messages.email_required")),
  });

  // Clear reset password state
  if (resetPasswordSuccess) {
    dispatch(clearResetPasswordState());
  }
  console.log("currentTeam<<", currentTeam);

  const handleForgotSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(resetPassword(values?.email)).unwrap();
      toast.success(t("auth.forgot_email_sent"));
    } catch (err) {
      toast.error(err.message || t("auth.forgot_failed"));
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch invite link when modal opens
  useEffect(() => {
    dispatch(fetchInviteLink(currentTeam?._id))
      .unwrap()
      .catch((err) =>
        toast.error(err || t("tournament.invite_link_fetch_failed"))
      );
  }, [dispatch, t]);

  const handleResetLink = () => {
    dispatch(resetInviteLink(currentTeam?._id))
      .unwrap()

      .catch((err) =>
        toast.error(err || t("tournament.invite_link_reset_failed"))
      );
  };

  const handleCopy = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(
      `${InviteBaseUrl}/prime/lobby?Iid=${inviteLink}`
    );

    toast.success(t("tournament.copy_button_title1"));
  };
  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed inset-0 flex justify-center items-center z-[999]">
        <motion.div
          className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white p-6 rounded-xl lg:!w-[37rem]  relative m-4 md:m-0"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {t("tournament.invite_player_model")}
            </h2>
            <button
              onClick={() => close()}
              className="cursor-pointer hover:opacity-70 duration-300"
            >
              <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <Formik
            initialValues={forgotInitialValues}
            validationSchema={forgotValidationSchema}
            onSubmit={handleForgotSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 mt-7">
                <div className="mb-6">
                  <label className="block text-base text-white mb-2 !font-bold">
                    {t("tournament.invite_link_label")}
                  </label>
                  <div className="flex w-full">
                    <div className="flex items-center gap-2 bg-[#05042C] h-[56px] border border-[#393B7A] rounded-lg w-full overflow-hidden pl-[15px]">
                      <input
                        type="text"
                        value={`${InviteBaseUrl}/prime/lobby?Iid=${inviteLink}`} // <-- use inviteLink state
                        readOnly
                        className="flex-1 bg-transparent text-white text-sm outline-none"
                        style={{ minWidth: 0 }}
                      />

                      <button
                        className="flex items-center justify-center w-[58px] h-full transition-colors bg-[linear-gradient(59.17deg,#434BE9_22.83%,#46B5F9_151.01%)]"
                        title={t("tournament.copy_button_title")}
                        onClick={handleCopy}
                      >
                        <svg
                          width="24"
                          height="30"
                          viewBox="0 0 24 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.6475 27.6528C19.3338 28.3529 18.8283 28.9465 18.1911 29.3627C17.554 29.7789 16.8123 30.0002 16.0547 30H3.94481C3.42675 30.0001 2.91375 29.8965 2.43511 29.6953C1.95648 29.4941 1.52158 29.1992 1.15525 28.8274C0.788932 28.4556 0.498363 28.0141 0.300142 27.5283C0.101921 27.0425 -6.77401e-05 26.5218 6.54925e-07 25.9959V8.0642C-0.000435938 7.29509 0.217421 6.54213 0.627511 5.8954C1.0376 5.24866 1.62256 4.73554 2.31242 4.41739V24.4606C2.31228 24.8799 2.39353 25.2951 2.55152 25.6825C2.70951 26.0699 2.94115 26.422 3.2332 26.7185C3.52526 27.0151 3.87201 27.2503 4.25365 27.4108C4.63529 27.5713 5.04434 27.6539 5.45743 27.6539L19.6475 27.6528ZM14.1869 7.84803V0H7.94428C7.42605 -1.6501e-07 6.9129 0.10366 6.43415 0.305056C5.9554 0.506452 5.52045 0.801635 5.15415 1.17374C4.78785 1.54584 4.49738 1.98756 4.29934 2.47366C4.10131 2.95976 3.99959 3.48071 4 4.00673V23.1762C4.00041 23.9095 4.28767 24.6126 4.79863 25.1309C5.30959 25.6492 6.00242 25.9404 6.72481 25.9404H20.0547C20.5727 25.9404 21.0857 25.8368 21.5643 25.6356C22.0429 25.4344 22.4778 25.1395 22.8441 24.7676C23.2104 24.3958 23.501 23.9544 23.6992 23.4686C23.8974 22.9828 23.9995 22.4622 23.9995 21.9363V10.2634H16.5644C15.9337 10.2628 15.329 10.0081 14.8832 9.55519C14.4373 9.10229 14.1869 8.48826 14.1869 7.84803ZM15.5527 0L24 8.90983H16.7764C16.4518 8.90983 16.1406 8.77898 15.9111 8.54605C15.6816 8.31313 15.5527 7.99721 15.5527 7.66781V0Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      className="flex items-center justify-center w-[3.5rem] shrink-0 h-auto rounded-lg bg-linear-to-b text-white from-[#BC5225EB] to-[#F49528] font-medium text-base cursor-pointer transition-colors"
                      style={{ marginLeft: 13 }}
                      title={t("tournament.reset_button_title")}
                      onClick={handleResetLink}
                      disabled={loading} // disable while loading
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      ) : (
                        t("tournament.reset_button_title")
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
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

export default InvitePlayerModel;
