import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const MainView = ({ selectedItem }) => {
  return (
    <div className="flex-1 flex flex-col">
      <Header selectedItem={selectedItem} />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainView;
