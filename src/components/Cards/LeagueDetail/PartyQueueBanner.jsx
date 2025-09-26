import { useDispatch, useSelector } from "react-redux";
import { IMAGES } from "../../ui/images/images";
import {
  setShowPartyQueuePopup,
  setConfirmationPopUp,
} from "../../../app/slices/constState/constStateSlice";
import { setPopupData } from "../../../app/slices/constState/constStateSlice";
import { getRandomColor, getServerURL } from "../../../utils/constant";
import { getSmile } from "../MatchDetail/matchCards";

const PartyQueueBanner = () => {
  const { leagueData, isMatchJoind, isQueueUser } = useSelector((state) => state.leagues);
  const { partyQueueTeam } = useSelector((state) => state.constState);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const openPopup = () => {
    if (leagueData?.format == "party queue") {
      dispatch(setShowPartyQueuePopup(true));
    }
  };

  return (
    <>
      {(leagueData?.format == "party queue" && user && partyQueueTeam?.data) && <div className="rounded-xl overflow-hidden bg-[linear-gradient(180deg,rgba(34,35,86,0.2)_0%,rgba(34,35,86,0.2)_100%)] text-white mb-10">
        <div className="flex items-center justify-between ga-2 px-4 py-[1.25rem] bg-[linear-gradient(180deg,rgba(94,95,184,0.32)_0%,rgba(34,35,86,0.32)_100%),linear-gradient(90deg,rgba(68,119,239,0)_0%,rgba(67,109,238,0.096)_100%)] shadow-[inset_0px_2px_2px_0px_#5E5FB81F] backdrop-blur-[12px]">
          <div className="flex items-center sm:gap-4 gap-3">
            <img
              className="sm:w-[1.75rem] w-[1.5rem]"
              src={IMAGES.party_user}
              alt="clock"
            />
            <h3 className="text-[#F4F7FF] text-base sm:text-xl font-medium font_oswald ">
              Party Queue
            </h3>
          </div>
          {(partyQueueTeam?.data?.Players.length >= 2 && !isQueueUser && (isMatchJoind?.currentMatch == null ||
            isMatchJoind?.currentMatch == undefined)) && (
              <div
                className="cursor-pointer h-6 w-7"
                onClick={() => dispatch(setConfirmationPopUp(5))}
              >
                <img src={IMAGES.party_logout} alt="" />
              </div>
            )}
        </div>
        <div className="party_container px-4 py-5">
          <div className="grid grid-cols-3 items-center gap-7 justify-between">
            {partyQueueTeam?.data?.Players &&
              partyQueueTeam?.data?.Players.map((player) => (
                <div className="party-card-wp mx-auto relative" key={player.userId?._id}>
                  {partyQueueTeam?.data.Creator === user?._id &&
                    player.userId?._id !== partyQueueTeam?.data.Creator && (
                      <button
                        onClick={() => {
                          dispatch(
                            setPopupData({
                              userId: player.userId?._id,
                              teamId: partyQueueTeam?.data?._id,
                            })
                          );
                          dispatch(setConfirmationPopUp(6));
                        }}
                        className="absolute top-[-0.3rem] right-0 flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-br from-[#ED1D4A] to-[#BC096B] border-2 border-[#fff2] hover:from-[#ff3b6e] hover:to-[#d81b60] shadow-[0_2px_8px_0_rgba(237,29,74,0.25)] transition-all duration-200 z-10 group"
                        title="Remove Player"
                        aria-label="Remove Player"
                      >
                        <span className="text-white text-sm font-bold leading-none">×</span>
                      </button>
                    )}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <sub className="flex items-center justify-center absolute -top-2.5 -left-2 w-6 h-6 rounded-full bg-[#0a0c32]">
                        <img
                          className="w-4 h-4"
                          src={getSmile(player.wilsonScore || 0)}
                          alt=""
                        />
                      </sub>
                      {/* <img
                        className="rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]"
                        src={getServerURL(
                          player?.userId?.profilePicture
                        )}
                        alt={player.userId?.username}
                      /> */}
                      {player?.userId?.profilePicture ? (
                        <>
                          <img
                            className="rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]"
                            src={getServerURL(
                              player?.userId?.profilePicture
                            )}
                            alt={player.userId?.username}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]  object-cover"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: getRandomColor(player.userId?.username),
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                            }}
                          >
                            {player.userId?.username?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-xl font-bold text-white">
                      {player?.totalLeaguesScore || 0}
                    </div>
                  </div>
                  <div className="flex relative">
                    {partyQueueTeam?.data.Creator === player.userId?._id && (
                      <div className="flex items-center gap-1 mb-1 me-1">
                        <img src={IMAGES.party_winner} alt="" />
                      </div>
                    )}
                    <div className="flex items-center gap-1 mb-1">
                      <span className="username font-bold text-base text-[#F4F7FF]">
                        @{player.userId?.username}
                      </span>
                    </div>
                    {/* Add remove icon if current user is creator and this player is not the creator */}
                  </div>
                  {/* <span className="text-sm font-medium text-[#FFD0AF]">
                  @{player.userId.username}
                </span> */}
                </div>
              ))}
            {partyQueueTeam &&
              partyQueueTeam?.data?.Creator === user?._id &&
              partyQueueTeam?.data?.Players?.length < leagueData?.playersPerTeam && (
                <div className="party-card-wp mx-auto">
                  <div
                    className="add-img flex items-center justify-center rounded-full w-[3.125rem] h-[3.125rem] bg-[linear-gradient(180deg,rgba(33,36,92,0.7)_0%,rgba(17,18,60,0.7)_100%)] shadow-[inset_0px_4px_4px_0px_#5472880A] backdrop-blur-[24px] cursor-pointer"
                    onClick={openPopup}
                  >
                    <span className="text-white text-2xl font-medium">+</span>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>}
    </>
  );
};

export default PartyQueueBanner;
