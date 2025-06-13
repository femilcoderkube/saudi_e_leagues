import React from 'react';
import { Tabs,TabPanel } from './TabArray';
import GameCard from './GameCard';
import GameCardV2 from './GameCardV2';

const GameTab = () => {
  return (
    
      // ----- Game Tab Content HTML Start ---->
      <Tabs>
        <TabPanel label="Ongoing">
          {/* <GameCard /> */}
          <GameCardV2 />

        </TabPanel>

        <TabPanel label="Finished">
          <section className="">
            <h2 className="text-xl font-semibold mb-4">👥 User List</h2>
            <ul className="space-y-2">
              <li className="p-3 border rounded">User A</li>
              <li className="p-3 border rounded">User B</li>
            </ul>
          </section>
        </TabPanel>

        <TabPanel label="All">
          <section className="">
            <h2 className="text-xl font-semibold mb-4">⚙️ Settings</h2>
            <form className="space-y-4">
              <input className="w-full px-3 py-2 border rounded" placeholder="Setting input" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </form>
          </section>
        </TabPanel>
      </Tabs>
  
  );
};

export default GameTab;
