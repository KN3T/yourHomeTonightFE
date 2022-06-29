import React from 'react';

import {
  CityIntro,
  HotelPopulerList,
  MainCarousel,
  Navbar,
} from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <Navbar />
      <MainCarousel />
      <HotelPopulerList />
      <CityIntro />
    </div>
  );
};

export default HomePage;
