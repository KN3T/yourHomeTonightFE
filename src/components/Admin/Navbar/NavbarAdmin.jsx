import React from 'react';

import HeaderNavAdmin from './HeaderNavAdmin/HeaderNavAdmin';
import SiderNavAdmin from './SiderNavAdmin/SiderNavAdmin';
import './index.scss';

const NavbarAdmin = () => {
  return (
    <>
      <div className="navbar__wrapper">
        <SiderNavAdmin />
      </div>
      <HeaderNavAdmin />
    </>
  );
};

export default NavbarAdmin;
