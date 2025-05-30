import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/SideBar";
import MainView from "./components/MainView/MainView";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import "./App.css";

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
          <Route path="/" element={<MainView selectedItem={selectedItem} />}>
            <Route index element={<HomePage />} />
            <Route path="item1" element={<ItemPage title="Item 1" />} />
            <Route path="item2" element={<ItemPage title="Item 2" />} />
            <Route path="item3" element={<ItemPage title="Item 3" />} />
            <Route path="item4" element={<ItemPage title="Item 4" />} />
            <Route path="item5" element={<ItemPage title="Item 5" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
