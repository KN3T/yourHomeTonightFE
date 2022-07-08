/* eslint-disable react/prop-types */
import { Button, Card, Col, Image, Row, Space, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import handleTag from '../../utils/handleTag';
import './index.scss';

const Transaction = ({ bookings }) => {
  return (
    <div className="transaction__wrapper">
      <Row gutter={[30, 30]}>
        {bookings.map((booking, key) => (
          <Col
            className="col__transaction"
            key={key}
            xl={{ span: 8 }}
            lg={{ span: 8 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Card hoverable>
              <Space
                style={{
                  marginBottom: 10,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Image
                  height={200}
                  key={key}
                  src={booking.room.images[0].src}
                />
              </Space>
              <Link
                style={{ color: 'black' }}
                to={`/detailsBooking/${booking.id}`}
              >
                <Space className="space__glimpse">
                  <span>Hotel</span>
                  <span>{booking.hotel.name}</span>
                </Space>
                <Space className="space__glimpse">
                  <span>Check in</span>
                  <span>
                    {moment(booking.checkIn.date).format('MM-DD-YYYY')}
                  </span>
                </Space>
                <Space className="space__glimpse">
                  <span>Check out</span>
                  <span>
                    {moment(booking.checkIn.date).format('MM-DD-YYYY')}
                  </span>
                </Space>
                <Space className="space__glimpse">
                  <span>Price</span>
                  <span>${booking.total}</span>
                </Space>
                <Space>
                  <Tag
                    color={handleTag(booking.status).color}
                    icon={handleTag(booking.status).icon}
                  >
                    {handleTag(booking.status).text}
                  </Tag>
                </Space>
              </Link>

              <Space className="space__type__btn">
                <Link to={`/detailsBooking/${booking.id}`}>
                  <Button>View details</Button>
                </Link>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Transaction;
