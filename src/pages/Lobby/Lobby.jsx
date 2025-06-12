import React from "react";
import SelectGame from "../../components/SelectGameComp/GameMenu";
import { FolderView, ListView } from "../../components/ui/svg";
import { Link } from "react-router-dom";
import GameTab from "../../components/SelectGameComp/GameTab";
const Lobby = () => {
  return (
    <>
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg absolute top-0 left-0 w-full h-full bg-no-repeat"
        style={{ backgroundSize: "100rem" }}
      ></div>
      {/* <Outlet /> */}

      <div className="sd_slect_game--wrapper relative">
        <div className="select_game-header flex items-center justify-between">
          {/* --- Select Game Dropdown HTML Start --- */}
          <SelectGame />

          {/* Select Game List or Folder View Button HTML */}
          <div className="game_list--view flex sd_radial-bg items-center rounded-xl p-2">
            <Link
              to="#"
              className="inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400"
            >
              <ListView />
            </Link>
            <Link
              to="#"
              className="inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400 active"
            >
              <FolderView />
            </Link>
          </div>
        </div>

        {/* --- Game Staus Tabs HTML Start --- */}
        <GameTab />
      </div>
    </>
  );
};

export default Lobby;
