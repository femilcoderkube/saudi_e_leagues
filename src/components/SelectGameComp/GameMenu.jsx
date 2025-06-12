import React, { useState, useEffect, useRef } from "react";
import Sel_game from "../../assets/images/sel_game.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../utils/axios";
import { fetchGames } from "../../app/slices/lobby/lobbySlice";

const SelectGame = ({ onGameChange }) => {
  const { games } = useSelector((state) => state.lobby);
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null); // Track selected game

  const toggleDropdown = () => setOpen(!isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect triggered");
    dispatch(fetchGames(""));
  }, [dispatch]);
  // Update filtered games when searchTerm or games change
  useEffect(() => {
    if (games) {
      setFilteredGames(
        games.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, games]);

  const handleItemClick = (game) => {
    setSelectedGame(game); // Set selected game (null for "None")
    if (onGameChange) {
      onGameChange(game); // Call onGameChange with selected game
    }
    setOpen(false); // Close dropdown
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="select_game-wrap relative">
      <div className="sel_game-menu sd_before sd_after relative polygon_border inline-block">
        <Link
          to={"#"}
          className="dropdown-header btn_polygon-link gap-6 p-3 hover:opacity-70 duration-400 inline-flex justify-between items-center relative sd_before vertical_center"
          onClick={toggleDropdown}
        >
          <img
            src={
              selectedGame ? `${baseURL}/api/v1/${selectedGame.logo}` : Sel_game
            }
            alt="Select Game"
            className="game-logo-svg"
            style={{ width: "2rem" }}
          />
          <span className="text-xl font_oswald font-medium purple_col">
            {selectedGame ? selectedGame.name : "Select Game"}
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
        </Link>
      </div>

      {isOpen && (
        <div className="game_dropdown-body absolute sd_after after:w-full after:h-full after:top-0 rounded-lg z-10 mt-6 w-full z-50">
          <div className="game_menu-con relative">
            <form className="game_search max-w-md mx-auto">
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
                  placeholder="Search Game"
                  value={searchTerm}
                  onChange={handleSearchChange}
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
                <Link
                  to={"#"}
                  className="dropdown-item py-3 px-5 block hover:opacity-50 duration-400 font_oswald flex gap-4 cursor-pointer"
                  onClick={() => handleItemClick(null)}
                >
                  <span className="text-xl purple_light">None</span>
                </Link>
                {filteredGames.length > 0 ? (
                  filteredGames.map((item) => (
                    <Link
                      key={item._id}
                      to={"#"}
                      className="dropdown-item py-3 px-5 block hover:opacity-50 duration-400 font_oswald flex gap-4 cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <img
                        src={`${baseURL}/api/v1/${item.logo}`}
                        alt={item.name}
                        className="game-logo-svg"
                        style={{ width: "2rem" }}
                      />
                      <span className="text-xl purple_light">{item.name}</span>
                    </Link>
                  ))
                ) : (
                  <div className="py-3 px-5 text-xl purple_light font_oswald">
                    No games found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectGame;
