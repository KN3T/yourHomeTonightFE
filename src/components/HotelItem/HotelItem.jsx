/* eslint-disable react/prop-types */
import { Button, Image, Rate } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdLocationOn } from 'react-icons/md';

import './HotelItem.scss';

const HotelItem = ({ hotelData }) => {
  const { t } = useTranslation();

  return (
    <div className="hotel__item__container">
      <div className="hotel__item__top">
        <div className="hotel__info">
          <h3>{hotelData.hotelName}</h3>
          <div className="hotel__location">
            <MdLocationOn className="icon" />
            <span>{hotelData.address}</span>
          </div>
        </div>

        <div className="hotel__rating">
          <Rate value={hotelData.rating} className="rating" />
          <span>
            {hotelData.ratingCount} {t('hotels.reviews')}
          </span>
        </div>
      </div>
      <div className="hotel__item__bottom">
        <div className="photo__container">
          <Image src={hotelData.img} className="photo" preview={false} />
        </div>
        <div className="content__container">
          <div className="content__wrapper">
            <div className="description__wrapper">{hotelData.description}</div>
            <div className="price__wrapper">
              <span className="price">{hotelData.price}</span>
              <span className="per__night">{t('hotels.per_night')}</span>
              <Button type="primary">View</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
