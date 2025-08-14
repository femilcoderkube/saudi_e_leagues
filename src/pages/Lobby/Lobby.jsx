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
import { useTranslation } from "react-i18next";
import { setTournamentData } from "../../app/slices/tournamentSlice/tournamentSlice";

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
  const { t } = useTranslation();
  const partnerID = getPartnerById(id).docId;
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `Prime eLeague`;
  }, [id]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        dispatch(setIsListView(false));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    dispatch(
      fetchLeagues({
        partnerId: partnerID,
        filter: tabs[activeIndex],
        GameId: selectedGame?._id,
      })
    );
    dispatch(setLeagueData(null));
    dispatch(setTournamentData(null))
  }, [dispatch, activeIndex, selectedGame]);

  return (
    <>
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      <div className="sd_slect_game--wrapper relative md:mt-5 ">
        <div className="w-full flex justify-center ">
        <div className="game_status--tab rounded-xl overflow-hidden relative md:mt-0 mt-3 md:left-auto md:-translate-x-0 rtl:translate-x-[0] md:absolute top-1 md:ltr:right-32 rtl:right-75 inline-flex mb-8 md:mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => dispatch(setActiveIndex(index))}
              className={`w-[6rem] sm:w-[10rem] sm:h-[4rem] md:py-2 md:px-2.5 px-7 py-6 pt-0 sm:text-lg font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
              ${
                activeIndex === index
                  ? "active-tab hover:opacity-100 polygon_border"
                  : "inactive-tab"
              }`}
            >
              {t(`lobby.tabs.${tab}`)}
            </button>
          ))}
        </div>
        </div>
        <div className="select_game-header flex items-center gap-1 justify-between">
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
       
        <div className="sd_tab_cont--wrap pb-[5.25rem] sm:pb-10 ">
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
