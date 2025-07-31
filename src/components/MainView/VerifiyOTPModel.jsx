import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, sendOtp, verifyOtp } from "../../app/slices/auth/authSlice";
import { setProfileVisible, setRegisteration } from "../../app/slices/constState/constStateSlice";
import { setVerificationModal } from "../../app/slices/leagueDetail/leagueDetailSlice";
import { toast } from "react-toastify";

const VerifiyOTPModel = ({ module }) => {

  // State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  // Hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isRegisteration } = useSelector((state) => state.constState);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (module === "queue") {
      localStorage.setItem("OTPCreated", new Date().toISOString());
      dispatch(sendOtp(user?.email)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          toast.success(t("form.otp_sent"));
        } else {
          toast.error(
            action.payload || t("validation_messages.email_invalid")
          );
        }
      });
    }
  }, [module, dispatch])

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
          dispatch(setVerificationModal({ open: false, module: null }));
          // setShowOtpPopup(false);
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

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className={`verify-otp-shape bg-[#151743] sm:p-6 p-4 rounded-lg shadow-lg w-full max-w-md ${module === "queue" ? "" : "otp-verify"}`}>
        <h2 className="text-xl font-medium text-white mb-3 font_oswald">
          {t("form.verify_otp")}
        </h2>
        {module === "queue" ? (

          <div className="px-8 pb-4 text-center">
            <h2 className="text-2xl font-bold mb-2">{t("form.verify_email_title")}</h2>
            <p className="text-base text-gray-300">
              {t("form.verify_email_message")}
            </p>
          </div>

        ) : null}

        <div className="flex justify-between mb-6 gap-1">
          {otp.map((digit, index) => (
            <React.Fragment key={index}>
              <input
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="sd_custom-input otp-input w-12 h-12 text-center text-lg text-[#7B7ED0] bg-[#1a1a3d] border-none focus:outline-0 focus:shadow-none"
              />
              {/* Hidden SVG for clipPath styling */}
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
            </React.Fragment>
          ))}
        </div>

        {otpError && (
          <div className="text-red-500 text-sm mb-4">{otpError}</div>
        )}

        <div className="flex justify-end gap-4 game_status--tab otp-input">
          <button
            type="button"
            onClick={() => {
              dispatch(setVerificationModal({ open: false, module: null }));
              // setShowOtpPopup(false);
              setOtp(["", "", "", "", "", ""]);
              setOtpError("");
            }}
            className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 cancel-btn duration-300 polygon_border"
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
  );
};

export default VerifiyOTPModel;
