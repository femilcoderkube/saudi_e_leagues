import React from 'react';
import { Link } from "react-router-dom";
import Valorant_card_bg from "../../assets/images/valorant_card_bg.jpg";
import DotaBG from "../../assets/images/dotaBG.jpg";
import { ValorantIcon } from "../ui/svg/index.jsx";

const GameCardDetail = [
    {
        path: '#',
        partNum : '481',
        gameImgSrc : Valorant_card_bg,
        leaguePrice : '$5.000.000',
        gameLabel : 'Champions Of the League',
        gameIcon : <ValorantIcon />,
        gameName: 'Valorant',
        Date: '02',
        Month: 'SEP'
    },
    {
        path: '#',
        partNum : '1.8k',
        gameImgSrc : DotaBG,
        leaguePrice : '$250.000',
        gameLabel : 'The Radiant Uprising',
        gameIcon : <ValorantIcon />,
        gameName: 'Dota 2',
        Date: '28',
        Month: 'DEC'
    },
    {
        path: '#',
        partNum : '481',
        gameImgSrc : Valorant_card_bg,
        leaguePrice : '$5.000.000',
        gameLabel : 'Champions Of the League',
        gameIcon : <ValorantIcon />,
        gameName: 'Valorant',
        Date: '02',
        Month: 'SEP'
    },
    {
        path: '#',
        partNum : '1.8k',
        gameImgSrc : DotaBG,
        leaguePrice : '$250.000',
        gameLabel : 'The Radiant Uprising',
        gameIcon : <ValorantIcon />,
        gameName: 'Dota 2',
        Date: '28',
        Month: 'DEC'
    },

]; 

const GameCardV2 = () => {
    return(
   
        <div className="game_card--wrapper game_card--wrapv2 flex flex-wrap pt-14 gap-[1.9rem]">            
            {GameCardDetail.map((item, index) => (
                <Link key={index} to={item.path} className="game_card_wrap--link relative inline-block">                   
                    
                    <div className="game_card--body inline-block relative !m-0 p-5">
                        <div className="game_img--mask relative flex">
                            <div className="game_image relative">
                                <img src={item.gameImgSrc} alt="" style={{width:'13rem', height:'16.26rem'}} />
                            </div>
                            <div className="game_mask--con pt-3 relative h-full flex flex-col justify-between">
                                <h3 className="game_label !mb-0 text-2xl !font-bold uppercase leading-tight pl-5"> {item.gameLabel} </h3>
                                <div className="league_price_v2 mt-5 mb-7 pl-5 py-3 relative sd_before sd_after before:top-0 before:left-0 before:w-full before:h-[0.063rem] after:bottom-0 after:left-0 after:w-full after:h-[0.063rem]">
                                    <h2 className="league_price text-2xl  !font-bold font_oswald yellow_grad-bg grad_text-clip">{item.leaguePrice}</h2>
                                </div>
                                <div className="game_intro_v2 bg-no-repeat pl-5">
                                    <div className="game_intro-con flex gap-5 relative bottom-1">
                                        {item.gameIcon}    
                                        <div className="game_intro-con">
                                            <p className='text-xs purple_light font-medium'>Game</p>
                                            <h4 className='text-base !font-bold'>{item.gameName}</h4>    
                                        </div>                
                                    </div>
                                </div>
                                <div className="card_participants_v2 mt-3 relative pl-13  z-40">
                                    <h3 className="part_number text-lg !font-bold leading-tight">{item.partNum}</h3>
                                    <p className='text-xs purple_light font-medium'>Participants</p>
                                </div>
                            </div>
                            <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute' }}>
                                <defs>
                                    <clipPath id="cardclipv2" clipPathUnits="objectBoundingBox">
                                    <path d="
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
                                    " />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                        <div className="game_card--footer !m-0 flex justify-between items-center ">                        
                            <div className="match_date absolute right-[0] bottom-[0.3rem] bg-no-repeat">                    
                                <p className='text-xs purple_light font-medium  text-center'>Ends:</p>               
                                <h2 className="text-[2rem] match_date-con text-[2rem] pt-1 pb-1  text-center !font-extrabold grad_text-clip">{item.Date}</h2>     
                                <p className='text-xs purple_light font-medium  text-center uppercase'>{item.Month}</p>               
                            </div>
                        </div>
                </Link>
            
            ))}
        </div>
        
    );
};

export default GameCardV2;