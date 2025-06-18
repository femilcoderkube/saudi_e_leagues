import React from "react";
import "./loader.css";

const GamingLoader = () => {
  return (
    <div className="flex gamingLoader justify-center items-center my-auto mt-[40%]">
      <div className="container">
        <div className="holder">
          <div className="box"></div>
        </div>
        <div className="holder">
          <div className="box"></div>
        </div>
        <div className="holder">
          <div className="box"></div>
        </div>
      </div>
    </div>
  );
};

export default GamingLoader;
