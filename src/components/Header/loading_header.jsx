import React from "react";
import { NavLink } from "react-router-dom";
import '../../assets/css/main_content.css'
import '../../assets/css/select_game.css'
import { NextArrow } from "../ui/svg/index.jsx";

const LoadingHeader = ({ selectedItem }) => {
  return (
    <header className="header_teture--bg text-white py-[2.35rem] px-[4.5rem] flex items-center justify-center sd_before before:w-full before:h-full relative">
        <div className="back_arrow absolute left-[5rem] scale-x-[-1]">
           <NextArrow width="0.8rem" height="1.5rem" fill="#7378C0"  />
        </div>   
        <h2 className="text-[2rem] !font-black uppercase text-center block">Champions of the League</h2>
    </header>
  );
};

export default LoadingHeader;
