import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { IMAGES } from "../../ui/images/images";
import { useSelector } from "react-redux";
import { getServerURL } from "../../../utils/constant";
import { toast } from "react-toastify";

function PartyQueuePopup({ setShowPartyQueuePopup }) {
  const user = useSelector((state) => state.auth.user);
  const allPlayers = useSelector((state) => state.constState.allPlayers);
  const invitedFromStore = useSelector((state) => state.constState.invitedPlayers);
  const leagueData = useSelector((state) => state.league);

  const [invited, setInvited] = useState(invitedFromStore || []);
  const maxPlayers = leagueData?.playersPerTeam || 10;

  // compute available options
  const availableOptions = useMemo(() => {
    return allPlayers
      .filter((p) => !invited.some((inv) => String(inv.value) === String(p.id)))
      .filter((p) => String(p.id) !== String(user?.id))
      .map((p) => ({
        value: p.id,
        label: `${p.firstName} ${p.lastName}`,
        username: p.username,
        avatar: p.avatar,
      }));
  }, [allPlayers, invited, user]);

  // invite handler
  const handleInvite = (option) => {
    if (!option) return;
    if (invited.some((p) => String(p.value) === String(option.value))) return;
    if (invited.length >= Math.max(0, maxPlayers - 1)) {
      toast.error("Maximum players reached");
      return;
    }
    setInvited((prev) => [...prev, option]);
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
          src={getServerURL(option.avatar) || option.avatar || IMAGES.defaultImg}
          alt={option.label}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="leading-tight">
          <div className="text-sm text-white">{option.label}</div>
          <div className="text-xs text-gray-400">@{option.username}</div>
        </div>
      </div>
      <button
        className="ml-2 px-2 py-1 text-xs bg-[#7B7ED0] hover:bg-[#6B6EC0] rounded text-white"
        onClick={(e) => {
          e.stopPropagation(); // prevent dropdown from auto-selecting
          handleInvite(option);
        }}
      >
        Invite
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-[#010221]/60 backdrop-blur-sm"
        onClick={() => setShowPartyQueuePopup(false)}
      ></div>

      {/* popup */}
      <motion.div
        className="relative text-white rounded-2xl shadow-xl sm:w-[95%] md:w-[80%] lg:w-[40rem] w-[calc(100%-30px)] p-4 z-50 border border-[#FFFFFF33] flex flex-col max-h-[80vh] bg-gradient-to-b from-[#171A43]/90 to-[#090B2C]"
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* header */}
        <div className="flex items-center justify-center mb-3 relative p-2">
          <h2 className="text-xl font-semibold">Manage Queue</h2>
          <button
            type="button"
            className="absolute right-2 text-gray-300 hover:text-white"
            onClick={() => setShowPartyQueuePopup(false)}
          >
            ✕
          </button>
        </div>

        {/* Invite select */}
        {invited.length < Math.max(0, maxPlayers - 1) && (
          <div className="mb-3">
            <Select
              options={availableOptions}
              isSearchable
              isClearable
              placeholder="Search players..."
              classNamePrefix="react-select"
              formatOptionLabel={formatOptionLabel}
              menuPortalTarget={typeof document !== "undefined" ? document.body : null}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {/* current user card */}
            <div className="relative flex flex-col items-center p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[#FFFFFF15]">
              <img
                src={getServerURL(user?.profilePicture) || IMAGES.defaultImg}
                alt={`${user?.firstName || "You"}`}
                className="w-12 h-12 rounded-full mb-2 object-cover"
              />
              <div className="text-center">
                <p className="text-sm font-medium text-white truncate w-full">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">@{user?.username}</p>
              </div>
            </div>

            {/* invited players */}
            {invited.map((p) => (
              <div
                key={p.value}
                className="relative flex flex-col items-center p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[#FFFFFF15]"
              >
                <img
                  src={getServerURL(p.avatar) || p.avatar || IMAGES.defaultImg}
                  alt={p.label}
                  className="w-12 h-12 rounded-full mb-2 object-cover"
                />
                <div className="text-center">
                  <p className="text-sm font-medium text-white truncate w-full">
                    {p.label}
                  </p>
                  <p className="text-xs text-gray-400 truncate">@{p.username}</p>
                </div>

                <button
                  onClick={() => removePlayer(p.value)}
                  className="absolute top-1 right-1 text-red-400 hover:text-red-300 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* empty slots */}
            {Array.from({ length: Math.max(0, maxPlayers - (invited.length + 1)) }).map((_, idx) => (
              <div
                key={`slot-${idx}`}
                className="flex flex-col items-center p-3 rounded-lg border border-dashed border-[#FFFFFF10] bg-[rgba(255,255,255,0.02)]"
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
        <div className="flex justify-center gap-4 mt-auto pt-3 border-t border-[#FFFFFF15]">
          <button
            className="px-6 py-2 border border-[#FFFFFF33] text-white rounded-xl hover:bg-[rgba(255,255,255,0.1)]"
            onClick={() => setShowPartyQueuePopup(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-[#7B7ED0] hover:bg-[#6B6EC0] text-white rounded-xl"
            onClick={() => {
              // save to redux if needed
              setShowPartyQueuePopup(false);
            }}
          >
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PartyQueuePopup;