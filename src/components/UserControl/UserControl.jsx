import {
  HomeOutlined,
  LogoutOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { profileApi } from '../../api/profileApi';

const UserControl = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  );

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await profileApi.get();
      data && setUserData(data.data);
    };
    getProfile();
  }, []);

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
            label: (
              <Button
                icon={<ZoomOutOutlined />}
                type="link"
                onClick={() => navigate(`/userprofile`)}
              >
                {t('navbar.profile')}
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
    );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <span>{userData.fullName}</span>
    </Dropdown>
  );
};

export default UserControl;
