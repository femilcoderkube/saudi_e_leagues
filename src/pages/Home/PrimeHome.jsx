import React from "react";
import { Link, useParams } from "react-router-dom";

import GetStartedBtn from "../../assets/images/get_started_btn.png";
import GetStartedBtnAr from "../../assets/images/get_started_btn_ar.png";
import Playbtn from "../../assets/images/playbtn.png";
import Primetxt from "../../assets/images/Prime.png";
import "../../assets/css/homepage.css";
import HeroCardSlider from "../../components/HomepageComp/HeroCardSlider.jsx";
import HtpCardSlider from "../../components/HomepageComp/HtpCardSlider.jsx";
import Accordation from "../../components/HomepageComp/Accordation.jsx";
import TimelineCard from "../../components/HomepageComp/TimelineCard.jsx";
import { useTranslation } from "react-i18next";

export default function PrimeHome() {
  const { id } = useParams();
  const { t , i18n } = useTranslation();
  // <Link to={`/${id}/lobby`}>Go to Lobby</Link>
 

  return (
    <main className="flex-1 pt-[0.5rem] home_page--wrapper">
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
            <p className="purple_col lg:text-2xl md:text-[1.07rem] font-semibold py-10 xl:pt-10 md:pt-8">
              {t("homepage.tagline")}{" "}
            </p>
            <Link
              to={`/${id}/lobby`}
              className="ml-[-0.5rem] hover:opacity-70 duration-300"
            >
              <img
                src={i18n.language === "ar" ? GetStartedBtnAr : GetStartedBtn}
                alt={t("images.get_started_button")}
                style={{ width: "21rem" }}
              />
            </Link>
          </div>

          {/* === Hero Right Game Slider Block Conatain === */}
          <div className="home_hero_right-con h-full relative">
            <div className="slider_header--con  pb-[2.2rem] inline-block">
              <h3 className="purple_col text-lg !font-black leading-none text-right uppercase">
                {t("homepage.choose_your")}
              </h3>
              <h2 className="text-[4rem] !font-black leading-none">
                {t("homepage.game")}
              </h2>
            </div>
            {/* <!-- Slider main container --> */}
            <HeroCardSlider />
          </div>
        </section>

        {/* === About Section HTML block Start === */}
        <section className="home_about--sec relative lg:pt-[7.5rem] pt-[2rem] lg:pb-[9rem] pb-[3rem] flex overflow-hidden">
          <div className="about_left--con max-w-[45%]">
            <h3 className="text-[2.375rem] uppercase !font-black mb-5">
              {t("homepage.about")}
            </h3>
            <img
              src={Primetxt}
              alt={t("images.prime_logo")}
              style={{ width: "42.5rem" }}
            />
            <div className="about-con">
              <h4 className="purple_light text-2xl pb-5 !font-semibold mt-[-1rem]">
                <span className="uppercase !font-bold sky_col">Prime </span>{" "}
                {t("homepage.prime_description_1")}
              </h4>
              <p className="text-xl purple_col mb-12">
                {t("homepage.prime_description_2")}
              </p>
              <h4 className="purple_light text-2xl pb-5 !font-semibold">
                {t("homepage.prime_description_3")}
              </h4>
              <p className="text-xl purple_col">
                {t("homepage.prime_description_4")}
              </p>
              <h4 className="purple_light text-2xl pb-5 !font-semibold mt-10">
                {t("homepage.prime_description_5")}
              </h4>
            </div>
          </div>
          <div className="about_right--con w-full sd_before sd_after relative">
            <div className="sd_play-link relative sd_before before:w-full before:h-full flex flex-col items-center h-full justify-center">
              <a
                href="https://drive.google.com/file/d/1pvJp0s79tWODiJHrODesEAPnPIKny2n7/view"
                className="dropdown-header relative hover:opacity-70 duration-400 flex flex-col items-center cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Playbtn}
                  alt={t("images.play_button")}
                  style={{ width: "9rem" }}
                />
                <span className="text-2xl font-semibold purple_col">
                  {t("homepage.watch_video")}
                </span>
              </a>
            </div>
          </div>
        </section>

      
        {/* <section className="htp_slider-sec flex justify-between ">
       
          <div className="htp_left-con h-full flex justify-end flex-col max-w-[30%]">
            <h2 className="grad_head--txt max-w-full lg:text-[5rem] text-[3rem] tracking-wide !font-black leading-none uppercase">
              {t("homepage.how")}
            </h2>
            <h2 className="lg:text-[4rem] text-[2.5rem] mt-[-1rem] grad_text-clip uppercase leading-none items-center tracking-wider !font-black pb-10">
              {t("homepage.to_play")}
            </h2>
            <p className="htp_content block purple_col sd_before relative before:w-full before:top-0 text-2xl font-semibold py-10 pr-3">
              {t("homepage.htp_description")}
            </p> 
            <div className="btn_polygon--mask inline-flex max-w-[fit-content] justify-center my-8 sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
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

        
          <div className="htp_right-con  relative max-w-[70%]">
          
            <HtpCardSlider
              sliderId="one"
              HtpCardDetails={[
                {
                  gameLabel: t("games.game_1"),
                  gameName: t("games.valorant"),
                  Step: "01",
                },
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
                  Step: "04",
                },
                {
                  gameLabel: t("games.game_5"),
                  gameName: t("games.apex"),
                  Step: "05",
                },
                {
                  gameLabel: t("games.game_6"),
                  gameName: t("games.apex"),
                  Step: "06",
                },
              ]}
            />
          </div>
        </section> */}
         {/* === Timelines Split Card Section HTML block Start === */}
            {/* <section className="sd_timeline--sec pt-[5rem] pb-[5rem]  relative  ">
                <h2 className="text-[4rem] purple_grad-col mt-[-1rem] grad_text-clip leading-none uppercase items-center tracking-wider !font-black pb-10">
                  Timelines                 
                </h2>
                <TimelineCard />
               
            </section> */}

            {/* === FAQ Section HTML block Start === */}
            <section className="home_faq--sec pt-[5rem] pb-[5rem] pl-[7.5rem] relative flex justify-end ">
              <div className="faq_left--con w-full absolute ltr:left-0 rtl:right-0 h-full top-[-2rem]">
              </div> 
              <div className="faq_right--con max-w-[65%] flex-[0_0_65%] ltr:pr-[6.5rem] rtl:pr-[8.5rem] relative">
                <h2 className="text-[4rem] purple_grad-col mt-[-1rem] grad_text-clip leading-none items-center tracking-wider !font-black pb-10">
                  {t("homepage.faq.faq")}                 
                </h2>
                <div className="sd_faq-con">
                  <Accordation />
                </div>
              </div>                           
            </section>  
      </div>
    </main>
  );
}
