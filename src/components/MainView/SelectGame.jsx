import Header from "../Header/Header";
import SelectGame from "../SelectGameComp/GameMenu.jsx";
import GameTab from "../SelectGameComp/GameTab";
import { Link } from "react-router-dom";
import { ListView , FolderView } from "../ui/svg/index.jsx";

const MainView = ({ selectedItem }) => {
  return (
    <div className="flex-1 flex flex-col sd_main-content ml-[-2.5rem] relative bg-[#020326] rounded-l-[2.5rem] z-20">
      <Header selectedItem={selectedItem} />
      <main className="flex-1 px-[4.5rem] game_card_main--con border-t border-[#7b7ed02e] mt-5 pt-7">

        {/* --- dashboard main content back groud --- */}
        <div className="main_con--bg absolute top-0 left-0 w-full h-full bg-no-repeat" style={{backgroundSize:'100rem'}}></div>
        {/* <Outlet /> */}

       <div className="sd_slect_game--wrapper relative">
          <div className="select_game-header flex items-center justify-between">

            {/* --- Select Game Dropdown HTML Start --- */}
            <SelectGame />
            
            {/* Select Game List or Folder View Button HTML */}
            <div className="game_list--view flex sd_radial-bg items-center rounded-xl p-2">
              <Link to='#' className="inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400">
                <ListView />
              </Link>
              <Link to='#' className="inline-block p-[0.75rem] rounded-lg hover:opacity-70 duration-400 active">                
                <FolderView />
              </Link>
            </div>
          </div>

            {/* --- Game Staus Tabs HTML Start --- */}
            <GameTab />
       </div>

      </main>      
    </div>
  );
};

export default MainView;