import { BarsOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Divider, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import './index.scss';

const SiderNav = () => {
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

  const { t } = useTranslation();

  return (
    <>
      <div className="navbar__sider__wrapper">
        <Space className="space">
          <a className="link">
            <BarsOutlined className="icon" />
          </a>
        </Space>
        <Divider
          className="navbar__sider__divider"
          style={{ margin: '14px 0' }}
        />
        {userData.token ? (
          <Space className="space">
            <NavLink to="/userprofile" className="link">
              <UserOutlined className="icon" />
              <span className="text__icon">{t('navbar.profile')}</span>
            </NavLink>
          </Space>
        ) : (
          <Space className="space">
            <NavLink className="link" to="/login">
              <UserOutlined className="icon" />
              <span className="text__icon">{t('navbar.login')}</span>
            </NavLink>
          </Space>
        )}

        <Space className="space">
          <NavLink className="link" to="/">
            <HomeOutlined className="icon" />
            <span className="text__icon">{t('navbar.home')}</span>
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

export default SiderNav;
