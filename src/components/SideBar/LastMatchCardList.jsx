import { useSelector } from "react-redux";
import call_vs from "../../assets/images/call-vs.png";import { getServerURL } from "../../utils/constant";
import call_duty_bg from "../../assets/images/call-duty-bg.png";
import { useNavigate, useParams } from "react-router-dom";

const LastMatchCardList = () => {
    let {id} = useParams();
    console.log("params---------------",id);
    const navigate = useNavigate();
    const { lastMatchs } = useSelector((state) => state.notification);




  return (
    <div className="call-duty-card-wp flex flex-col gap-8 2xl:w-[calc(100%-58px)] w-[calc(100%-40px)] mx-7.5 mt-7.5 mb-5">
            {lastMatchs.map((match) => (
            <div className="call-duty-card rounded-xl cursor-pointer"
            onClick={()=>{
                navigate(`${id}/match/${match.matchId}`);
            }}
            >
              <div className="call-duty-head flex items-center justify-between gap-1  p-2.5">
                <div className="call-duty-text flex items-center gap-3.5">
                  <img src={(getServerURL(match.game.logo))} alt="" className="w-6 h-6" />
                  <span className="font-bold">{match.game.name}</span>
                </div>
                <div className="call-duty-btn">
                  <button
                    className={`text-sm font-bold rounded-lg px-4 py-2 ${match.isWinner ? "" : "lose-btn"}`}
                    type="button"
                  >
                    {match.isWinner ? "Win" : "Lose"}
                  </button>
                </div>
              </div>
              <div
                className="call-duty-bg flex items-center gap-1.5 justify-center"
                style={{
                  background: `url(${call_duty_bg})`,
                  backgroundSize: "contain",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h2 className="grad_text-clip text-[2rem] font-oswald">{match.teamOneScore}</h2>
                <img src={call_vs} alt="" />
                <h2 className="grad_text-clip text-[2rem] font-oswald">{match.teamTwoScore}</h2>
              </div>
              <div className="text-center pb-3">
                <p className="text-[#BCC6E0] font-semibold">
                  {new Date(match.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            ))}
           
          </div>
  );
};

export default LastMatchCardList;