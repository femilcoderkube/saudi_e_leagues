import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmationPopUp } from "../../app/slices/constState/constStateSlice";
import {
  cancelMatch,
  getUpdateToken,
  leavePartySocket,
} from "../../app/socket/socket";
import { motion } from "framer-motion";
import { deleteFcmToken, logout } from "../../app/slices/auth/authSlice";
import { IMAGES } from "../ui/images/images";
import { useNavigate, useParams } from "react-router-dom";
import { checkParams } from "../../utils/constant";
import { registerTournament, resetTeamData } from "../../app/slices/TournamentTeam/TournamentTeamSlice";

function ConfirmationPopUp({
  onPlayerSelect,
  draftId,
  isSocketConnected,
  onDeleteAccount,
  onLogout,
  onMakePresident,
  onAssignTeamRole,
  onRemoveTeam,
  onLeaveTeam,
  onDeleteTeam,
}) {
  const { confirmationPopUp, selectedPlayerData } = useSelector(
    (state) => state.constState
  );
  const { lId, id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { matchData, myPId } = useSelector((state) => state.matchs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { partyQueueTeam, popupData } = useSelector(
    (state) => state.constState
  );

  const handleOnClick = () => {
    if (confirmationPopUp == 1) {
      dispatch(deleteFcmToken());
      dispatch(resetTeamData())
      getUpdateToken("");
      dispatch(setConfirmationPopUp(0));
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (checkParams("team")) {
        navigate(`/${id}/lobby`);
      }
      if (onLogout) {
        onLogout();
      }
    }
    if (confirmationPopUp == 2) {
      dispatch(setConfirmationPopUp(0));
      cancelMatch({
        matchId: matchData?._id,
        participantId: myPId,
        Lid: matchData?.league?._id,
      });
    }
    if (confirmationPopUp == 3) {
      dispatch(setConfirmationPopUp(0));
      if (selectedPlayerData && onPlayerSelect) {
        onPlayerSelect({
          draftId,
          Playerdata: selectedPlayerData,
          isSocketConnected,
        });
      }
    }
    if (confirmationPopUp == 4) {
      dispatch(deleteFcmToken());
      getUpdateToken("");
      dispatch(setConfirmationPopUp(0));
      if (onDeleteAccount) {
        onDeleteAccount();
      }
    }
    // if (confirmationPopUp == 5) {
    //   dispatch(leavePartySocket(payload ));
    //   dispatch(setConfirmationPopUp(0));
    // }
    // if (confirmationPopUp == 6) {
    //   dispatch(leavePartySocket(RemovePlayerPayload ));
    //   dispatch(setConfirmationPopUp(0));
    // }
    // if (confirmationPopUp == 5 || confirmationPopUp == 6) {
    //   const payload = {
    //     userId: user?._id,
    //     teamId: partyQueueTeam?.data?._id
    //   }
    //   const removePlayerPayload = {
    //     userId: popupData?.userId,
    //     teamId: popupData?.teamId
    //   }
    //   const actionPayload = confirmationPopUp === 5 ? payload
    //     : confirmationPopUp === 6 ? removePlayerPayload
    //       : null;
    if (confirmationPopUp === 5 || confirmationPopUp === 6) {
      const actionPayload =
        confirmationPopUp === 5
          ? { userId: user?._id, teamId: partyQueueTeam?.data?._id }
          : { userId: popupData?.userId, teamId: popupData?.teamId };

      if (actionPayload) {
        dispatch(leavePartySocket(actionPayload));
        dispatch(setConfirmationPopUp(0));
      }
    }
    if (confirmationPopUp === 7) {
      dispatch(setConfirmationPopUp(0));
      onMakePresident(popupData);
    }
    if (confirmationPopUp === 8) {
      onAssignTeamRole(popupData, "Manager");
      dispatch(setConfirmationPopUp(0));
    }
    if (confirmationPopUp === 9) {
      onAssignTeamRole(popupData, "Coach");
      dispatch(setConfirmationPopUp(0));
    }
    if (confirmationPopUp === 10) {
      onRemoveTeam(popupData);
      dispatch(setConfirmationPopUp(0));
    }
    if (confirmationPopUp === 11) {
      onRemoveTeam(popupData);
      dispatch(setConfirmationPopUp(0));
    }
    if (confirmationPopUp === 12) {
      onRemoveTeam(popupData);
      dispatch(setConfirmationPopUp(0));
    }
    if (confirmationPopUp === 13) {
      onLeaveTeam(popupData);
      dispatch(setConfirmationPopUp(0));
    }

    if (confirmationPopUp === 14) {
      // onLeaveTeam(popupData);
      dispatch(
        registerTournament(popupData)
      );
      dispatch(setConfirmationPopUp(0));
    }
  };

  const getConfirmationTitle = () => {
    if (confirmationPopUp == 1) return t("confirmation.logoutTitle");
    if (confirmationPopUp == 2) return t("confirmation.cancelMatchTitle");
    if (confirmationPopUp == 3) return t("confirmation.confirmplayerselection");
    if (confirmationPopUp == 4) return t("confirmation.deleteAccountTitle");
    if (confirmationPopUp == 5) return t("confirmation.leavePartyTitle");
    if (confirmationPopUp == 6) return t("confirmation.removePlayerMessage");
    if (confirmationPopUp == 7) return t("confirmation.makepresidentmessage");
    if (confirmationPopUp == 8) return t("confirmation.assignManagerConfirm");
    if (confirmationPopUp == 9) return t("confirmation.assignCoachConfirm");
    if (confirmationPopUp == 10) return t("confirmation.removeManagerConfirm");
    if (confirmationPopUp == 11) return t("confirmation.removeCoachConfirm");
    if (confirmationPopUp == 12) return t("confirmation.removeTeamConfirm");
    if (confirmationPopUp == 13) return t("confirmation.leaveTeamConfirm");
    if (confirmationPopUp == 14) return t("confirmation.registrationConfirm");

    return "";
  };

  const getConfirmationMessage = () => {
    if (confirmationPopUp == 3 && selectedPlayerData) {
      return `${t("confirmation.confirmplayerselectionMessage")} ${selectedPlayerData?.username || t("confirmation.thisplayer")
        }?`;
    }
    if (confirmationPopUp == 4) {
      return t("confirmation.deleteAccountMessage");
    }
    if (confirmationPopUp == 5) {
      return t("confirmation.leavePartyTitle");
    }
    if (confirmationPopUp == 6) {
      return t("confirmation.removePlayerTitle");
    }
    if (confirmationPopUp == 7) {
      return "Are you sure you want to make this member the Club President?";
    }
    if (confirmationPopUp == 8) {
      return "Are you sure you want to assign this member as the Overwatch Roster Manager?";
    }
    if (confirmationPopUp == 9) {
      return "Are you sure you want to assign this member as the Overwatch Roster Coach?";
    }
    if (confirmationPopUp == 10) {
      return "Are you sure you want to remove this member as the Overwatch Roster Manager?";
    }
    if (confirmationPopUp == 11) {
      return "Are you sure you want to remove this member as the Overwatch Roster Coach?";
    }
    if (confirmationPopUp == 12) {
      return "Are you sure you want to remove this member as the Overwatch Roster Coach?";
    }
    if (confirmationPopUp == 14) {
      return "Are you sure you want to register for this tournament?";
    }
    return "";
  };

  const getCancelText = () => {
    if (
      confirmationPopUp == 1 ||
      confirmationPopUp == 3 ||
      confirmationPopUp == 4 ||
      confirmationPopUp == 5 ||
      confirmationPopUp == 6 ||
      confirmationPopUp == 7 ||
      confirmationPopUp == 8 ||
      confirmationPopUp == 9 ||
      confirmationPopUp == 10 ||
      confirmationPopUp == 11 ||
      confirmationPopUp == 12 ||
      confirmationPopUp == 13 ||
      confirmationPopUp == 14
    )
      return t("confirmation.cancel");
    if (confirmationPopUp == 2) return t("confirmation.no");
    return "";
  };

  const getConfirmText = () => {
    if (confirmationPopUp == 1) return t("confirmation.logoutConfirm");
    if (confirmationPopUp == 2) return t("confirmation.yes");
    if (confirmationPopUp == 3) return t("confirmation.selectplayer");
    if (confirmationPopUp == 4) return t("confirmation.deleteAccount");
    if (confirmationPopUp == 5) return t("confirmation.leavePartyConfirm");
    if (confirmationPopUp == 6) return t("confirmation.removePlayerConfirm");
    if (confirmationPopUp == 7) return t("confirmation.removePlayerConfirm");
    if (confirmationPopUp == 8) return t("confirmation.yes");
    if (confirmationPopUp == 9) return t("confirmation.yes");
    if (confirmationPopUp == 10) return t("confirmation.yes");
    if (confirmationPopUp == 11) return t("confirmation.yes");
    if (confirmationPopUp == 12) return t("confirmation.yes");
    if (confirmationPopUp == 13) return t("confirmation.yes");
    if (confirmationPopUp == 14) return t("confirmation.yes");
    return "";
  };

  const getConfirmButtonClass = () => {
    if (confirmationPopUp == 4) {
      return `py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300 active-tab polygon_border bg-red-600 hover:bg-red-700`;
    }
    return `py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300 active-tab polygon_border`;
  };

  if (confirmationPopUp === 0) return null;

  return (
    <>
      <div
        className="fixed inset-0 popup-overlay transition-opacity submit__score--popup"
        aria-hidden="true"
      ></div>

      <div className="fixed modal_popup-con inset-0 overflow-y-auto flex justify-center items-center z-50">
        <motion.div
          className="popup-wrap inline-flex  relative"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="match_reg--popup submit_score--popup popup_bg relative sd_before sd_after ">
            <div className="popup_header px-8 pt-4 flex items-start ltr:justify-end mt-3 text-center sm:mt-0 sm:text-left rtl:justify-start rtl:text-right">
              <div className="flex items-center gap-2 h-8 absolute left-1/2 translate-x-[-50%] top-10">
                <img
                  src={IMAGES.asideLogo_ltr}
                  alt="rules_icon"
                  className=" h-10"
                />
              </div>
              <button
                type="button"
                className="pt-2 cursor-pointer"
                onClick={() => dispatch(setConfirmationPopUp(0))}
              >
                <svg
                  width="1.125rem"
                  height="1.125rem"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 17L17 1M17 17L1 1"
                    stroke="#7B7ED0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="popup_body px-8   flex flex-col items-center gap-4 pt-15 justify-center">
              <h2 className="text-2xl font-bold mb-4 purple_col">
                {getConfirmationTitle()}
              </h2>

              {confirmationPopUp == 3 && selectedPlayerData && (
                <div className="mb-4 text-center ">
                  <p className="text-lg text-gray-300 mb-3">
                    {getConfirmationMessage()}
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <div className="flex  sd_uaser-menu ">
                  <div className="game_status_tab--wrap">
                    <div>
                      <button
                        className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300`}
                        style={{ width: "10rem", height: "4rem" }}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setConfirmationPopUp(0));
                        }}
                      >
                        {getCancelText()}
                      </button>
                    </div>
                  </div>
                  <div className="game_status_tab--wrap">
                    <div className="game_status--tab rounded-xl">
                      <button
                        //             className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-50 duration-300
                        //  active-tab polygon_border
                        // `}
                        className={getConfirmButtonClass()}
                        style={{ width: "10rem", height: "4rem" }}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setConfirmationPopUp(0));
                          handleOnClick();
                        }}
                      >
                        {getConfirmText()}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  d="M480 100L464 116V188L480 204V368L440 408H228L220 416H40L8 384V304L0 296V24L16 0H480V100Z"
                />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
      </div>
    </>
  );
}

export default ConfirmationPopUp;
