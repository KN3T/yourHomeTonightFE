import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';

import { HotelCard } from '..';
import { hotelApi } from '../../api';
import './HotelPopulerList.scss';

const { Title } = Typography;

const HotelPopulerList = () => {
  const [data, setData] = useState([]);
  const fetchHotels = async () => {
    let result = await hotelApi.getAll();
    setData(result);
  };
  useEffect(() => {
    fetchHotels();
  }, []);
  return (
    <div className="hotel_populer_list">
      <Title className="title_section" level={2}>
        Our Most Populer Hotel
      </Title>
      <Row className="content_section">
        <Col span={12} offset={6}>
          <p className="content_section_center">
            It is a long established fact that a reader will be distracted by
            the readable content of a page.
          </p>
        </Col>
      </Row>
      <Row className="hotel_list">
        {data.map((item, index) => {
          return (
            <Col
              xxl={8}
              xl={8}
              lg={8}
              md={12}
              sm={24}
              xs={24}
              key={index}
              className="hotel_list_item_wrapper"
            >
              <HotelCard {...item} className="hotel_list_item" />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HotelPopulerList;
