import React from 'react';
import { useLoadingContext } from 'react-router-loading';

import HotelAdmin from '../../../components/Admin/HotelAdmin/HotelAdmin';
import './HotelManagement.scss';

const HotelManagement = () => {
  const loadingContext = useLoadingContext();

  loadingContext.done();
  return (
    <div
      style={{
        padding: '16px',
        minHeight: '100vh',
      }}
    >
      <HotelAdmin />
    </div>
  );
};

export default HotelManagement;
