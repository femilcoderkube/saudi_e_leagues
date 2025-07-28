import tournament_thumbnail from "../../assets/images/tournament_thumbnail.png";    
import tournament_vs_icon from "../../assets/images/tournament_vs_icon.png";
import tournament_bg_img from "../../assets/images/tournament_bg_img.jpg";

const TournamentScheduleCard = () => {
    return (
       
            <div className="tournament-schedule-card-wrapper bg-white rounded-2xl overflow-hidden">
                <div className="tournament-schedule-card-header flex justify-between items-center p-4 md:p-8 relative">
                    <img src={tournament_bg_img} alt="tournament-schedule" className="w-full h-full object-cover absolute top-0 left-0 z-0 opacity-4 "  />
                    <div className="tournament-schedule-card-header-background w-full h-full object-cover absolute top-0 left-0 z-0 opacity-10 "> </div>
                    <div className="tournament-schedule-card-header-time absolute top-0 left-0 z-10 w-full flex items-center justify-center ">
                        <h2 className="text-base md:text-[1.4rem] font-bold bg-black/50 px-4 py-2 rounded-bl-xl rounded-br-xl">10:00 pm</h2>
                    </div>
                    <div className="tournament-schedule-card-header-left flex items-center gap-4 md:gap-8 relative z-10">
                        <div className="w-[6rem] h-[6rem] rounded-lg overflow-hidden">
                            <img src={tournament_thumbnail} alt="tournament-schedule" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-3xl font-bold font_oswald text-white">0</h2>
                    </div>
                    <div className="tournament-schedule-card-header-right flex items-center gap-4 md:gap-8 relative z-10">
                        <h2 className="text-3xl  font-bold text-white font_oswald">1</h2>
                        <div className="w-[6rem] h-[6rem] rounded-lg overflow-hidden">
                            <img src={tournament_thumbnail} alt="tournament-schedule" className="w-full h-full object-cover" />
                        </div>
                        
                    </div>
                </div>
                <div className="tournament-schedule-card-footer flex justify-between items-center h-[3rem] md:h-[5rem] px-4 md:px-8 py-4 overflow-hidden">
                    <div className="tournament-schedule-card-footer-left">
                        <h2 className="text-base md:text-xl font-bold">Warriors Squad</h2>
                    </div>
                    <div className="tournament-schedule-card-footer-center w-[2rem] md:w-[3rem]">
                        <img src={tournament_vs_icon} alt="tournament-schedule" className="mix-blend-luminosity"/>
                    </div>
                    <div className="tournament-schedule-card-footer-right text-right">
                        <h2 className="text-base md:text-xl font-bold">Quasar eSport</h2>
                    </div>
                </div>
            </div>
      
    )
}

export default TournamentScheduleCard;