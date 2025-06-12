import { useState } from "react";
import Header from "../Header/Header";
import rules_icon from "../../assets/images/rules_icon.png";
import WizardSteps from "./WizardSteps";

const MainView = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShowModal(false);
    setStep(1); // reset if you want
  };

  return (
    <div className="flex-1 flex flex-col ml-[-2.5rem] bg-[#020326] rounded-l-[2.5rem] z-20">
      <main className="flex-1 px-[4.5rem] mt-5 pt-7">
        {/* Trigger Button */}
        <div className="sd_rules--btn">
          <button
            onClick={() => setShowModal(true)}
            className="timeline-card__header w-full mt-5 flex items-center gap-3 rounded-xl cursor-pointer relative sd_before sd_after px-4 py-[1.4rem]"
          >
            <img src={rules_icon} alt="rules" className="w-7" />
            <h3 className="text-xl font_oswald">Rules and Regulations</h3>
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <>
            <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40" />
            <div className="fixed modal_popup-con inset-0 flex justify-center items-center z-50">
              <div className="bg-[#121331] match_reg--popup !h-[32rem] relative sd_before sd_after text-white p-6 rounded-xl w-full max-w-lg relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Wizard Form</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="cursor-pointer hover:opacity-70 duration-300"
                  >
                    <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                      <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>

                {/* WizardForm Component */}
                <WizardSteps
                  step={step}
                  formData={formData}
                  onChange={handleChange}
                  onNext={() => setStep((prev) => prev + 1)}
                  onBack={() => setStep((prev) => prev - 1)}
                  onSubmit={handleSubmit}
                  onCustomAction={() => alert("Custom action")}
                />
              </div>
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
          </>
        )}
      </main>
    </div>
  );
};

export default MainView;
