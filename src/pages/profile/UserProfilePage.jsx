import { Link, useNavigate, useParams } from "react-router-dom";
import useScreenSize from "../../utils/screenUtils";
import { useEffect } from "react";
import {
  setActiveTabIndex,
  setConfirmationPopUp,
  setProfileVisible,
} from "../../app/slices/constState/constStateSlice";
import { useDispatch, useSelector } from "react-redux";
import mobile_menu_icon_user from "../../assets/images/LoginPersone.png";
import logOut from "../../assets/images/logOut.png";
import deleteIcon from "../../assets/images/delete-account-icon.png";
import { getServerURL } from "../../utils/constant";
import { useTranslation } from "react-i18next";
import {
  clearDeleteAccountState,
  deleteAccount,
  deleteFcmToken,
  logout,
} from "../../app/slices/auth/authSlice";
import ConfirmationPopUp from "../../components/ModalPopUp/confirmationPopUp";
import { getUpdateToken } from "../../app/socket/socket";

const UserProfilePage = () => {
  const { id } = useParams();
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.user);
  const userUpdate = useSelector((state) => state.auth.user);
  const deviceType = localStorage.getItem("deviceType");

  let user = userUpdate ? userUpdate : userdata;
  const { t } = useTranslation();

  useEffect(() => {
    console.log("azsdfasfas-------", screenSize);
    if (screenSize > 768) {
      navigate(`/${id}/lobby`);
      dispatch(setActiveTabIndex(0));
    }
  }, [screenSize]);

  const handleDeleteAccount = () => {
    try {
      dispatch(deleteAccount());
      dispatch(clearDeleteAccountState());
      dispatch(setActiveTabIndex(0));
      navigate(`/${id}/lobby`);
      let type = localStorage.getItem("deviceType");
      if (type == "mobile") {
        window.AndroidInterface?.androidLogoutCallbackHandler("success");
        window.webkit?.messageHandlers?.iosLogoutCallbackHandler?.postMessage(
          "success"
        );
        localStorage.removeItem("deviceType");
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const handleLogout = () => {
    try {
      dispatch(deleteFcmToken());
      getUpdateToken("");
      dispatch(setConfirmationPopUp(0));
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(setActiveTabIndex(0));
      navigate(`/${id}/lobby`);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <main className="flex-1 lobby_page--wrapper">
      <div className="dropdown relative prof-drop">
        <div className="dropdown-header gap-6 p-3 pb-5 mt-3 flex items-center cursor-pointer text-white border-b border-[#7b7ed0] ">
          <div className="user_img  relative sd_before ">
            <img
              src={getServerURL(user?.profilePicture)}
              alt={t("images.user_avatar")}
              className="rounded-[3rem]"
              style={{ width: "3rem", height: "3rem" }}
            />
          </div>
          <div className="use_con flex flex-col gap-1">
            <span className="text-lg">{user?.firstName}</span>
            <span className=" text-md block purple_col">@{user?.username}</span>
          </div>
        </div>
      </div>
      <div className="flex-col gap-2">
        <ul className="flex flex-col gap-6 pt-8 ltr:pl-5 rtl:pr-5">
          <li
            className="text-lg purple_col flex gap-2 cursor-pointer"
            onClick={() => {
              dispatch(setProfileVisible(true));
            }}
          >
            <img className="w-6 h-6" src={mobile_menu_icon_user} alt="user" />
            {t("auth.edit_profile")}
          </li>

          {deviceType == "mobile" && (
            <li
              className="text-lg purple_col flex gap-2 cursor-pointer"
              onClick={() => {
                dispatch(setConfirmationPopUp(4));
              }}
            >
              <img className="w-6 h-6" src={deleteIcon} alt="user" />
              {t("auth.delete_account")}
            </li>
          )}

          <li
            className="text-lg purple_col flex gap-2 cursor-pointer"
            onClick={() => {
              dispatch(setConfirmationPopUp(1));
            }}
          >
            <img className="w-6 h-6" src={logOut} alt="user" />
            {t("auth.logout")}
          </li>

          <ConfirmationPopUp
            onDeleteAccount={handleDeleteAccount}
            onLogout={handleLogout}
          />
        </ul>
      </div>
    </main>
  );
};

export default UserProfilePage;

// Returns true if user is able to join queue (when getQueueText returns "QUEUE"), else false
