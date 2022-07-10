import React from 'react';

import HeaderNav from './Header/HeaderNav';
import SiderNav from './Sider/SiderNav';
import './index.scss';

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
