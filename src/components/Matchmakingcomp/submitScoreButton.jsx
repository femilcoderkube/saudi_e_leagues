import { Link } from "react-router-dom";

const SubmitScoreBtn = () => {
  return (
    <div className="submit_score-btn btn_polygon--mask inline-flex max-w-[fit-content] justify-center sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
      <Link
        to={"#"}
        className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
      >
        Submit Score
      </Link>
    </div>
  );
};

export default SubmitScoreBtn;
