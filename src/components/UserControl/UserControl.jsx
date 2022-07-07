import { Dropdown, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const UserControl = () => {
  const userData = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData'))
    : '';

  const navigate = useNavigate();
  const { t } = useTranslation();

  const userRole = localStorage.getItem('role');
  const hotelId = userData.hotelId;

  const logout = () => {
    userRole === 'ROLE_USER' ? location.reload() : navigate('/');
    window.localStorage.clear();
  };

  const menu =
    userRole === 'ROLE_HOTEL' ? (
      <Menu
        items={[
          {
            label: <Link to={`/manageHotel/${hotelId}`}>My Hotel</Link>,
            key: '1',
          },
          {
            type: 'divider',
          },
          {
            label: <span onClick={logout}>{t('navbar.logout')}</span>,
            key: '3',
          },
        ]}
      />
    ) : (
      <Menu
        items={[
          {
            label: <Link to={'/userprofile'}>{t('navbar.profile')}</Link>,
            key: '0',
          },
          {
            type: 'divider',
          },
          {
            label: <span onClick={logout}>{t('navbar.logout')}</span>,
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
