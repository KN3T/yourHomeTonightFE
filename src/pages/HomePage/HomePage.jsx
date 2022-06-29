import React from 'react';

import {
  CityPopulerList, // CityIntro,
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
      <CityPopulerList />
      {/* <CityIntro /> */}
    </div>
  );
};

export default HomePage;
