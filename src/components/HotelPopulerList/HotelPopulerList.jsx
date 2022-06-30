import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HotelCard } from '..';
import { hotelApi } from '../../api';
import './HotelPopulerList.scss';

const { Title } = Typography;

const HotelPopulerList = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const NumberOfHotels = 3;
  const fetchHotels = async () => {
    let result = await hotelApi.getAll();
    setData(result);
  };
  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="hotel_populer_list  ctn">
      <Title className="title_section" level={2}>
        {t('hotel.populer_hotel_title')}
      </Title>
      <Row className="content_section">
        <Col span={12} offset={6}>
          <p className="content_section_center">
            {t('hotel.populer_hotel_content')}
          </p>
        </Col>
      </Row>
      <Row className="hotel_list" gutter={[16, 0]}>
        {data.slice(0, NumberOfHotels).map((item, index) => {
          return (
            <Col
              xxl={8}
              xl={8}
              lg={12}
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
