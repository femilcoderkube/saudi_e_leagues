import React from "react";
import { Popup_btn } from "../ui/svg/index.jsx";

const WizardSteps = ({
  step,
  formData,
  onChange,
  onNext,
  onBack,
  onSubmit,
  onCustomAction,
}) => {
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center w-full pr-4">
                <input type="text" id="first_name" className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]" placeholder="First Name" required />
                <svg width="0" height="0" viewBox="0 0 400 72" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute'}}>
                <defs>
                    <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
                    <path transform="scale(0.0025, 0.0138889)"
                        d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                    />
                    </clipPath>
                </defs>
                </svg>
            </div>
            <div className="text-center w-full pr-4">
                <input type="text" id="first_name" className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]" placeholder="Last Name" required />               
            </div>
            <div className="text-center w-full pr-4">
                <input type="text" id="first_name" className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]" placeholder="Last Name" required />               
            </div>
            
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
           <div className="text-center w-full pr-4">
                <input type="text" id="first_name" className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]" placeholder="Email" required />
                <svg width="0" height="0" viewBox="0 0 400 72" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute'}}>
                <defs>
                    <clipPath id="inputclip" clipPathUnits="objectBoundingBox">
                    <path transform="scale(0.0025, 0.0138889)"
                        d="M240 0L248 8H384L400 24V56L384 72H0V16L16 0H240Z"
                    />
                    </clipPath>
                </defs>
                </svg>
            </div>
            <div className="text-center w-full pr-4">
                <input type="password" id="first_name" className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]" placeholder="Password" required />               
            </div>
            <div className="text-center w-full pr-4">
                <input type="text" id="first_name" className="sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]" placeholder="Nationality" required />               
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-green-400 text-center font-semibold">
            Ready to submit? Click the button below.
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Step Indicators */}
      <div className="flex justify-between mb-6">
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
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <div className="wizard_step--btn gap-5 flex justify-end mt-6 absolute bottom-10 right-12">
        {step > 1 && (
            <div className="game_status--tab wizard_btn back_btn">
                <button
                    
                    onClick={onBack}
                    className="py-2 px-4 text-xl font-medium  transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300  polygon_border"
                     style={{ width: '8rem', height: '4rem' }}
                >
                Back
                </button>                
            </div>
        )}
        {step < 3 ? (

            // <Popup_btn  onClick={}/>
            <div className="game_status--tab wizard_btn next_btn">
                 <button
                    
                    onClick={onNext}
                    className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300  polygon_border"
                     style={{ width: '8rem', height: '4rem' }}
                >
                     Next
                </button>  

            </div>
    
        ) : (
          <button
            onClick={onSubmit}
            className="bg-green-600 px-4 py-2 rounded ml-auto"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardSteps;
