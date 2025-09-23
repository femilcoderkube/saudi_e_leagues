import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor, getServerURL } from "../../../utils/constant";
import { toast } from "react-toastify";
import {
  sendInvite,
  setShowPartyQueuePopup,
} from "../../../app/slices/constState/constStateSlice";
import { t } from "i18next";

function PartyQueuePopup() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { leagueData } = useSelector((state) => state.leagues);
  const { allPlayers, partyQueueTeam, recentInvites } = useSelector((state) => state.constState);

  const [searchTerm, setSearchTerm] = useState("");
  const [playersToShow, setPlayersToShow] = useState(10); // Initially show 10 players

  const maxPlayers = leagueData?.playersPerTeam;

  const handleClosePopup = () => {
    dispatch(setShowPartyQueuePopup(false));
  };

  // Filter players based on search term (username only)
  const filteredPlayers = useMemo(() => {
    if (!searchTerm) {
      return allPlayers;
    }
    return allPlayers.filter((player) =>
      player.userId.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allPlayers, searchTerm]);

  // Slice players for pagination
  const displayedPlayers = useMemo(() => {
    return filteredPlayers.slice(0, playersToShow);
  }, [filteredPlayers, playersToShow]);

  const handleLoadMore = () => {
    setPlayersToShow((prev) => prev + 10);
  };

  // This memo is not directly used for rendering the player list,
  // but it's kept here as it might be used elsewhere or for future features.
  const availableOptions = useMemo(() => {
    return (
      allPlayers
        // .filter(
        //   (p) =>
        //     !invited.some((inv) => String(inv.value) === String(p.userId._id))
        // )
        // .filter((p) => String(p.userId._id) !== String(user?._id))
        .map((p) => ({
          value: p.userId._id,
          label: `${p.userId.firstName} ${p.userId.lastName}`,
          username: p.userId.username,
          avatar: p.userId.profilePicture,
        }))
    );
  }, [allPlayers, user]);

  const handleInvite = (option) => {
    if (!option) return;
    // if (invited.some((p) => String(p.value) === String(option.value))) return;
    // if (invited.length >= Math.max(0, maxPlayers - 1)) {
    //   toast.error("Maximum players reached");
    //   return;
    // }
    // setInvited((prev) => [...prev, option]);
    dispatch(
      sendInvite({
        userId: option.value,
        name: user.username,
        leagueName: leagueData?.title,
        teamId: partyQueueTeam.teamId,
        leagueId: leagueData?._id,
      })
    );
    toast.success(`${option.label} invited`);
  };

  // remove invited player (currently commented out)
  const removePlayer = (value) => {
    // setInvited((prev) => prev.filter((p) => String(p.value) !== String(value)));
    toast.info("Player removed");
  };

  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 h-full w-full">
        {/* popup */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-[#121331] manage-popup match_reg--popup sd_before sd_after text-white rounded-xl w-full max-w-xl relative max-h-[90vh] h-auto py-[3rem] overflow-x-hidden sm:p-6 px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx="true">{`
            .custom_scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {/* header */}
          <div className="flex justify-between items-center pb-5">
            <h2 className="text-xl font-bold">{t("league.invite_players")}</h2>
            <button
              type="button"
              className="absolute ltr:right-2 rtl:left-3 text-gray-300 hover:text-white cursor-pointer"
              onClick={handleClosePopup}
            >
              <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Search input */}
          <div className="mb-3 ">
            <input
              type="text"
              placeholder={t("league.search_players")}
              className="w-full p-3 rounded-lg bg-[radial-gradient(circle,rgba(45,46,109,0.8)_0%,rgba(34,35,86,0.8)_100%)] 
            shadow-[0_4px_24px_0_rgba(34,35,86,0.25),_0_1.5px_6px_0_rgba(94,95,184,0.10)_inset] text-white focus:outline-none mb-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* players container */}
          <div className="flex-1 overflow-y-auto custom_scroll mb-3">
            {recentInvites?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">{t("league.recent_invites")}</h3>
                <div className="space-y-3 custom_scroll overflow-y-auto max-h-[20rem] rounded-xl p-4 shadow-[0_4px_24px_0_rgba(34,35,86,0.25),_0_1.5px_6px_0_rgba(94,95,184,0.10)_inset]">
                  {recentInvites.map((inv) => (
                    <div key={inv.userId} className="flex items-center justify-between sm:gap-3 gap-2">
                      <div className="relative flex items-center sm:gap-3 gap-2 rounded-lg">
                        {inv.avatar ? (
                          <>
                            <img
                              src={getServerURL(inv.avatar)}
                              alt={inv.label || inv.username}
                              className="sm:w-12 sm:h-12 w-9 h-9 rounded-full object-cover"
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className="sm:w-12 sm:h-12 w-9 h-9 rounded-full object-cover"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: getRandomColor(inv.username),
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                              }}
                            >
                              {inv.username?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          </>
                        )}
                        <div className="text-left">
                          {/* <p className="text-sm font-medium text-white truncate w-full">
                            {inv.label || inv.username}
                          </p> */}
                          {inv.username && (
                            <p className="text-md text-gray-400 truncate">@{inv.username}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <button
                          className="party-btn ml-2 px-4 py-2 text-sm bg-[linear-gradient(180deg,rgba(94,95,184,0.32)_0%,rgba(34,35,86,0.32)_166.67%)] shadow-[inset_0px_2px_2px_0px_#5E5FB81F] backdrop-blur-[12px] rounded text-[#7B7ED0] cursor-pointer"
                          onClick={() =>
                            handleInvite({
                              value: inv.userId,
                              label: inv.label || inv.username,
                              username: inv.username,
                              avatar: inv.avatar,
                            })
                          }
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <h3 className="text-lg font-medium text-white mb-5">
              {t("league.players")} ({partyQueueTeam?.players?.length + 1}/{maxPlayers})
            </h3>
            <div className="space-y-3 custom_scroll overflow-y-auto max-h-[38rem] rounded-xl p-4 shadow-[0_4px_24px_0_rgba(34,35,86,0.25),_0_1.5px_6px_0_rgba(94,95,184,0.10)_inset]">
              {/* Current user card */}

              {/* Dynamic player cards from API */}
              {displayedPlayers.length > 0 ? (
                displayedPlayers
                  // .filter(
                  //   (p) =>
                  //     !invited.some(
                  //       (inv) => String(inv.value) === String(p.userId._id)
                  //     )
                  // )
                  .map((player) => (
                    <div
                      key={player.userId._id}
                      className="flex items-center justify-between sm:gap-3 gap-2"
                    >
                      <div className="relative flex items-center sm:gap-3 gap-2 rounded-lg">
                        {player?.userId?.profilePicture ? (
                          <>
                            <img
                              src={
                                getServerURL(player?.userId?.profilePicture)}
                              alt={`${player.userId.firstName} ${player.userId.lastName}`}
                              className="sm:w-12 sm:h-12 w-9 h-9 rounded-full object-cover"
                            />
                          </>
                        ) : (
                          <>
                            <div
                               className="sm:w-12 sm:h-12 w-9 h-9 rounded-full object-cover"
                               style={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 background: getRandomColor(player.userId.username),
                                 color: "#fff",
                                 fontWeight: "bold",
                                 fontSize: "1.5rem",
                               }}
                            >
                              {player.userId.username?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          </>
                        )}
                        <div className="text-left">
                          {/* <p className="text-sm font-medium text-white truncate w-full">
                            {player.userId.firstName} {player.userId.lastName}
                          </p> */}
                          <p className="text-md text-gray-400 truncate">
                            @{player.userId.username}
                          </p>
                        </div>
                      </div>
                      <div>
                        <button
                          className="party-btn ml-2 px-4 py-2 text-sm bg-[linear-gradient(180deg,rgba(94,95,184,0.32)_0%,rgba(34,35,86,0.32)_166.67%)] shadow-[inset_0px_2px_2px_0px_#5E5FB81F] backdrop-blur-[12px] rounded text-[#7B7ED0] cursor-pointer"
                          onClick={() =>
                            handleInvite({
                              value: player.userId._id,
                              label: `${player.userId.firstName} ${player.userId.lastName}`,
                              username: player.userId.username,
                              avatar: player.userId.profilePicture,
                            })
                          }
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-400 py-4">No players found.</p>
              )}
            </div>
          </div>

          {/* footer */}
          <div className="wizard_step--btn gap-5 flex justify-end mt-auto mb-6">
            <div className="game_status--tab wizard_btn flex flex-col items-end gap-4"> {/* Changed to flex-col to stack buttons */}
              {filteredPlayers.length > displayedPlayers.length && (
                <div className="flex justify-center ">
                  <button
                    className="px-8 text-white font-semibold rounded-lg transition-all  hover:opacity-80 cursor-pointer"
                    onClick={handleLoadMore}
                  >
                    {t("lobby.load_more")}
                  </button>
                </div>
              )}
              <button
                className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border cursor-pointer"
                style={{ width: "8rem", height: "4rem" }}
                onClick={handleClosePopup}
              >
                {t("league.close")}
              </button>
            </div>
          </div>
        </motion.div>
        <svg
          width="0"
          height="0"
          viewBox="0 0 480 416"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute" }}
        >
          <defs>
            <clipPath id="myClipPath" clipPathUnits="objectBoundingBox">
              <path
                transform="scale(0.00208333, 0.00240385)"
                d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L24 0H480V100Z"
              />
            </clipPath>
          </defs>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 360 332"
          width="0%"
          height="0%"
        >
          <defs>
            <clipPath
              id="blob-clip"
              clipPathUnits="objectBoundingBox"
              transform="scale(0.00278,0.00301)"
            >
              <path d="M132 12H228L240 0H340L360 20V120L348 132V200L360 212V320L348 332H12L0 320V12L12 0H120L132 12Z" />
            </clipPath>
          </defs>

          <g filter="url(#inner-shadow)" clip-path="url(#blob-clip)">
            <rect width="360" height="332" fill="url(#blob-grad)" />
          </g>
        </svg>
      </div>
    </>
  );
}

export default PartyQueuePopup;
