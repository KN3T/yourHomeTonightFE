import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoadingContext } from 'react-router-loading';

import { HotelCard } from '..';
import { hotelApi } from '../../api';
import './HotelPopulerList.scss';

const { Title } = Typography;

const HotelPopulerList = () => {
  const loadingContext = useLoadingContext();

  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const NumberOfHotels = 3;

  const fetchHotels = async () => {
    let result = await hotelApi.getAll();
    const { data } = result;
    setData(data.data.hotels);
    data && loadingContext.done();
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className="hotel_populer_list  ctn">
      <Title className="title_section" level={2}>
        {t('hotel.populer_hotel_title')}
      </Title>
      <Row className="hotel_list" gutter={[16, 0]}>
        {data &&
          data.slice(0, NumberOfHotels).map((item, index) => {
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
