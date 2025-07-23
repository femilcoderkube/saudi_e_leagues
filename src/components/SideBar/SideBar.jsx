import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "../../assets/css/aside.css";
import asideLogo_rtl from "../../assets/images/logo-rtl.svg";
import asideLogo_ltr from "../../assets/images/logo-lrt.svg";
import SEF_ENG from "../../assets/images/SEF_ENG.svg";
import SEF_AR from "../../assets/images/SEF_AR.svg";
import follwers from "../../assets/images/Follow_Us.png";
import { Link } from "react-router-dom";
import { Twitter, Instagram, discord, Tiktok } from "../ui/svg/index.jsx";
import { items } from "../../utils/constant.js";
import { useTranslation } from "react-i18next";


const Sidebar = ({ onItemClick }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const { t , i18n} = useTranslation();

  const social_links = [
    {
      name: t("social.twitter"),
      path: "https://x.com/primeeleague_",
      Icon: Twitter,
    },
    {
      name: t("social.instagram"),
      path: "https://www.instagram.com/primeeleague_ ",
      Icon: Instagram,
    },
    {
      name: t("social.discord"),
      path: "https://discord.gg/YrxDPPp9gx",
      Icon: discord,
    },
    {
      name: t("social.tiktok"),
      path: "https://www.tiktok.com/@primeeleague_",
      Icon: Tiktok,
    },
  ];

  // Get current item name based on the path
  const getActiveItem = () => {
    const found = items.find((item) => item.path === location.pathname);
    return found ? found.name : items[0].name;
  };

  const activeItem = getActiveItem();
  let resetpassword = new Set(window.location.pathname.split("/")).has("resetpassword");
  
  return (
    <aside className={`w-[22.5rem] text-white ${resetpassword ? "hidden" : "hidden md:block"}`}>
      <Link
        to={"/"}
        className="sd_logo flex items-center h-[7.438rem] ltr:justify-start rtl:justify-end rtl:pl-16 bg-[url(./assets/images/logo-background.svg)] bg-cover bg-no-repeat object-center"
      >
        <img
          src={asideLogo_rtl}
          alt={t("images.prime_logo")}
          className="max-w-[11rem] w-full pr-5 h-auto ltr:hidden"
        />
        <img
          src={asideLogo_ltr}
          alt={t("images.prime_logo")}
          className="max-w-[11rem] h-auto pl-5 w-full rtl:hidden"
        />

        <span className="text-xl font-bold text-black ltr:ml-[16px] rtl:mr-[16px] bg-[#3ECCF3] px-3 rounded-[10px] min-h-[1.75rem] min-w-[4.063rem]">
          {t("common.beta")}
        </span>
      </Link>

      <div className="aside_bottom-block custom_scroll flex w-[calc(100%-40px)]">
        {/* === Sidebar navlink Block Start === */}
        {/* <ul className="sd_nav--link mb-10">
          {items.map((item) => {
            const isHovered = hoveredItem === item.name;
            const isActive = activeItem === item.name;

            return (
              <li key={item.name}>
                <div
                  className={`aside_link-con relative ${
                    isActive ? "active" : ""
                  }`}
                >
                  <NavLink
                    to={item?.id ? `/${item.id}/lobby` : item.path}
                    className="aside_link block px-5 py-8 rounded flex items-center gap-3 relative border-b border-[#131645] bg-opacity-5"
                    style={
                      isHovered || isActive
                        ? {
                            backgroundImage: `url(${aside_hover})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right -8.3rem center",
                            backgroundSize: "cover",
                          }
                        : {}
                    }
                    onClick={() => onItemClick(item.name)}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <img
                      src={
                        (isHovered || isActive) && item.hoverSrc
                          ? item.hoverSrc
                          : item.src
                      }
                      style={{ width: "2.5rem" }}
                      alt=""
                    />
                    <span className="ml-3 text-xl font_oswald font-medium">
                      {item.name}
                    </span>
                  </NavLink>
                </div>
              </li>
            );
          })}
        </ul> */}
        {/* 
        <Link
          to={"/admin-control/partners"}
          className="block hover:opacity-70 duration-400"
        >
          <span className="ml-2 px-6 py-3 block text-xl font_oswald purple_col font-medium">
            Contact Us
          </span>
        </Link> */}
        {/* <Link
          to={"/admin-control/partners"}
          className="block hover:opacity-70 duration-400"
        >
          <span className="ml-2 px-6 py-3 block text-xl font_oswald purple_col font-medium">
            Privacy Policy
          </span>
        </Link> */}

        {/* === Social Links Block Start === */}
        <div className="sd_social--block flex flex-col mt-auto w-full pb-6">
          {/* <h2 className="text-[2rem] font_oswald max-w-full px-8 tracking-wide uppercase">
            Follow Us
          </h2> */}
          <img
            src={follwers}
            alt={t("images.follow_us")}
            className="h-7 max-w-max ltr:ml-10 rtl:mr-10 object-contain"
          />
          <ul className="sd_social--links flex gap-4 justify-center self-center flex-wrap ">
            {social_links.map(({ name, path, Icon }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className="inline-block p-[0.375rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg"
                  target="_blank"
                >
                  <Icon />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center mt-4">
            <img className="h-16" src={ i18n.language == "en" ? SEF_ENG : SEF_AR} alt="" />            
          </div>
        </div>

        {/* === Collapse Menu Button Start === */}
        {/* <div className="btn_polygon--mask flex justify-center my-8 sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
          <Link
            to={"#"}
            className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
          >
            Collapse Menu
          </Link>
        </div> */}
      </div>
      {/* <svg
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
      </svg> */}
    </aside>
  );
};

export default Sidebar;
