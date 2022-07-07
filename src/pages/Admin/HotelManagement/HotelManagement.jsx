import React from 'react';

import { HotelAdmin } from '../../../components';
import './HotelManagement.scss';

const HotelManagement = () => {
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
