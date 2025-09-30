import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../components/ui/images/images";

// Custom checkbox component
const CustomCheckbox = ({ checked, onChange, ariaLabel }) => {
  return (
    <label
      aria-label={ariaLabel}
      className="relative inline-flex items-center justify-center cursor-pointer select-none"
      style={{ minWidth: 28, minHeight: 28 }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer"
        aria-hidden="true"
      />
      <span
        className={`w-[30px] h-[30px] shrink-0 rounded-[10px] transition-all duration-200 border border-[#51549B] flex items-center justify-center ${
          checked
            ? "bg-[linear-gradient(55.02deg,#434BE9_-10.01%,#46B5F9_107.56%)]"
            : "bg-[#D9D9D91A]"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.4233 0.747316C18.2257 1.70335 18.1859 3.20873 17.3344 4.10966L7.65385 14.3525C6.81218 15.2431 5.4898 15.2111 4.68311 14.2805L0.600388 9.57093C-0.215649 8.6296 -0.197561 7.12371 0.640794 6.20741C1.47914 5.29119 2.82029 5.31146 3.63633 6.25279L6.26525 9.28535L14.4288 0.64749C15.2803 -0.25341 16.621 -0.208714 17.4233 0.747316Z"
              fill="white"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

const ManageTeamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { t } = useTranslation();

  // State for dropdown visibility and selected items for each section
  const [dropdownOpen, setDropdownOpen] = useState({
    captain: false,
    players: false,
    substitutes: false,
    coach: false,
  });

  const [selectedItems, setSelectedItems] = useState({
    captain: [],
    players: [],
    substitutes: [],
    coach: [],
  });

  // Sample options for each section (can be fetched dynamically)
  const options = {
    captain: [
      { img: IMAGES.defaultImg, label: "SaulVIVTv" },
      { img: IMAGES.defaultImg, label: "John Doe" },
      { img: IMAGES.defaultImg, label: "Jane Smith" },
    ],
    players: [
      { img: IMAGES.defaultImg, label: "SaulVIVTv" },
      { img: IMAGES.defaultImg, label: "John Doe" },
      { img: IMAGES.defaultImg, label: "Jane Smith" },
    ],
    substitutes: [
      { img: IMAGES.defaultImg, label: "Substitute 1" },
      { img: IMAGES.defaultImg, label: "Substitute 2" },
    ],
    coach: [
      { img: IMAGES.defaultImg, label: "Coach 1" },
      { img: IMAGES.defaultImg, label: "Coach 2" },
    ],
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".dropdown")) {
        setDropdownOpen({
          captain: false,
          players: false,
          substitutes: false,
          coach: false,
        });
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Local selection state for coach example checkbox
  const [isCoachSelected, setIsCoachSelected] = useState(false);

  // Toggle dropdown for a specific section
  const toggleDropdown = (section) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle selection for multi-select
  const handleSelect = (section, option) => {
    setSelectedItems((prev) => {
      const isSelected = prev[section].some(
        (item) => item.label === option.label
      );
      if (isSelected) {
        return {
          ...prev,
          [section]: prev[section].filter(
            (item) => item.label !== option.label
          ),
        };
      } else {
        return {
          ...prev,
          [section]: [...prev[section], option],
        };
      }
    });
  };

  // Render dropdown for each section
  const renderDropdown = (section) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-[#BABBFF] capitalize tracking-wide">
            {t(`tournament.${section}_title`)}
          </h3>
          <button
            onClick={() => toggleDropdown(section)}
            className="text-[#BABBFF] hover:text-white transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                d="M12 5v14m-7-7h14"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative w-full dropdown">
        {/* Enhanced Dropdown Menu */}
        {dropdownOpen[section] && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-gradient-to-b from-[#09092d] to-[#0d0d35] border-2 border-[#393B7A] rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {options[section].map((opt, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(section, opt)}
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-[#2D2E6D] hover:to-[#34357a] text-[#BABBFF] border-b border-[#393B7A]/30 last:border-b-0 group ${
                  selectedItems[section].some(
                    (item) => item.label === opt.label
                  )
                    ? "bg-gradient-to-r from-[#2D2E6D] to-[#34357a]"
                    : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={opt.img}
                    alt={opt.label}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#393B7A] group-hover:border-[#5759c7] transition-all duration-200"
                  />
                  {selectedItems[section].some(
                    (item) => item.label === opt.label
                  ) && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#5759c7] to-[#7b7ed0] rounded-full flex items-center justify-center border-2 border-[#09092d]">
                      <svg width="10" height="8" fill="white">
                        <path
                          d="M8 2L4 6 2 4"
                          stroke="white"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="font-medium group-hover:text-white transition-colors duration-200">
                  {opt.label}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Enhanced Selected Items Display */}
      {selectedItems[section].length > 0 && (
        <div className="space-y-3 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-[#5759c7] to-[#7b7ed0] rounded-full"></div>
            <h4 className="text-sm font-semibold text-[#7B7ED0] uppercase tracking-widest">
              Selected {section} ({selectedItems[section].length})
            </h4>
          </div>
          {selectedItems[section].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="flex justify-between items-center bg-gradient-to-r from-[#1a1b3a] to-[#1e1f42] border-2 border-[#393B7A] rounded-xl px-5 py-4 hover:border-[#5759c7] hover:shadow-lg hover:shadow-[#5759c7]/10 transition-all duration-300 group"
            >
              <span className="flex items-center gap-4 font-semibold">
                <span className="flex justify-center items-center w-12 h-12 rounded-full bg-gradient-to-br from-[#2D2E6D] via-[#34357a] to-[#222456] shadow-lg border-2 border-[#393B7A] group-hover:border-[#5759c7] transition-all duration-300">
                  <img
                    className="rounded-full w-9 h-9 object-cover"
                    src={item.img}
                    alt={item.label}
                  />
                </span>
                <span>
                  <p className="text-base font-semibold text-[#BABBFF] group-hover:text-white transition-colors duration-200">
                    {item.label}
                  </p>
                  <p className="text-xs text-[#7B7ED0] uppercase tracking-wide mt-1">
                    {section}
                  </p>
                </span>
              </span>
              <button
                onClick={() => handleSelect(section, item)}
                className="text-[#ff6b6b] hover:text-white hover:bg-[#ff6b6b] px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 border border-transparent hover:border-[#ff6b6b]"
              >
                {t("tournament.remove")}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 h-full w-full p-4">
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-gradient-to-br from-[#5e5e69] via-[#151642] to-[#0f0f2a] manage-popup match_reg--popup h-auto sd_before sd_after text-white rounded-2xl w-full max-w-2xl relative max-h-[85vh] py-8 overflow-x-hidden px-6 overflow-y-auto custom_scroll shadow-2xl shadow-black/50"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx="true">{`
              .custom_scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Modal Header */}

            <div className="flex items-center justify-center mb-6 relative">
              <h2 className="text-2xl font-bold text-center text-white mb-2">
                Manage Team
              </h2>
              {/* Close Icon */}
              <button
                aria-label="Close"
                onClick={onClose}
                type="button"
                className="cursor-pointer hover:opacity-70 duration-300 absolute right-0"
              >
                <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                  <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Invite Link */}
            <div className="mb-6 ">
              <label className="block text-base text-white mb-2 !font-bold">
                Here is a unique link to invite player for your team
              </label>
              <div className="flex  w-full">
                <div className="flex items-center gap-2 bg-[#05042C] h-[56px] border border-[#393B7A] rounded-lg w-full overflow-hidden pl-[15px]">
                  <input
                    type="text"
                    value="http://primeleague.com/invite/sd5hl02dedf"
                    readOnly
                    className="flex-1 bg-transparent text-white text-sm outline-none"
                    style={{ minWidth: 0 }}
                  />
                  <button
                    className="flex items-center justify-center w-[58px] h-full transition-colors bg-[linear-gradient(59.17deg,#434BE9_22.83%,#46B5F9_151.01%)]"
                    title="Copy"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "http://primeleague.com/invite/sd5hl02dedf"
                      );
                    }}
                  >
                    <svg
                      width="24"
                      height="30"
                      viewBox="0 0 24 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.6475 27.6528C19.3338 28.3529 18.8283 28.9465 18.1911 29.3627C17.554 29.7789 16.8123 30.0002 16.0547 30H3.94481C3.42675 30.0001 2.91375 29.8965 2.43511 29.6953C1.95648 29.4941 1.52158 29.1992 1.15525 28.8274C0.788932 28.4556 0.498363 28.0141 0.300142 27.5283C0.101921 27.0425 -6.77401e-05 26.5218 6.54925e-07 25.9959V8.0642C-0.000435938 7.29509 0.217421 6.54213 0.627511 5.8954C1.0376 5.24866 1.62256 4.73554 2.31242 4.41739V24.4606C2.31228 24.8799 2.39353 25.2951 2.55152 25.6825C2.70951 26.0699 2.94115 26.422 3.2332 26.7185C3.52526 27.0151 3.87201 27.2503 4.25365 27.4108C4.63529 27.5713 5.04434 27.6539 5.45743 27.6539L19.6475 27.6528ZM14.1869 7.84803V0H7.94428C7.42605 -1.6501e-07 6.9129 0.10366 6.43415 0.305056C5.9554 0.506452 5.52045 0.801635 5.15415 1.17374C4.78785 1.54584 4.49738 1.98756 4.29934 2.47366C4.10131 2.95976 3.99959 3.48071 4 4.00673V23.1762C4.00041 23.9095 4.28767 24.6126 4.79863 25.1309C5.30959 25.6492 6.00242 25.9404 6.72481 25.9404H20.0547C20.5727 25.9404 21.0857 25.8368 21.5643 25.6356C22.0429 25.4344 22.4778 25.1395 22.8441 24.7676C23.2104 24.3958 23.501 23.9544 23.6992 23.4686C23.8974 22.9828 23.9995 22.4622 23.9995 21.9363V10.2634H16.5644C15.9337 10.2628 15.329 10.0081 14.8832 9.55519C14.4373 9.10229 14.1869 8.48826 14.1869 7.84803ZM15.5527 0L24 8.90983H16.7764C16.4518 8.90983 16.1406 8.77898 15.9111 8.54605C15.6816 8.31313 15.5527 7.99721 15.5527 7.66781V0Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  className="flex items-center justify-center w-[56px] shrink-0 h-auto rounded-lg bg-linear-to-b text-white from-[#BC5225EB] to-[#F49528] font-medium text-base cursor-pointer transition-colors"
                  style={{ marginLeft: 13 }}
                  title="Reset"
                >
                  Reset
                </button>
              </div>
            </div>
            <hr className="border-[#51549B] pb-6" />
            {/* Manager Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white  text-xl mb-1.5 block">
                    Manager{" "}
                    <span className="text-base font-normal text-white">
                      · 1 Max
                    </span>
                  </span>
                  <p className="block text-sm text-white mb-2">
                    Handles roster management, invites, and tournament
                    registration.
                  </p>
                </div>
                <span className="text-base font-normal text-[#6A71E8]">
                  Optional
                </span>
              </div>
              <div className="bg-[#05042C] border border-[#393B7A] rounded-lg px-4 py-3 text-center text-[#7B7ED0] text-sm font-medium">
                There are no available managers for this roster
              </div>
            </div>

            {/* Coach Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white  text-xl mb-1.5 block">
                    Coach{" "}
                    <span className="text-base font-normal text-white">
                      · 1 Max
                    </span>
                  </span>
                  <p className="block text-sm text-white mb-2">
                    A non-playing support role with no special permissions.
                  </p>
                </div>
                <span className="text-base font-normal text-[#6A71E8]">
                  Optional
                </span>
              </div>
              <div className="bg-[#05042C] border border-[#393B7A] rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center justify-between gap-3 w-full">
                  <label
                    htmlFor="coach-checkbox"
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span className="w-10 h-10">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Julia Ber_01"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </span>
                    <div className="flex items-center flex-wrap sm:gap-6 gap-1">
                      <p className="text-[#F4F7FF] sm:text-xl text-base !font-bold leading-none">
                        Julia Ber_01
                      </p>
                      <p className="text-md text-[#8598F6] font-medium leading-none">
                        @berinjer
                      </p>
                    </div>
                  </label>
                  <CustomCheckbox
                    checked={isCoachSelected}
                    onChange={() => setIsCoachSelected((prev) => !prev)}
                    ariaLabel="Select coach"
                  />
                </div>
              </div>
            </div>

            {/* players Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white  text-xl mb-1.5 block">
                    Players
                    <span className="text-base font-normal text-white ml-1">
                      (2 Min - 3 Max)
                    </span>
                  </span>
                  <p className="block text-sm text-white mb-2">
                    The Roster Players
                  </p>
                </div>
                <span className="text-base font-normal text-[#6A71E8]">
                  Required
                </span>
              </div>
              <div className="bg-[#05042C] border border-[#393B7A] rounded-lg p-3.5 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-3 w-full">
                    <label
                      htmlFor="coach-checkbox"
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span className="w-10 h-10">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Julia Ber_01"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </span>
                      <div className="flex items-center flex-wrap sm:gap-6 gap-1">
                        <p className="text-[#F4F7FF] sm:text-xl text-base !font-bold leading-none">
                          Julia Ber_01
                        </p>
                        <p className="text-md text-[#8598F6] font-medium leading-none">
                          @berinjer
                        </p>
                      </div>
                    </label>
                    <CustomCheckbox
                      checked={isCoachSelected}
                      onChange={() => setIsCoachSelected((prev) => !prev)}
                      ariaLabel="Select coach"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-3 w-full">
                    <label
                      htmlFor="coach-checkbox"
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span className="w-10 h-10">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Julia Ber_01"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </span>
                      <div className="flex items-center flex-wrap sm:gap-6 gap-1">
                        <p className="text-[#F4F7FF] sm:text-xl text-base !font-bold leading-none">
                          Julia Ber_01
                        </p>
                        <p className="text-md text-[#8598F6] font-medium leading-none">
                          @berinjer
                        </p>
                      </div>
                    </label>
                    <CustomCheckbox
                      checked={isCoachSelected}
                      onChange={() => setIsCoachSelected((prev) => !prev)}
                      ariaLabel="Select coach"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between gap-3 w-full">
                    <label
                      htmlFor="coach-checkbox"
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span className="w-10 h-10">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Julia Ber_01"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </span>
                      <div className="flex items-center flex-wrap sm:gap-6 gap-1">
                        <p className="text-[#F4F7FF] sm:text-xl text-base !font-bold leading-none">
                          Julia Ber_01
                        </p>
                        <p className="text-md text-[#8598F6] font-medium leading-none">
                          @berinjer
                        </p>
                      </div>
                    </label>
                    <CustomCheckbox
                      checked={isCoachSelected}
                      onChange={() => setIsCoachSelected((prev) => !prev)}
                      ariaLabel="Select coach"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="manage-team-pop wizard_step--btn gap-5 flex justify-between sm:mt-14 mt-8 mb-8 mr-5 flex-wrap">
              <div className="game_status--tab wizard_btn back_btn">
                <button
                  type="button"
                  className="py-2 px-4 text-[0.938rem] font-semibold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                  style={{ width: "8rem", height: "4rem" }}
                >
                  Withdraw Registration
                </button>
              </div>
              <div className="game_status--tab wizard_btn next_btn">
                <button
                  type="submit"
                  className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-bold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                  style={{ width: "8rem", height: "4rem" }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

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
