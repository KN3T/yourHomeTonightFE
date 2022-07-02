import { UserOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import HeaderNav from './Header/HeaderNav';
import SiderNav from './Sider/SiderNav';
import './index.scss';

const { Sider, Header } = Layout;
const Navbar = () => {
  return (
    <>
      <div className="navbar__wrapper">
        <SiderNav />
      </div>
      <HeaderNav />
    </>
  );
};

export default Navbar;
