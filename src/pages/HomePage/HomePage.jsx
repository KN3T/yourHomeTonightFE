import React from 'react';

import { CityIntro, HotelPopulerList, MainSection } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <MainSection />
      <HotelPopulerList />
      <CityIntro />
    </div>
  );
};

export default HomePage;
