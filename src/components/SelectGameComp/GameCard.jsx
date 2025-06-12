import React from 'react';
import { Link } from "react-router-dom";
import Valorant_card_bg from "../../assets/images/valorant_card_bg.jpg";
import DotaBG from "../../assets/images/dotaBG.jpg";
import CardTopLeftShap from "../../assets/images/card_top_left-shap.png";
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

const GameCard = () => {
    return(
   
        <div className="game_card--wrapper flex flex-wrap pt-14 gap-[2.188rem]">            
            {GameCardDetail.map((item, index) => (
                <Link key={index} to={item.path} className="game_card_wrap--link relative inline-block">
                    <div className="card_top_left-shap absolute top-0">
                        <img src={CardTopLeftShap} alt="" style={{width:'11.25rem'}} />
                    </div>
                    <div className="card_participants absolute z-40">
                        <h3 className="part_number text-[2rem] !font-bold leading-tight">{item.partNum}</h3>
                        <p className='text-sm purple_light font-medium'>Participants</p>
                    </div>
                    <div className="game_card--body inline-block relative">
                        <div className="game_img--mask sd_before before:w-full before:h-full relative">
                            <div className="game_image">
                                <img src={item.gameImgSrc} alt="" style={{width:'18.5rem'}} />
                            </div>
                            <div className="game_mask--con absolute bottom-0 h-full flex flex-col justify-between">
                                <h2 className="league_price text-[2rem] !font-bold font_oswald yellow_grad-bg grad_text-clip pl-5 pt-5">{item.leaguePrice}</h2>
                                <h3 className="game_label text-[2rem] !font-bold uppercase leading-tight pl-5"> {item.gameLabel} </h3>
                            </div>
                            <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute' }}>
                                <defs>
                                    <clipPath id="cardclip" clipPathUnits="objectBoundingBox">
                                    <path d="
                                        M0.918918918918919 0.5333333333333333
                                        L0.9594594594594594 0.5666666666666667
                                        V1H0
                                        V0.06805555555555555
                                        L0.08108108108108109 0.001388888888888889
                                        L0.918918918918919 0.00012207118055555556
                                        V0.5333333333333333
                                        Z
                                        M1 0.5444444444444444
                                        L0.9594594594594594 0.5111111111111111
                                        V0.2111111111111111
                                        H1
                                        V0.5444444444444444
                                        Z
                                        M1 0
                                        L0.918918918918919 0.00012207118055555556
                                        V0
                                        H1
                                        Z
                                    " />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="game_card--footer relative flex justify-between items-center ">
                        <div className="game_intro bg-no-repeat">
                            <div className="game_intro-con flex gap-5 relative bottom-1">
                                {item.gameIcon}    
                                <div className="game_intro-con">
                                    <p className='text-sm purple_light font-medium'>Game</p>
                                    <h4 className='text-xl !font-bold'>{item.gameName}</h4>    
                                </div>                
                            </div>
                        </div>
                        <div className="match_date relative bg-no-repeat">                    
                            <h2 className="text-[2rem] match_date-con text-[3.25rem] text-right pr-4 !font-extrabold grad_text-clip">{item.Date}</h2>     
                            <p className='text-sm purple_light font-medium text-right pr-4 uppercase'>{item.Month}</p>               
                        </div>
                    </div>
                </Link>
            
            ))}
        </div>
        
    );
};

export default GameCard;