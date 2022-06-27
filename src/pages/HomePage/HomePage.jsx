// import { LargeButton } from '../../components';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { hotelApi } from '../../api';
import { HotelCard } from '../../components';

// import './HomePage.scss';

const HomePage = () => {
  const [data, setData] = useState([]);
  const fetchHotels = async () => {
    let result = await hotelApi.getAll();
    setData(result);
  };
  useEffect(() => {
    fetchHotels();
  }, []);
  return (
    <div className="homepage__container">
      {/* HomePage
      <LargeButton /> */}
      <Row>
        {data.map((item, index) => {
          return (
            <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={24} key={index}>
              <HotelCard {...item} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HomePage;
