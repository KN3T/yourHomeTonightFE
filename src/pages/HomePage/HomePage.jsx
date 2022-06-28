import React from 'react';

import { HotelPopulerList, MainCarousel } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <MainCarousel />
      <HotelPopulerList />
    </div>
  );
};

export default HomePage;
