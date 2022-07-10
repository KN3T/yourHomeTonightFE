import { BarChartOutlined, BarsOutlined } from '@ant-design/icons';
import { Divider, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { RiHotelFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import './index.scss';

const SiderNavAdmin = () => {
  const { t } = useTranslation();
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
        <Space className="space">
          <a className="link">
            <BarsOutlined className="icon" />
            <span className="text__icon"></span>
          </a>
        </Space>

        <Divider
          className="navbar__sider__divider"
          style={{ margin: '14px 0' }}
        />
        <Space className="space">
          <NavLink className="link" to="dashboard">
            <BarChartOutlined className="icon" />
            <span className="text__icon">Dashboard</span>
          </NavLink>
        </Space>
        <Space className="space">
          <NavLink className="link" to="rooms">
            <AiFillHome className="icon" />
            <span className="text__icon">{t('admin.managerooms')}</span>
          </NavLink>
        </Space>
        <Space className="space">
          <NavLink className="link" to="profile">
            <RiHotelFill className="icon" />
            <span className="text__icon">My Hotel</span>
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
