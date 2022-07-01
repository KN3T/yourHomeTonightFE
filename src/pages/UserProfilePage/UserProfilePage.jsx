import { Radio, Tabs } from 'antd';
import React from 'react';
import { useState } from 'react';

import UserProfileAccount from '../UserProfileAccount/UserProfileAccount';
import './UserProfilePage.scss';

const { TabPane } = Tabs;
const onChange = (key) => {
  console.log(key);
};
const UserProfilePage = () => {
  const [size, setSize] = useState('small');

  const onChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <div className="hotelpage__container">
      <div className="user_profile">
        <Tabs
          defaultActiveKey="2"
          size={size}
          style={{
            marginBottom: 32,
          }}
        >
          <TabPane tab="My Trips" key="1"></TabPane>
          <TabPane tab="My Account" key="2">
            <div className="user_profile_banner">
              <img
                className="user_profile_bg"
                width="100%"
                height={300}
                src="https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/04/dest_usa_california_venice-beach_skate-park_gettyimages-495523864_kayak_within-usage-period_27806-1920x600.jpg"
              />
            </div>
          </TabPane>
          <TabPane tab="VIP Dashboard" key="3"></TabPane>
        </Tabs>
        <Tabs defaultActiveKey="1" type="card" size={size}>
          <TabPane tab="Personal Info" key="1">
            <UserProfileAccount />
          </TabPane>
          <TabPane tab="Sign In & Security" key="2"></TabPane>
          <TabPane tab="Payment Info" key="3"></TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
