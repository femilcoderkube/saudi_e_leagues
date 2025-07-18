import { Link } from "react-router-dom";

const ViewScoreBtn = ({ onClick }) => {
  return (
    <div className="submit_score-btn btn_polygon--mask inline-flex max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
      <Link
        to={"#"}
        onClick={onClick}
        className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
      >
        View Score
      </Link>
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
  );
};

export default ViewScoreBtn;
