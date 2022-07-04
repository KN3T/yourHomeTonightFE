/* eslint-disable react/prop-types */
import { Pagination } from 'antd';
import React, { useState } from 'react';

import HotelItem from '../HotelItem/HotelItem';
import './HotelList.scss';

const HotelList = ({ hotelListData }) => {
  const NUM_EACH_PAGE = 5;

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(NUM_EACH_PAGE);

  const handleChange = (value) => {
    setMinValue((value - 1) * NUM_EACH_PAGE);
    setMaxValue(value * NUM_EACH_PAGE);
  };

  const sliceData = hotelListData.slice(minValue, maxValue);

  return (
    <div className="hotel__list__container">
      {sliceData.map((hotel) => {
        return <HotelItem hotelData={hotel} key={hotel.id} />;
      })}

      {sliceData.length > 0 && hotelListData.length > sliceData.length && (
        <Pagination
          style={{
            display: 'flex',
            justifyContent: 'right',
          }}
          onChange={(value) => handleChange(value)}
          defaultCurrent={1}
          total={hotelListData.length}
          defaultPageSize={NUM_EACH_PAGE}
        />
      )}
    </div>
  );
};

export default HotelList;
