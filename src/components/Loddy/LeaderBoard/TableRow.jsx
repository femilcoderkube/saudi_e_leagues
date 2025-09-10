import { getSmile } from "../../Cards/MatchDetail/matchCards";
import { getRandomColor, getServerURL } from "../../../utils/constant";
import { useTranslation } from "react-i18next";

const TableRow = ({ user, isYou, playersPerTeam }) => {
  const { t } = useTranslation();

  return (
    <tbody>
      <tr key={user.rank} className={`${user.badgeColor} overflow-hidden`}>
        {/* Rank + Badge */}
        <td
          className={`py-4 px-4 ${user.bedgeBG || ""} ${String(user.rank).length === 1 ? "one_digit" : "two_digit"
            }`}
        >
          <img
            className="bedge_bg"
            src={user.bedgesrc}
            alt={t(`badges.${user.badgeColor}`)}
            style={{ width: "3rem" }}
          />
          <div
            className="badge text-lg text-center pl-1 md:pt-0 pt-[0.3rem] font-bold"
            style={{ width: "3rem" }}
          >
            {user.rank}
          </div>
        </td>

        {/* User Info */}
        <td className="py-4 px-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="avtar_frame rounded-[2.5rem] flex-shrink-0 overflow-hidden">
              {user.profilePic ? (
                <img
                  src={getServerURL(user.profilePic)}
                  alt={user.username}
                  style={{ width: "2.5rem", height: "2.5rem" }}
                />
              ) : (
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: getRandomColor(user.username),
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    borderRadius: "50%",
                  }}
                >
                  {user.username?.charAt(0)?.toUpperCase() || "?"}
                </div>
              )}
            </div>
            <span className="text-base sm:text-lg !font-bold">{user.username}</span>
            {isYou && (
              <span className="text-base purple_col font-medium">{t("lobby.you")}</span>
            )}
          </div>
        </td>

        {/* Points */}
        <td className="py-4 px-4 ltr:text-right rtl:text-left ltr:md:text-center rtl:md:text-center text-base sm:text-lg !font-bold">
          {user.points}
        </td>

        {/* Wins / Losses */}
        <td
          data-title="Win/Loss"
          className="pb-11 md:pb-4 py-4 px-4 ltr:text-left rtl:text-right ltr:md:text-center rtl:md:text-center"
        >
          <div className="ltr:md:pl-0 ltr:pl-3 rtl:md:pr-0 rtl:pr-3">
            <span className="win text-lg sky_col">{user.wins}</span>{" "}
            <b className="font-bold text-xs">/</b>{" "}
            <span className="loss text-lg text-[#FA4768]">{user.losses}</span>
          </div>
        </td>

        {/* Reputation */}
        {playersPerTeam !== 1 && (
          <td data-title="Rep" className="pb-11 md:pb-4 py-4 px-4">
            <div className="flex items-center justify-center">
              <div className="avtar_frame rounded-[2.5rem] flex-shrink-0 overflow-hidden">
                <img src={getSmile(user.rep)} alt={user.rep} style={{ width: "1.5rem" }} />
              </div>
            </div>
          </td>
        )}

        {/* Win Rate */}
        <td
          data-title="Win rate"
          className={`pb-11 md:pb-4 py-4 px-4 text-center text-lg ${playersPerTeam === 1 ? "" : "leaderboard-right"
            }`}
        >
          <div className="leaderboard-center">{user.winRate}</div>
        </td>

        {/* Hidden column for alignment when playersPerTeam == 1 */}
        {playersPerTeam === 1 && (
          <td data-title="" className="pb-11 md:pb-4 py-4 px-4">
            <div className="flex items-center justify-center">
              <div className="avtar_frame rounded-[2.5rem] flex-shrink-0 overflow-hidden">
                <img
                  src={getSmile(user.rep)}
                  alt={user.rep}
                  style={{ width: "1.5rem", visibility: "hidden" }}
                />
              </div>
            </div>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default TableRow;
