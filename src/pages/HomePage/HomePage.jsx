import React from 'react';

import { HotelPopulerList } from '../../components';
import { Navbar } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <Navbar />
      <HotelPopulerList />
    </div>
  );
};

export default HomePage;
