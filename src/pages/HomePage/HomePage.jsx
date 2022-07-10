import React, { useEffect, useState } from 'react';
import { useLoadingContext } from 'react-router-loading';

import { hotelApi } from '../../api';
import { CityIntro, HotelPopulerList, MainSection } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  const [hotelData, setHotelData] = useState([]);
  const loadingContext = useLoadingContext();

  const fetchHotels = async () => {
    let result = await hotelApi.getAll();
    if (result.data.status === 'success') {
      const { data } = result;
      setHotelData(data.data.hotels);
      data && loadingContext.done();
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="homepage__container">
      <MainSection />
      <HotelPopulerList hotelData={hotelData} />
      <CityIntro />
    </div>
  );
};

export default HomePage;
