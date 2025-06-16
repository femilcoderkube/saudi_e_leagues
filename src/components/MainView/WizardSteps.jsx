import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import * as Yup from "yup";
import { FavGame, RoleOptions } from "../ui/svg/SelectMenu.jsx";
import CustomFileUpload from "../ui/svg/UploadFile.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGames,
  resetGamesState,
} from "../../app/slices/game/gamesSlice.js";

const WizardSteps = ({
  step,
  onNext,
  onBack,
  onSubmit,
  initialValues,
  previewImage,
  setPreviewImage,
}) => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);

  const [showPassword, setShowPassword] = useState(false);
  const TOTAL_STEPS = 4;

  useEffect(() => {
    dispatch(fetchGames());
    // return () => {
    //   dispatch(resetGamesState());
    // };
  }, [dispatch]);
  const validationSchemas = [
    Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        ),
      firstName: Yup.string()
        .required("First name is required")
        .matches(/^[a-zA-Z]+$/, "First name can only contain letters"),
      lastName: Yup.string()
        .required("Last name is required")
        .matches(/^[a-zA-Z]+$/, "Last name can only contain letters"),
    }),
    Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*]/,
          "Password must contain at least one special character"
        ),
      nationality: Yup.string().required("Nationality is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    }),
    Yup.object({
      dateOfBirth: Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date of birth cannot be in the future"),
      gender: Yup.string()
        .oneOf(["Male", "Female"], "Gender is required")
        .required("Gender is required"),
      role: Yup.object()
        .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
        .required("Role is required"),
    }),
    Yup.object({
      favoriteGame: Yup.object().nullable().shape({
        value: Yup.string(),
        label: Yup.string(),
      }),
      profilePicture: Yup.mixed().nullable(),
      // gameId: Yup.string()
      //   .nullable()
      //   .matches(/^[a-zA-Z0-9_]+$/, "Game ID can only contain letters, numbers, and underscores")
      //   .when("favoriteGame", {
      //     is: (favoriteGame) => favoriteGame && favoriteGame.value,
      //     then: Yup.string().required("Game ID is required when a favorite game is selected"),
      //   }),
      // gameRole: Yup.object()
      //   .nullable()
      //   .shape({
      //     value: Yup.string(),
      //     label: Yup.string(),
      //   }),
    }),
  ];

  const gameOptions = games.map((game) => ({
    value: game._id,
    label: game.name,
  }));

  const renderStepContent = (values, setFieldValue) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 mt-7">
            {["username", "firstName", "lastName"].map((field) => (
              <div key={field} className="text-center w-full pr-4">
                <Field
                  type="text"
                  name={field}
                  className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
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
            {["email", "password", "nationality", "phone"].map((field) => (
              <div key={field} className="text-center w-full pr-4">
                <div className="relative">
                  <Field
                    type={
                      field === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    className="sd_custom-input !w-full px-4 pr-10 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                  {field === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2  transform -translate-y-1/2 text-[#7B7ED0] hover:opacity-70"
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 mt-7">
            <div className="text-center w-full pr-4">
              <Field
                type="date"
                name="dateOfBirth"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="dateOfBirth"
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
            <div className="text-center w-full pr-4 flex gap-5">
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
                    className="flex gap-4 items-center h-10 px-2 rounded cursor-pointer"
                    htmlFor={`gender-${gender}`}
                  >
                    <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]"></span>
                    <div className="text-base">
                      <span className="purple_light">{gender}</span>
                    </div>
                  </label>
                </div>
              ))}
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="custom_select2 sd_select--menu">
              <Select
                value={values.role}
                onChange={(option) => setFieldValue("role", option)}
                options={RoleOptions}
                className="basic-multi-select focus:outline-0 focus:shadow-none"
                classNamePrefix="select"
              />
              <ErrorMessage
                name="role"
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

      case 4:
        return (
          <div className="space-y-4 mt-7 text-center w-full pr-4">
            <div className="relative">
              <Field name="profilePicture">
                {({ form }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        form.setFieldValue("profilePicture", file);
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden w-full h-32"
                    id="profilePicture"
                  />
                )}
              </Field>
              <label
                htmlFor="profilePicture"
                className="relative block w-full h-32 bg-[#09092d] rounded-lg cursor-pointer overflow-hidden"
              >
                {previewImage ? (
                  <div className="relative flex items-center justify-center m-5">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="object-cover h-[100px]"
                    />
                    <button
                      onClick={(e) => {
                        setFieldValue("profilePicture", null);
                        setPreviewImage(null);
                        e.stopPropagation();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <CustomFileUpload />
                  </div>
                )}
              </label>
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[step - 1]}
      onSubmit={(values) => {
        if (step < TOTAL_STEPS) {
          onNext();
        } else {
          onSubmit(values);
        }
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          {renderStepContent(values, setFieldValue, errors, touched)}
          <div className="wizard_step--btn gap-5 flex justify-end mt-6 absolute bottom-10 right-12">
            {step > 1 && (
              <div className="game_status--tab wizard_btn back_btn">
                <button
                  type="button"
                  onClick={onBack}
                  className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                  style={{ width: "8rem", height: "4rem" }}
                >
                  Back
                </button>
              </div>
            )}
            <div className="game_status--tab wizard_btn next_btn">
              <button
                type="submit"
                className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                style={{ width: "8rem", height: "4rem" }}
              >
                {step < TOTAL_STEPS ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default WizardSteps;
