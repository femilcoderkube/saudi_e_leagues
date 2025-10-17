import React from "react";

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
        className={`w-[30px] h-[30px] shrink-0 rounded-[10px] transition-all duration-200 border border-[var(--checkbox-border)] flex items-center justify-center ${
          checked
            ? "bg-[linear-gradient(55.02deg,#434BE9_-10.01%,#46B5F9_107.56%)]"
            : "bg-[var(--checkbox-bg)]"
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.4233 0.747316C18.2257 1.70335 18.1859 3.20873 17.3344 4.10966L7.65385 14.3525C6.81218 15.2431 5.4898 15.2111 4.68311 14.2805L0.600388 9.57093C-0.215649 8.6296 -0.197561 7.12371 0.640794 6.20741C1.47914 5.29119 2.82029 5.31146 3.63633 6.25279L6.26525 9.28535L14.4288 0.64749C15.2803 -0.25341 16.621 -0.208714 17.4233 0.747316Z"
              fill="white"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default CustomCheckbox;
