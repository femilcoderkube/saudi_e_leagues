import { useSelector } from "react-redux";
import { formatAmountWithCommas, getRandomColor } from "../../utils/constant";
import { getServerURL } from "../../utils/constant";
import mob_star_of_week from "../../assets/images/mob_star_week.png";
import mob_star_of_week_arabic from "../../assets/images/mob_star_week_arabic.png";

// import mob_star_of_week from "../../assets/images/mob-star-week-shape.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import ScoreTicker from "../../components/LobbyPageComp/Score_ticker";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const StarOfTheWeek = () => {
  const { starOfTheWeek, leagueData } = useSelector((state) => state.leagues);
  let starOfTheWeekData = starOfTheWeek?.filter((star) => star?.weeklyUsersData);
  let price = leagueData?.weekOfTheStarPrice;
  const { t, i18n } = useTranslation();
  useEffect(() => {
    console.log("i18n.language", i18n.language);
  }, [i18n]);


  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-[30rem] md:mb-[2.4rem]">
        <Swiper
          navigation={false}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          pagination={{
            clickable: true,
            el: ".star-week-pagination"
          }}
          modules={[Pagination]}
          initialSlide={starOfTheWeekData.length - 1}
        >
          {starOfTheWeekData.map((star, index) => {
            let isYourPoints = star?.weeklyUsersData?.userId?._id.toString() != star?.requestedUsersScore?.userId.toString()
            return(
            <SwiperSlide className="w-full" key={index}>
              <div className="mob-star-week bg-[url(./assets/images/mob-star-week-shape.png)] sm:max-w-[30rem] sm:w-full flex flex-col bg-no-repeat bg-center bg-cover relative p-5 mx-auto md:order-2 order-2">
                <div className="sd_bedge_left-con border-b-1 border-[#7b7ed047] pb-5 mb-6 flex flex-row items-center justify-between gap-4 w-full">
                  <div className="sd_bedge-lable flex gap-2 items-end">
                    {i18n.language === 'ar' ? (
                      <img className="shining-star-arabic"
                        src={mob_star_of_week_arabic}
                        alt=""
                        style={{ width: "10rem" }}
                      />
                    ) : (
                      <img className="shining-star"
                        src={mob_star_of_week}
                        alt=""
                        style={{ width: "12.35rem" }}
                      />
                    )}
                    <span className="text-sm opacity-70">({t("star_of_the_week.week")} {index + 1})</span>
                  </div>
                  <div className="prize-pool">
                    <span className="font-bold text-xl grad_text-clip sm:block hidden">
                      <span className="icon-saudi_riyal !p-0"></span>
                      {formatAmountWithCommas(price)}
                    </span>
                  </div>
                </div>
                <div className="profile-wp flex items-center justify-between gap-3">
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
                    <div className="use_con ltr:text-left rtl:text-right flex flex-col gap-1">
                      <span className="text-lg">{star?.weeklyUsersData?.userId?.fullName}</span>
                      <span className="user_id md:text-md text-sm block text-[#87C9F2]">
                        @{star?.weeklyUsersData?.userId?.username}
                      </span>
                    </div>
                  </div>
                  <div className="sd_score--con pr-2">
                    <h2 className="text-[1.2rem] !font-extrabold grad_text-clip pb-2 ltr:text-right rtl:text-left">
                      {star?.weeklyUsersData?.weeklyScore?.toString()}
                    </h2>
                    <h2 className="text-[0.75rem] !font-extrabold grad_text-clip">
                      {t("star_of_the_week.points")}
                    </h2>
                  </div>
                </div>
              <div className={`ltr:text-right rtl:text-left pr-2 ${isYourPoints ? "" : "mb-4"}`}>
                  { isYourPoints && <span className="text-sm purple_col">{t("star_of_the_week.your_points")}: {star?.requestedUsersScore?.weeklyScore < 0 ? 0 : star?.requestedUsersScore?.weeklyScore}</span>}
                </div>
                <ScoreTicker date={star.week} />
              </div>
            </SwiperSlide>
            )
          })}
        </Swiper>
        {/* Swiper pagination bullets */}
        <div className="star-week-pagination flex g-3 mt-4 "></div>
      </div>
    </div>
  );
};

export default StarOfTheWeek;
