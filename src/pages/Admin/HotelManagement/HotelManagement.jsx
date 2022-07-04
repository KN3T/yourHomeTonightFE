import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { RoomDetailsModal } from '../../../components';
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
