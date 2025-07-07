import { useState } from "react";
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

function App() {
  const [selectedItem, setSelectedItem] = useState("PrimeHome");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar onItemClick={handleItemClick} selectedItem={selectedItem} />
        <Routes>
          {/* <Route index element={<MainView selectedItem={selectedItem} />} /> */}
          <Route path="/" element={<Navigate to="/prime/lobby" />} />
          {/* Redirect "/:id" to "/:id/lobby" */}
          <Route path="/:id" element={<Navigate to={`/${window.location.pathname.split('/')[1]}/lobby`} replace />} />
          <Route path="/:id" element={<Main selectedItem={selectedItem} />}>
            {/* <Route index element={<PrimeHome />} /> */}
            <Route path="match/:mId" element={<MatchDetail />} />
            <Route path="lobby" element={<Lobby />} />
            <Route path="lobby/:lId" element={<LeagueDetail />} />
            <Route path="lobby/:lId/finding-match" element={<MatchMaking />} />
            {/* Add more routes as needed */}
          </Route>
          <Route path="*" element={<Navigate to="/prime/lobby" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
