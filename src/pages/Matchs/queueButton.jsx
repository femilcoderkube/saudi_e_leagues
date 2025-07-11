import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GetQueueButton = () => {
  const { t } = useTranslation();
  return (
    <Link to="/matchs">
      <button className="relative w-full h-full flex items-center justify-center">
        <span
          className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
          style={{
            fontFamily: "Yapari",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("league.league_ended")}
        </span>
        <span
          className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
          style={{
            fontFamily: "Yapari",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("league.view_match")}
        </span>
        <span
          className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
          style={{
            fontFamily: "Yapari",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("league.queue")}
        </span>
        <span
          className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
          style={{
            fontFamily: "Yapari",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("league.open")}
        </span>
      </button>
    </Link>
  );
};

export default GetQueueButton;
