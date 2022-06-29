import React from 'react';

import { HotelPopulerList, MainSection, Navbar } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <Navbar />
      <MainSection />
    </div>
  );
};

export default HomePage;
