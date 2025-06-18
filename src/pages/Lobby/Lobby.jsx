import React, { useEffect, useState } from "react";
import SelectGame from "../../components/LoddyComponents/GameMenu";
import { FolderView, ListView } from "../../components/ui/svg";
import { useParams } from "react-router-dom";
import { fetchLeagues } from "../../app/slices/lobby/lobbySlice";
import { useDispatch, useSelector } from "react-redux";

import GameCardV2 from "../../components/LoddyComponents/GameCardV2";
import GameCard from "../../components/LoddyComponents/GameCard";
import { items } from "../../utils/constant";
import GamingLoader from "../../components/Loader/loader";

const Lobby = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isListView, setIsListView] = useState(true);
  const [selectedGame, setselectedGame] = useState({});
  const tabs = ["ongoing", "finished", "all"];
  const { leagues, loading } = useSelector((state) => state.lobby);
  const partner = items.find((item) => item.id === useParams().id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchLeagues({
        partnerId: partner.docId,
        filter: tabs[activeIndex],
        GameId: selectedGame?._id,
      })
    );
  }, [dispatch, activeIndex, selectedGame]);

  const handleGameChange = (game) => {
    setselectedGame(game);
  };

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
          <SelectGame onGameChange={handleGameChange} />

          {/* Select Game List or Folder View Button HTML */}
          <div className="game_list--view flex sd_radial-bg items-center rounded-xl p-2">
            <button
              onClick={() => setIsListView(true)}
              className={`inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400 ${
                isListView ? "active" : ""
              }`}
            >
              <ListView isActive={isListView} />
            </button>
            <button
              onClick={() => setIsListView(false)}
              className={`inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400 ${
                !isListView ? "active" : ""
              }`}
            >
              <FolderView isActive={!isListView} />
            </button>
          </div>
        </div>
        <div className="game_status--tab rounded-xl overflow-hidden absolute top-1 right-32 inline-flex mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
              ${
                activeIndex === index
                  ? "active-tab hover:opacity-100 polygon_border"
                  : "inactive-tab"
              }
            `}
              style={{ width: "10rem", height: "4rem" }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="sd_tab_cont--wrap pb-10">
          {loading ? (
            /* {true ? ( */
            <GamingLoader />
          ) : isListView ? (
            <GameCardV2 leagues={leagues} />
          ) : (
            <GameCard leagues={leagues} />
          )}
        </div>
      </div>
    </>
  );
};

export default Lobby;
