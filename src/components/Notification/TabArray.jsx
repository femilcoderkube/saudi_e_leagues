import React, { useState, Children } from 'react';

export const Tabs = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = Children.toArray(children);

  return (
    <div className="game_status_tab--wrap">
      {/* Tab Headers */}
      <div className="game_status--tab rounded-xl overflow-hidden absolute top-1 right-32 inline-flex mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`py-2 px-4 text-xl font-medium transition-all sd_after sd_before relative font_oswald hover:opacity-70 duration-300
              ${activeIndex === index ? 'active-tab hover:opacity-100 polygon_border' : 'inactive-tab'}
            `}
            style={{ width: '10rem', height: '4rem' }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="active_game--tab">
        {tabs[activeIndex]}
      </div>
    </div>
  );
};

export const TabPanel = ({ children }) => {
  return <div className="sd_tab_cont--wrap pb-10">{children}</div>;
};
