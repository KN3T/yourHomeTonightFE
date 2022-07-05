import {
  HomeOutlined,
  TwitterOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Divider, Space } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

import UserControl from '../../../UserControl/UserControl';
import './index.scss';

const SiderNavAdmin = () => {
  const userData = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData'))
    : '';

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      const navbar = document.querySelector('.navbar__logo__wrapper');
      navbar.classList.add('navbar__logo__wrapper__with_shadow');
    } else {
      const navbar = document.querySelector('.navbar__logo__wrapper');
      navbar.classList.remove('navbar__logo__wrapper__with_shadow');
    }
  });

  return (
    <>
      <div className="navbar__sider__wrapper">
        {userData.token ? (
          <Space className="space">
            <a className="link">
              <UserOutlined className="icon" />
              <span className="text__icon">
                <UserControl />
              </span>
            </a>
          </Space>
        ) : (
          <Space className="space">
            <NavLink className="link" to="/login">
              <UserOutlined className="icon" />
              <span className="text__icon">Login</span>
            </NavLink>
          </Space>
        )}

        <Divider
          className="navbar__sider__divider"
          style={{ margin: '14px 0' }}
        />
        <Space className="space">
          <NavLink className="link" to="dashboard">
            <HomeOutlined className="icon" />
            <span className="text__icon">Dashboard</span>
          </NavLink>
        </Space>
        <Space className="space">
          <NavLink className="link" to="rooms">
            <TwitterOutlined className="icon" />
            <span className="text__icon">Rooms</span>
          </NavLink>
        </Space>
        <Space className="space">
          <NavLink className="link" to="bookings">
            <UserSwitchOutlined className="icon" />
            <span className="text__icon">Bookings</span>
          </NavLink>
        </Space>
      </div>
      <div className="navbar__logo__wrapper">
        <NavLink to="/">
          <h1>
            yourhome<span>29.</span>{' '}
          </h1>
        </NavLink>
      </div>
    </>
  );
};

export default SiderNavAdmin;
