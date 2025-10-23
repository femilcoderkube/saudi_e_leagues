import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Twitter, Instagram, discord, Tiktok } from "../ui/svg/index.jsx";
import { items } from "../../utils/constant.js";
import { useTranslation } from "react-i18next";
import RecentMatches from "./RecentMatches.jsx";
import { IMAGES } from "../ui/images/images.js";
import { useState } from "react";

// Update your items array to include dynamic logos for LTR/RTL (assuming you have different images for each item).
// For demonstration, I'm using placeholders. Replace with actual image imports as needed.

const Sidebar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState(null);

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

  // Find active item based on path (assuming dynamic paths like "/prime" or "/schooleleagues")
  const activeItem =
    items.find(
      (item) => location.pathname === item.path.replace(":id", item.id)
    ) || items[0];

  let resetpassword = new Set(window.location.pathname.split("/")).has(
    "resetpassword"
  );

  return (
    <aside
      className={`w-[22.5rem] text-[var(--dark-color)] ${
        resetpassword ? "hidden" : "hidden md:block"
      }`}
    >
      {/* Dynamic logo based on active item */}
      <Link
        to={`/${activeItem.id}`} // Optionally make the logo link to the active item's path
        className="sd_logo flex items-center h-[7.438rem] ltr:justify-start rtl:justify-end rtl:pl-45 bg-cover bg-no-repeat object-center"
      >
        <img
          src={activeItem.logoRtl}
          alt={t("images.prime_logo")}
          className="max-w-[11rem] w-full pr-5 h-auto ltr:hidden"
        />
        <img
          src={activeItem.logoLtr}
          alt={t("images.prime_logo")}
          className="max-w-[11rem] h-auto pl-5 w-full rtl:hidden"
        />
      </Link>

      {/* Add navigation menu for items dynamically */}

      <div className="aside_bottom-block custom_scroll flex w-[calc(100%-40px)]">
        <div className="sd_social--block flex flex-col w-full pb-6">
          <nav className="flex-1 overflow-y-auto custom_scroll">
            <ul>
              {items.map((item) => {
                const isHovered = hoveredItem === item.name;
                const isActive = activeItem?.name === item.name;

                return (
                  <li key={item.name}>
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
                                backgroundImage: `url(${IMAGES.aside_hover})`,
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
          </nav>
          {/* <RecentMatches /> */}

          <div className="mt-auto">
            <img
              src={IMAGES.follwers}
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
              <img
                className="h-16"
                src={i18n.language == "en" ? IMAGES.SEF_ENG : IMAGES.SEF_AR}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
