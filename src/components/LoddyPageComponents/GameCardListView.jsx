import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../utils/axios";
import {
  cardVariants,
  formatAmountWithCommas,
  getDayFromISO,
  getMonthAbbreviation,
  getServerURL,
} from "../../utils/constant";
import { useTranslation } from "react-i18next";
const GameCardListView = ({ leagues }) => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  return (
    <div className="game_card--wrapper game_card--wrapv2 flex flex-wrap pt-5 sm:pt-10 md:pt-14 gap-[1.7rem] justify-center md:justify-start">
      {leagues.map((item, index) => (
        <Link
          key={index}
          to={
            item?._id
              ? item.isLeague
                ? `/${id}/lobby/${item._id}`
                : `/${id}/lobby/tournament/${item._id}`
              : "#"
          }
          className="game_card_wrap--link relative inline-block"
        >
          <div className="game_card--body inline-block relative !m-0 p-5">
            <div className="game_img--mask relative flex">
              <div className="game_image relative">
                <img
                  src={getServerURL(item.logo)}
                  alt={t("images.game_logo")}
                  className="w-[10rem] md:w-[13rem] h-[16.26rem] object-cover"
                />
              </div>
              <div className="game_mask--con pt-3 relative h-full flex flex-col justify-between">
                <h3 className="game_label !mb-0 sm:text-2xl text-lg !font-bold uppercase leading-tight ltr:pl-5 rtl:pr-5 h-[60px]">
                  {" "}
                  {i18n.language === "ar" ? item.titleAr : item.title}{" "}
                </h3>
                <div className="league_price_v2 mt-5 mb-7 ltr:pl-5 rtl:pr-5 py-3 relative sd_before sd_after before:top-0 before:left-0 before:w-full before:h-[0.063rem] after:bottom-0 after:left-0 after:w-full after:h-[0.063rem]">
                  <h2 className="league_price sm:text-2xl text-lg !font-bold font_oswald yellow_grad-bg grad_text-clip">
                    <span className="icon-saudi_riyal !p-0"></span>
                    {formatAmountWithCommas(item?.prizepool)}
                  </h2>
                </div>
                <div className="game_intro_v2 bg-no-repeat ltr:pl-5 rtl:pr-5">
                  <div className="game_intro-con flex gap-5 relative bottom-1">
                    <img
                      src={getServerURL(item.game.logo)}
                      alt={t("images.game_logo")}
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    />
                    <div className="game_intro-con">
                      <p className="text-xs purple_light font-medium">
                        {t("games.game")}
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
                <div className="card_participants_v2 mt-3 relative ltr:pl-13 rtl:pr-13 z-40">
                  <h3 className="part_number sm:text-lg text-base !font-bold leading-tight">
                    {item.totalRegistrations}
                  </h3>
                  <p className="text-xs purple_light font-medium">
                    {t("league.participants")}
                  </p>
                </div>
              </div>
              <svg
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute" }}
              >
                <defs>
                  <clipPath id="cardclipv2" clipPathUnits="objectBoundingBox">
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
          <div className="game_card--footer !m-0 flex justify-between items-center ">
            <div className="match_date absolute ltr:right-[0] rtl:left-[0] bottom-[0.3rem] bg-no-repeat">
              <p className="text-xs purple_light font-medium  text-center">
                {t("league.ends")}
              </p>
              <h2 className="text-[2rem] match_date-con  pt-1 pb-1  text-center !font-extrabold grad_text-clip">
                {getDayFromISO(item.endDate)}
              </h2>
              <p className="text-xs purple_light font-medium  text-center uppercase">
                {getMonthAbbreviation(item.endDate)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameCardListView;
