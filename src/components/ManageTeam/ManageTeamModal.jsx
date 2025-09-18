import React, { useState } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../components/ui/images/images";

const ManageTeamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState({
    img: IMAGES.defaultImg,
    label: "SaulVIVTv",
  });

  const options = [
    { img: IMAGES.defaultImg, label: "SaulVIVTv" },
    { img: IMAGES.defaultImg, label: "John Doe" },
    { img: IMAGES.defaultImg, label: "Jane Smith" },
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e) => {
      // Only close if click is outside the dropdown
      if (!e.target.closest(".captain-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 h-full w-full">
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#121331] manage-popup match_reg--popup h-full sd_before sd_after text-white rounded-xl w-full max-w-xl relative max-h-[85vh] py-[3rem] overflow-x-hidden sm:p-6 px-4 overflow-y-auto custom_scroll"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx="true">{`
            .custom_scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {/* Header */}
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-xl font-bold">Manage Team</h2>
            <button
              onClick={onClose}
              className="text-[#A6B6C6] hover:text-[#fff] text-2xl transition-colors duration-200 cursor-pointer"
              aria-label="Close"
            >
              <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div
            className=" space-y-7 max-h-[70vh] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx="true">{`
              /* Hide scrollbar for Chrome, Safari and Opera */
              .manage-team-modal-scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Captain */}
            <div>
              <h3 className="text-base font-semibold mb-2 text-[#BABBFF]">
                Captain
              </h3>
              <div className="relative w-full captain-dropdown">
                {/* Selected value */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="drop-down flex items-center justify-between bg-white sd_custom-input !w-full px-4 text-lg focus:outline-0 focus:shadow-none leading-none text-[#7B7ED0] !placeholder-[#7B7ED0]"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={selected.img}
                      alt={selected.label}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{selected.label}</span>
                  </div>
                  <span className="">
                    <img className="w-4.5 h-auto" src={IMAGES.schdule_down} alt="" />
                  </span>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <ul className="absolute z-50 w-full mt-1 bg-[#09092d] border border-[#393B7A] rounded-lg shadow-lg">
                    {options.map((opt, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          setSelected(opt);
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#2D2E6D] text-[#BABBFF]"
                      >
                        <img
                          src={opt.img}
                          alt={opt.label}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{opt.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>              
            </div>

            {/* Players */}
            <div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-base font-semibold mb-2 text-[#BABBFF]">
                  Players
                </h3>
                <button className="text-[#7b7ed0] cursor-pointer">Edit</button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center sd_custom-input !w-full px-4 text-lg">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
                      <img
                        className="rounded-full w-8 h-8 object-cover"
                        src={IMAGES.defaultImg}
                        alt=""
                      />
                    </span>
                    <span>
                      <p className="text-sm">SaulVIVTv</p>
                      <p className="text-sm text-red-500">SaulVIVTv</p>
                    </span>
                  </span>
                  <span className="flex justify-center items-center w-9 h-9 rounded-full bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
                    <img
                      className="rounded-full w-7 h-7 object-cover"
                      src={IMAGES.defaultImg}
                      alt=""
                    />
                  </span>
                </div>
                <div className="flex justify-between items-center sd_custom-input !w-full px-4 text-lg">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
                      <img
                        className="rounded-full w-8 h-8 object-cover"
                        src={IMAGES.defaultImg}
                        alt=""
                      />
                    </span>
                    <span>
                      <p className="text-sm">SaulVIVTv</p>
                      <p className="text-sm text-green-500">SaulVIVTv</p>
                    </span>
                  </span>
                  <span className="flex justify-center items-center w-9 h-9 rounded-full bg-[linear-gradient(180deg,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%)] shadow-[inset_0_1px_4px_rgba(87,89,195,0.2)]">
                    <img
                      className="rounded-full w-7 h-7 object-cover"
                      src={IMAGES.defaultImg}
                      alt=""
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* Substitutes */}
            <div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-base font-semibold mb-2 text-[#BABBFF]">
                  Substitutes{" "}
                </h3>
                <button className="text-[#7b7ed0] cursor-pointer">Edit</button>
              </div>
              <div className="flex justify-between items-center sd_custom-input !w-full px-4 text-lg"></div>
            </div>

            {/* Coach */}
            <div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-base font-semibold mb-2 text-[#BABBFF]">
                  Coach{" "}
                </h3>
                <button className="text-[#7b7ed0] cursor-pointer">Edit</button>
              </div>
              <div className="flex justify-between items-center sd_custom-input !w-full px-4 text-lg"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="wizard_step--btn gap-5 flex justify-end sm:mt-8 mt-6 mb-6">
            <div className="game_status--tab wizard_btn flex items-center sm:gap-3 gap-1.5">
              <button
                onClick={onClose}
                className="py-2 px-4 text-xl font-medium transition-all relative font_oswald hover:opacity-50 duration-300 cursor-pointer"
                style={{ width: "8rem", height: "4rem" }}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border cursor-pointer"
                style={{ width: "8rem", height: "4rem" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
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
    </>
  );
};

export default ManageTeamModal;
