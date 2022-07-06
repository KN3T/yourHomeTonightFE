/* eslint-disable react/prop-types */
import { Button, Card, Col, Image, Row, Space, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const Transaction = ({ bookings }) => {
  const handleStatusBooking = (status) => {
    switch (status) {
      case 2:
        return 'Paid';
      case 3:
        return 'Cancelled';
      case 4:
        return 'Done';
      default:
        return 'Pending';
    }
  };

  const handleTypeBtn = (status) => {
    switch (status) {
      case 2:
        return '#87d068';
      case 3:
        return '#f50';
      case 4:
        return '#87d068';
      default:
        return 'magenta';
    }
  };

  const renderButton = (status) => {
    switch (status) {
      case 2:
        return '';
      case 3:
        return '';
      default:
        return <Button>Purchase now</Button>;
    }
  };

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
              <Space className="space__glimpse">
                <span>Hotel</span>
                <span>{booking.hotel.name}</span>
              </Space>
              <Space className="space__glimpse">
                <span>Check in</span>
                <span>{moment(booking.checkIn.date).format('MM-DD-YYYY')}</span>
              </Space>
              <Space className="space__glimpse">
                <span>Check out</span>
                <span>{moment(booking.checkIn.date).format('MM-DD-YYYY')}</span>
              </Space>
              <Space className="space__glimpse">
                <span>Price</span>
                <span>${booking.total}</span>
              </Space>
              <Space>
                <Tag color={handleTypeBtn(booking.status)}>
                  {' '}
                  {handleStatusBooking(booking.status)}{' '}
                </Tag>
              </Space>
              <Space className="space__type__btn">
                <Link to={`/detailsBooking/${booking.id}`}>
                  <Button>View details</Button>
                </Link>
                {renderButton(booking.status)}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Transaction;
