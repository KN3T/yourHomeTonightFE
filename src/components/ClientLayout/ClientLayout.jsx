import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Footer from '../HomeFooter/HomeFooter';
import Navbar from '../Navbar/Navbar';

const ClientLayout = () => {
  const role = window.localStorage.getItem('role');

  if (role !== 'ROLE_USER') {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />
      <div style={{ paddingLeft: '5rem', paddingTop: '79px' }}>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
