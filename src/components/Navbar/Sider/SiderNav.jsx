import { HomeOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Menu, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const SiderNav = () => {
  window.addEventListener('scroll', () => {
    // console.log(window.pageYOffset);
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
        <Space className="space">
          <Link className="link" to="/login">
            <UserOutlined className="icon" />
            <span className="text__icon">Login</span>
          </Link>
        </Space>
        <Divider className="navbar__sider__divider" />
        <Space className="space">
          <Link className="link" to="/">
            <HomeOutlined className="icon" />
            <span className="text__icon">Home</span>
          </Link>
        </Space>
        <Space className="space">
          <Link className="link" to="/hotels">
            <TwitterOutlined className="icon" />
            <span className="text__icon">Hotels</span>
          </Link>
        </Space>
      </div>
      <div className="navbar__logo__wrapper">
        <Link to="/">
          <h1>
            yourhome<span>29.</span>{' '}
          </h1>
        </Link>
      </div>
    </>
  );
};

export default SiderNav;
