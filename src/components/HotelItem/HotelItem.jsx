/* eslint-disable react/prop-types */
import { Button, Col, Image, Rate, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillPhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { RiHotelFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import formatCurrency from '../../utils/formatCurrency';
import './HotelItem.scss';

const HotelItem = ({
  hotelData,
  cityDefault,
  adultsDefault,
  childrenDefault,
  checkInDefault,
  checkOutDefault,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const searchDate = useSelector((state) => state.booking.searchDate);
  console.log(searchDate);

  return (
    <div
      className="hotel__item__container"
      onClick={() =>
        navigate(
          `/hotels/${hotelData.id}?city=${cityDefault}&checkIn=${checkInDefault}&checkOut=${checkOutDefault}&adults=${adultsDefault}&children=${childrenDefault}`
        )
      }
    >
      <div className="hotel__item__top">
        <Row gutter={10}>
          <Col xxl={16} xl={16} lg={16} md={16} sm={12} xs={24}>
            <div className="hotel__info">
              <h3>{hotelData.hotelName}</h3>
              <div className="hotel__location">
                <MdLocationOn className="icon" />
                <span>
                  {hotelData.address.address}, {hotelData.address.city},{' '}
                  {hotelData.address.province}
                </span>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
            <div className="hotel__rating">
              <Rate
                value={hotelData.rating}
                className="rating"
                disabled={true}
              />
              <span>
                {hotelData.ratingCount ? hotelData.ratingCount : 0}{' '}
                {t('hotels.reviews')}
              </span>
            </div>
          </Col>
        </Row>
      </div>
      <div className="hotel__item__line"></div>
      <div className="hotel__item__bottom">
        <Row gutter={20}>
          <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
            <div className="photo__container">
              <Image
                src={hotelData.images[0].src}
                className="photo"
                preview={false}
              />
            </div>
          </Col>
          <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
            <Row>
              <div className="content__wrapper">
                <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                  <div className="description__wrapper">
                    <div className="description__hotel">
                      <span>
                        <RiHotelFill />
                      </span>
                      <p>{hotelData.description}</p>
                    </div>
                    <div>
                      <AiFillPhone />
                      {hotelData.phone}
                    </div>
                  </div>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={24} xs={24}>
                  <div className="price__wrapper">
                    <span className="price">
                      {t('hotels.price_value', {
                        val: formatCurrency(hotelData.price, currentLanguage),
                      })}
                    </span>
                    <span className="per__night">{t('hotels.per_night')}</span>
                    <Button type="primary">{t('hotels.view')}</Button>
                  </div>
                </Col>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HotelItem;
