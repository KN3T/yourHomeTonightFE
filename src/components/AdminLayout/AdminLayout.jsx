import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '5rem', paddingTop: '79px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
