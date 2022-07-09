/* eslint-disable react/prop-types */
import {
  HomeOutlined,
  LogoutOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const UserControl = ({ userData, onLogOut }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userRole = userData && userData.role;
  const hotelId = userData && userData.hotelId;

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
              <Button
                data-testid="button-logout"
                type="link"
                icon={<LogoutOutlined />}
                onClick={onLogOut}
              >
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
              <Button
                data-testid="button-logout"
                type="link"
                icon={<LogoutOutlined />}
                onClick={onLogOut}
              >
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
      <span>{userData && userData.fullName}</span>
    </Dropdown>
  );
};

export default UserControl;
