import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/SideBar";
import Main from "./components/MainView/Main";
// import MainView from "./components/MainView/MainView";
// import MainView from "./components/MainView/SelectGame.jsx";
// import MainView from "./components/MainView/WizardForm.jsx";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import "./App.css";
import Lobby from "./pages/Lobby/Lobby.jsx";
import PrimeHome from "./pages/Home/PrimeHome.jsx";

function App() {
  const [selectedItem, setSelectedItem] = useState("Home");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar onItemClick={handleItemClick} selectedItem={selectedItem} />
        <Routes>
          <Route path="/:id" element={<Main selectedItem={selectedItem} />}>
            <Route index element={<PrimeHome />} />
            <Route path="lobby" element={<Lobby />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
