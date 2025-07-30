import { setVerificationModal } from "../../app/slices/leagueDetail/leagueDetailSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const VerificationModel = () => {
  // const { isAgreedToJoin, leagueData } = useSelector((state) => state.leagues);
  const dispatch = useDispatch();
  // const isSocketConnected = useSelector((state) => state.socket.isConnected);
  // const user = useSelector((state) => state.auth.user);
  const { t, i18n } = useTranslation();


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
          <div className="popup-wrap inline-flex justify-center  items-center h-auto relative sd_before before:bg-[#010221] before:w-full before:h-full before:blur-2xl before:opacity-60 ">
            <div className="match_reg--popup relative sd_before sd_after">
              <div className="popup_header px-8 pt-8 pb-5 flex items-start justify-between mt-3 text-center sm:mt-0 sm:text-left">
                <button
                  type="button"
                  onClick={() => dispatch(setVerificationModal(false))}
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
              {/* Title and verify email message */}
              <div className="px-8 pb-6 text-center">
                <h2 className="text-2xl font-bold mb-3">{t("modal.verify_email_title", "Verify Your Email")}</h2>
                <p className="text-base text-gray-600">
                  {t("modal.verify_email_message", "Please verify your email address to continue.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationModel;
