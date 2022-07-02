import { Dropdown, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const UserControl = () => {
  const userData = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData'))
    : '';

  const logout = () => {
    window.localStorage.removeItem('userData');
    location.reload();
  };

  const menu = (
    <Menu
      items={[
        {
          label: <Link to={'/userprofile'}>Your profile</Link>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <span onClick={logout}>Logout</span>,
          key: '1',
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <span>{userData.email}</span>
    </Dropdown>
  );
};

export default UserControl;
