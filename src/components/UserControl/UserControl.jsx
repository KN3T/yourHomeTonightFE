import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
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
            label: (
              <Button
                icon={<HomeOutlined />}
                type="link"
                onClick={() => navigate(`/manageHotel/${hotelId}`)}
              >
                My Hotel
              </Button>
            ),
            key: '0',
          },
          {
            type: 'divider',
          },
          {
            label: (
              <Button type="link" icon={<LogoutOutlined />} onClick={logout}>
                {t('navbar.logout')}
              </Button>
            ),
            key: '1',
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
            label: (
              <Button icon={<LogoutOutlined />} onClick={logout}>
                {t('navbar.logout')}
              </Button>
            ),
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
