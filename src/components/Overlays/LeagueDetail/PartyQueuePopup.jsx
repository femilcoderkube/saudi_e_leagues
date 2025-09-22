import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { IMAGES } from "../../ui/images/images";
import { useDispatch, useSelector } from "react-redux";
import { getServerURL } from "../../../utils/constant";
import { toast } from "react-toastify";
import { fetchLeagueParticipants, sendInvite, setAllPlayers, setShowPartyQueuePopup } from "../../../app/slices/constState/constStateSlice";

function PartyQueuePopup() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { allPlayers, invitedPlayers, partyQueueTeam, loading, teamFromQueue } = useSelector((state) => state.constState);

  const leagueData = useSelector((state) => state.leagues);
  const leagueId = leagueData?.leagueData?._id;

  const [invited, setInvited] = useState(invitedPlayers || []);
  const maxPlayers = leagueData?.playersPerTeam || 10;


  useEffect(() => {
    if (leagueId && allPlayers.length === 0) {
      console.log("Dispatching fetchLeagueParticipants - popup opened");
      dispatch(fetchLeagueParticipants({ leagueId, userId: user._id }));
    }
  }, [leagueId, allPlayers.length]);
  
  const handleClosePopup = () => {
    dispatch(setShowPartyQueuePopup(false));
    dispatch(setAllPlayers([]));
  };

  const availableOptions = useMemo(() => {
    return (
      allPlayers
        .filter(
          (p) =>
            !invited.some((inv) => String(inv.value) === String(p.userId._id))
        )
        // .filter((p) => String(p.userId._id) !== String(user?._id))
        .map((p) => ({
          value: p.userId._id,
          label: `${p.userId.firstName} ${p.userId.lastName}`,
          username: p.userId.username,
          avatar: p.userId.profilePicture,
        }))
    );
  }, [allPlayers, user]);

  // invite handler
  const handleInvite = (option) => {    
    if (!option) return;
    if (invited.some((p) => String(p.value) === String(option.value))) return;
    if (invited.length >= Math.max(0, maxPlayers - 1)) {
      toast.error("Maximum players reached");
      return;
    }
    setInvited((prev) => [...prev, option]);
    dispatch(
      sendInvite({
        userId: option.value,
        name: user.username,
        leagueName: leagueData.leagueData?.title,
        teamId: partyQueueTeam._id,
        leagueId: leagueData.leagueData?._id,
      })
    );
    toast.success(`${option.label} invited`);
  };

  // remove invited player
  const removePlayer = (value) => {
    setInvited((prev) => prev.filter((p) => String(p.value) !== String(value)));
    toast.info("Player removed");
  };

  // format dropdown option with Invite button
  const formatOptionLabel = (option) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <img
          src={
            getServerURL(option.avatar) || option.avatar || IMAGES.defaultImg
          }
          alt={option.label}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="leading-tight">
          <div className="text-sm text-white">{option.label}</div>
          <div className="text-xs text-gray-400">@{option.username}</div>
        </div>
      </div>
      <button
        className="party-btn ml-2 px-4 py-2 text-sm bg-[linear-gradient(180deg,rgba(94,95,184,0.32)_0%,rgba(34,35,86,0.32)_166.67%)] shadow-[inset_0px_2px_2px_0px_#5E5FB81F] backdrop-blur-[12px] rounded text-[#7B7ED0] !pointer-events-auto cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // prevent dropdown from auto-selecting
          handleInvite(option);
        }}
      >
        Invite
      </button>
    </div>
  );

  if(loading) {
    
  }
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
        className="bg-[#121331] manage-popup match_reg--popup h-full sd_before sd_after text-white rounded-xl w-full max-w-xl relative max-h-[85vh] py-[3rem] overflow-x-hidden sm:p-6 px-4 overflow-y-auto custom_scroll"
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
          <h2 className="text-xl font-bold">Manage Queue</h2>
          <button
            type="button"
            className="absolute right-2 text-gray-300 hover:text-white cursor-pointer"
            onClick={handleClosePopup}
          >
            <svg width="18" height="18" fill="none" stroke="#7B7ED0">
              <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Invite select */}
        {invited.length < Math.max(0, maxPlayers - 1) && (
          <div className="mb-3 ">
            <Select
              options={availableOptions}
              isSearchable
              isClearable
              placeholder="Search players..."
              classNamePrefix="react-select"
              formatOptionLabel={formatOptionLabel}
              menuPortalTarget={
                typeof document !== "undefined" ? document.body : null
              }
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                control: (base) => ({
                  ...base,
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.08)",
                }),
              }}
            />
          </div>
        )}

          {/* players container */}
          <div className="flex-1 overflow-y-auto custom_scroll mb-3">
            <h3 className="text-lg font-medium text-white mb-3">
              Players ({invited.length + 1}/{maxPlayers})
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* current user card */}
              <div className="notification-box relative flex flex-col items-center p-3 rounded-lg">
                <img
                  src={getServerURL(user?.profilePicture) || IMAGES.defaultImg}
                  alt={`${user?.firstName || "You"}`}
                  className="w-12 h-12 rounded-full mb-2 object-cover"
                />
                <div className="text-center">
                  <p className="text-sm font-medium text-white truncate w-full">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    @{user?.username}
                  </p>
                </div>
              </div>

              {/* invited players */}
              {invited.map((p) => (
                <div
                  key={p.value}
                  className="notification-box relative flex flex-col items-center p-3"
                >
                  <img
                    src={
                      getServerURL(p.avatar) || p.avatar || IMAGES.defaultImg
                    }
                    alt={p.label}
                    className="w-12 h-12 rounded-full mb-2 object-cover"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-white truncate w-full">
                      {p.label}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      @{p.username}
                    </p>
                  </div>

                  <button
                    onClick={() => removePlayer(p.value)}
                    className="absolute top-1 right-1 text-red-400 hover:text-red-300 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* empty slots */}
              {Array.from({
                length: Math.max(0, maxPlayers - (invited.length + 1)),
              }).map((_, idx) => (
                <div
                  key={`slot-${idx}`}
                  className="notification-box flex flex-col items-center p-3"
                >
                  <div className="w-12 h-12 rounded-full mb-2 bg-[#ffffff10]" />
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Empty</p>
                    <p className="text-xs text-gray-500">Slot</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* footer */}
          <div className="wizard_step--btn gap-5 flex justify-end sm:mt-8 mt-6 mb-6">
            <div className="game_status--tab wizard_btn flex justify-center gap-4">
              <button
                className="py-2 px-4 text-xl font-medium transition-all relative font_oswald hover:opacity-50 duration-300 cursor-pointer"
                style={{ width: "8rem", height: "4rem" }}
                onClick={() => dispatch(setShowPartyQueuePopup(false))}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border cursor-pointer"
                style={{ width: "8rem", height: "4rem" }}
                onClick={() => {
                  // save to redux if needed
                  dispatch(setShowPartyQueuePopup(false));
                }}
              >
                Continue
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
