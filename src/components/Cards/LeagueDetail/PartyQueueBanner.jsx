import { useDispatch, useSelector } from "react-redux";
import { IMAGES } from "../../ui/images/images";
import {
  setShowPartyQueuePopup,
  setConfirmationPopUp,
} from "../../../app/slices/constState/constStateSlice";
import { setPopupData } from "../../../app/slices/constState/constStateSlice";
import { getRandomColor, getServerURL } from "../../../utils/constant";
import { getSmile } from "../MatchDetail/matchCards";
import { t } from "i18next";

const PartyQueueBanner = () => {
  const { leagueData, isMatchJoind, isQueueUser } = useSelector(
    (state) => state.leagues
  );

  const partySizeLimit = leagueData?.partySizeLimit || 1;

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
      {leagueData?.format == "party queue" && user && partyQueueTeam?.data && (
        <div className="party-queue-banner rounded-xl overflow-hidden md:mb-10 mb-5">
          <div className="party-queue-header flex items-center justify-between ga-2 px-4 py-[1.25rem]">
            <div className="flex items-center sm:gap-4 gap-3">
              <img
                className="sm:w-[1.75rem] w-[1.5rem]"
                src={IMAGES.party_user}
                alt="clock"
              />
              <h3 className="text-base sm:text-xl font-medium font_oswald ">
                {t("party.party_queue")}
              </h3>
              <h3 className="text-base sm:text-xl font_oswald ">
                (Max {partySizeLimit})
              </h3>
            </div>
            {partyQueueTeam?.data?.Players.length >= 2 &&
              !isQueueUser &&
              (isMatchJoind?.currentMatch == null ||
                isMatchJoind?.currentMatch == undefined) && (
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
                  <div
                    className="party-card-wp mx-auto relative"
                    key={player.userId?._id}
                    onClick={() => {
                      if (
                        partyQueueTeam?.data.Creator === user?._id &&
                        player.userId?._id !== partyQueueTeam?.data.Creator &&
                        !isQueueUser &&
                        (isMatchJoind?.currentMatch == null ||
                          isMatchJoind?.currentMatch == undefined)
                      ) {
                        dispatch(
                          setPopupData({
                            userId: player.userId?._id,
                            teamId: partyQueueTeam?.data?._id,
                          })
                        );
                        dispatch(setConfirmationPopUp(6));
                      }
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <sub className="flex items-center justify-center absolute -top-2.5 -left-2 w-6 h-6 rounded-full">
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
                              src={getServerURL(player?.userId?.profilePicture)}
                              alt={player.userId?.username}
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className="profile-placeholder rounded-full sm:w-[3.125rem] sm:h-[3.125rem] w-[2.5rem] h-[2.5rem]  object-cover"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: getRandomColor(
                                  player.userId?.username
                                ),
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                              }}
                            >
                              {player.userId?.username
                                ?.charAt(0)
                                ?.toUpperCase() || "?"}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="text-xl font-bold">
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
                        <span className="username font-bold text-lg">
                          {player.userId?.username}
                        </span>
                      </div>
                      {/* Add remove icon if current user is creator and this player is not the creator */}
                    </div>
                    <span className="text-sm font-medium">
                      @{player.userId.gameId} ID
                    </span>
                  </div>
                ))}
              {partyQueueTeam &&
                partyQueueTeam?.data?.Creator === user?._id &&
                partyQueueTeam?.data?.Players?.length <
                  leagueData?.partySizeLimit &&
                !isQueueUser &&
                (isMatchJoind?.currentMatch == null ||
                  isMatchJoind?.currentMatch == undefined) && (
                  <div className="party-card-wp mx-auto">
                    <div
                      className="add-img flex items-center justify-center rounded-full w-[3.125rem] h-[3.125rem] cursor-pointer"
                      onClick={openPopup}
                    >
                      <span className="text-2xl font-medium">+</span>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartyQueueBanner;
