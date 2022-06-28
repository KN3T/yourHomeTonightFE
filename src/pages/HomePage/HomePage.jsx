// import { LargeButton } from '../../components';
import React from 'react';

import { HotelPopulerList } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="homepage__container">
      <HotelPopulerList />
    </div>
  );
};

export default HomePage;
