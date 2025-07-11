import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../app/slices/constState/constStateSlice";
import join_btn from "../../assets/images/join_btn.png";
import need_btn from "../../assets/images/needToLogin.png";
import Que_btn from "../../assets/images/quebtn.png";
import Open_btn from "../../assets/images/open.png";
import Cancel_btn from "../../assets/images/cancelbtn.png";
import { setRegistrationModal } from "../../app/slices/leagueDetail/leagueDetailSlice";
import { getQueueText } from "../../utils/constant";
import { stopReadyToPlaySocket } from "../../app/socket/socket";
import { Link, useParams } from "react-router-dom";

const GetQueueButton = () => {
  const { id } = useParams();
  const { leagueData, isJoinedUser, isQueueUser } = useSelector(
    (state) => state.leagues
  );
  const isSocketConnected = useSelector((state) => state.socket.isConnected);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const now = new Date();
  const end = new Date(leagueData?.endDate);

  if (user?._id == null || user?._id == undefined) {
    return (
      <div
        className=" lobby_btn mb-8 relative cursor-pointer flex items-center justify-center md:justify-start"
        onClick={() => {
          dispatch(setLogin(true));
        }}
      >
        {" "}
        <img src={need_btn} alt="" style={{ width: "30.5rem" }} />{" "}
      </div>
    );
  } else if (end < now) {
    return (
      <div className="mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-not-allowed">
        <span
          className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
          style={{
            fontFamily: "Yapari",
            textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {"LEAGUE ENDED"}
        </span>
        <img className="mx-auto" src={Que_btn} alt="" style={{ width: "30.5rem" }} />{" "}
      </div>
    );
  } else if (!isJoinedUser) {
    return (
      <div
        onClick={() => dispatch(setRegistrationModal(true))}
        className="join_btn hover:opacity-60 duration-300 mb-8 block sd_before relative cursor-pointer"
      >
        <img src={join_btn} alt="" style={{ width: "30.5rem" }} />
      </div>
    );
  } else if (isQueueUser) {
    return (
      <div
        className="mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-pointer"
        onClick={() => {
          stopReadyToPlaySocket({
            lId: leagueData?._id,
            user,
            isSocketConnected,
          });
        }}
      >
        <img className="mx-auto" src={Cancel_btn} alt="" style={{ width: "30.5rem" }} />{" "}
      </div>
    );
  } else {
    let text = getQueueText(leagueData);
    if (
      leagueData.isMatchJoind != null ||
      leagueData.isMatchJoind != undefined
    ) {
      return (
        <Link
          className="mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before"
          to={`/${id}/match/${leagueData?.isMatchJoind}`}
        >
          <span
            className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
            style={{
              fontFamily: "Yapari",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {"VIEW MATCH"}
          </span>
          <img className="mx-auto" src={Que_btn} alt="" style={{ width: "30.5rem" }} />{" "}
        </Link>
      );
    } else if (text == "QUEUE") {
      return (
        <Link
          className="mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before"
          to={`/${id}/lobby/${leagueData?._id}/finding-match`}
        >
          <span
            className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
            style={{
              fontFamily: "Yapari",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {text}
          </span>
          <img className="mx-auto" src={Que_btn} alt="" style={{ width: "30.5rem" }} />{" "}
        </Link>
      );
    } else {
      let text = getQueueText(leagueData);
      return (
        <div className="mb-8 relative que_btn hover:opacity-60 duration-300 block sd_before cursor-not-allowed">
          <span
            className="absolute top-[2.5rem] left-0 w-full text-center text-xl sm:text-3xl"
            style={{
              fontFamily: "Yapari",
              textShadow: "0px 3px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            {getQueueText(leagueData)}
          </span>
          {/* <img src={Que_btn} alt="" style={{ width: "30.5rem" }} />{" "} */}
          <img className="mx-auto"
            src={text.includes("OPEN") ? Open_btn : Que_btn}
            alt=""
            style={{ width: "30.5rem" }}
          />{" "}
        </div>
      );
    }
  }
};
export default GetQueueButton;
