import { Breadcrumb, Button, Col, Image, Row, Spin, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getByIdAsync } from '../../store/Slice/Hotels/HotelsSlice';
import './index.scss';

const { TabPane } = Tabs;
const DetailsHotelPage = () => {
  const dispatch = useDispatch();
  const singleHotel = useSelector((state) => state.hotels.singleHotel);
  const loading = useSelector((state) => state.hotels.loading);
  useEffect(() => {
    dispatch(getByIdAsync(1));
  }, []);
  // console.log(singleHotel);
  const firstImage = singleHotel.images && singleHotel.images[0];
  let images = singleHotel.images !== undefined && [
    ...singleHotel.images.slice(1),
  ];
  // console.log(images);
  return (
    <div className="details__hotel__wrapper">
      {loading && <Spin spinning={loading} />}
      {singleHotel.images ? (
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
              <Breadcrumb.Item>New York</Breadcrumb.Item>
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
            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Prices" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Location" key="3">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Reviews" key="4">
                Content of Tab Pane 3
              </TabPane>
              <TabPane tab="Amenities" key="5">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
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
                  <span>from</span> ${singleHotel.price}/
                  <span style={{ fontSize: '15px' }}>night</span>
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
            <Row gutter={[10, 10]}>
              <Col lg={{ span: 12 }}>
                <Image width="100%" src={firstImage} />
              </Col>
              <Col lg={{ span: 12 }}>
                <Row gutter={[10, 10]}>
                  {images.map((item, key) => (
                    <Col key={key} lg={{ span: 12 }}>
                      <Image width="100%" src={item} />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </div>
  );
};

export default DetailsHotelPage;
