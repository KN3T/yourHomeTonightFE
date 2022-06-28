import React from 'react';

import {
  CityCard,
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
      <CityCard />
      <CityIntro />
    </div>
  );
};

export default HomePage;
