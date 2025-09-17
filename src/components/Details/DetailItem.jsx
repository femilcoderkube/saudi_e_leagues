import React from "react";
import { getServerURL } from "../../utils/constant";
import { IMAGES } from "../ui/images/images";

const DetailItem = ({ logo, name, title, type = 0 }) => {
  if (type === 1) {
    name = `${name || 1}v${name || 1}`;
  }
  return (
      <div className="sd_game-con sd_platform--info relative sd_before sd_after polygon_border cursor-default">
        <div className="game_polygon-link justify-center items-center flex relative sd_before sd_after vertical_center">
          <img
            src={type == 0 ? getServerURL(logo || "") : logo}
            alt=""
            className="absolute left-8"
            style={{ width: "3rem" }}
            loading="lazy"
          />
          <div className="sd_game--con text-center">
            <p className="text-sm md:text-base mb-2 purple_col font-medium">
              {title}
            </p>
            <h4 className="text-lg md:text-xl font-bold">{name || ""}</h4>
          </div>
        </div>
      </div>      
  );
};

export default DetailItem;
