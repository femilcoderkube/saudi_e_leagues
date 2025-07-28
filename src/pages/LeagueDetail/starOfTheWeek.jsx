import { useSelector } from "react-redux";
import { formatAmountWithCommas, getRandomColor } from "../../utils/constant";
import { getServerURL } from "../../utils/constant";
import mob_star_of_week from "../../assets/images/mob_star_week.png";

// import mob_star_of_week from "../../assets/images/mob-star-week-shape.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ScoreTicker from "../../components/LobbyPageComp/Score_ticker";

const StarOfTheWeek = () => {
  const { starOfTheWeek ,leagueData } = useSelector((state) => state.leagues);
  let starOfTheWeekData = starOfTheWeek?.filter((star) => star?.weeklyUsersData);
  let price = leagueData?.weekOfTheStarPrice

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[30rem] ">
        <Swiper
          navigation={false}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
        >
          {starOfTheWeekData.map((star, index) => (
            <SwiperSlide className="w-full" key={index}>
              <div className="mob-star-week bg-[url(./assets/images/mob-star-week-shape.png)] sm:max-w-[30rem] sm:w-full flex flex-col md:mb-[2.4rem] bg-no-repeat bg-center bg-cover relative p-5 mx-auto md:order-2 order-2">
                <div className="sd_bedge_left-con border-b-1 border-[#7b7ed047] pb-5 mb-6 flex flex-row items-center justify-between gap-4 w-full">
                  <div className="sd_bedge-lable flex gap-2">
                    <img
                      src={mob_star_of_week}
                      alt=""
                      style={{ width: "12.35rem" }}
                    />
                    <span>(WEEK {index +1})</span>
                  </div>
                  <div className="prize-pool">
                      <span className="font-bold text-xl grad_text-clip sm:block hidden">
                        <span className="icon-saudi_riyal !p-0"></span>
                        {formatAmountWithCommas(price)}
                      </span>
                    </div>
                </div>
                <div className="profile-wp flex items-center justify-between gap-3 pb-8">
                  <div className="sd_avtar-info gap-6 inline-flex justify-between sm:pl-6 items-center cursor-pointer text-white rounded">
                    <div className="user_img relative sd_before">
                      {star?.weeklyUsersData?.userId?.profilePic ? (
                        <img
                          src={getServerURL(star?.weeklyUsersData?.userId?.profilePic)}
                          alt=""
                          className="rounded-[3rem]"
                          style={{ width: "3rem", height: "3rem" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "3rem",
                            height: "3rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: getRandomColor(star?.weeklyUsersData?.userId?.username),
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            borderRadius: "50%",
                          }}
                        >
                          {star?.weeklyUsersData?.userId?.username?.charAt(0)?.toUpperCase() ||
                            "?"}
                        </div>
                      )}
                    </div>
                    <div className="use_con text-left flex flex-col gap-1">
                      <span className="text-lg">{star?.weeklyUsersData?.userId?.fullName}</span>
                      <span className="user_id md:text-md text-sm block text-[#87C9F2]">
                        @{star?.weeklyUsersData?.userId?.username}
                      </span>
                    </div>
                  </div>
                  <div className="sd_score--con">
                    <h2 className="text-[1.5rem] !font-extrabold grad_text-clip">
                      {star?.weeklyUsersData?.weeklyScore?.toFixed(2)}
                    </h2>
                  </div>
                </div>
                <ScoreTicker date={star.week} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StarOfTheWeek;
