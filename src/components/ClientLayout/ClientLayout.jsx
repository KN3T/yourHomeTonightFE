import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../HomeFooter/HomeFooter';
import Navbar from '../Navbar/Navbar';

const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
