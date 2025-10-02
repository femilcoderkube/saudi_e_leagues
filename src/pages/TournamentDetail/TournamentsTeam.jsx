import React, { useEffect, useState } from "react";
import { getServerURL } from "../../utils/constant.js";

import { IMAGES } from "../../components/ui/images/images.js";
import TeamRegistrationPopup from "../../components/Overlays/TournamentTeam/TeamRegistrationPopup.jsx";
import {
  setCurrentTeam,
  setTeamRegistrationPopup,
  setTeamEditPopup,
  getTeamData,
  setRosterModal,
  transferTeamPresidency,
  assignTeamRole,
  removeTeam,
} from "../../app/slices/TournamentTeam/TournamentTeamSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { startTeamSocket } from "../../app/socket/socket.js";
import { t } from "i18next";
import GamingLoader from "../../components/Loader/loader.jsx";
import InvitePlayerModel from "./InvitePlayerModel.jsx";
import ConfirmationPopUp from "../../components/Overlays/ConfirmationPopUp.jsx";
import {
  setConfirmationPopUp,
  setPopupData,
} from "../../app/slices/constState/constStateSlice.js";
import ManageRosterModal from "../../components/Overlays/TournamentTeam/ManageRosterModal.jsx";

export default function TournamentsTeam() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openInviteModel, setOpenInviteModel] = useState(false);
  const dispatch = useDispatch();
  const isSocketConnected = useSelector((state) => state.socket.isConnected);

  const {
    showTeamRegistrationPopup,
    showTeamEditPopup,
    currentTeam,
    error,
    loading: loading,
  } = useSelector((state) => state.tournamentTeam);
  console.log("currentTeam", currentTeam);
  const isOpen = useSelector((state) => state.tournamentTeam.showRosterModal);

  const openModal = () => dispatch(setRosterModal(true));
  const closeModal = () => dispatch(setRosterModal(false));

  const isPresident = currentTeam?.members?.some((member) => {
    const memberUserId = member?.user?._id;
    const role = member?.role;
    return memberUserId === user?._id && role == "President";
  });

  const handleCreateTeam = () => {
    dispatch(setCurrentTeam(null));
    dispatch(setTeamRegistrationPopup(true));
  };

  const myTeamMember = (currentTeam?.members || []).find(
    (m) => (m?.user?._id || m?.userId) === user?._id
  );
  const myRoleLower = String(myTeamMember?.role || "").toLowerCase();

  // Edit existing team
  const handleEditTeam = () => {
    dispatch(setCurrentTeam(currentTeam));
    dispatch(setTeamEditPopup(true));
  };

  const handleMakePresident = async (data) => {
    try {
      await dispatch(
        transferTeamPresidency({
          teamId: data?.teamId,
          newPresidentUserId: data?.userId,
          userId: user?._id,
        })
      ).unwrap();

      if (user?._id) {
        await dispatch(getTeamData(user._id));
      }
    } catch (err) {
      console.log("Failed to transfer team presidency:", err);
    }
  };

  const handleAssignTeamRole = async (data, role) => {
    try {
      await dispatch(
        assignTeamRole({
          teamId: data?.teamId,
          candidateId: data?.userId,
          userId: user?._id,
          gameRole: role,
          game: data?.game,
        })
      ).unwrap();
      if (user?._id) {
        await dispatch(getTeamData(user._id));
      }
    } catch (err) {
      console.log("Failed to transfer team presidency:", err);
    }
  };

  const handleRemoveTeam = async (data) => {
    try {
      await dispatch(
        removeTeam({
          teamId: data?.teamId,
          user: data?.userId,
        })
      ).unwrap();
      if (user?._id) {
        await dispatch(getTeamData(user._id));
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (isSocketConnected) {
      startTeamSocket({ isSocketConnected, userId: user?._id });
    }
  }, [dispatch, isSocketConnected, user]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getTeamData(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <>
      {loading ? (
        <GamingLoader />
      ) : error?.status || !currentTeam ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#6368B5] mb-2">
              {t("tourteam.no_team_title")}
            </h2>
            <p className="text-base text-[#8492B4]">
              {t("tourteam.no_team_desc")}
            </p>
          </div>
          <button
            onClick={handleCreateTeam}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#BC5225] to-[#F49528] text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-150"
          >
            {t("tourteam.create_newteam")}
          </button>
        </div>
      ) : (
        <>
          <div className="team-page-wp flex xl:items-start items-center md:gap-[3.813rem] gap-[2rem] flex-col xl:flex-row w-full mb-10">
            <div className="relative team-content-left-wp sm:w-[27.5rem] sm:h-[32.313rem]">
              <div className="relative team-content-left-wp-last">
                <div className="edit-team-wp absolute top-0 right-0 z-20">
                  {isPresident ? (
                    <div className="edit-team-drop group relative flex flex-col items-center">
                      <button className="bg-[linear-gradient(180deg,rgba(188,82,37,0.8464)_0%,rgba(244,149,40,0.92)_107.14%)] shadow-[inset_0px_2px_4px_0px_#5759C33D] w-16 h-16 rounded-[0.5rem_0_0.5rem_0] flex items-center justify-center hover:scale-102 transition-transform duration-150 cursor-pointer">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            d="M21.9547 2.04843C19.2557 -0.647951 16.6124 -0.717445 13.8438 2.04843L12.1604 3.73019C12.0213 3.86917 11.9657 4.09156 12.0213 4.28614C13.0787 7.96933 16.0281 10.9159 19.7148 11.9722C19.7705 11.9861 19.8261 12 19.8818 12C20.0348 12 20.1739 11.9444 20.2852 11.8332L21.9547 10.1515C23.332 8.78937 23.9998 7.46898 23.9998 6.13469C24.0137 4.7587 23.3459 3.42441 21.9547 2.04843Z"
                            fill="white"
                          />
                          <path
                            d="M16.82 13.617C16.4174 13.4224 16.0287 13.2278 15.6539 13.0054C15.3485 12.8247 15.057 12.6301 14.7654 12.4216C14.5294 12.2687 14.2518 12.0463 13.988 11.8239C13.9603 11.81 13.8631 11.7266 13.752 11.6154C13.2939 11.2263 12.7803 10.7259 12.3222 10.1699C12.2805 10.1421 12.2111 10.0448 12.1139 9.91969C11.9751 9.7529 11.7391 9.4749 11.5309 9.15521C11.3643 8.94672 11.1699 8.64093 10.9895 8.33514C10.7673 7.95985 10.573 7.58456 10.3786 7.19537C10.328 7.08666 10.2801 6.97889 10.2346 6.87232C10.0628 6.46977 9.53989 6.35331 9.23058 6.663L1.17469 14.729C0.994218 14.9097 0.827631 15.2571 0.785984 15.4934L0.0363411 20.817C-0.102482 21.7622 0.161282 22.6517 0.744337 23.2494C1.2441 23.7359 1.93821 24 2.68785 24C2.85444 24 3.02103 23.9861 3.18762 23.9583L8.51841 23.2077C8.76829 23.166 9.11535 22.9992 9.28194 22.8185L17.3308 14.7597C17.6418 14.4482 17.524 13.9151 17.1182 13.7445C17.0207 13.7035 16.9216 13.6611 16.82 13.617Z"
                            fill="white"
                          />
                        </svg>
                      </button>

                      <div className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 absolute top-full ltr:lg:left-10 right-0 rtl:lg:right-10 bg-[radial-gradient(100%_71.25%_at_50%_-14.46%,#2D2E6D_0%,rgba(34,35,86,0.9)_100%),radial-gradient(100%_110.56%_at_50%_-14.46%,rgba(67,109,238,0)_47.51%,rgba(67,109,238,0.25)_100%)] rounded-xl px-8 py-5 shadow-2xl flex flex-col gap-3 min-w-[16rem]">
                        <span
                          className="text-white text-lg font-medium cursor-pointer"
                          onClick={handleEditTeam}
                        >
                          {t("tourteam.edit_team")}
                        </span>
                        <span
                          className="text-white text-lg font-medium cursor-pointer"
                          onClick={openModal}
                        >
                          {t("tourteam.manage_roster_title")}
                        </span>
                        <span
                          className="text-white text-lg font-medium cursor-pointer"
                          onClick={() => {
                            dispatch(setConfirmationPopUp(12));
                            dispatch(
                              setPopupData({
                                userId: user?._id,
                                teamId: currentTeam?._id,
                              })
                            );
                          }}
                        >
                          {t("tourteam.remove_team")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="edit-team-drop group relative flex flex-col items-center">
                      <button className="bg-[linear-gradient(180deg,rgba(188,82,37,0.8464)_0%,rgba(244,149,40,0.92)_107.14%)] shadow-[inset_0px_2px_4px_0px_#5759C33D] w-16 h-16 rounded-[0.5rem_0_0.5rem_0] flex items-center justify-center hover:scale-102 transition-transform duration-150 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width={24}
                          height={24}
                          x={0}
                          y={0}
                          viewBox="0 0 512 512"
                          style={{
                            enableBackground: "new 0 0 512 512",
                            width: "1.5rem",
                            height: "1.5rem",
                          }}
                          xmlSpace="preserve"
                          className=""
                        >
                          <g>
                            <path
                              d="M363.335 488a24 24 0 0 1-24 24H113.082a80.09 80.09 0 0 1-80-80V80a80.09 80.09 0 0 1 80-80h226.253a24 24 0 0 1 0 48H113.082a32.035 32.035 0 0 0-32 32v352a32.034 32.034 0 0 0 32 32h226.253a24 24 0 0 1 24 24zm108.553-248.97L357.837 124.978a24 24 0 1 0-33.937 33.941L396.977 232H208.041a24 24 0 1 0 0 48h188.935l-73.08 73.08a24 24 0 1 0 33.941 33.941l114.051-114.05a24 24 0 0 0 0-33.941z"
                              fill="#ffffff"
                              opacity={1}
                              data-original="#ffffff"
                              className=""
                            />
                          </g>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <div className="team_content-left w-[27.5rem] h-[32.313rem] shrink-0">
                  <div className="relative polygon_border sd_before sd_after">
                    <div className="team-user-wp w-[27.5rem] h-[10.25rem] flex items-center gap-[1.125rem] p-[2.188rem]">
                      <img
                        className="rounded-full md:w-[5.688rem] md:h-[5.688rem] w-[3rem] h-[3rem] shrink-0"
                        src={getServerURL(currentTeam?.logoImage)}
                        alt=""
                      />
                      <div className="sm:space-y-3 space-y-1 w-full">
                        <h3 className="md:text-2xl sm:text-lg text-base font-bold text-[#F4F7FF]">
                          {currentTeam?.teamName}
                        </h3>
                        <span className="flex justify-between">
                          <h3 className="md:text-2xl sm:text-lg text-base font-bold text-[#F4F7FF]">
                            {currentTeam?.teamShortName}
                          </h3>
                          <span className="self-end md:text-lg text-base font-semibold">
                            {new Date(
                              currentTeam?.createdAt
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="team-mange-wp px-10 flex items-center gap-4 mt-[2rem]">
                    <div className="team-mange w-[10.75rem] h-[5.75rem] md:px-5 md:py-4 p-4">
                      <span className="text-[#7B7ED0] font-semibold text-base">
                        {t("tourteam.members")}
                      </span>
                      <div className="flex items-center gap-3 mt-2.5">
                        <span className="font-semibold md:text-lg text-base">
                          {currentTeam?.members?.length || 0}
                        </span>
                      </div>
                    </div>
                    <div className="team-mange w-[10.75rem] h-[5.75rem] md:px-5 md:py-4 p-4">
                      <span className="text-[#7B7ED0] font-semibold text-base">
                        {t("tourteam.region")}
                      </span>
                      <div className="flex items-center gap-3 mt-2.5">
                        <span className="font-semibold md:text-lg text-base">
                          {currentTeam?.region}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="team-social flex items-center justify-between sm:gap-4 gap-2 px-9 sm:pt-8.5 pt-6">
                    <li>
                      <a
                        href={currentTeam?.social?.twitterId}
                        className="p-2 inline-block"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            d="M14.2882 10.1624L22.8505 0H20.8215L13.3869 8.82384L7.44888 0H0.600098L9.57953 13.3432L0.600098 24H2.6292L10.4803 14.6817L16.7513 24H23.6001L14.2877 10.1624H14.2882ZM11.5091 13.4608L10.5993 12.1321L3.36031 1.55962H6.47688L12.3188 10.0919L13.2286 11.4206L20.8225 22.5113H17.7059L11.5091 13.4613V13.4608Z"
                            fill="#F4F7FF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={currentTeam?.social?.instagramId}
                        className="p-2 inline-block"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            d="M16.852 2.25271C20.1011 2.38267 21.6173 3.94224 21.7906 7.19134C21.8339 8.44766 21.8773 8.83755 21.8773 12.0433C21.8773 15.2491 21.8773 15.639 21.7906 16.8953C21.6606 20.1444 20.1444 21.6607 16.852 21.8339C15.5957 21.8773 15.2058 21.9206 12 21.9206C8.79422 21.9206 8.40433 21.9206 7.14802 21.8339C3.89892 21.704 2.38266 20.1444 2.20938 16.8953C2.16605 15.639 2.12274 15.2491 2.12274 12.0433C2.12274 8.83755 2.12273 8.44766 2.20938 7.19134C2.33934 3.94224 3.8556 2.42599 7.14802 2.25271C8.40433 2.20939 8.79422 2.16607 12 2.16607C15.2058 2.16607 15.5957 2.16606 16.852 2.25271ZM12 0C8.7509 0 8.31769 -1.32335e-06 7.06137 0.0866413C2.68592 0.303248 0.25992 2.68592 0.0866347 7.06137C0.0433134 8.36101 0 8.7509 0 12C0 15.2491 -7.93366e-06 15.6823 0.0866347 16.9386C0.303241 21.3141 2.68592 23.7401 7.06137 23.9134C8.36101 23.9567 8.7509 24 12 24C15.2491 24 15.6823 24 16.9386 23.9134C21.3141 23.6968 23.7401 21.3141 23.9134 16.9386C23.9567 15.639 24 15.2491 24 12C24 8.7509 24 8.31769 23.9134 7.06137C23.6967 2.68592 21.3141 0.259927 16.9386 0.0866413C15.6823 -1.32335e-06 15.2491 0 12 0ZM12 5.84838C8.57761 5.84838 5.84838 8.62094 5.84838 12C5.84838 15.4224 8.62093 18.1516 12 18.1516C15.4224 18.1516 18.1516 15.3791 18.1516 12C18.1516 8.62094 15.3791 5.84838 12 5.84838ZM12 16.0289C9.79061 16.0289 8.01444 14.2527 8.01444 12.0433C8.01444 9.83394 9.79061 8.05777 12 8.05777C14.2094 8.05777 15.9856 9.83394 15.9856 12.0433C15.9856 14.2094 14.2094 16.0289 12 16.0289ZM18.4116 4.15885C17.6318 4.15885 16.9819 4.80866 16.9819 5.58845C16.9819 6.36823 17.6318 7.01805 18.4116 7.01805C19.1913 7.01805 19.8412 6.36823 19.8412 5.58845C19.8412 4.80866 19.1913 4.15885 18.4116 4.15885Z"
                            fill="#F4F7FF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={currentTeam?.social?.twitchId}
                        className="p-2 inline-block"
                      >
                        <svg
                          width="22"
                          height="24"
                          viewBox="0 0 22 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            d="M4.5837 0L0 4.28606V19.7139H5.4993V24L10.083 19.7139H13.7496L22 11.9993V0H4.5837ZM20.166 11.1419L16.4993 14.5704H12.8326L9.62445 17.5703V14.5704H5.4993V1.71362H20.166V11.1419Z"
                            fill="#F4F7FF"
                          />
                          <path
                            d="M17.4149 4.71346H15.5823V9.85564H17.4149V4.71346Z"
                            fill="#F4F7FF"
                          />
                          <path
                            d="M12.3741 4.71346H10.5415V9.85564H12.3741V4.71346Z"
                            fill="#F4F7FF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={currentTeam?.social?.kickId}
                        className="p-2 inline-block"
                      >
                        <svg
                          width="20"
                          height="22"
                          viewBox="0 0 20 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.0999756 0H7.52497V4.88889H9.99994V2.44444H12.475V0H19.9V7.33333H17.4249V9.77775H14.95V12.2222H17.4249V14.6667H19.9V22H12.475V19.5556H9.99994V17.1111H7.52497V22H0.0999756V0Z"
                            fill="#F4F7FF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={currentTeam?.social?.discordId}
                        className="p-2 inline-block"
                      >
                        <svg
                          width="24"
                          height="20"
                          viewBox="0 0 24 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            d="M20.3179 2.36545C18.7877 1.66302 17.1481 1.14581 15.4327 0.849932C15.4012 0.844108 15.3698 0.858095 15.3546 0.887217C15.1439 1.26231 14.9098 1.75272 14.7468 2.13714C12.9021 1.86106 11.0668 1.86106 9.25945 2.13714C9.09525 1.7434 8.85302 1.26231 8.64107 0.887217C8.62477 0.859259 8.59334 0.845273 8.56306 0.849932C6.84885 1.14581 5.20802 1.66302 3.67781 2.36545C3.665 2.37127 3.65335 2.38059 3.6452 2.3934C0.533544 7.04363 -0.318923 11.5797 0.0991473 16.0598C0.101476 16.082 0.113124 16.1029 0.130592 16.1158C2.18368 17.6243 4.17274 18.5399 6.12451 19.1468C6.15596 19.1561 6.18856 19.1445 6.20836 19.1188C6.66952 18.4886 7.08177 17.8235 7.43462 17.1234C7.45559 17.0826 7.43461 17.0337 7.39269 17.0174C6.73938 16.7693 6.11867 16.4675 5.5201 16.1251C5.47235 16.0971 5.46888 16.0296 5.51196 15.9969C5.63773 15.9026 5.7635 15.8047 5.88345 15.7057C5.90557 15.6871 5.93584 15.6836 5.96146 15.6952C9.88946 17.4892 14.1424 17.4892 18.0238 15.6952C18.0494 15.6824 18.0797 15.6871 18.1018 15.7045C18.2218 15.8036 18.3475 15.9026 18.4745 15.9969C18.5175 16.0296 18.5152 16.0971 18.4675 16.1251C17.8701 16.4745 17.2482 16.7704 16.5937 17.0174C16.5506 17.0337 16.532 17.0826 16.553 17.1245C16.914 17.8235 17.3251 18.4875 17.7781 19.1188C17.7967 19.1456 17.8305 19.1573 17.8619 19.148C19.823 18.541 21.812 17.6254 23.8651 16.1169C23.8826 16.1041 23.8942 16.0831 23.8966 16.0622C24.3973 10.8831 23.0581 6.3843 20.3482 2.39574C20.3412 2.38292 20.3307 2.37244 20.3168 2.36661L20.3179 2.36545ZM8.0192 13.3317C6.83602 13.3317 5.86249 12.246 5.86249 10.9122C5.86249 9.57842 6.81856 8.49274 8.0192 8.49274C9.21984 8.49274 10.1957 9.5889 10.1759 10.9122C10.1759 12.246 9.21984 13.3317 8.0192 13.3317ZM15.9951 13.3317C14.812 13.3317 13.8384 12.246 13.8384 10.9122C13.8384 9.57842 14.7945 8.49274 15.9951 8.49274C17.1958 8.49274 18.1717 9.5889 18.1519 10.9122C18.1519 12.246 17.2063 13.3317 15.9951 13.3317Z"
                            fill="#F4F7FF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={currentTeam?.social?.facebookId}
                        className="p-2 inline-block"
                      >
                        <svg
                          width="12"
                          height="24"
                          viewBox="0 0 12 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            d="M11.1853 12.9367L11.8168 8.77614H7.92632V6.07179C7.92632 4.93414 8.46947 3.8225 10.2063 3.8225H12V0.279536C10.9554 0.106836 9.89997 0.0134053 8.8421 0C5.64 0 3.54947 1.99576 3.54947 5.60373V8.77614H0V12.9367H3.54947V24H7.92632V12.9367H11.1853Z"
                            fill="#F4F7FF"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={currentTeam?.social?.tiktokId}
                        className="p-2 inline-block"
                      >
                        <svg
                          width="22"
                          height="24"
                          viewBox="0 0 22 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                          <path
                            d="M15.7411 0C15.7411 0.356632 15.7745 0.707851 15.8361 1.04776C16.1325 2.61909 17.0663 3.96754 18.3635 4.80889C19.2692 5.39957 20.3427 5.73951 21.5 5.73951L21.4998 6.65889V9.86296C19.3528 9.86296 17.3625 9.17761 15.741 8.01853V16.4049C15.741 20.5897 12.3193 24 8.12053 24C6.49913 24 4.98947 23.4872 3.75384 22.6235C1.78588 21.2471 0.5 18.9737 0.5 16.4049C0.5 12.2145 3.91611 8.80987 8.11492 8.81535C8.46718 8.81535 8.80822 8.84325 9.1437 8.88787V9.86295L9.13142 9.86881L9.14365 9.86854V13.1005C8.81939 13.0002 8.47274 12.9389 8.11492 12.9389C6.19721 12.9389 4.63731 14.4936 4.63731 16.4049C4.63731 17.7367 5.39767 18.8901 6.50469 19.4753C6.51503 19.4894 6.52551 19.5034 6.53604 19.5173L6.55461 19.5417C6.54188 19.5172 6.52717 19.4932 6.51034 19.4697C6.99674 19.726 7.54464 19.8709 8.12614 19.8709C9.99903 19.8709 11.5311 18.3831 11.5981 16.5331L11.6037 0H15.7411Z"
                            fill="#F4F7FF"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  <div className="relative mt-7 team-board flex items-center justify-between max-w-[22.5rem] py-6 px-10 rounded-lg w-full mx-auto bg-[linear-gradient(180deg,rgba(48,53,72,0.4)_0%,rgba(48,53,72,0.16)_100%),linear-gradient(85.43deg,rgba(31,116,78,0.12)_3.99%,rgba(31,116,78,0)_32.05%),linear-gradient(85.43deg,rgba(188,50,37,0)_67.72%,rgba(188,50,37,0.12)_100%)] border-t border-[rgba(255,255,255,0.06)] shadow-[0px_4px_12px_0px_#090C1633]">
                    <div className="text-center">
                      <h3 className="text-[#F4F7FF] md:text-2xl sm:text-lg text-base font-bold">
                        0{" "}
                        <span className="text-base team-win">
                          {t("tourteam.wins")}
                        </span>
                      </h3>
                    </div>
                    <div className="text-center">
                      <h3 className="text-[#F4F7FF] md:text-2xl sm:text-lg text-base font-bold">
                        0{" "}
                        <span className="text-base team-loss">
                          {t("tourteam.losses")}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="team_content-right w-full">
              <div className="mb-6">
                <h3 className="grad_text-clip !font-extrabold uppercase md:text-[2rem] text-[1.5rem] bg-[linear-gradient(181.21deg,rgba(132,146,180,0.8)_1.03%,rgba(132,146,180,0.16)_98.97%)]">
                  {t("tourteam.last_tournaments")}
                </h3>
              </div>
              <div className="game_card--wrapper game_card--wrapv2 flex sm:flex-wrap  gap-[1.188rem] md:justify-start mb-9">
                {[
                  {
                    _id: "1",
                    isLeague: true,
                    logo: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg",
                    title: "Overwatch Championchip",
                    titleAr: "دوري الأبطال",
                    prizepool: 50000,
                    game: {
                      logo: "https://static-cdn.jtvnw.net/ttv-boxart/516575-52x72.jpg",
                      name: "Valorant",
                      shortName: "VAL",
                    },
                    totalRegistrations: 128,
                    endDate: "2024-07-15T00:00:00Z",
                  },
                  {
                    _id: "2",
                    isLeague: false,
                    logo: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg",
                    title: "Overwatch Championchip",
                    titleAr: "كأس الصيف",
                    prizepool: 20000,
                    game: {
                      logo: "https://static-cdn.jtvnw.net/ttv-boxart/33214-52x72.jpg",
                      name: "League of Legends",
                      shortName: "LOL",
                    },
                    totalRegistrations: 64,
                    endDate: "2024-08-01T00:00:00Z",
                  },
                  {
                    _id: "3",
                    isLeague: true,
                    logo: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg",
                    title: "Overwatch Championchip",
                    titleAr: "دعوة الشتاء",
                    prizepool: 30000,
                    game: {
                      logo: "https://static-cdn.jtvnw.net/ttv-boxart/21779-52x72.jpg",
                      name: "Counter-Strike: GO",
                      shortName: "CS:GO",
                    },
                    totalRegistrations: 80,
                    endDate: "2024-09-10T00:00:00Z",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    className="game_card_wrap--link relative inline-block"
                  >
                    <div className="game_card--body inline-block relative !m-0 p-5">
                      <div className="game_img--mask relative flex">
                        <div className="game_image relative">
                          <img
                            src={item.logo}
                            alt="Game Logo"
                            className="w-[7.75rem] h-[9.5rem] object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="game_mask--con pt-3 relative h-full flex flex-col justify-between">
                          <h3 className="game_label !mb-0 text-base !font-black uppercase leading-tight ltr:pl-5 rtl:pr-5 h-[34px]">
                            {item.title}
                          </h3>
                          <div className="league_price_v2 mt-5 mb-7 ltr:pl-5 rtl:pr-5 py-3 relative sd_before sd_after before:top-0 before:left-0 before:w-full before:h-[0.063rem] after:bottom-0 after:left-0 after:w-full after:h-[0.063rem]">
                            <h2 className="league_price text-base !font-bold font_oswald yellow_grad-bg grad_text-clip">
                              <span className="icon-saudi_riyal !p-0"></span>
                              {item.prizepool.toLocaleString()}
                            </h2>
                          </div>
                          <div className="game_intro_v2 bg-no-repeat ltr:pl-5 rtl:pr-5">
                            <div className="game_intro-con flex gap-5 relative bottom-1">
                              <img
                                src={item.game.logo}
                                alt="Game Logo"
                                style={{ width: "2.5rem", height: "2.5rem" }}
                                loading="lazy"
                              />
                              <div className="game_intro-con">
                                <p className="text-xs purple_light font-medium">
                                  Game
                                </p>
                                <h4
                                  title={item.game.name}
                                  className="sm:text-base text-sm !font-bold"
                                >
                                  {item.game.shortName}
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <svg
                          width="0"
                          height="0"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ position: "absolute" }}
                        >
                          <defs>
                            <clipPath
                              id="cardclipv2"
                              clipPathUnits="objectBoundingBox"
                            >
                              <path
                                d="
                                            M0.923,0
                                            V0.569
                                            L0.961,0.6
                                            V0.938
                                            L0.885,1
                                            H0
                                            V0.062
                                            L0.077,0
                                            H0.923
                                            Z
                                            M1,0.554
                                            L0.962,0.538
                                            V0.308
                                            L1,0.277
                                            V0.554
                                            Z
                                        "
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="grad_text-clip !font-extrabold uppercase md:text-[2rem] text-[1.5rem] bg-[linear-gradient(181.21deg,rgba(132,146,180,0.8)_1.03%,rgba(132,146,180,0.16)_98.97%)]">
                  {t("tourteam.last_matches")}
                </h3>
              </div>
              <div className="main-card-duty-wp flex md:flex-row flex-col gap-[1.188rem] mt-5">
                {[
                  {
                    matchId: "1",
                    createdAt: "2024-06-01T15:30:00Z",
                    game: {
                      logo: "https://static-cdn.jtvnw.net/ttv-boxart/516575-52x72.jpg",
                      name: "Valorant",
                    },
                    status: "in_progress",
                    userScore: 0,
                    teamOneScore: 13,
                    teamTwoScore: 11,
                  },
                  {
                    matchId: "2",
                    createdAt: "2024-05-28T18:00:00Z",
                    game: {
                      logo: "https://static-cdn.jtvnw.net/ttv-boxart/33214-52x72.jpg",
                      name: "League of Legends",
                    },
                    status: "win",
                    userScore: 1,
                    teamOneScore: 8,
                    teamTwoScore: 5,
                  },
                  {
                    matchId: "3",
                    createdAt: "2024-05-20T20:15:00Z",
                    game: {
                      logo: "https://static-cdn.jtvnw.net/ttv-boxart/21779-52x72.jpg",
                      name: "Counter-Strike: GO",
                    },
                    status: "lose",
                    userScore: -1,
                    teamOneScore: 7,
                    teamTwoScore: 13,
                  },
                ].map((match) => (
                  <div
                    key={match.matchId}
                    className="card-duty-wp relative main-tournament-schedule-card-wrapper cursor-pointer w-full"
                  >
                    <div className="tournament-schedule-card-header-time absolute bottom-0 left-0 z-10 w-full flex items-center justify-center ">
                      <h2
                        className="text-[0.7rem] font-bold text-[#BABDFF] px-10 pt-1 pb-[0.35rem] relative"
                        dir="ltr"
                      >
                        {new Date(match.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                        <span className="inline-block text-[#7B7ED0]  pl-2 ml-1 relative">
                          {new Date(match.createdAt).toLocaleTimeString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </h2>
                    </div>
                    <div className="tournament-schedule-card-footer flex justify-between items-center h-[2.6rem] md:h-[2.9rem] p-3  absolute top-0 w-full">
                      <div className="tournament-schedule-card-footer-left flex items-center gap-3">
                        <img
                          className="w-5 h-5"
                          src={match.game.logo}
                          alt={match.game.name}
                          loading="lazy"
                        />
                        <h2 className="text-sm grad_text-clip font-bold">
                          {match.game.name}
                        </h2>
                      </div>
                      <div className="tournament-schedule-card-footer-right text-right">
                        {match?.status === "in_progress" ? (
                          <button className="common-process px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                            {match?.status
                              ?.replace("_", " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </button>
                        ) : match?.userScore === 0 ? (
                          <div className="tournament-schedule-card-footer-right text-right">
                            <button className="common-green px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                              {match?.status
                                ?.replace("_", " ")
                                .replace(/\b\w/g, (c) => c.toUpperCase())}
                            </button>
                          </div>
                        ) : match?.userScore > 0 ? (
                          <div className="tournament-schedule-card-footer-right text-right">
                            <button className="common-green px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                              Win{" "}
                              <span className="font-normal">
                                ({match?.userScore})
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button className="common-red px-1.5 py-[0.2rem] cursor-pointer text-[0.75rem] font-bold">
                            Lose{" "}
                            <span className="font-normal">
                              ({match?.userScore})
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="tournament-schedule-card-wrapper relative  p-2  md:px-3 ">
                      <div className="tournament-schedule-card-header flex justify-between items-center relative gap-6 mt-4">
                        <div className="tournament-schedule-card-header-left flex items-center gap-3 md:gap-4 relative z-10">
                          <h2 className="text-[2rem] grad_text-clip font-bold font_oswald text-white">
                            {match?.teamOneScore == null ||
                            match?.teamOneScore == undefined
                              ? "-"
                              : match?.teamOneScore}
                          </h2>
                        </div>
                        <div className="tournament-schedule-card-header-center shrink-0">
                          <img
                            className="w-7 h-20 object-contain"
                            src={IMAGES.vs_img}
                            alt=""
                          />
                        </div>
                        <div className="tournament-schedule-card-header-right flex items-center gap-4 relative z-10">
                          <h2 className="text-[2rem] grad_text-clip font-bold text-white font_oswald">
                            {match?.teamTwoScore == null ||
                            match?.teamTwoScore == undefined
                              ? "-"
                              : match?.teamTwoScore}
                          </h2>
                        </div>
                      </div>
                      <svg
                        width={0}
                        height={0}
                        viewBox="0 0 112 20"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                        }}
                      >
                        <defs>
                          <clipPath
                            id="duty_bottom1"
                            clipPathUnits="objectBoundingBox"
                          >
                            <path d="M0,1 H1 L0.82143,0 H0.17857 L0,1 Z" />
                          </clipPath>
                        </defs>
                      </svg>
                      <svg
                        width={0}
                        height={0}
                        viewBox="0 0 232 132"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                        }}
                      >
                        <defs>
                          <clipPath
                            id="duty_main2"
                            clipPathUnits="objectBoundingBox"
                          >
                            <path d="M1,0.93939 L0.96552,1 H0.77586 L0.67241,0.81818 H0.32759 L0.22414,1 H0.03448 L0,0.93939 V0.30303 H1 V0.93939 Z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <svg
                      width={0}
                      height={0}
                      viewBox="0 0 232 40"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: "absolute",
                      }}
                    >
                      <defs>
                        <clipPath
                          id="duty_top1"
                          clipPathUnits="objectBoundingBox"
                        >
                          <path d="M1,0.2 V1 H0 V0.2 L0.03448,0 H0.96552 L1,0.2 Z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* team-top shape */}
          <svg
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute" }}
          >
            <defs>
              <path
                id="shapePath"
                d="M393.273 33.75H685.418L719.127 0H988.8L1022.51 33.75V180L1056.22 213.75H1202.29L1236 247.5V382.5L1202.29 416.25H595.527L561.818 450H89.8909L0 360V90L89.8909 0H359.564L393.273 33.75Z"
              />
              <clipPath id="myClip">
                <use href="#shapePath" />
              </clipPath>
            </defs>
          </svg>

          <div className="team-main-user mt-16">
            {/* Games Section */}
            <div className="mt-10">
              {currentTeam?.games?.length ? (
                currentTeam.games.map((game, index) => (
                  <div key={game.game._id} className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="team-user-title flex items-center flex-wrap gap-5 justify-between md:mb-10 mb-4">
                        <h3 className="grad_text-clip !font-extrabold uppercase md:text-[2rem] text-[1.5rem] bg-[linear-gradient(181.21deg,rgba(132,146,180,0.8)_1.03%,rgba(132,146,180,0.16)_98.97%)]">
                          {game.game.name || "Unknown Game"}
                        </h3>
                      </div>
                      {index === 0 && (
                        <div className="flex justify-end items-center w-full">
                          <div className="btn_polygon--mask inline-flex max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400 ">
                            <div
                              className="btn_polygon-link font_oswald font-medium relative sd_before sd_after vertical_center cursor-pointer"
                              onClick={() => setOpenInviteModel(true)}
                            >
                              {t("tournament.invite_players_title")}

                              <span className="ltr:ml-2.5 rtl:mr-2.5">
                                <svg
                                  width="9"
                                  height="13"
                                  viewBox="0 0 9 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.181 11.9097C0.784802 11.5927 0.784802 11.0787 1.181 10.7617L6.55072 6.46502L1.181 2.16837C0.784802 1.85135 0.784802 1.33736 1.181 1.02034C1.57719 0.703321 2.21954 0.703321 2.61574 1.02034L8.70284 5.89101C9.09903 6.20802 9.09903 6.72201 8.70284 7.03903L2.61574 11.9097C2.21954 12.2267 1.57719 12.2267 1.181 11.9097Z"
                                    fill="#F4F7FF"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-8 flex-wrap lg:justify-start justify-center items-end">
                      {game.users?.length ? (
                        game.users.map((val) => {
                          const displayName = val.name || "Unknown";
                          const avatar = val.image
                            ? getServerURL(val.image)
                            : IMAGES.defaultImg;

                          let roleLower = val?.role?.toLowerCase();
                          let showPresidentMenu =
                            val?.role?.toLowerCase() !== "president" &&
                            val?.id !== user?._id &&
                            myRoleLower !== "player";

                          let showManagerMenu =
                            val?.role?.toLowerCase() !== "manager" &&
                            val?.id !== user?._id;
                          myRoleLower !== "player";

                          return (
                            <div
                              key={`${val.id}-${val.role}`}
                              className="flex flex-col max-w-max align-center justify-center"
                            >
                              {roleLower === "president" && (
                                <div className="w-[1.188rem] h-auto flex items-center justify-center mx-auto mb-1.5">
                                  <img
                                    src="/src/assets/images/roaster-king.webp"
                                    alt="President crown"
                                    className="w-full h-full"
                                  />
                                </div>
                              )}
                              <div className="flex-shrink-0 flex mx-auto relative z-20">
                                <img
                                  className="w-18 h-18 rounded-full"
                                  src={avatar}
                                  alt={displayName}
                                />
                              </div>
                              <div className="game_card--roaster-main flex flex-col justify-between relative mt-[-25px]">
                                <div className="game_card--roaster-wrap">
                                  {showPresidentMenu && (
                                    <div className="relative group flex flex-col items-center">
                                      <div className="flex justify-end w-full">
                                        <img
                                          className="w-[0.313rem] h-[1.188rem]"
                                          src="/src/assets/images/menu_roaster.svg"
                                          alt=""
                                        />
                                      </div>
                                      <div className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 absolute top-full ltr:left-0 rtl:right-0 bg-[radial-gradient(100%_71.25%_at_50%_-14.46%,rgba(45,46,109,1)_0%,rgba(34,35,86,1)_100%),radial-gradient(100%_110.56%_at_50%_-14.46%,rgba(67,109,238,0)_47.51%,rgba(67,109,238,1)_100%)] rounded-xl px-6 py-3 shadow-2xl flex flex-col gap-3 lg:min-w-[18rem] min-w-[14rem] z-100">
                                        {showManagerMenu && (
                                          <span
                                            className="text-white text-sm font-medium border-b border-[#5362A9] pb-2 cursor-pointer"
                                            onClick={() => {
                                              const targetUserId = val.id;
                                              const teamId = currentTeam?._id;
                                              if (targetUserId && teamId) {
                                                dispatch(
                                                  setPopupData({
                                                    userId: targetUserId,
                                                    teamId,
                                                  })
                                                );
                                                dispatch(
                                                  setConfirmationPopUp(7)
                                                );
                                              }
                                            }}
                                          >
                                            {t("tourteam.make_president")}
                                          </span>
                                        )}
                                        <span
                                          className="text-white text-sm font-medium cursor-pointer"
                                          onClick={() => {
                                            const targetUserId = val.id;
                                            const teamId = currentTeam?._id;
                                            if (targetUserId && teamId) {
                                              dispatch(
                                                setPopupData({
                                                  userId: targetUserId,
                                                  teamId,
                                                  game: game.game._id,
                                                })
                                              );
                                              dispatch(setConfirmationPopUp(8));
                                            }
                                          }}
                                        >
                                          Assign {currentTeam?.teamName} Roster
                                          Manager
                                        </span>
                                        <span
                                          className="text-white text-sm font-medium cursor-pointer"
                                          onClick={() => {
                                            const targetUserId = val.id;
                                            const teamId = currentTeam?._id;
                                            if (targetUserId && teamId) {
                                              dispatch(
                                                setPopupData({
                                                  userId: targetUserId,
                                                  teamId,
                                                  game: game.game._id,
                                                })
                                              );
                                              dispatch(setConfirmationPopUp(9));
                                            }
                                          }}
                                        >
                                          Assign {currentTeam?.teamName} Roster
                                          Coach
                                        </span>
                                        <span
                                          className="text-white text-sm font-medium border-b border-[#5362A9] pb-2 cursor-pointer"
                                          onClick={() => {
                                            dispatch(setConfirmationPopUp(10));
                                          }}
                                        >
                                          Remove Player from{" "}
                                          {currentTeam?.teamName} Roster
                                        </span>
                                        {showManagerMenu && (
                                          <span
                                            className="text-white text-sm font-medium cursor-pointer"
                                            onClick={() => {
                                              dispatch(
                                                setConfirmationPopUp(11)
                                              );
                                            }}
                                          >
                                            {t("tourteam.remove_player")}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <h6 className="text-center text-lg !font-bold mt-2">
                                    {displayName}
                                  </h6>
                                  <p className="text-center mt-3 text-[#8492B4] text-base font-semibold h-[24px] overflow-hidden">
                                    {val.gameId || "No Game ID"}
                                  </p>
                                </div>
                                <div className="flex justify-between items-center border-t-[1px] border-[#5E73B880] px-7 py-[9.5px] mb-2">
                                  <p className="text-[#6368B5] text-base font-semibold">
                                    {val.role || "Member"}
                                  </p>
                                  {/* Gender not available in games.users, so omitting gender-based icons */}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-[#8492B4] text-base">
                          No users found for {game.game.name}.
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#8492B4] text-base">No games found.</p>
              )}
            </div>

            {/* SVG Clip Path */}
            <svg
              width="0"
              height="0"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath id="polygonClip" clipPathUnits="objectBoundingBox">
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
          </div>
        </>
      )}
      {showTeamEditPopup && <TeamRegistrationPopup isEdit={true} />}
      {showTeamRegistrationPopup && <TeamRegistrationPopup isEdit={false} />}
      {openInviteModel && (
        <InvitePlayerModel close={() => setOpenInviteModel(false)} />
      )}
      <ConfirmationPopUp
        onMakePresident={handleMakePresident}
        onAssignTeamRole={handleAssignTeamRole}
        onRemoveTeam={handleRemoveTeam}
      />
      <ManageRosterModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
