import React from "react";
import { Popup_btn } from "../ui/svg/index.jsx";
import Select from "react-select";
import { RoleOptions, FavGame } from "../ui/svg/SelectMenu.jsx";
import CustomFileUpload from "../ui/svg/UploadFile.jsx";

const WizardSteps = ({ step, onNext, onBack, onSubmit }) => {
  const TOTAL_STEPS = 4;

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 mt-7">
            <div className="text-center w-full pr-4">
              <input
                type="text"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="User Name"
                required
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
            <div className="text-center w-full pr-4">
              <input
                type="text"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="First Name"
                required
              />
            </div>
            <div className="text-center w-full pr-4">
              <input
                type="text"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 mt-7">
            <div className="text-center w-full pr-4">
              <input
                type="text"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="Email"
                required
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
            <div className="text-center w-full pr-4">
              <input
                type="password"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-center w-full pr-4">
              <input
                type="text"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="Nationality"
                required
              />
            </div>
            <div className="text-center w-full pr-4">
              <input
                type="text"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="Mobile No"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 mt-7">
            <div className="text-center w-full pr-4">
              <input
                type="text"
                className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                placeholder="DOB"
                required
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
              <div className="space-y-4">
                <input
                  className="hidden"
                  type="radio"
                  id="check-round01"
                  name="gender"
                />
                <label
                  className="flex gap-4 items-center h-10 px-2 rounded cursor-pointer"
                  htmlFor="check-round01"
                >
                  <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]"></span>
                  <div className="text-base">
                    <span className="purple_light">Male</span>
                  </div>
                </label>
              </div>
              <div className="space-y-4">
                <input
                  className="hidden"
                  type="radio"
                  id="check-round02"
                  name="gender"
                />
                <label
                  className="flex gap-4 items-center h-10 px-2 rounded cursor-pointer"
                  htmlFor="check-round02"
                >
                  <span className="checkbox-inner flex items-center justify-center w-[2rem] h-[2rem] text-transparent rounded-sm bg-[#09092d]"></span>
                  <div className="text-base">
                    <span className="purple_light">Female</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="custom_select2 sd_select--menu">
              <Select
                defaultValue={RoleOptions[0]}
                isMulti={false}
                name="colors"
                options={RoleOptions}
                className="basic-multi-select focus:outline-0 focus:shadow-none"
                classNamePrefix="select"
                // menuIsOpen={true}
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
          <div className="space-y-4 mt-7 text-center w-full pr-4 ">
            <CustomFileUpload />
            <div className="custom_select2 sd_select--menu">
              <Select
                defaultValue={FavGame[0]}
                isMulti={false}
                name="colors"
                options={FavGame}
                className="basic-multi-select focus:outline-0 focus:shadow-none"
                classNamePrefix="select"
                // menuIsOpen={true}
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
    <div>
      {/* Step Indicators */}
      {/* <div className="flex justify-between mb-6"> */}
      {/* {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
              step === s ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {s}
          </div>
        ))} */}
      {/* </div> */}

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <div className="wizard_step--btn gap-5 flex justify-end mt-6 absolute bottom-10 right-12">
        {step > 1 && (
          <div className="game_status--tab wizard_btn back_btn">
            <button
              onClick={onBack}
              className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
              style={{ width: "8rem", height: "4rem" }}
            >
              Back
            </button>
          </div>
        )}

        {step < TOTAL_STEPS ? (
          <div className="game_status--tab wizard_btn next_btn">
            <button
              onClick={onNext}
              className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
              style={{ width: "8rem", height: "4rem" }}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="game_status--tab wizard_btn submit_btn">
            <button
              onClick={onSubmit}
              className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
              style={{ width: "8rem", height: "4rem" }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WizardSteps;
