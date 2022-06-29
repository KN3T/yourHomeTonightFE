import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Image,
  Popover,
  Row,
  Space,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { hotelApi } from '../../api';
import { PopoverDetailsHotel } from '../../components';
import './index.scss';

const DetailsHotelPage = () => {
  const [singleHotel, setSingleHotel] = useState({});
  const loading = useSelector((state) => state.hotels.loading);
  const [beds, setBeds] = useState(1);
  const [guests, setGuests] = useState(1);
  const [visiblePopover, setVisiblePopover] = useState(false);
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getHotelById = async (id) => {
      const data = await hotelApi.getById(id);
      data && setSingleHotel(data);
    };
    getHotelById(id);
  }, [id]);
  let firstImage = '';

  // list of image after remove first image in an array
  let images = [];

  if (singleHotel) {
    firstImage = singleHotel.images !== undefined && singleHotel.images[0];
    images = singleHotel.images !== undefined && [
      ...singleHotel.images.slice(1),
    ];
  }
  return (
    <div className="details__hotel__wrapper">
      {loading && <Spin spinning={loading} />}
      {singleHotel.images ? (
        <Row className="details__hotel__row" gutter={[20, 0]}>
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
            className="details__title__wrappper"
          >
            <Row gutter={[10, 0]}>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <h1>{singleHotel.name}</h1>
                <h4>{singleHotel.address}</h4>
                <h5>
                  <span className="details__rating__number">
                    {singleHotel.rating}
                  </span>
                  wonderful {singleHotel.reviews} reviews
                </h5>
              </Col>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="right">
                  <h1>
                    <span>from</span> ${singleHotel.price}/
                    <span style={{ fontSize: '15px' }}>night</span>
                  </h1>
                  <Button type="primary">View deal</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="details__gallery"
          >
            <Row gutter={[10, 10]}>
              <Col lg={{ span: 12 }}>
                <Image
                  className="details__hotel__image"
                  width="100%"
                  src={firstImage}
                />
              </Col>
              <Col lg={{ span: 12 }}>
                <Row gutter={[10, 10]}>
                  {images.map((item, key) => (
                    <Col key={key} lg={{ span: 12 }}>
                      <Image
                        className="details__hotel__image"
                        width="100%"
                        src={item}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="details__rating__wrapper"
          >
            <Divider />
            <Row gutter={[20, 0]}>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <h1>Overview</h1>
                <p>{singleHotel.description}</p>
              </Col>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <h1>Rating</h1>
                <div className="rating">
                  <span>{singleHotel.rating}</span>
                  <div>
                    <h3>Very good</h3>
                    <p>
                      Based on {singleHotel.ratingCount} verified guest reviews
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
            <Divider />
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="filter__wrapper"
          >
            <h1>Available rates</h1>
            <Space>
              <DatePicker placeholder="check in" />
              <DatePicker placeholder="check out" />
              <Popover
                visible={visiblePopover}
                content={
                  <PopoverDetailsHotel
                    setVisiblePopover={setVisiblePopover}
                    beds={beds}
                    guests={guests}
                  />
                }
                trigger="focus"
              >
                <Button onClick={() => setVisiblePopover(true)}>
                  {beds} bed, {guests} guests
                </Button>
              </Popover>
            </Space>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </div>
  );
};

export default DetailsHotelPage;
