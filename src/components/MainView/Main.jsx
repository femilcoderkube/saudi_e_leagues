import React, { useState } from "react";
import Header from "../Header/Header";
import { Link, Outlet } from "react-router-dom";
import WizardSteps from "./WizardSteps";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../app/slices/auth/registerSlice";
import LoginModal from "../Modal/LoginModal";
import { toast } from "react-toastify";
import SubmitPopUp from "../ModalPopUp/SubmitScorePopUp";

export default function Main({ selectedItem }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const isMatchMaking = useSelector((state) => state.constState.isMatchMaking);

  const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    nationality: "Saudi Arabia",
    phone: "",
    dateOfBirth: "",
    gender: "Male",
    role: null,
    favoriteGame: null,
    profilePicture: null,
  };
  console.log("isMatchMaking---", isMatchMaking);

  const handleSubmit = async (values) => {
    try {
      setLoadingSubmit(true);
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "role" || key === "favoriteGame") {
          formData.append(key, values[key]?.value || "");
        } else if (key === "profilePicture") {
          if (values[key]) formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      console.log(values);
      const res = await dispatch(registerUser(formData)).unwrap();
      console.log("Registration successful:", res);
      if (res.success) {
        toast.success(
          res?.message || "Registration successful! Please log in to continue."
        );
        // Optionally, you can redirect the user or show a success message
      }
      setLoadingSubmit(false);

      setShowModal(false);
      setStep(1);
      setPreviewImage(null);
    } catch (error) {
      console.error("Registration failed:", error);
      setLoadingSubmit(false);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col sd_main-content ml-[-2.5rem] relative bg-[#020326] rounded-l-[2.5rem] z-20">
      <Header
        selectedItem={selectedItem}
        setShowModal={setShowModal}
        setShowLoginModal={setShowLoginModal}
        setSubmitModal={setSubmitModal}
      />
      <main
        className={`flex-1 game_card_main--con    ${
          isMatchMaking ? "" : "px-[4.5rem] pt-7 "
        }`}
      >
        {showModal && (
          <>
            <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
            <div className="fixed  inset-0 flex justify-center items-center z-50">
              <div className="bg-[#121331] match_reg--popup !h-auto sd_before sd_after text-white p-6 rounded-xl w-full max-w-lg relative">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Registration</h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setPreviewImage(null);
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
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  onNext={() => setStep((prev) => prev + 1)}
                  onBack={() => setStep((prev) => prev - 1)}
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  loadingSubmit={loadingSubmit}
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

        {showLoginModal && (
          <LoginModal
            showModal={showLoginModal}
            setShowModal={setShowLoginModal}
          />
        )}

        {submitModal && (
          <SubmitPopUp
            showModal={submitModal}
            handleClose={() => setSubmitModal(false)}
          />
        )}
        <Outlet />
      </main>
    </div>
  );
}
