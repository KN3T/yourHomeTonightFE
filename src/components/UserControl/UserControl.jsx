import { Dropdown, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserControl = () => {
  const userData = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData'))
    : '';

  const logout = () => {
    window.localStorage.clear();
    location.reload();
  };

  const { t } = useTranslation();
  const role = userData.role;

  const menu =
    role === 'ROLE_HOTEL' ? (
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
            label: (
              <Link to={`/manageHotel/${userData.hotelId}`}>My Hotel</Link>
            ),
            key: '1',
          },
          {
            type: 'divider',
          },
          {
            label: <span onClick={logout}>{t('navbar.logout')}</span>,
            key: '2',
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
