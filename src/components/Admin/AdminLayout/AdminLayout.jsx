import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import NavbarAdmin from '../Navbar/NavbarAdmin';

const AdminLayout = () => {
  const role = window.localStorage.getItem('role');

  if (role !== 'ROLE_HOTEL') {
    return <Navigate to="/login" replace />;
  }
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
