import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import NavbarAdmin from '../Navbar/NavbarAdmin';

const AdminLayout = () => {
  const role = window.localStorage.getItem('role');

  if (role !== 'ROLE_HOTEL') {
    return <Navigate to="/login" replace />;
  }

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
