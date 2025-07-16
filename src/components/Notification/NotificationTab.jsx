import React from 'react';
import { Tabs,TabPanel } from './TabArray';


const NotificationTab = () => {
  return (
    
      // ----- Game Tab Content HTML Start ---->
      <Tabs>
        <TabPanel label="sdf">

        </TabPanel>

        <TabPanel label="fgd">
          <section className="">
            <h2 className="text-xl font-semibold mb-4">👥 User List</h2>
            <ul className="space-y-2">
              <li className="p-3 border rounded">User A</li>
              <li className="p-3 border rounded">User B</li>
            </ul>
          </section>
        </TabPanel>


      </Tabs>
  
  );
};

export default NotificationTab;
