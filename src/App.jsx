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
          <Route path="/" element={<Navigate to="/prime" />} />
          <Route path="/:id" element={<Main selectedItem={selectedItem} />}>
            <Route path="prime" element={<PrimeHome />} />
            <Route path="lobby" element={<Lobby />} />
            <Route path="lobby/:lId" element={<LeagueDetail />} />
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
