
import TimelinePanel from "../../components/Cards/LeagueDetail/TimelinePanel.jsx";
import { Link, useParams } from "react-router-dom";
import PDFPopup from "../../components/Overlays/LeagueDetail/PDFPopup.jsx";
import { useEffect } from "react";
import {
  startLeagueSocket,
  stopLeagueSocket,
} from "../../app/socket/socket.js";
import {
  formatAmountWithCommas,
  getServerURL,
} from "../../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import GamingLoader from "../../components/Loader/loader.jsx";
import LeagueRegistration from "../../components/Overlays/LeagueDetail/LeagueRegistration.jsx";
import StarOfTheWeek from "../../components/Cards/LeagueDetail/starOfTheWeek.jsx";
import VerifiyOTPModel from "../../components/MainView/VerifiyOTPModel.jsx";
import {
  leftToRight,
  rightToLeft,
  cardVariantsAni,
} from "../../components/Animation/animation.jsx";
import { motion } from "motion/react";
import QueueConfirmationBanner from "../../components/Overlays/LeagueDetail/QueueConfirmationBanner.jsx";
import DetailItem from "../../components/Details/DetailItem.jsx";
import Table from "../../components/Loddy/LeaderBoard/Table";
import GetQueueButton from "../../components/Cards/LeagueDetail/QueueButton.jsx";
import { IMAGES } from "../../components/ui/images/images.js";
import PartyQueueBanner from "../../components/Cards/LeagueDetail/PartyQueueBanner.jsx";
import { toast } from "react-toastify";

const LeagueDetail = () => {
  const { lId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { queueConfimation, partyQueueTeam } = useSelector((state) => state.constState);
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const {
    leagueData,
    leaderBoard,
    activeUsers,
    registrationModal,
    verificationModal,
    verificationModule,
  } = useSelector((state) => state.leagues);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isMatctCreated = useSelector(
    (state) => state.constState.isMatctCreated
  );

  useEffect(() => {
    let res = startLeagueSocket({ lId, user, isSocketConnected });
    return () => {
      stopLeagueSocket(lId);
    };
  }, [isSocketConnected, lId, user, window.location.pathname, isMatctCreated]);

  useEffect(() => {
    if (leagueData?.title) {
      document.title = `Prime eLeague - ${leagueData?.title}`;
    }
  }, [leagueData]);

  // useEffect(()=>{
  //   if (lId && user) {
  //     dispatch(fetchLeagueParticipants({ leagueId: lId, userId: user._id }));
  //   }
  // },[]);

  useEffect(() => {
    toast.error(partyQueueTeam?.message);
  }, [partyQueueTeam?.message])

  return (
    <main className="flex-1 lobby_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div>
      {registrationModal && <LeagueRegistration />}
      {verificationModal && <VerifiyOTPModel module={verificationModule} />}
      {!leagueData ? (
        <GamingLoader />
      ) : isMatctCreated ? (
        <GamingLoader />
      ) : (
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="sd_top-wraper flex flex-col md:flex-row items-center justify-between md:gap-0 gap-8 mb-10">
            <motion.div
              className="sd_content-left flex  items-center gap-12 md:gap-10 md:pb-6 pb-9.5 mr-[-1rem] relative order-2 md:order-1"
              variants={leftToRight}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="sd_com--logo cursor-hide w-[8.75rem] md:w-[18.5rem]">
                <img
                  src={getServerURL(leagueData?.internalPhoto || "")}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="sd_league--info flex-1">
                <h1 className="uppercase text-2xl md:text-5xl !font-black tracking-wide">
                  {i18n.language === "ar"
                    ? leagueData?.titleAr
                    : leagueData?.title || t("league.league_title")}
                </h1>
                <h2 className="league_price text-2xl md:text-5xl !font-black font_oswald pt-5 sm:pt-3.5 md:pt-10 sm:pb-6 pb-3 yellow_grad-bg grad_text-clip">
                  <span className="icon-saudi_riyal !p-0"></span>
                  {formatAmountWithCommas(leagueData?.prizepool)}
                </h2>
                <span className="block purple_col text-sm sm:text-xl">
                  {t("league.prize_pool")}
                </span>
              </div>
            </motion.div>
            <motion.div
              className="sd_content-right flex flex-col-reverse sm:flex-row items-center md:items-start order-1 md:order-2"
              variants={rightToLeft}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="player_img flex flex-row items-center gap-2 sm:gap-5">
                <div className="player_one sd_before relative gradiant_bg con_center w-[41.02rem] h-[27.33rem]">
                  <img
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    src={getServerURL(leagueData?.headerPhoto)}
                    alt=""
                  />
                </div>
              </div>
              <div className="player_score mt-4 flex md:flex-col items-start md:h-full sm:ltr:ml-[-2.5rem] sm:rtl:ml-0 z-2">
                <div className="online_user md:p-4 px-4 py-1 relative md:flex-shrink flex-shrink-0 flex md:block flex-col md:flex-row">
                  <h3 className="sm:text-base text-sm text-[#63A3D2] order-2 md:order-1">
                    {t("league.online_users")}
                  </h3>
                  <span className="sm:text-2xl text-lg font-bold order-1 md:order-2">
                    {activeUsers || 0}
                  </span>
                </div>
                <div className="participants md:p-4 px-5 py-1 ltr:text-right rtl:text-left w-full pt-0 relative md:top-[-2.45rem] ">
                  <span className="sm:text-2xl text-lg font-bold">
                    {leagueData?.totalRegistrations || 0}
                  </span>
                  <h3 className="sm:text-base text-sm text-[#D27D63]">
                    {t("league.participants")}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="sd_bottom-wraper flex flex-col xl:flex-row md:gap-[2.5rem] gap-[2rem] items-center md:items-start"
            initial="hidden"
            whileInView="visible"
            variants={cardVariantsAni}
            viewport={{ once: true, amount: 0 }}
          >
            <div className="sd_content-left order-2 md:order-1">
              <div className="sd_game_info--wrap md:flex-row md:inline-flex hidden gap-3 md:gap-5 items-center justify-center md:justify-baseline w-full">
                <DetailItem
                  title={t("league.game")}
                  logo={leagueData?.game?.logo}
                  name={leagueData?.game?.shortName}
                />
                <DetailItem
                  title={t("league.platform")}
                  logo={leagueData?.platform?.logo}
                  name={leagueData?.platform?.name?.toUpperCase()}
                />
                <DetailItem
                  title={t("league.team_size")}
                  logo={IMAGES.teamSizeImage}
                  name={leagueData.playersPerTeam}
                  type={1}
                />
              </div>
              <Table />
            </div>
            <div className="sd_content-right w-full order-0 xl:order-1">
              <GetQueueButton />
              <div className="sd_game_info--wrap md:flex-row inline-flex md:hidden gap-3 md:gap-5 w-full md:pb-0 pb-6 items-center justify-center md:justify-baseline">
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border">
                  <Link
                    to={"#"}
                    className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center"
                  >
                    <img
                      src={getServerURL(leagueData?.game?.logo || "")}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.game")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {leagueData?.game?.name || ""}
                      </h4>
                    </div>
                  </Link>
                </div>
                <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border">
                  <Link
                    to={"#"}
                    className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center"
                  >
                    <img
                      src={getServerURL(leagueData?.platform?.logo || "")}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.platform")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {leagueData?.platform?.name?.toUpperCase() || ""}
                      </h4>
                    </div>
                  </Link>
                </div>
                <div className="sd_game-con sd_team_size--info relative sd_before sd_after polygon_border">
                  <Link
                    to={"#"}
                    className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center"
                  >
                    <img
                      src={IMAGES.teamSizeImage}
                      alt=""
                      className="absolute left-8"
                      style={{ width: "3rem" }}
                    />
                    <div className="sd_game--con text-center">
                      <p className="text-sm md:text-base mb-2 purple_col font-medium">
                        {t("league.team_size")}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold">
                        {" "}
                        {leagueData.playersPerTeam || 1}v
                        {leagueData.playersPerTeam || 1}{" "}
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
              {/* --- Timeline-card HTML Block Start --- */}
              <div className="flex flex-col gap-6 md:block">
                <PartyQueueBanner />
                <PDFPopup />
                {/* Desktop version */}
                {leagueData?.isWeekOfTheStar && <StarOfTheWeek />}
                <TimelinePanel />
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {queueConfimation && <QueueConfirmationBanner />}
      <svg
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute" }}
      >
        <defs>
          <clipPath id="game_polygon_clip" clipPathUnits="objectBoundingBox">
            <path
              d="
                        M0.3649,0.0833
                        H0.6351
                        L0.6622,0
                        H0.9459
                        L1,0.1667
                        V0.8333
                        L0.9459,1
                        H0.6622
                        L0.6351,0.9167
                        H0.3649
                        L0.3378,1
                        H0.0541
                        L0,0.8333
                        V0.1667
                        L0.0541,0
                        H0.3378
                        L0.3649,0.0833
                        Z
                      "
            />
          </clipPath>
        </defs>
      </svg>
    </main>
  );
};

export default LeagueDetail;