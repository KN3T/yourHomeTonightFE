import { Card, Tabs } from 'antd';
import React from 'react';
import { useState } from 'react';

import UserProfileEdit from '../UserProfileEdit/UserProfileEdit';
import './UserProfileAccount.scss';

const { TabPane } = Tabs;

const UserProfileAccount = () => {
  const [size, setSize] = useState('small');

  const onChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <div className="user_profile_account">
      <Card>
        <h2>Personal Information</h2>
        <p className="title_proflie">Legal Name</p>
        <p>Full Name</p>
        <UserProfileEdit className="user_profile_edit" />

        <hr></hr>
        <p className="title_proflie" style={{ paddingTop: 16 }}>
          Primary phone number
        </p>
        <p>
          Please enter multiple phone numbers so we can contact you in case of a
          travel related issue.
        </p>
        <UserProfileEdit className="user_profile_edit" />
        <hr></hr>
        <p className="title_proflie" style={{ paddingTop: 16 }}>
          Primary email address
        </p>
        <p>
          Please enter email address so we can contact you in case of a travel
          related issue.
        </p>
        <UserProfileEdit className="user_profile_edit" />
      </Card>
    </div>
  );
};

export default UserProfileAccount;
