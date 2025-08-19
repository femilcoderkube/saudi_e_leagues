import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Link, Outlet, useLocation } from "react-router-dom";
import WizardSteps from "./WizardSteps";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../Modal/LoginModal";
import { toast } from "react-toastify";
import SubmitPopUp from "../ModalPopUp/SubmitScorePopUp";
import {
  setActiveTabIndex,
  setPreviewImage,
  setProfileVisible,
  setRegisteration,
  setSubmitModal,
} from "../../app/slices/constState/constStateSlice";
import { countryData } from "../../utils/CountryCodes";
import { checkParams } from "../../utils/constant";
import {
  checkBannedUser,
  fetchUserById,
  updateUser,
} from "../../app/slices/auth/authSlice";
import { baseURL } from "../../utils/axios";
import { registerUser } from "../../app/slices/auth/authSlice";
import { useTranslation } from "react-i18next";
import Notification_sidebar from "../Notification/notificationsidebar";
import ConfirmationPopUp from "../ModalPopUp/confirmationPopUp";
import { motion } from "framer-motion";

export default function Main() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { games } = useSelector((state) => state.games);
  const {
    profileVisible,
    submitModal,
    viewModal,
    countryOptions,
    dialCodeOptions,
    isLogin,
    isRegisteration,
    showNotification,
    confirmationPopUp,
  } = useSelector((state) => state.constState);
  const location = useLocation();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  //  dispatch(checkBannedUser());

  const defaultNationality = countryOptions.find(
    (option) => option.value === "Saudi Arabia"
  );
  const defaultDialCode = dialCodeOptions.find(
    (option) => option.value === "+966"
  );

  const gameOptions = games.map((game) => ({
    value: game._id,
    label: game.name,
  }));

  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    nationality: defaultNationality,
    dialCode: defaultDialCode,
    phoneNumber: "", // Changed from phone to phoneNumber
    dateOfBirth: "",
    gender: "Male",
    role: "Player",
    favoriteGame: null,
    profilePicture: null,
  };

  // Pre-fill form values for editing
  const editInitialValues = user
    ? {
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        dialCode:
          dialCodeOptions.find(
            (option) => option.value === (user?.phone?.split("-")[0] || "+966")
          ) || defaultDialCode,
        phoneNumber: user?.phone?.split("-")[1] || "", // Split phone into dialCode and phoneNumber
        favoriteGame: user?.favoriteGame
          ? gameOptions?.find((option) => option.value === user?.favoriteGame)
          : null,
        profilePicture: user?.profilePicture ? user?.profilePicture : null, // Existing profile picture is handled separately
      }
    : initialValues;

  const handleSubmit = async (values, isEdit = false) => {
    try {
      setLoadingSubmit(true);
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (
          key === "favoriteGame" ||
          key === "nationality" ||
          key === "dialCode"
        ) {
          formData.append(key, values[key]?.value || "");
        } else if (key === "profilePicture") {
          if (values[key]) formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      if (isEdit) {
        const res = await dispatch(
          updateUser({ id: user._id, user: formData })
        ).unwrap();
        if (res.success) {
          console.log("res", res?.data);
          localStorage.setItem("user", JSON.stringify(res?.data));
          dispatch(fetchUserById(user?._id));
          dispatch(setProfileVisible(false));
          if (window.location.pathname.includes("/lobby")) {
            dispatch(setActiveTabIndex(0));
          } else {
            dispatch(setActiveTabIndex(1));
          }
        }
        // Update user
      } else {
        // Register user
        const res = await dispatch(registerUser(formData)).unwrap();
        if (res.success) {
          toast.success(
            res?.message ||
              "Registration successful! Please log in to continue."
          );
          dispatch(setRegisteration(false));
          if (window.location.pathname.includes("/lobby")) {
            dispatch(setActiveTabIndex(0));
          } else {
            dispatch(setActiveTabIndex(1));
          }
        }
      }
      setLoadingSubmit(false);
      setStep(1);
    } catch (error) {
      console.error(`${isEdit ? "Update" : "Registration"} failed:`, error);
      toast.error(
        error?.message || `Failed to ${isEdit ? "update profile" : "register"}.`
      );
      setLoadingSubmit(false);
    }
  };
  useEffect(() => {
    dispatch(checkBannedUser());
  }, [location]);

  // useEffect(() => {
  //   if (profileVisible && user?._id) {
  //     setProfileLoading(true);
  //     dispatch(fetchUserById(user?._id)).finally(() => setProfileLoading(false));
  //   }
  // }, [profileVisible, dispatch]);

  return (
    <div
      className="flex-1 flex flex-col sd_main-content md:ltr:ml-[-2.5rem] md:rtl:mr-[-2.5rem] relative bg-[#020326] ltr:rounded-l-[2.5rem] rtl:rounded-r-[2.5rem] z-20"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {/* <div
      className="flex-1 flex flex-col sd_main-content md:ml-[-2.5rem] relative bg-[#020326] rounded-l-[2.5rem] z-20"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    > */}
      <Header />
      <main
        className={`flex-1 game_card_main--con sm:mt-0 mt-19  ${
          checkParams("finding-match") || checkParams("match")
            ? ""
            : "px-4 pt-3 md:px-[4.5rem] ltr:md:pr-[2rem] rtl:md:pl-[2rem]"
        }`}
      >
        {(isRegisteration || profileVisible) && (
          <>
            <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <motion.div
                className={`bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white rounded-xl w-full max-w-lg relative
    ${
      profileVisible
        ? "h-full max-h-[90vh] px-6 py-[3rem] sm:py-6 overflow-x-hidden match_reg--popup2 sm:overflow-y-auto"
        : "p-6 overflow-y-auto "
    }`} // Ensured vertical scrolling on smaller devices
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <style jsx>{`
                  /* Custom scrollbar styling for smaller devices */
                  @media (max-width: 767px) {
                    .match_reg--popup::-webkit-scrollbar {
                      width: 6px;
                    }
                    .match_reg--popup::-webkit-scrollbar-thumb {
                      background-color: #7b7ed0;
                      border-radius: 4px;
                    }
                    .match_reg--popup::-webkit-scrollbar-track {
                      background: transparent;
                    }
                  }
                `}</style>
                {profileVisible && profileLoading ? (
                  <div className="flex justify-center items-center h-200">
                    {/* Simple spinner, you can replace with your own */}
                    <svg
                      className="animate-spin h-8 w-8 text-[#7b7ed0]"
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
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <>
                    <div
                      className={` justify-between items-center mb-4 ${
                        isRegisteration ? "flex" : "hidden sm:flex "
                      }`}
                    >
                      <h2 className="text-xl font-bold">
                        {isRegisteration
                          ? t("auth.registration")
                          : t("form.edit_profile")}
                      </h2>
                      <button
                        onClick={() => {
                          if (isRegisteration) {
                            dispatch(setRegisteration(false));
                          } else {
                            dispatch(setProfileVisible(false));
                          }
                          if (window.location.pathname.includes("/lobby")) {
                            dispatch(setActiveTabIndex(0));
                          } else {
                            dispatch(setActiveTabIndex(1));
                          }
                          setPreviewImage(null);
                          setStep(1);
                        }}
                        className="cursor-pointer hover:opacity-70 duration-300"
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="#7B7ED0"
                        >
                          <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
                        </svg>
                      </button>
                    </div>

                    <WizardSteps
                      step={step}
                      initialValues={
                        profileVisible ? editInitialValues : initialValues
                      }
                      onSubmit={(values) =>
                        handleSubmit(values, profileVisible)
                      }
                      onNext={() => setStep((prev) => prev + 1)}
                      onBack={() => setStep((prev) => prev - 1)}
                      loadingSubmit={loadingSubmit}
                      isEdit={profileVisible}
                      isVerified={user?.isVerified}
                    />
                  </>
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
        )}
        {isLogin && <LoginModal />}
        {submitModal && (
          <SubmitPopUp handleClose={() => dispatch(setSubmitModal(false))} />
        )}
        {confirmationPopUp != 0 && <ConfirmationPopUp />}
        <Outlet />

        {showNotification && <Notification_sidebar />}
      </main>
    </div>
  );
}
