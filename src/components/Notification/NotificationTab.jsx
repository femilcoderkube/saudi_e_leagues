import React from 'react';
import { Tabs,TabPanel } from './TabArray';
import { useTranslation } from 'react-i18next';


const NotificationTab = () => {
  const { t } = useTranslation();
  return (
    
      // ----- Game Tab Content HTML Start ---->
      <Tabs>
        <TabPanel label={t("notification.unread")}/>
        <TabPanel label={t("notification.all")}/>
      </Tabs>
  
  );
};

export default NotificationTab;
