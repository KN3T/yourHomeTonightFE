import { Col, Row, Spin, Typography } from 'antd';
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
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const NumberOfHotels = 3;

  const fetchHotels = async () => {
    setLoading(true);
    let result = await hotelApi.getAll();
    if (result.data.status === 'success') {
      const { data } = result;
      setData(data.data.hotels);
      data && loadingContext.done();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
    loadingContext.done();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="hotel_populer_list  ctn">
        <Title data-testid="headingId" className="title_section" level={2}>
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
    </Spin>
  );
};

export default HotelPopulerList;
