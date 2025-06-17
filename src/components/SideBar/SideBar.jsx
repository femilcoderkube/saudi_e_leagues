import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "../../assets/css/aside.css";
import asideLogo from "../../assets/images/aside_logo.png";
import aside_hover from "../../assets/images/aside_hover.png";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Youtube, Tiktok } from "../ui/svg/index.jsx";
import { items } from "../../utils/constant.js";

const Sidebar = ({ onItemClick }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const social_links = [
    { name: "Twitter", path: "#twitter", Icon: Twitter },
    { name: "Instagram", path: "#insta", Icon: Instagram },
    { name: "YouTube", path: "#youtube", Icon: Youtube },
    { name: "TikTok", path: "#tiktok", Icon: Tiktok },
  ];

  // Get current item name based on the path
  const getActiveItem = () => {
    const found = items.find((item) => item.path === location.pathname);
    return found ? found.name : items[0].name;
  };

  const activeItem = getActiveItem();

  return (
    <aside className="w-[22.5rem] text-white">
      <Link
        to={"/admin-control/partners"}
        className="sd_logo"
        style={{ height: "7.438rem", display: "block" }}
      >
        <img
          src={asideLogo}
          alt=""
          className="max-w-[initial] object-cover w-full"
        />
      </Link>

      <div className="aside_bottom-block w-[20rem] custom_scroll">
        {/* === Sidebar navlink Block Start === */}
        <ul className="sd_nav--link mb-10">
          {items.map((item) => {
            const isHovered = hoveredItem === item.name;
            const isActive = activeItem === item.name;

            return (
              <li key={item.name}>
                {/* ✅ Active class only on this div */}
                <div
                  className={`aside_link-con relative ${
                    isActive ? "active" : ""
                  }`}
                >
                  <NavLink
                    to={item?.id ? `/${item.id}` : item.path}
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
        </ul>

        <Link
          to={"/admin-control/partners"}
          className="block hover:opacity-70 duration-400"
        >
          <span className="ml-2 px-6 py-3 block text-xl font_oswald purple_col font-medium">
            Contact Us
          </span>
        </Link>
        <Link
          to={"/admin-control/partners"}
          className="block hover:opacity-70 duration-400"
        >
          <span className="ml-2 px-6 py-3 block text-xl font_oswald purple_col font-medium">
            Privacy Policy
          </span>
        </Link>

        {/* === Social Links Block Start === */}
        <div className="sd_social--block flex flex-col mt-[6rem] border-b border-[#131645] pb-6">
          <h2 className="text-[2rem] font_oswald max-w-full px-8 tracking-wide uppercase">
            Follow Us
          </h2>
          <ul className="sd_social--links flex gap-4 justify-center self-center flex-wrap ">
            {social_links.map(({ name, path, Icon }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className="inline-block p-[0.375rem] rounded-xl hover:opacity-70 duration-400 sd_radial-bg"
                >
                  <Icon />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* === Collapse Menu Button Start === */}
        <div className="btn_polygon--mask flex justify-center my-8 sd_before sd_after relative polygon_border hover:opacity-70 duration-400">
          <Link
            to={"#"}
            className="btn_polygon-link font_oswald font-medium  relative sd_before sd_after vertical_center"
          >
            Collapse Menu
          </Link>
        </div>
      </div>
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
    </aside>
  );
};

export default Sidebar;
