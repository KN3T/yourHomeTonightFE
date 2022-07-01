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
      <div>
        <Tabs
          defaultActiveKey="1"
          size={size}
          style={{
            marginBottom: 32,
          }}
        >
          <TabPane tab="Tab 1" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <div className="user_profile_banner">
              <img
                className="user_profile_bg"
                width="100%"
                height={300}
                src="https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/04/dest_usa_california_venice-beach_skate-park_gettyimages-495523864_kayak_within-usage-period_27806-1920x600.jpg"
              />
            </div>
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of tab 3
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey="1" type="card" size={size}>
          <TabPane tab="Card Tab 1" key="1">
            Content of card tab 1
          </TabPane>
          <TabPane tab="Card Tab 2" key="2">
            Content of card tab 2
          </TabPane>
          <TabPane tab="Card Tab 3" key="3">
            Content of card tab 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
