import React from "react";
import { Link, useParams } from "react-router-dom";

import GetStartedBtn from "../../assets/images/get_started_btn.png";
import Playbtn from "../../assets/images/playbtn.png";
import Primetxt from "../../assets/images/primetxt.png";
import "../../assets/css/homepage.css";
import HeroCardSlider from "../../components/HomepageComp/HeroCardSlider.jsx";
import HtpCardSlider from "../../components/HomepageComp/HtpCardSlider.jsx";

export default function PrimeHome() {
  const { id } = useParams();
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
        <section className="home_hero--sec flex pt-[21.125rem] justify-between items-end">
          {/* === Hero Left Block Conatain === */}
          <div className="home_hero_left-con h-full flex justify-end flex-col">
            <h3 className="text-[2.375rem] uppercase !font-black">Level Up</h3>
            <h1 className="flex text-[4rem] gap-3 uppercase leading-none mb-2 items-center tracking-wide !font-black">
              Your Game -
              <span className="text-[1.75rem] leading-none">
                {" "}
                Join <br />
                Epic
              </span>
            </h1>
            <h2 className="text-[4rem] uppercase leading-none items-center tracking-wider !font-black">
              matchmaking
            </h2>
            <p className="purple_col text-2xl font-semibold py-10">
              Every Match Counts — Every Player Matters{" "}
            </p>
            <Link
              to={`/${id}/lobby`}
              className="ml-[-0.5rem] hover:opacity-70 duration-300"
            >
              <img src={GetStartedBtn} alt="" style={{ width: "21rem" }} />
            </Link>
          </div>

          {/* === Hero Right Game Slider Block Conatain === */}
          <div className="home_hero_right-con h-full relative">
            <div className="slider_header--con  pb-[2.2rem] inline-block">
              <h3 className="purple_col text-lg !font-black leading-none text-right uppercase">
                Choose your
              </h3>
              <h2 className="text-[4rem] !font-black leading-none">Game</h2>
            </div>
            {/* <!-- Slider main container --> */}
            <HeroCardSlider />
          </div>
        </section>

        {/* === About Section HTML block Start === */}
        <section className="home_about--sec pt-[7.5rem] pb-[5rem]  flex overflow-hidden">
          <div className="about_left--con max-w-[45%]">
            <h3 className="text-[2.375rem] uppercase !font-black mb-5">
              About
            </h3>
            <img src={Primetxt} alt="" style={{ width: "42.5rem" }} />
            <div className="about-con">
              <h4 className="purple_light text-2xl pb-5 !font-semibold mt-[-1rem]">
                <span className="uppercase !font-bold sky_col">Prime </span> is
                where skill meets purpose.
              </h4>
              <p className="text-xl purple_col mb-12">
                Born from the heart of the grassroots scene, Prime is not just a
                league — it’s a living system designed to reward dedication,
                amplify visibility, and connect ambitious players through real,
                meaningful competition.
              </p>
              <h4 className="purple_light text-2xl pb-5 !font-semibold">
                In <span className="uppercase !font-bold sky_col">Prime </span>{" "}
                you don’t just play — you grind.
              </h4>
              <p className="text-xl purple_col">
                Every match is a step forward. Every queue is a shot at growth.
                Every match builds your story. Whether you're playing solo or as
                part of a squad, PRIME creates the space for authentic
                connection and continuous competition.
              </p>
              <h4 className="purple_light text-2xl pb-5 !font-semibold mt-10">
                This is where grassroots players rise to their prime!
              </h4>
            </div>
          </div>
          <div className="about_right--con w-full sd_before sd_after relative">
            <div className="sd_play-link relative sd_before before:w-full before:h-full flex flex-col items-center h-full justify-center">
              <Link
                to={"#"}
                className="dropdown-header relative hover:opacity-70 duration-400 flex flex-col items-center "
              >
                <img src={Playbtn} alt="" style={{ width: "9rem" }} />
                <span className="text-2xl font-semibold purple_col">
                  Whatch the Video
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* === How To Play Slider Block Conatain === */}
        <section className="htp_slider-sec flex justify-between ">
          {/* === How To Play Left Block Conatain === */}
          <div className="htp_left-con h-full flex justify-end flex-col max-w-[30%]">
            <h2 className="grad_head--txt max-w-full text-[5rem] tracking-wide !font-black leading-none uppercase">
              How
            </h2>
            <h2 className="text-[4rem] mt-[-1rem] grad_text-clip uppercase leading-none items-center tracking-wider !font-black pb-10">
              to Play?
            </h2>
            <p className="htp_content block purple_col sd_before relative before:w-full before:top-0 text-2xl font-semibold py-10 pr-3">
              Pellentesque dictum porta, lacinia molestie ante maximus at
            </p>
            {/* === Collapse Menu Button Start === */}
            <div className="btn_polygon--mask inline-flex max-w-[fit-content] justify-center my-8 sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
              <Link
                to={"#"}
                className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
              >
                Go Play Now
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

          {/* === How To Play Right Slider Block Conatain === */}
          <div className="htp_right-con  relative max-w-[70%]">
            {/* <!-- Slider main container --> */}
            <HtpCardSlider
              sliderId="one"
              HtpCardDetails={[
                { gameLabel: "Game 1", gameName: "Valorant", Step: "01" },
                { gameLabel: "Game 2", gameName: "Dota 2", Step: "02" },
                { gameLabel: "Game 3", gameName: "CSGO", Step: "03" },
                { gameLabel: "Game 4", gameName: "Apex", Step: "04" },
                { gameLabel: "Game 4", gameName: "Apex", Step: "05" },
                { gameLabel: "Game 4", gameName: "Apex", Step: "06" },
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
