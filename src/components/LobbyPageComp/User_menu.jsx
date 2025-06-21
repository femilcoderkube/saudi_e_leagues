import React, { useState } from "react";

import { Link } from "react-router-dom";
import { baseURL } from "../../utils/axios";
import { logout } from "../../app/slices/auth/authSlice";
import { useDispatch } from "react-redux";

const data = [
  { id: 0, label: "My Profile" },
  { id: 1, label: "Logout" },
];

const Dropdown = ({ user }) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    if (id == 1) {
      dispatch(logout());
      localStorage.clear();
    }
    setOpen(false); // Optional: close dropdown on click
  };

  return (
    <div className="dropdown relative">
      <div
        className="dropdown-header gap-6 p-3 flex justify-between items-center cursor-pointer text-white rounded"
        onClick={toggleDropdown}
      >
        <div className="use_con text-right flex flex-col gap-1">
          <span className="text-lg">{user?.firstName}</span>
          <span className="user_id text-md block purple_col">
            @{user?.username}
          </span>
        </div>
        <div className="user_img  relative sd_before ">
          <img
            src={baseURL + "/api/v1/" + user.profilePicture}
            alt=""
            className="rounded-[3rem]"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
        <svg
          width="0.75rem"
          height="0.5rem"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.251051 0.292893C0.585786 -0.0976311 1.1285 -0.0976311 1.46323 0.292893L6 5.58579L10.5368 0.292893C10.8715 -0.0976311 11.4142 -0.0976311 11.7489 0.292893C12.0837 0.683417 12.0837 1.31658 11.7489 1.70711L6.60609 7.70711C6.27136 8.09763 5.72864 8.09763 5.39391 7.70711L0.251051 1.70711C-0.0836838 1.31658 -0.0836838 0.683417 0.251051 0.292893Z"
            fill="#7378C0"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="dropdown-body absolute rounded-lg mt-1 z-10 w-full sd_radial-bg overflow-hidden">
          {data.map((item) => (
            <Link
              key={item.id}
              className="dropdown-item p-3 block hover:bg-[#0b0d32] duration-400  cursor-pointer"
              onClick={() => handleItemClick(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
