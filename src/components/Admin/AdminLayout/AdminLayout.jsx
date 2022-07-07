import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import NavbarAdmin from '../Navbar/NavbarAdmin';

const AdminLayout = () => {
  const loadingContext = useLoadingContext();

  loadingContext.done();

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
