// import { LargeButton } from '../../components';
import { Col, Layout, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import { hotelApi } from '../../api';
import { HotelCard } from '../../components';
import './HomePage.scss';

const { Title } = Typography;

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
      <Title className="title_section" level={2}>
        Our Most Populer Room
      </Title>
      <Row>
        <Col span={12} offset={6}>
          <p className="content-section_center">
            {/* {t('home-page.retailer.description')} */}
            It is a long established fact that a reader will be distracted by
            the readable content of a page.
          </p>
        </Col>
      </Row>
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
