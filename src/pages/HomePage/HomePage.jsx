import React from 'react';

import { HotelPopulerList, MainCarousel, Navbar } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <Navbar />
      <MainCarousel />
      <HotelPopulerList />
    </div>
  );
};

export default HomePage;
