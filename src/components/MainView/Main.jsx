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
import { fetchUserById, updateUser } from "../../app/slices/auth/authSlice";
import { baseURL } from "../../utils/axios";
import { registerUser } from "../../app/slices/auth/authSlice";
import { useTranslation } from "react-i18next";
import Notification_sidebar from "../Notification/notificationsidebar";

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
  } = useSelector((state) => state.constState);
  const location = useLocation();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { user, userDetail } = useSelector((state) => state.auth);
  const { t } = useTranslation();

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
        nationality:
          countryOptions.find((option) => option.value === user.nationality) ||
          defaultNationality,
        dialCode:
          dialCodeOptions.find(
            (option) => option.value === (userDetail?.phone?.split("-")[0] || "+966")
          ) || defaultDialCode,
        phoneNumber: userDetail?.phone?.split("-")[1] || "", // Split phone into dialCode and phoneNumber
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: user.gender || "Male",
        role: user.role || "Player",
        favoriteGame: userDetail?.favoriteGame
          ? gameOptions?.find((option) => option.value === userDetail?.favoriteGame)
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
          if (window.location.pathname.includes("/lobby")){
            dispatch(setActiveTabIndex(0));
          }else {
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
          if (window.location.pathname.includes("/lobby")){
            dispatch(setActiveTabIndex(0));
          }else {
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
  useEffect(() => {}, [location]);
  useEffect(() => {
    if (profileVisible && user?._id) {
      dispatch(fetchUserById(user?._id));
    }
  }, [profileVisible, dispatch]);

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
        className={`flex-1 game_card_main--con ${
          checkParams("finding-match") || checkParams("match")
            ? ""
            : "px-4 pt-3 md:px-[4.5rem]"
        }`}
      >
        {(isRegisteration || profileVisible) && (
          <>
            <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
            <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className={`bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white p-6 rounded-xl w-full max-w-lg relative
              ${profileVisible ? 'max-h-[80vh] overflow-y-auto overflow-x-hidden' : ''}`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex justify-between items-center mb-4">
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
                      if (window.location.pathname.includes("/lobby")){
                        dispatch(setActiveTabIndex(0));
                      }else {
                        dispatch(setActiveTabIndex(1));
                      }
                      setPreviewImage(null);
                      setStep(1);
                    }}
                    className="cursor-pointer hover:opacity-70 duration-300"
                  >
                    <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                      <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>
                <WizardSteps
                  step={step}
                  initialValues={
                    profileVisible ? editInitialValues : initialValues
                  }
                  onSubmit={(values) => handleSubmit(values, profileVisible)}
                  onNext={() => setStep((prev) => prev + 1)}
                  onBack={() => setStep((prev) => prev - 1)}
                  loadingSubmit={loadingSubmit}
                  isEdit={profileVisible}
                />
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
        <Outlet />

        {showNotification && <Notification_sidebar />}
      </main>
    </div>
  );
}
