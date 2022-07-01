import _ from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cityApi } from '../../api';
import { CityIntro, HotelPopulerList, MainSection } from '../../components';
import './HomePage.scss';

const HomePage = () => {
  const [options, setOptions] = useState([]);

  const navigate = useNavigate();

  const search = _.debounce(async (e) => {
    const response = await cityApi.search(e);
    setOptions(
      response.data.data.map((item) => {
        return {
          label: item.city && item.city,
          value: item.city && item.city,
        };
      })
    );
  }, 500);

  const handleSearch = (value) => {
    if (value && value !== '') {
      search(value);
    } else {
      setOptions([]);
    }
  };

  const onSelect = (value) => {
    navigate({ pathname: '/hotels', search: `?city=${value}` });
  };

  return (
    <div className="homepage__container">
      <MainSection
        handleSearch={handleSearch}
        onSelect={onSelect}
        options={options}
      />
      <HotelPopulerList />
      <CityIntro />
    </div>
  );
};

export default HomePage;
