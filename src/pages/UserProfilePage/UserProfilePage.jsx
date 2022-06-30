import { Tabs } from 'antd';
import React from 'react';

import UserProfileAccount from '../UserProfileAccount/UserProfileAccount';
import './UserProfilePage.scss';

const { TabPane } = Tabs;
const onChange = (key) => {
  console.log(key);
};
const UserProfilePage = () => {
  return (
    <div className="ctn">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab=" My Trips" key="1">
          My Trips
        </TabPane>
        <TabPane tab="My Account" key="2">
          <UserProfileAccount />
        </TabPane>
        <TabPane tab="VIP Dashboard" key="3">
          VIP Dashboard
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
