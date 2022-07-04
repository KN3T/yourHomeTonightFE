import { Button, Card, Col, Image, Modal, Row, Space, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import BookingFeedback from '../Feedback/BookingFeedback';
import './index.scss';

const Transaction = ({ bookings }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalFb, setModalFb] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModalFb = () => {
    setIsModalVisible(true);
  };

  const handleOkFb = () => {
    setIsModalVisible(false);
  };

  const handleCancelFb = () => {
    setIsModalVisible(false);
  };

  const handleStatusBooking = (status) => {
    switch (status) {
      case 2:
        return 'Success';
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
        return <Button onClick={showModalFb}>Give feedback</Button>;
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
              <Space style={{ marginBottom: 10 }}>
                <Image key={key} src={booking.room.images[0].src} />
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
                <Button onClick={showModal}>View details</Button>
                {renderButton(booking.status)}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal visible={modalFb} onOk={handleOkFb} onCancel={handleCancelFb}>
        <BookingFeedback />
      </Modal>
    </div>
  );
};

export default Transaction;
