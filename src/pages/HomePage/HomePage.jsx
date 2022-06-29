import React from 'react';

import {
  CityIntro,
  HomeFooter,
  HotelPopulerList,
  MainSection,
} from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <MainSection />
      <HotelPopulerList />
      <CityIntro />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
