import React from 'react';
import { Outlet } from 'react-router-dom';

import NavbarAdmin from '../Navbar/NavbarAdmin';

const AdminLayout = () => {
  return (
    <>
      <NavbarAdmin />
      <div style={{ paddingLeft: '5rem', paddingTop: '79px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
