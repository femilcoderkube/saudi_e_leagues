import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchGames,
  setGameDropDownOpen,
  setGameSearchTerm,
  setSelectedGame,
} from "../../app/slices/lobby/lobbySlice";
import { getServerURL } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../ui/images/images";
const GameDropDown = () => {
  const { filteredGames, selectedGame, isGameDropDownOpen, gameSearchTerm } =
    useSelector((state) => state.lobby);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchGames(""));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(setGameDropDownOpen(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="select_game-wrap relative" ref={dropdownRef}>
      <div className="sel_game-menu sd_before sd_after relative polygon_border inline-block">
        <Link
          to={"#"}
          className="dropdown-header btn_polygon-link gap-2 md:gap-6 p-1.5 md:p-3 hover:opacity-70 duration-400 inline-flex justify-between items-center relative sd_before vertical_center"
          onClick={() => {
            dispatch(setGameDropDownOpen(!isGameDropDownOpen));
          }}
        >
          <img
            src={
              selectedGame?.logo
                ? getServerURL(selectedGame.logo)
                : IMAGES.Sel_game
            }
            alt={t("games.select_game")}
            className="game-logo-svg"
            style={{ width: "2rem" }}
            loading="lazy"
          />
          <span className="text-sm md:text-xl font_oswald font-medium purple_col">
            {selectedGame?.name ? selectedGame.name : t("games.select_game")}
          </span>
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
              fill="#BABDFF"
            />
          </svg>
          <svg
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute" }}
          >
            <defs>
              <clipPath
                id="polygonClipDropdown"
                clipPathUnits="objectBoundingBox"
              >
                <path
                  d="
              M1,0.1111
              V0.8889
              L0.9219,1
              H0.7266
              L0.6953,0.9028
              H0.3047
              L0.2734,1
              H0.0781
              L0,0.8889
              V0.1111
              L0.0781,0
              H0.2734
              L0.3047,0.0972
              H0.6953
              L0.7266,0
              H0.9219
              L1,0.1111
              Z
            "
                />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
      <AnimatePresence>
        {isGameDropDownOpen && (
          <motion.div
            className="game_dropdown-body absolute sd_after after:w-full after:h-full after:top-0 rounded-lg mt-6 w-full z-50"
            initial={{ scale: 0.8, opacity: 0, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -100 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="game_menu-con relative">
              <form className="game_search max-w-full md:max-w-md mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <svg
                      width="2rem"
                      height="2rem"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 25C20.7467 25 25 20.7467 25 15.5C25 10.2533 20.7467 6 15.5 6C10.2533 6 6 10.2533 6 15.5C6 20.7467 10.2533 25 15.5 25Z"
                        stroke="#7B7ED0"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M26 26L24 24"
                        stroke="#7B7ED0"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full border-b border-[#4a4b988c] focus:outline-0 focus:border-0 p-4 ps-15 placeholder-[#7B7ED0] text-lg"
                    placeholder={t("games.search_game")}
                    value={gameSearchTerm}
                    onChange={(e) =>
                      dispatch(setGameSearchTerm(e.target.value))
                    }
                    required
                  />
                  <svg
                    width="0"
                    height="0"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute" }}
                  >
                    <defs>
                      <clipPath
                        id="gamemenu_clip"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path
                          d="
                          M1 0.01904761904761905
                          V0.9809523809523809
                          L0.921875 1
                          H0.078125
                          L0 0.9809523809523809
                          V0.01904761904761905
                          L0.078125 0
                          H0.921875
                          L1 0.01904761904761905
                          Z
                        "
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </form>
              <div className="sd_game--wrap">
                <div className="sd_game--link scroll-bar" id="style-3">
                  {/* None Option */}

                  {filteredGames.length > 0 ? (
                    <>
                      <Link
                        to={"#"}
                        className="dropdown-item py-3 px-5 block hover:opacity-50 duration-400 font_oswald flex gap-4 cursor-pointer"
                        onClick={() => dispatch(setSelectedGame({}))}
                      >
                        <span className="sm:text-xl text-lg purple_light">
                          {t("common.none")}
                        </span>
                      </Link>
                      {filteredGames.map((item) => (
                        <Link
                          key={item._id}
                          to={"#"}
                          className="dropdown-item py-3 px-5 block hover:opacity-50 duration-400 font_oswald flex gap-4 cursor-pointer"
                          onClick={() => dispatch(setSelectedGame(item))}
                        >
                          <img
                            src={getServerURL(item.logo)}
                            alt={item.name}
                            className="game-logo-svg"
                            style={{ width: "2rem" }}
                            loading="lazy"
                          />
                          <span className="sm:text-xl text-lg purple_light">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="py-3 px-5 sm:text-xl text-lg purple_light font_oswald">
                      {t("common.no_games_found")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameDropDown;
