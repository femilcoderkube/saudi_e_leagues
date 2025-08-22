import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import leaderBoardStyle from "./LeaderBoard.style";

const LeaderBoardHeader = () => {
  const { t } = useTranslation();
  const { leagueData } = useSelector((state) => state.leagues);

  return (
    <thead>
      <tr>
        <th className={leaderBoardStyle.tableHeader1}>
          {t("lobby.place")}
        </th>
        <th className={leaderBoardStyle.tableHeader1}>
          {t("lobby.user")}
        </th>
        <th className={leaderBoardStyle.tableHeader2}>
          {t("lobby.points")}
        </th>
        <th className={leaderBoardStyle.tableHeader2}>
          {t("lobby.wins_losses")}
        </th>
        {leagueData.playersPerTeam != 1 && (
          <th className={leaderBoardStyle.tableHeader2}>
            {t("lobby.reputation")}
          </th>
        )}
        <th className={leaderBoardStyle.tableHeader2}>
          {t("lobby.win_rate")}
        </th>
      </tr>
    </thead>
  );
};

export default LeaderBoardHeader;
