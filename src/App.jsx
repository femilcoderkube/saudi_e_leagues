import { useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/SideBar/SideBar";
import Main from "./components/MainView/Main";

import "./App.css";
import Lobby from "./pages/Lobby/Lobby.jsx";
import PrimeHome from "./pages/Home/PrimeHome.jsx";
import LeagueDetail from "./pages/League/LeagueDetail.jsx";
import MatchMaking from "./pages/Matches/MatchMacking.jsx";
import LeagueMatchDetail from "./pages/Matches/LeagueMatchDetail.jsx";
import "./i18n";
import { useTranslation } from "react-i18next";
import UserProfilePage from "./pages/UserProfile/UserProfilePage.jsx";
import ResetPasswordPage from "./pages/UserProfile/resetPassword.jsx";
import { items } from "./utils/constant.js";
import TournamentDetail from "./pages/TournamentDetail/TournamentDetail.jsx";
import DraftingDetail from "./pages/DraftingPhase/DraftingDetail.jsx";
import TournamentMatchDetail from "./pages/Matches/TournamentMatchDetail.jsx";
import { setNavigator } from "./Services/navigationService.js";
import { useSelector } from "react-redux";
import {
  requestPermission,
  setupMessageListener,
} from "./Services/NotificationService.js";
import ROUTESPATH from "./Routes/paths.js";
import MobileEvent from "./hooks/mobileevents.js";
import { joinUserRoom } from "./app/socket/socket.js";
import Register from "./pages/TournamentDetail/Register.jsx";
import PartyMatchMaking from "./pages/Matches/PartyMatchMaking.jsx";
import TournamentsTeam from "./pages/TournamentDetail/TournamentsTeam.jsx";
import InviteLink from "./pages/UserProfile/InviteLink.jsx";

function NavigatorSetter() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);
  return null;
}

function App() {
  const { i18n } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  const dir = useMemo(
    () => (i18n.language === "ar" ? "rtl" : "ltr"),
    [i18n.language]
  );

  const newLang = useMemo(
    () => (i18n.language === "en" ? "en" : "ar"),
    [i18n.language]
  );

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.body.setAttribute("dir", dir);
    MobileEvent.onLanguageChange(newLang);
  }, [dir, newLang]);

  useEffect(() => {
    requestPermission();
    setupMessageListener();
    joinUserRoom();
  }, [user]);

  const firstItem = items[0];

  return (
    <>
      <Router>
        <NavigatorSetter />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path={ROUTESPATH.INVITE_LINK} element={<InviteLink />} />
            <Route
              path={ROUTESPATH.RESETPASSWORD}
              element={<ResetPasswordPage />}
            />
            <Route
              path={ROUTESPATH.ROOT}
              element={<Navigate to={`/${firstItem.id}`} />}
            />
            <Route path={ROUTESPATH.HOME} element={<Main />}>
              <Route index element={<PrimeHome />} />
              <Route
                path={ROUTESPATH.MATCHDETAIL}
                element={<LeagueMatchDetail />}
              />
              <Route
                path={ROUTESPATH.MATCHDETAIL_TOURNAMENT}
                element={<TournamentMatchDetail />}
              />
              <Route path={ROUTESPATH.LOBBY} element={<Lobby />} />
              <Route
                path={ROUTESPATH.DRAFTING_DETAIL}
                element={<DraftingDetail />}
              />
              <Route
                path={ROUTESPATH.TOURNAMENT_DETAIL}
                element={<TournamentDetail />}
              />
              <Route
                path={ROUTESPATH.TOURNAMENT_REGISTER}
                element={<Register />}
              />
              <Route
                path={ROUTESPATH.LEAGUE_DETAIL}
                element={<LeagueDetail />}
              />
              <Route
                path={ROUTESPATH.FINDING_MATCH}
                element={<MatchMaking />}
              />
              <Route
                path={ROUTESPATH.FINDING_PARTYMATCH}
                element={<PartyMatchMaking />}
              />
              <Route path={ROUTESPATH.TEAM} element={<TournamentsTeam />} />
              <Route path={ROUTESPATH.PROFILE} element={<UserProfilePage />} />
            </Route>
            <Route path="*" element={<Navigate to={`/${firstItem.id}`} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
