import React from 'react';

import { HotelPopulerList, MainSection } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <MainSection />
      <HotelPopulerList />
    </div>
  );
};

export default HomePage;
