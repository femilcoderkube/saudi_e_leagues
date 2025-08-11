import React from "react";
import "../../assets/css/Matchmaking.css";
import center_league from "../../assets/images/center_league.png";

export const GamingLoader = () => {
  return (
    <div className="flex gamingLoader justify-center items-center my-auto mt-[40%]">
      <img
                className="center-league-loader absolute left-1/2 top-[19rem]"
                src={center_league}
                alt=""
                style={{ width: "11rem" }}
              />
    </div>
  );
};

export default GamingLoader;
