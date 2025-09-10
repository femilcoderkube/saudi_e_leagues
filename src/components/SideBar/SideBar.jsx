import { NavLink, useLocation } from "react-router-dom";
import "../../assets/css/aside.css";

import { Link } from "react-router-dom";
import { Twitter, Instagram, discord, Tiktok } from "../ui/svg/index.jsx";
import { items } from "../../utils/constant.js";
import { useTranslation } from "react-i18next";
import RecentMatches from "./RecentMatches.jsx";
import { IMAGES } from "../ui/images/images.js";

const Sidebar = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

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
  let resetpassword = new Set(window.location.pathname.split("/")).has(
    "resetpassword"
  );

  return (
    <aside
      className={`w-[22.5rem] text-white ${
        resetpassword ? "hidden" : "hidden md:block"
      }`}
    >
      <Link
        to={"/"}
        className="sd_logo flex items-center h-[7.438rem] ltr:justify-start rtl:justify-end rtl:pl-45 bg-[url(./assets/images/logo-background.svg)] bg-cover bg-no-repeat object-center"
      >
        <img
          src={IMAGES.asideLogo_rtl}
          alt={t("images.prime_logo")}
          className="max-w-[11rem] w-full pr-5 h-auto ltr:hidden"
        />
        <img
          src={IMAGES.asideLogo_ltr}
          alt={t("images.prime_logo")}
          className="max-w-[11rem] h-auto pl-5 w-full rtl:hidden"
        />
      </Link>

      <div className="aside_bottom-block custom_scroll flex w-[calc(100%-40px)]">
        <div className="sd_social--block flex flex-col w-full pb-6">
          <RecentMatches />

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
