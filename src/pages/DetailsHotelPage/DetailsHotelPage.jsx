import { Breadcrumb, Button, Card, Col, Image, List, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getByIdAsync } from '../../store/Slice/Hotels/HotelsSlice';
import './index.scss';

const DetailsHotelPage = () => {
  const dispatch = useDispatch();
  const singleHotel = useSelector((state) => state.hotels.singleHotel);
  const loading = useSelector((state) => state.hotels.loading);
  useEffect(() => {
    dispatch(getByIdAsync(1));
  }, []);
  console.log(singleHotel);
  return (
    <div className="details__hotel__wrapper">
      {loading ? (
        <Spin spinning={loading} />
      ) : (
        <Row gutter={[20, 50]}>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Can Tho</Breadcrumb.Item>
              <Breadcrumb.Item>{singleHotel.name}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="details__title">
              <div className="details__title__left">
                <h1>{singleHotel.name}</h1>
                <h4>{singleHotel.address}</h4>
                <h5>
                  <span className="details__title__left__rating">
                    {singleHotel.rating}
                  </span>
                  {'    '}
                  wonderful {singleHotel.reviews} reviews
                </h5>
              </div>
              <div className="details__title__right">
                <h1>
                  ${singleHotel.price}/
                  <span style={{ fontSize: '10px' }}>night</span>
                </h1>
                {/* <h4>{singleHotel.address}</h4> */}
                <Button>View deal</Button>
              </div>
            </div>
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            {singleHotel &&
              singleHotel.images.map((img, key) => (
                <Image width={300} src={img} key={key} />
              ))}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DetailsHotelPage;
