import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import CityCard from '../CityCard/CityCard';

const CityPopulerList = () => {
  const responsive = {
    // superLargeDesktop: {
    //   breakpoint: { max: 4000, min: 3000 },
    //   items: 5
    // },
    // desktop: {
    //   breakpoint: { max: 3000, min: 1502 },
    //   items: 4
    // },
    // tablet: {
    //   breakpoint: { max: 1502, min: 1132 },
    //   items: 3
    // },
    // mobile: {
    //   breakpoint: { max: 1132, min: 464 },
    //   items: 2
    // }
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1502 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1502, min: 1132 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1132, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel responsive={responsive}>
      <div>
        <CityCard />
      </div>
      <div>
        <CityCard />
      </div>
      <div>
        <CityCard />
      </div>
      <div>
        <CityCard />
      </div>
      <div>
        <CityCard />
      </div>
      <div>
        <CityCard />
      </div>
      <div>
        <CityCard />
      </div>
      <div>
        <CityCard />
      </div>
    </Carousel>
  );
};

export default CityPopulerList;
