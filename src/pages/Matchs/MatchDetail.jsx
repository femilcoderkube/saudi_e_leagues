import React, { useEffect, useState } from "react";
// // import LargePrime from '../../assets/images/large_prime.png';
// const LargePrime ={`${baseURL}/api/v1/${leagueData?.partner?.logo || ""}`}
import "../../assets/css/Matchmaking.css";
import {
  FirstPosCard,
  SecondPosCard,
  ThirdPosCard,
  ForthPosCard,
  FifthPosCard,
  FirstPosCard_Opp,
  SecondPosCard_Opp,
  ThirdPosCard_Opp,
  ForthPosCard_Opp,
  FifthPosCard_Opp,
} from "../../components/ui/svg";
import LikeIcon from "../../assets/images/like_icon.png";
import DisLikeIcon from "../../assets/images/dislike_icon.png";
import GoldCrown from "../../assets/images/gold_crown.png";
import MatchMakingBG from "../../assets/images/matchmakingBG.png";
import { Link, useParams } from "react-router-dom";
import { items } from "../../utils/constant";
import { setMatchPage } from "../../app/slices/constState/constStateSlice";
import { useDispatch } from "react-redux";

// ✅ Card list component for Team 1
const TeamOneScoreList = ({ showIndexes = [0,1, 2, 3,4] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cards = [FirstPosCard, SecondPosCard, ThirdPosCard, ForthPosCard, FifthPosCard];

  return (
    <ul className="team_one--list flex flex-col gap-5 mt-[-1rem]">
      {cards.map((Card, index) => {
        if (!showIndexes.includes(index)) return null;

        return (
          <li
            key={index}
            className={`team_score--card relative ${index === 0 ? "gold_rank" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {index === 0 && (
              <span className="gold_crown absolute top-[-3rem] right-8 z-10">
                <img src={GoldCrown} alt="Gold Crown" />
              </span>
            )}
            <Card />
            <div
              className={`review_score--con sd_before absolute top-[0rem] left-[-3.5rem] flex gap-3 flex-col transition-opacity duration-300 ease-in-out ${
                hoveredIndex === index ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <Link to="#" className="like_icon hover:opacity-70 duration-400">
                <img src={LikeIcon} alt="Like" style={{ width: "2.625rem" }} />
              </Link>
              <Link to="#" className="like_icon hover:opacity-70 duration-400">
                <img src={DisLikeIcon} alt="Dislike" style={{ width: "2.625rem" }} />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const TeamTwoScoreList = ({ showIndexes = [0,1, 2, 3,4] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const cardsV2 = [FirstPosCard_Opp, SecondPosCard_Opp, ThirdPosCard_Opp, ForthPosCard_Opp, FifthPosCard_Opp];

  return (
    <ul className="team_two--list flex flex-col gap-5 mt-[-1rem]">
      {cardsV2.map((Card, index) => {
        if (!showIndexes.includes(index)) return null;
        return (
          <li
            key={index}
            className={`team_score--card relative ${index === 0 ? "gold_rank" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {index === 0 && (
              <span className="gold_crown absolute top-[-3rem] left-8 z-10">
                <img src={GoldCrown} alt="Gold Crown" />
              </span>
            )}
            <Card />
            <div
              className={`review_score--con sd_before absolute top-[0rem] right-[-3.5rem] flex gap-3 flex-col transition-opacity duration-300 ease-in-out ${
                hoveredIndex === index ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <Link to="#" className="like_icon hover:opacity-70 duration-400">
                <img src={LikeIcon} alt="Like" style={{ width: "2.625rem" }} />
              </Link>
              <Link to="#" className="like_icon hover:opacity-70 duration-400">
                <img src={DisLikeIcon} alt="Dislike" style={{ width: "2.625rem" }} />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const MatchDetail = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setMatchPage(true));
  },[])
  const {id ,mId}= useParams();
  const partner = items.find((item) => item.id === id);
  const LargePrime = partner.logo;
  return (

      <main
        className="flex-1 pt-[0.5rem] match_page--wrapper"
        style={{ background: `url(${MatchMakingBG})`, backgroundSize: "100%" }}
      >
        <section className="match_team--wrap flex pt-[6rem] justify-between items-end pl-[7.5rem] pr-[7.5rem]">
          <div className="team_score--con flex justify-between w-full gap-10">
            {/* Team 1 */}
            <div className="team_score--wrap">
              <h2 className="grad_head--txt max-w-full text-[4rem] pl-[2rem] grad_text-clip font_oswald tracking-wide !font-medium leading-none uppercase">
                Team 1
              </h2>
              <TeamOneScoreList />
            </div>

            {/* Score */}
            <div className="match_center-con flex-1">
               
              <h2 className="text-[4rem] mt-[-1rem] grad_text-clip uppercase leading-none items-center text-center tracking-wider !font-black pb-[4rem]">
                <span>12</span>:<span>9</span>
              </h2>

              <div className="prime_logo--con flex justify-center sd_before gradiant_bg relative">
                <img src={LargePrime} alt="" style={{width:'17.5rem'}} />
              </div>

              <div class="chat_block--con pt-[4rem] h-[25rem] sd_before relative  flex flex-col max-w-lg mx-auto">
                <div class="flex-1 chat_msg--con custom_scroll overflow-y-auto pr-4 pb-4 ">
                    <div class="flex flex-col space-y-1 h-full justify-end">
                        <div class="block send_msg-con">
                          <div class="px-2 py-1 rounded-lg">
                            <p className="text-white text-lg font-light "><span className="!font-bold text-[#AAC5FF]">Rick Moon: </span>Hiking sounds fun. Hope the weather cooperates for you!</p>
                          </div>
                        </div>

                        <div class="block reply_msg-con">
                          <div class="px-2 py-1 rounded-lg">
                            <p className="text-white text-lg font-light "> <span className="!font-bold text-[#F8D372]">Julia Ber_01: </span>I might go hiking if the weather's nice. Otherwise, just taking it easy</p>
                          </div>
                        </div>
                        
                      
                        <div class="block send_msg-con">
                          <div class="px-2 py-1 rounded-lg">
                            <p className="text-white text-lg font-light "><span className="!font-bold text-[#AAC5FF]">Rick Moon: </span>Hiking sounds fun. Hope the weather cooperates for you!</p>
                          </div>
                        </div>
                  
                        <div class="block reply_msg-con">
                          <div class="px-2 py-1 rounded-lg">
                            <p className="text-white text-lg font-light "> <span className="!font-bold text-[#F8D372]">Julia Ber_01: </span>Thanks! Fingers crossed. Enjoy your day!</p>
                          </div>
                        </div>
                        
                    
                        <div class="block send_msg-con">
                          <div class="px-2 py-1 rounded-lg">
                            <p className="text-white text-lg font-light "><span className="!font-bold text-[#AAC5FF]">Rick Moon: </span>You too, take care!</p>
                          </div>
                        </div>
                      
                    </div>
                </div>
                
                <div class=" py-2 flex items-center">
                    <input type="text" placeholder="Chat Message" class="chat_msg-input text-lg placeholder:text-[#7B7ED0] placeholder:font-semibold placeholder:opacity-65 flex-1 px-4 py-3 rounded-md focus:outline-none"></input>
                    <button class="absolute right-0 text-white cursor-pointer hover:opacity-65 duration-400 rounded-full p-2 ml-2 focus:outline-none">
                      <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.34505 2.24501C2.49432 2.11534 2.67867 2.03283 2.87482 2.00791C3.07097 1.98299 3.2701 2.01678 3.44705 2.10501L21.447 11.105C21.6135 11.1879 21.7534 11.3156 21.8513 11.4737C21.9491 11.6318 22.001 11.8141 22.001 12C22.001 12.1859 21.9491 12.3682 21.8513 12.5263C21.7534 12.6844 21.6135 12.8121 21.447 12.895L3.44705 21.895C3.27011 21.9835 3.07089 22.0176 2.87459 21.9929C2.6783 21.9681 2.49374 21.8857 2.34429 21.7561C2.19484 21.6264 2.0872 21.4554 2.035 21.2645C1.98281 21.0737 1.98839 20.8717 2.05105 20.684L4.61305 13H10C10.2653 13 10.5196 12.8946 10.7072 12.7071C10.8947 12.5196 11 12.2652 11 12C11 11.7348 10.8947 11.4804 10.7072 11.2929C10.5196 11.1054 10.2653 11 10 11H4.61305L2.05005 3.31601C1.98771 3.12842 1.98237 2.92656 2.0347 2.73594C2.08703 2.54532 2.19568 2.37448 2.34505 2.24501Z" fill="#7B7ED0" fill-opacity="0.4"/>
                      </svg>

                    </button>
                </div>    
              </div>
   
            </div>

            {/* Team 2 */}
            <div className="team_score--wrap">
              <h2 className="grad_head--txt max-w-full text-[4rem] pr-[2rem] grad_text-clip font_oswald tracking-wide !font-medium text-right leading-none uppercase">
                Team 2
              </h2>
              <TeamTwoScoreList />
            </div>
          </div>
        </section>
      </main>
   
  );
};

export default MatchDetail;
