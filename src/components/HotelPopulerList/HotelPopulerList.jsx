/* eslint-disable react/prop-types */
import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { HotelCard } from '..';
import './HotelPopulerList.scss';

const { Title } = Typography;

const HotelPopulerList = ({ hotelData }) => {
  const { t } = useTranslation();
  return (
    <div className="hotel_populer_list  ctn">
      <Title className="title_section" level={2}>
        {t('hotel.populer_hotel_title')}
      </Title>
      <Row className="hotel_list" gutter={[16, 0]}>
        {hotelData &&
          hotelData.slice(0, 3).map((item, index) => {
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
