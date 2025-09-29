import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../components/ui/images/images";

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
            className="bg-gradient-to-br from-[#5e5e69] via-[#151642] to-[#0f0f2a] manage-popup match_reg--popup h-auto sd_before sd_after text-white rounded-2xl w-full max-w-2xl relative max-h-[90vh] py-8 overflow-x-hidden px-6 overflow-y-auto custom_scroll shadow-2xl shadow-black/50"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx="true">{`
              .custom_scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          {/* Modal Header */}
          <div className="flex flex-col items-center mb-6 relative">
            {/* Close Icon */}
            <button
              className="absolute top-0 right-0 mt-[-0.5rem] mr-[-0.5rem] p-2 rounded-full hover:bg-[#23244a] transition-colors"
              aria-label="Close"
              onClick={onClose}
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#23244a"/>
                <path d="M7.5 7.5L14.5 14.5" stroke="#BABBFF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14.5 7.5L7.5 14.5" stroke="#BABBFF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Manage Team</h2>
          </div>

          {/* Invite Link */}
          <div className="mb-6">
            <label className="block text-sm text-white mb-2 font-medium">
              Here is a unique link to invite player for your team
            </label>
            <div className="flex items-center gap-2 bg-[#23244a] border border-[#393B7A] rounded-lg px-3 py-2">
              <input
                type="text"
                value="http://primeleague.com/invite/sd5hl02dedf"
                readOnly
                className="flex-1 bg-transparent text-white text-sm outline-none"
                style={{ minWidth: 0 }}
              />
              <button
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#393B7A] hover:bg-[#5759c7] transition-colors"
                title="Copy"
                onClick={() => {
                  navigator.clipboard.writeText("http://primeleague.com/invite/sd5hl02dedf");
                }}
              >
                <svg width="18" height="18" fill="none" stroke="#BABBFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="8" height="8" rx="2" />
                  <path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                </svg>
              </button>
              <button
                className="flex items-center justify-center w-14 h-9 rounded-lg bg-[#ffb86b] hover:bg-[#ff6b6b] text-[#23244a] font-semibold text-sm transition-colors"
                style={{ marginLeft: 4 }}
                title="Reset"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Manager Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#BABBFF] font-semibold text-sm">Manager <span className="text-xs font-normal text-[#7B7ED0]">· 1 Max</span></span>
              <span className="text-xs text-[#7B7ED0]">Optional</span>
            </div>
            <div className="bg-[#18193a] border border-[#393B7A] rounded-lg px-4 py-3 text-center text-[#7B7ED0] text-sm font-medium">
              There are no available managers for this roster
            </div>
          </div>

          {/* Coach Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#BABBFF] font-semibold text-sm">Coach <span className="text-xs font-normal text-[#7B7ED0]">· 1 Max</span></span>
              <span className="text-xs text-[#7B7ED0]">Optional</span>
            </div>
            <div className="bg-[#18193a] border border-[#393B7A] rounded-lg px-4 py-3 flex items-center justify-between">
              <div className="flex items-center justify-between gap-3 w-full">
               
                <label htmlFor="coach-checkbox" className="flex items-center gap-3 cursor-pointer">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2D2E6D] via-[#34357a] to-[#222456] border-2 border-[#393B7A] flex items-center justify-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Julia Ber_01"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  </span>
                  <div>
                    <p className="text-[#BABBFF] text-sm font-semibold leading-none">Julia Ber_01</p>
                    <p className="text-xs text-[#7B7ED0] leading-none">@berinjer</p>
                  </div>
                </label>
                <input
                  type="checkbox"
                  id="coach-checkbox"
                  className="form-checkbox h-5 w-5 text-[#5e5e69] accent-[#5e5e69] border-[#393B7A] focus:ring-0"
                  style={{ minWidth: 20, minHeight: 20 }}
                />
              </div>
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
