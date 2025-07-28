

import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { TeamOneScoreList } from "../Matchs/teamOneSection";
import { FirstPosCard_gold, EvenPosCard, OddPosCard } from "../../components/DraftingDetailComponents/DraftTeamsCards";


const DraftingDetail = () => {
  const { t, i18n } = useTranslation();
 

  return (
    <main className="flex-1 tournament_page--wrapper  pb-[5.25rem] sm:pb-0">
      {/* --- dashboard main content back groud --- */}
      {/* <div
        className="main_con--bg fixed top-0 right-0 h-full bg-no-repeat"
        style={{ backgroundSize: "100%" }}
      ></div> */}
      {(
        <div className="sd_content-wrapper max-w-full">
          {/* === League Top Hero Block HTML block Start === */}
          <div className="drafting__time-wrapper flex justify-center items-center mb-3">
            <h2 className="text-[7.5rem] font-bold font_oswald drafting__title-bg">0:15</h2>
          </div>
          <div className="drafting__final_teams-wrapper mb-5">
            <div className="drafting__teams-list-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              <div className="drafting__teams-list">
                <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                  Team 1
                </h2>
                <div className="drafting__teams-list-block">
                  <div className="drafting__teams-item relative">
                  <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                    <img alt="Gold Crown" className="h-9" src="/src/assets/images/gold_crown.png" />
                    </span>
                    <FirstPosCard_gold />
                  </div>
                  <div className="drafting__teams-item">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <OddPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                  <OddPosCard />
                  </div>
                </div>

              </div>
              <div className="drafting__teams-list">
                <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                  Team 2
                </h2>

                <div className="drafting__teams-list-block">
                  <div className="drafting__teams-item relative">
                  <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                    <img alt="Gold Crown" className="h-9" src="/src/assets/images/gold_crown.png" />
                    </span>
                    <FirstPosCard_gold />
                  </div>
                  <div className="drafting__teams-item">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <OddPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                  <OddPosCard />
                  </div>
                </div>
              </div>
              <div className="drafting__teams-list">
                <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                  Team 3
                </h2>

                <div className="drafting__teams-list-block">
                  <div className="drafting__teams-item relative">
                  <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                    <img alt="Gold Crown" className="h-9" src="/src/assets/images/gold_crown.png" />
                    </span>
                    <FirstPosCard_gold />
                  </div>
                  <div className="drafting__teams-item assign">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <OddPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                  <OddPosCard />
                  </div>
                </div>
              </div>
              <div className="drafting__teams-list">
                <h2 className="grad_head--txt max-w-full md:text-[2.5rem] text-[1.8rem] pl-[1rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                  Team 4
                </h2>

                <div className="drafting__teams-list-block">
                  <div className="drafting__teams-item relative">
                  <span className="gold_crown absolute top-[-2.5rem] ltr:right-6 rtl:left-6 z-10">
                    <img alt="Gold Crown" className="h-9" src="/src/assets/images/gold_crown.png" />
                    </span>
                    <FirstPosCard_gold />
                  </div>
                  <div className="drafting__teams-item">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <OddPosCard />
                  </div>
                  <div className="drafting__teams-item">
                    <EvenPosCard />
                  </div>
                  <div className="drafting__teams-item">
                  <OddPosCard />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="draft-picks-wrapper mb-8">
            <div className="draft-picks-wrapper-title text-center relative mb-4">
               <h2 className="text-[3.2rem] font-bold font_oswald drafting__title-bg relative inline-block">Draft Pick</h2>
            </div>
            <div className="draft-picks-wrapper-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8">
              <div className="draft-picks-wrapper-item">
                <OddPosCard />
              </div>
              <div className="draft-picks-wrapper-item">
                <OddPosCard />
              </div>
              <div className="draft-picks-wrapper-item">
                <OddPosCard />
              </div>
              <div className="draft-picks-wrapper-item">
                <OddPosCard />
              </div>
              <div className="draft-picks-wrapper-item">
                <EvenPosCard />
              </div>
              <div className="draft-picks-wrapper-item">
                <EvenPosCard />
              </div>
              <div className="draft-picks-wrapper-item">
                <EvenPosCard />
              </div>
              <div className="draft-picks-wrapper-item">
                <EvenPosCard />
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default DraftingDetail;
