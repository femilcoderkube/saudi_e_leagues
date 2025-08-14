import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import GetStartedBtn from "../../assets/images/get_started_btn.png";
import GetStartedBtnAr from "../../assets/images/get_started_btn_ar.png";
import GetStartedBtnAr_1 from "../../assets/images/mobile_get_start_ar.png";
import GetStartedBtn_1 from "../../assets/images/mob_start_btn.png";
import Playbtn from "../../assets/images/playbtn.png";
import Primetxt from "../../assets/images/Prime.png";
import "../../assets/css/homepage.css";
import HeroCardSlider from "../../components/HomepageComp/HeroCardSlider.jsx";
import HtpCardSlider from "../../components/HomepageComp/HtpCardSlider.jsx";
import Accordation from "../../components/HomepageComp/Accordation.jsx";
import TimelineCard from "../../components/HomepageComp/TimelineCard.jsx";
import VideoModal from "../../components/ModalPopUp/VideoModal.jsx";
import { useTranslation } from "react-i18next";
import { setActiveTabIndex } from "../../app/slices/constState/constStateSlice.js";
import { useDispatch } from "react-redux";
import team_falcons from "../../assets/images/team-falcons.png";
import date_icon from "../../assets/images/date_icon.png";
import pubg_icon from "../../assets/images/pubg_icon.png";
import schdule_down from "../../assets/images/schdule_down.png";
import battale_sahpe_img from "../../assets/images/battale-sahpe-img.png";
import { useStateManager } from "react-select";
import BattleRoyalStanding from "../TournamentDetail/BattleroyalGroupStandings.jsx";
import BattleRoyalSchedule from "../TournamentDetail/BattleroyalGroupSchedule.jsx";

export default function PrimeHome() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showVideoModal, setShowVideoModal] = useState(false);
  // const [activeState, setActiveState] = useState(false);
  // <Link to={`/${id}/lobby`}>Go to Lobby</Link>
  useEffect(() => {
    // Set page loading class
    document.body.classList.add("page-loading");

    // Wait for fonts and Swiper to stabilize before removing loading class
    const timer = setTimeout(() => {
      document.body.classList.remove("page-loading");
    }, 500); // Slightly longer delay to avoid visual flashes

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-1 md:pt-[0.5rem] pt-[1.5rem] home_page--wrapper pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      <div
        className="main_con--bg absolute top-0 left-0 h-full bg-no-repeat"
        style={{ backgroundSize: "auto" }}
      ></div>

      <div className="sd_home-wrapper ">
        {/* === Hero Section HTML block Start === */}
        <section className="home_hero--sec relative flex lg:pt-[21.125rem] md:pt-[13rem] pt-[10rem] justify-between items-end">
          {/* === Hero Left Block Conatain === */}
          <div className="home_hero_left-con h-full flex justify-end flex-col">
            <h3 className="xl:text-[2.375rem] text-[1.75rem] uppercase !font-black">
              {t("homepage.level_up")}
            </h3>
            <h1 className="flex xl:text-[4rem] text-[2.88rem] gap-3 uppercase leading-none mb-2 items-center tracking-wide !font-black">
              {t("homepage.your_game")} -
              <span className="xl:text-[1.75rem] text-[1.25rem] leading-none">
                {" "}
                {t("homepage.join")} <br />
                {t("homepage.epic")}
              </span>
            </h1>
            <h2 className="xl:text-[4rem] text-[3rem] uppercase leading-none items-center tracking-wider !font-black">
              {t("homepage.matchmaking")}
            </h2>
            <p className="purple_col lg:text-2xl md:text-[1.07rem] font-semibold pt-7 pb-5 md:pt-10 md:pb-10">
              {t("homepage.tagline")}{" "}
            </p>
            <div
              onClick={() => {
                dispatch(setActiveTabIndex(0));
                navigate(`/${id}/lobby`);
              }}
              className="ml-[-0.5rem] hover:opacity-70 duration-300"
            >
              <img
                className="hidden md:inline-block"
                src={i18n.language === "ar" ? GetStartedBtnAr : GetStartedBtn}
                alt={t("images.get_started_button")}
                style={{ width: "21rem" }}
              />
              <img
                className="md:hidden inline-block"
                src={
                  i18n.language === "ar" ? GetStartedBtnAr_1 : GetStartedBtn_1
                }
                alt={t("images.get_started_button")}
              />
            </div>
          </div>

          {/* === Hero Right Game Slider Block Conatain === */}
          <div className="home_hero_right-con h-full relative">
            <div className="slider_header--con  md:pb-[2.2rem] pb-8 md:inline-block flex gap-1">
              <h3 className="purple_col md:text-lg text-2xl !font-black leading-none text-right uppercase">
                {t("homepage.choose_your")}
              </h3>
              <h2 className="md:text-[4rem] text-2xl !font-black leading-none">
                {t("homepage.game")}
              </h2>
            </div>
            {/* <!-- Slider main container --> */}
            <HeroCardSlider />
          </div>
        </section>

        {/* === About Section HTML block Start === */}
        <section className="home_about--sec relative lg:pt-[7.5rem] pt-[2rem] lg:pb-[6rem] pb-[1rem] flex overflow-hidden">
          <div className="about_left--con max-w-[45%]">
            <h3 className="md:text-[2.375rem] text-2xl uppercase !font-black mb-5">
              {t("homepage.about")}
            </h3>
            <img
              src={Primetxt}
              alt={t("images.prime_logo")}
              style={{ width: "42.5rem" }}
            />
            <div className="about-con">
              <h4 className="purple_light md:text-2xl text-lg md:pb-5 pb-4 !font-semibold mt-[-1rem]">
                <span className="uppercase !font-bold sky_col">Prime </span>{" "}
                {t("homepage.prime_description_1")}
              </h4>
              <p className="md:text-xl text-base purple_col md:mb-12 mb-8">
                {t("homepage.prime_description_2")}
              </p>
              <h4 className="purple_light md:text-2xl text-lg  md:pb-5 pb-4 !font-semibold">
                {t("homepage.prime_description_3")}
              </h4>
              <p className="md:text-xl text-base purple_col">
                {t("homepage.prime_description_4")}
              </p>
              <h4 className="purple_light md:text-2xl text-lg  md:pb-5 pb-4 !font-semibold md:mt-10 mt-8">
                {t("homepage.prime_description_5")}
              </h4>
            </div>
          </div>
          <div className="about_right--con w-full sd_before sd_after relative">
            <div className="sd_play-link relative sd_before before:w-full before:h-full flex flex-col items-center h-full justify-center">
              <button
                onClick={() => setShowVideoModal(true)}
                className="dropdown-header relative hover:opacity-70 duration-400 flex flex-col items-center cursor-pointer bg-transparent border-none"
              >
                <img
                  src={Playbtn}
                  alt={t("images.play_button")}
                  style={{ width: "9rem" }}
                />
                <span className="md:text-2xl text-lg font-semibold purple_col">
                  {t("homepage.watch_video")}
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="htp_slider-sec flex xl:gap-0 sm:gap-10 gap-0 ">
          <div className="htp_left-con h-full flex justify-end flex-col max-w-[27.5%] basis-[27.5%]">
            <h2 className="grad_head--txt max-w-full xl:text-[5rem] text-[3rem] tracking-wide !font-black leading-none uppercase">
              {t("homepage.how")}
            </h2>
            <h2 className="xl:text-[4rem] lg:text-[3.5rem] text-[2.5rem] mt-[-1rem] grad_text-clip uppercase leading-none items-center tracking-wider !font-black md:pb-10 pb-8">
              {t("homepage.to_play")}
            </h2>
            {/* <p className="htp_content block purple_col sd_before relative before:w-full before:top-0 md:text-2xl text-base font-semibold md:py-10 sm:py-6 pt-6 pb-0 pr-3">
              {t("homepage.htp_description")}
            </p> */}
            <div className="btn_polygon--mask sm:inline-flex hidden max-w-[fit-content] justify-center my-6 sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
              <Link
                to={"#"}
                className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
              >
                {t("homepage.go_play_now")}
              </Link>
            </div>
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

          <div className="htp_right-con relative max-w-[75%] basis-[72.5%]">
            <HtpCardSlider
              sliderId="one"
              HtpCardDetails={[
                {
                  gameLabel: t("games.game_1"),
                  gameName: t("games.valorant"),
                  gameDiscription: t("games.disc_1"),
                  Step: "01",
                },
                {
                  gameLabel: t("games.game_2"),
                  gameName: t("games.dota2"),
                  gameDiscription: t("games.disc_2"),
                  Step: "02",
                },
                {
                  gameLabel: t("games.game_3"),
                  gameName: t("games.csgo"),
                  gameDiscription: t("games.disc_3"),
                  Step: "03",
                },
                {
                  gameLabel: t("games.game_4"),
                  gameName: t("games.apex"),
                  gameDiscription: t("games.disc_4"),
                  Step: "04",
                },           
              ]}

              HtpCardDetails1={[             
                {
                  gameLabel: t("games.game_2"),
                  gameName: t("games.dota2"),
                  Step: "02",
                },
                {
                  gameLabel: t("games.game_3"),
                  gameName: t("games.csgo"),
                  Step: "03",
                },                 
                {
                  gameLabel: t("games.game_4"),
                  gameName: t("games.apex"),
                  gameDiscription: t("games.disc_4"),
                  Step: "04",
                }, 
                {
                  gameLabel: t("games.game_1"),
                  gameName: t("games.valorant"),
                  gameDiscription: t("games.disc_1"),
                  Step: "01",
                },
                {
                  gameLabel: t("games.game_2"),
                  gameName: t("games.dota2"),
                  Step: "02",
                },
              ]}
            />
          </div>
          <div className="btn_polygon--mask how-to-play-mb-btn inline-flex sm:hidden  max-w-[fit-content] justify-center relative hover:opacity-70 duration-400">
            <Link
              to={"#"}
              className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
            >
              {t("homepage.go_play_now")}
            </Link>
          </div>
          <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
            viewBox="0 0 182 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="customClipPathmob" clipPathUnits="objectBoundingBox">
                <path d="         M1,0.1538         V1         H0.04396         L0,0.8462         V0.07692         L0.02198,0         H0.95604         L1,0.1538         Z       " />
              </clipPath>
            </defs>
          </svg>
        </section>
        {/* === Timelines Split Card Section HTML block Start === */}
        {/* <section className="sd_timeline--sec pt-[5rem] pb-[5rem]  relative  ">
                <h2 className="text-[4rem] purple_grad-col mt-[-1rem] grad_text-clip leading-none uppercase items-center tracking-wider !font-black pb-10">
                  Timelines                 
                </h2>
                <TimelineCard />
               
            </section> */}

        {/* === FAQ Section HTML block Start === */}
        <section className="home_faq--sec pt-[5rem] pb-[5rem] pl-[7.5rem] relative flex justify-end ">
          <div className="faq_left--con w-full absolute ltr:left-0 rtl:right-0 h-full top-[2rem]"></div>
          <div className="faq_right--con max-w-[65%] flex-[0_0_65%] ltr:pr-[6.5rem] rtl:pr-[8.5rem] relative">
            <h2 className="md:text-[4rem] text-[2rem] purple_grad-col mt-[-1rem] grad_text-clip leading-none items-center tracking-wider !font-black md:pb-10 pb-8">
              {t("homepage.faq.faq")}
            </h2>
            <div className="sd_faq-con">
              <Accordation />
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <VideoModal onClose={() => setShowVideoModal(false)} />
      )}
    </main>
  );
}
