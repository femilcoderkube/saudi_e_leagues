import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import TeamSection from "./TeamSection";
import {
  fetchTeamUserFormat,
  resetTeamUserFormat,
} from "../../app/slices/tournamentSlice/tournamentSlice";

const ViewTeamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { viewManagePopup } = useSelector((state) => state.constState);
  const {
    tournamentData,
    currentTeam,
    teamData,
    rosterSelection,
    loading,
    teamUserFormat,
  } = useSelector((state) => state.tournament);

  // Local view-model derived from slice rosterSelection
  const selectedItems = useMemo(() => {
    const manager = rosterSelection?.managerId
      ? [{ id: rosterSelection?.managerId }]
      : [];
    const coach = rosterSelection?.coachId
      ? [{ id: rosterSelection?.coachId }]
      : [];
    const players = (rosterSelection?.playerIds || []).map((id) => ({ id }));
    return { manager, coach, players };
  }, [
    rosterSelection?.managerId,
    rosterSelection?.coachId,
    rosterSelection?.playerIds,
  ]);

  // Fetch team user format when team ID changes
  useEffect(() => {
    if (currentTeam?._id && tournamentData?.game?._id) {
      dispatch(
        fetchTeamUserFormat({
          teamId: currentTeam?._id,
          game: tournamentData?.game?._id,
          tournamentId: tournamentData?._id,
        })
      );
    }
    return () => {
      dispatch(resetTeamUserFormat());
    };
  }, [currentTeam?._id, tournamentData?.game?._id, dispatch]);

  // Filter teamUserFormat data to include only selected items
  const filteredTeamUserFormat = useMemo(() => {
    if (teamData?.status != 1 && teamData?.data) {
      // For status 3, use teamData.data directly
      return {
        manager: teamData?.data?.Manager
          ? [
              {
                id: teamData?.data?.Manager?._id,
                username: teamData?.data?.Manager?.username,
                profilePicture: teamData?.data?.Manager?.profilePicture,
              },
            ]
          : [],
        coach: teamData?.data?.Coach
          ? [
              {
                id: teamData?.data?.Coach?._id,
                username: teamData?.data?.Coach?.username,
                profilePicture: teamData?.data?.Coach?.profilePicture,
              },
            ]
          : [],
        players: teamData?.data?.Players
          ? teamData?.data?.Players?.map((player) => ({
              id: player?._id,
              username: player?.username,
              profilePicture: player?.profilePicture,
            }))
          : [],
      };
    }

    if (!teamUserFormat?.data) return { manager: [], coach: [], players: [] };

    return {
      manager:
        teamUserFormat?.data?.manager?.filter((item) =>
          selectedItems?.manager?.some((selected) => selected?.id === item?.id)
        ) || [],
      coach:
        teamUserFormat?.data?.coach?.filter((item) =>
          selectedItems?.coach?.some((selected) => selected?.id === item?.id)
        ) || [],
      players:
        teamUserFormat?.data?.players?.filter((item) =>
          selectedItems?.players?.some((selected) => selected?.id === item?.id)
        ) || [],
    };
  }, [teamUserFormat?.data, selectedItems, teamData?.data]);

  if (!viewManagePopup) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 h-full w-full p-4">
        <div className="text-white">Loading team data...</div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed popup-overlay inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 h-full w-full p-4">
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-gradient-to-br from-[#5e5e69] via-[#151642] to-[#0f0f2a] manage-popup match_reg--popup !h-auto sd_before sd_after text-white rounded-2xl w-full max-w-2xl relative max-h-[85vh] py-8 overflow-x-hidden px-6 overflow-y-auto custom_scroll shadow-2xl shadow-black/50"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx="true">{`
              .custom_scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Modal Header */}
            <div className="flex items-center justify-center mb-5 relative">
              <h2 className="text-2xl font-bold text-center text-white mb-2">
                {t("tournament.viewteam")}
              </h2>
              <button
                aria-label={t("tournament.close_button_aria")}
                onClick={onClose}
                type="button"
                className="cursor-pointer hover:opacity-70 duration-300 absolute right-0"
              >
                <svg width="18" height="18" fill="none" stroke="#7B7ED0">
                  <path d="M1 17L17 1M17 17L1 1" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Manager Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white text-xl mb-1.5 block">
                    {t("tournament.manager_title")}{" "}
                    <span className="text-base font-normal text-white">
                      {t("tournament.manager_max")}
                    </span>
                  </span>
                  <p className="block text-sm text-white mb-2">
                    {t("tournament.manager_description")}
                  </p>
                </div>
                <span className="text-base font-normal text-[#6A71E8]">
                  {t("tournament.manager_optional")}
                </span>
              </div>
              <TeamSection
                data={filteredTeamUserFormat?.manager}
                section="manager"
                selectedItems={selectedItems?.manager}
                onCheckChange={() => {}} // No-op for view mode
                noDataMessage="tournament.no_managers_available"
                isViewMode={true}
              />
            </div>

            {/* Coach Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white text-xl mb-1.5 block">
                    {t("tournament.coach_title")}{" "}
                    <span className="text-base font-normal text-white">
                      {t("tournament.coach_max")}
                    </span>
                  </span>
                  <p className="block text-sm text-white mb-2">
                    {t("tournament.coach_description")}
                  </p>
                </div>
                <span className="text-base font-normal text-[#6A71E8]">
                  {t("tournament.coach_optional")}
                </span>
              </div>
              <TeamSection
                data={filteredTeamUserFormat?.coach}
                section="coach"
                selectedItems={selectedItems?.coach}
                onCheckChange={() => {}} // No-op for view mode
                noDataMessage="tournament.no_coaches_available"
                isViewMode={true}
              />
            </div>

            {/* Players Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white text-xl mb-1.5 block">
                    {t("tournament.players_title")}
                    <span className="text-base font-normal text-white ml-1">
                      {t("tournament.players_min_max", {
                        min: tournamentData?.minPlayersPerTeam,
                        max: tournamentData?.maxPlayersPerTeam,
                      })}
                    </span>
                  </span>
                  <p className="block text-sm text-white mb-2">
                    {t("tournament.players_description")}
                  </p>
                </div>
                <span className="text-base font-normal text-[#6A71E8]">
                  {t("tournament.players_required")}
                </span>
              </div>
              <TeamSection
                data={filteredTeamUserFormat?.players}
                section="players"
                selectedItems={selectedItems?.players}
                onCheckChange={() => {}} // No-op for view mode
                noDataMessage="tournament.no_players_available"
                isViewMode={true}
              />
            </div>
          </motion.div>
        </AnimatePresence>

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
      </div>
    </>
  );
};

export default ViewTeamModal;
