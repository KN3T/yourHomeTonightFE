import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../HomeFooter/HomeFooter';
import Navbar from '../Navbar/Navbar';

const ClientLayout = () => {
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
