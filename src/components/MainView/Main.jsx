import React from "react";
import Header from "../Header/Header";

import { Link, Outlet } from "react-router-dom";

export default function Main({ selectedItem }) {
  console.log("selectedItem", selectedItem);
  return (
    <div className="flex-1 flex flex-col sd_main-content ml-[-2.5rem] relative bg-[#020326] rounded-l-[2.5rem] z-20">
      <Header selectedItem={selectedItem} />
      <main className="flex-1 px-[4.5rem] game_card_main--con border-t border-[#7b7ed02e] mt-5 pt-7">
        <Outlet />
      </main>
    </div>
  );
}
