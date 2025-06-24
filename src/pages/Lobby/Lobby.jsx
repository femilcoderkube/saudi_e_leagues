import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import GameDropDown from "../../components/LoddyPageComponents/GameDropDown";
import { FolderIcon, ListIcon } from "../../components/ui/svg";
import { useParams } from "react-router-dom";
import {
  fetchLeagues,
  setActiveIndex,
  setIsListView,
} from "../../app/slices/lobby/lobbySlice";
import { useDispatch, useSelector } from "react-redux";
import GameCardListView from "../../components/LoddyPageComponents/GameCardListView";
import GameCardGridView from "../../components/LoddyPageComponents/GameCardGridView";
import { getPartnerById } from "../../utils/constant";
import GamingLoader from "../../components/Loader/loader";
import { setLeagueData } from "../../app/slices/leagueDetail/leagueDetailSlice";

// Animation variants for the card wrapper
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1, // Exit in reverse order
    },
  },
};

const Lobby = () => {
  const { id } = useParams();
  const { leagues, loading, activeIndex, tabs, isListView, selectedGame } =
    useSelector((state) => state.lobby);
  const partnerID = getPartnerById(id).docId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchLeagues({
        partnerId: partnerID,
        filter: tabs[activeIndex],
        GameId: selectedGame?._id,
      })
    );
    dispatch(setLeagueData(null));
  }, [dispatch, activeIndex, selectedGame]);

  return (
    <>
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      <div className="sd_slect_game--wrapper relative mt-5 ">
        <div className="select_game-header flex items-center justify-between">
          <GameDropDown />
          <div className="game_list--view flex sd_radial-bg items-center rounded-xl p-2">
            <button
              onClick={() => dispatch(setIsListView(true))}
              className={`inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400 ${
                isListView ? "active" : ""
              }`}
            >
              <ListIcon isActive={isListView} />
            </button>
            <button
              onClick={() => dispatch(setIsListView(false))}
              className={`inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400 ${
                !isListView ? "active" : ""
              }`}
            >
              <FolderIcon isActive={!isListView} />
            </button>
          </div>
        </div>
        <div className="game_status--tab rounded-xl overflow-hidden absolute top-1 right-32 inline-flex mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => dispatch(setActiveIndex(index))}
              className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
              ${
                activeIndex === index
                  ? "active-tab hover:opacity-100 polygon_border"
                  : "inactive-tab"
              }`}
              style={{ width: "10rem", height: "4rem" }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="sd_tab_cont--wrap pb-10">
          {loading ? (
            <GamingLoader />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={isListView ? "list" : "folder"} // Unique key to trigger animation on view change
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="game_card--wrapper"
              >
                {isListView ? (
                  <GameCardListView leagues={leagues} />
                ) : (
                  <GameCardGridView leagues={leagues} />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};

export default Lobby;
