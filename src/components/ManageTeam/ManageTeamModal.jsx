import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IMAGES } from "../../components/ui/images/images";
import { baseURL } from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { resetInviteLink } from "../../app/slices/teamInvitationSlice/teamInvitationSlice";
import { toast } from "react-toastify";
import TeamSection from "./TeamSection";
import {
  fetchTeamUserFormat,
  getTeamDetails,
  resetTeamUserFormat,
  updateTeamRoster,
  withdrawTeamRoster,
} from "../../app/slices/TournamentTeam/TournamentTeamSlice";
import {
  setManagerSelection,
  setCoachSelection,
  togglePlayerSelection,
  setRosterSelectionBulk,
} from "../../app/slices/TournamentTeam/TournamentTeamSlice";

const ManageTeamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    link: inviteLink,
    loading,
    error,
  } = useSelector((state) => state.teamInvitation);
  const { currentTeam, teamUserFormat, teamData, rosterSelection } = useSelector(
    (state) => state.tournamentTeam
  );

  const { tournamentData } = useSelector((state) => state.tournament);

  // Local view-model derived from slice rosterSelection and userFormat
  const selectedItems = useMemo(() => {
    const manager = rosterSelection.managerId
      ? [{ id: rosterSelection.managerId }]
      : [];
    const coach = rosterSelection.coachId
      ? [{ id: rosterSelection.coachId }]
      : [];
    const players = (rosterSelection.playerIds || []).map((id) => ({ id }));
    return { manager, coach, players };
  }, [rosterSelection]);

  useEffect(() => {
    if (currentTeam?._id) {
      dispatch(
        fetchTeamUserFormat({
          teamId: currentTeam._id,
          game: tournamentData?.game?._id,
        })
      );
    }
    return () => {
      dispatch(resetTeamUserFormat());
    };
  }, [currentTeam?._id, dispatch]);

  // Initialize default selection from teamData when user format loads
  useEffect(() => {
    if (!teamUserFormat?.data) return;
    const hasExisting =
      rosterSelection.managerId !== null ||
      rosterSelection.coachId !== null ||
      (rosterSelection.playerIds && rosterSelection.playerIds.length > 0);
    if (hasExisting) return;
    if (teamData?.data) {
      const coachId = teamData.data.Coach?._id || null;
      const playerIds = Array.isArray(teamData.data.Players)
        ? teamData.data.Players.map((p) => p?._id).filter(Boolean)
        : [];
      dispatch(
        setRosterSelectionBulk({ managerId: null, coachId, playerIds })
      );
    }
  }, [teamUserFormat?.data, teamData?.data, rosterSelection, dispatch]);

  // Handle checkbox toggle for an item in a section
  const handleCheckChange = (section, item) => {
    if (section === "manager") {
      const next = selectedItems.manager.some((s) => s.id === item.id)
        ? null
        : item.id;
      dispatch(setManagerSelection(next));
      return;
    }
    if (section === "coach") {
      const next = selectedItems.coach.some((s) => s.id === item.id)
        ? null
        : item.id;
      dispatch(setCoachSelection(next));
      return;
    }
    if (section === "players") {
      const nextCount = selectedItems.players.some((s) => s.id === item.id)
        ? selectedItems.players.length - 1
        : selectedItems.players.length + 1;
      if (nextCount > (tournamentData?.maxPlayersPerTeam || Infinity)) {
        toast.error(
          t("tournament.players_max_limit", {
            count: tournamentData?.maxPlayersPerTeam,
          })
        );
        return;
      }
      dispatch(togglePlayerSelection(item.id));
      return;
    }
  };

  const handleResetLink = () => {
    dispatch(resetInviteLink(currentTeam?._id))
      .unwrap()
      .catch((err) =>
        toast.error(err || t("tournament.invite_link_reset_failed"))
      );
  };

  const handleCopy = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(baseURL + "/invite-link/" + inviteLink);
    toast.success(t("tournament.copy_button_title1"));
  };

  const handleConfirm = () => {
    if (!currentTeam?._id) {
      toast.error(t("tournament.no_team_selected"));
      return;
    }

    // Check minimum players required
    const minPlayers = tournamentData?.minPlayersPerTeam; // Fallback to 2 if undefined
    if (selectedItems.players.length < minPlayers) {
      toast.error(
        t("tournament.invite_players_to_team", { count: minPlayers })
      );
      return;
    }

    const rosterData = {
      managerId:
        selectedItems.manager.length > 0 ? selectedItems.manager[0].id : null,
      coachId:
        selectedItems.coach.length > 0 ? selectedItems.coach[0].id : null,
      playerIds: selectedItems.players.map((item) => item.id),
    };

    dispatch(
      updateTeamRoster({
        id: teamData?.data?._id,
        rosterData,
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(
          getTeamDetails({
            tournamentId: tournamentData?._id,
            teamId: currentTeam._id,
          })
        );
        toast.success(res?.message);
        onClose();
      })
      .catch((err) => toast.error(err));
  };
  const handleWithdraw = () => {
    dispatch(
      withdrawTeamRoster({
        id: teamData?.data?._id,
      })
    )
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        onClose();
      })
      .catch((err) => toast.error(err));
  };
  
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
            className="bg-gradient-to-br from-[#5e5e69] via-[#151642] to-[#0f0f2a] manage-popup match_reg--popup h-auto sd_before sd_after text-white rounded-2xl w-full max-w-2xl relative max-h-[85vh] py-8 overflow-x-hidden px-6 overflow-y-auto custom_scroll shadow-2xl shadow-black/50"
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
                {t("tournament.manage_team_title")}
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

            {/* Invite Link */}
            <div className="mb-5">
              <label className="block text-base text-white mb-2 !font-bold">
                {t("tournament.invite_link_label")}
              </label>
              <div className="flex w-full">
                <div className="flex items-center gap-2 bg-[#05042C] h-[3rem] border border-[#393B7A] rounded-lg w-full overflow-hidden pl-[0.8rem]">
                  <input
                    type="text"
                    value={baseURL + "/invite-link/" + inviteLink || ""}
                    readOnly
                    className="flex-1 bg-transparent text-white text-sm outline-none"
                    style={{ minWidth: 0 }}
                  />
                  <button
                    className="flex items-center justify-center w-[3rem] h-full transition-colors bg-[linear-gradient(59.17deg,#434BE9_22.83%,#46B5F9_151.01%)]"
                    title={t("tournament.copy_button_title")}
                    onClick={handleCopy}
                  >
                    <svg
                      width="20"
                      height="26"
                      viewBox="0 0 24 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.6475 27.6528C19.3338 28.3529 18.8283 28.9465 18.1911 29.3627C17.554 29.7789 16.8123 30.0002 16.0547 30H3.94481C3.42675 30.0001 2.91375 29.8965 2.43511 29.6953C1.95648 29.4941 1.52158 29.1992 1.15525 28.8274C0.788932 28.4556 0.498363 28.0141 0.300142 27.5283C0.101921 27.0425 -6.77401e-05 26.5218 6.54925e-07 25.9959V8.0642C-0.000435938 7.29509 0.217421 6.54213 0.627511 5.8954C1.0376 5.24866 1.62256 4.73554 2.31242 4.41739V24.4606C2.31228 24.8799 2.39353 25.2951 2.55152 25.6825C2.70951 26.0699 2.94115 26.422 3.2332 26.7185C3.52526 27.0151 3.87201 27.2503 4.25365 27.4108C4.63529 27.5713 5.04434 27.6539 5.45743 27.6539L19.6475 27.6528ZM14.1869 7.84803V0H7.94428C7.42605 -1.6501e-07 6.9129 0.10366 6.43415 0.305056C5.9554 0.506452 5.52045 0.801635 5.15415 1.17374C4.78785 1.54584 4.49738 1.98756 4.29934 2.47366C4.10131 2.95976 3.99959 3.48071 4 4.00673V23.1762C4.00041 23.9095 4.28767 24.6126 4.79863 25.1309C5.30959 25.6492 6.00242 25.9404 6.72481 25.9404H20.0547C20.5727 25.9404 21.0857 25.8368 21.5643 25.6356C22.0429 25.4344 22.4778 25.1395 22.8441 24.7676C23.2104 24.3958 23.501 23.9544 23.6992 23.4686C23.8974 22.9828 23.9995 22.4622 23.9995 21.9363V10.2634H16.5644C15.9337 10.2628 15.329 10.0081 14.8832 9.55519C14.4373 9.10229 14.1869 8.48826 14.1869 7.84803ZM15.5527 0L24 8.90983H16.7764C16.4518 8.90983 16.1406 8.77898 15.9111 8.54605C15.6816 8.31313 15.5527 7.99721 15.5527 7.66781V0Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  className="flex items-center justify-center w-[3.5rem] shrink-0 h-auto rounded-lg bg-linear-to-b text-white from-[#BC5225EB] to-[#F49528] font-medium text-base cursor-pointer transition-colors"
                  style={{ marginLeft: 13 }}
                  title={t("tournament.reset_button_title")}
                  onClick={handleResetLink}
                >
                  {t("tournament.reset_button_title")}
                </button>
              </div>
            </div>
            <hr className="border-[#51549B] pb-5" />

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
                data={teamUserFormat?.data?.manager}
                section="manager"
                selectedItems={selectedItems.manager}
                onCheckChange={handleCheckChange}
                noDataMessage="tournament.no_managers_available"
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
                data={teamUserFormat?.data?.coach}
                section="coach"
                selectedItems={selectedItems.coach}
                onCheckChange={handleCheckChange}
                noDataMessage="tournament.no_coaches_available"
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
                data={teamUserFormat?.data?.players}
                section="players"
                selectedItems={selectedItems.players}
                onCheckChange={handleCheckChange}
                noDataMessage="tournament.no_players_available"
              />
            </div>

            {/* Substitutes Section */}
            {/* <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="font-bold text-white text-xl mb-1.5 block">
                    {t("tournament.substitutes_title")}
                    <span className="text-base font-normal text-white ml-1">
                      {t("tournament.substitutes_max")}
                    </span>
                  </span>
                  <p className="block text-sm text-white mb-2">
                    {t("tournament.substitutes_description")}
                  </p>
                </div>
                <span className="text-base font-normal text-[#6A71E8]">
                  {t("tournament.substitutes_optional")}
                </span>
              </div>
              <TeamSection
                data={data.substitutes}
                section="substitutes"
                selectedItems={selectedItems.substitutes}
                onCheckChange={handleCheckChange}
                noDataMessage="tournament.no_substitutes_available"
              />
            </div> */}

            <div className="manage-team-pop wizard_step--btn gap-5 flex justify-between sm:mt-10 mt-6 mb-6 mr-5 flex-wrap">
              <div className="game_status--tab wizard_btn back_btn">
                <button
                  type="button"
                  onClick={handleWithdraw}
                  className="py-2 px-4 text-[0.938rem] font-semibold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                  style={{ width: "8rem", height: "4rem" }}
                >
                  {t("tournament.withdraw_registration")}
                </button>
              </div>
              <div className="game_status--tab wizard_btn next_btn">
                <button
                  type="submit"
                  onClick={handleConfirm}
                  className="py-2 px-4 justify-center flex items-center text-nowrap text-xl font-bold transition-all sd_after sd_before relative font_oswald hover:opacity-70 active-tab duration-300 polygon_border"
                  style={{ width: "8rem", height: "4rem" }}
                >
                  {t("tournament.confirm")}
                </button>
              </div>
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

export default ManageTeamModal;
