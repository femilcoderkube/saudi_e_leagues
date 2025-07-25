import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/SideBar/SideBar";
import Main from "./components/MainView/Main";

// import MainView from "./components/MainView/MainView";
// import MainView from "./components/MainView/SelectGame.jsx";
// import Main from "./components/MainView/WizardForm.jsx";

import "./App.css";
import Lobby from "./pages/Lobby/Lobby.jsx";
import PrimeHome from "./pages/Home/PrimeHome.jsx";
import LeagueDetail from "./pages/LeagueDetail/LeagueDetail.jsx";
import MatchMaking from "./pages/Matchs/MatchMacking.jsx";
import MatchDetail from "./pages/Matchs/MatchDetail.jsx";
import "./i18n";
import { useTranslation } from "react-i18next";
import UserProfilePage from "./pages/profile/UserProfilePage.jsx";
import ResetPasswordPage from "./pages/profile/resetPassword.jsx";
import { items } from "./utils/constant.js";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.body.setAttribute("dir", dir); // for extra safety
  }, [i18n.language]);

  const [selectedItem, setSelectedItem] = useState("PrimeHome");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const firstItem = items[0];

  return (
    <Router>
      <div className="flex">
        <Sidebar onItemClick={handleItemClick} selectedItem={selectedItem} />
        <Routes>
          <Route path="reset-password" element={<ResetPasswordPage />} />
          {/* <Route index element={<MainView selectedItem={selectedItem} />} /> */}
          <Route path="/" element={<Navigate to={`/${firstItem.id}`} />} />
          {/* Redirect "/:id" to "/:id/lobby" */}
          {/* <Route path="/:id" element={<Navigate to={`/${window.location.pathname.split('/')[1]}/lobby`} replace />} /> */}
          <Route path="/:id" element={<Main selectedItem={selectedItem} />}>
            <Route index element={<PrimeHome />} />
            <Route path="match/:mId" element={<MatchDetail />} />
            <Route path="lobby" element={<Lobby />} />
            <Route path="lobby/:lId" element={<LeagueDetail />} />
            <Route path="lobby/:lId/finding-match" element={<MatchMaking />} />
            <Route path="profile" element={<UserProfilePage />} />
            {/* Add more routes as needed */}
          </Route>
          <Route path="*" element={<Navigate to={`/${firstItem.id}`} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
