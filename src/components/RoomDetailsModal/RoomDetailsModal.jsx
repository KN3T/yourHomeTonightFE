/* eslint-disable react/prop-types */
import { Button, Card, Col, Image, Modal, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoBedSharp } from 'react-icons/io5';
import { MdOutlineChildCare } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addOrder } from '../../store/Slice/Booking/BookingSlice';
import formatCurrency from '../../utils/formatCurrency';
import './RoomDetailsModal.scss';

const RoomDetailsModal = (props) => {
  const {
    isModalVisible,
    handleOk,
    handleCancel,
    roomData,
    roomImages,
    dataOrder,
    setIsModalVisible,
  } = props;

  const navigate = useNavigate();
  const [bigImage, setBigImage] = useState(roomImages[0]);
  const [orderData, setOrderData] = useState(dataOrder);
  const dispach = useDispatch();

  useEffect(() => {
    setBigImage(roomImages[0]);
  }, [roomData]);

  useEffect(() => {
    setOrderData(dataOrder);
  }, [dataOrder]);

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleBooking = () => {
    if (localStorage.getItem('userData')) {
      dispach(addOrder(orderData));
      window.localStorage.setItem('bookingData', JSON.stringify(dataOrder));
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };
  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="room__details__container"
      footer={false}
    >
      <Card bordered={false}>
        <Row gutter={[16, 0]}>
          <Col span={14} className="images__section">
            <div className="big__images__wrapper">
              <Image
                className="big__images__content"
                src={bigImage.src}
                fallback="data:image/png;base64,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"
              />
            </div>
            <div className="images__group">
              {roomData.images.map((item, index) => {
                return (
                  <Image
                    preview={false}
                    src={item.src}
                    key={index}
                    onClick={() => setBigImage(item)}
                  />
                );
              })}
            </div>
          </Col>
          <Col className="info__section" span={10}>
            <h2 className="info__name">{roomData.type}</h2>
            <div className="info__description">
              <h2 className="info__title">{t('room.description')}</h2>
              <ul>
                <li className="description__item">
                  <IoBedSharp /> {t('room.beds')}: {roomData.beds}
                </li>
                <li className="description__item">
                  <BsFillPeopleFill /> {t('room.adults')}: {roomData.adults}
                </li>
                <li className="description__item">
                  <MdOutlineChildCare /> {t('room.children')}:{' '}
                  {roomData.children}
                </li>
                <li className="description__item">{roomData.description}</li>
              </ul>
            </div>
            <div className="info__facilities">
              <h2 className="info__title">{t('room.facilities')}</h2>
              <ul className="facilities__list">
                {roomData.asset.map((item, index) => {
                  return (
                    <li key={index}>
                      <span>
                        <AiOutlineCheck />
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
        </Row>
        <Row gutter={[[0, 0]]} className="bottom__section">
          <Col span={24} className="bottom__wrapper">
            <div className="room__price">
              <strong>
                {t('room.only')}{' '}
                {t('room.price_value', {
                  val: formatCurrency(roomData.price, currentLanguage),
                })}{' '}
                {t('room.per_night')}
              </strong>
            </div>
            <div className="booking__button">
              {dataOrder.checkIn && dataOrder.checkOut ? (
                <Button
                  onClick={() => {
                    handleBooking();
                    setIsModalVisible(false);
                  }}
                  type="primary"
                >
                  {t('room.reverse_now')}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    message.error(
                      'You must select date check in, check out first, please!'
                    )
                  }
                  type="primary"
                >
                  {t('room.reverse_now')}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default RoomDetailsModal;
