/* eslint-disable react/prop-types */
import { Button, Image, Rate } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillPhone } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { RiHotelFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import formatCurrency from '../../utils/formatCurrency';
import './HotelItem.scss';

const HotelItem = ({ hotelData }) => {
  const { t, i18n } = useTranslation();
  console.log(hotelData.id);
  const currentLanguage = i18n.language;

  return (
    <div className="hotel__item__container">
      <div className="hotel__item__top">
        <div className="hotel__info">
          <Link to={`/hotels/${hotelData.id}`}>
            <h3>{hotelData.hotelName}</h3>
          </Link>
          <div className="hotel__location">
            <MdLocationOn className="icon" />
            <span>
              {hotelData.address.address}, {hotelData.address.city},{' '}
              {hotelData.address.province}
            </span>
          </div>
        </div>

        <div className="hotel__rating">
          <Rate value={hotelData.rating} className="rating" />
          <span>
            {hotelData.ratingCount ? hotelData.ratingCount : 0}{' '}
            {t('hotels.reviews')}
          </span>
        </div>
      </div>
      <div className="hotel__item__bottom">
        <div className="photo__container">
          <Image
            src={hotelData.images[0].src}
            className="photo"
            preview={false}
          />
        </div>
        <div className="content__container">
          <div className="content__wrapper">
            <div className="description__wrapper">
              <div>
                <RiHotelFill />
                {hotelData.description}
              </div>
              <div>
                <AiFillPhone />
                {hotelData.phone}
              </div>
            </div>
            <div className="price__wrapper">
              <span className="price">
                {t('hotels.price_value', {
                  val: formatCurrency(hotelData.price, currentLanguage),
                })}
              </span>
              <span className="per__night">{t('hotels.per_night')}</span>
              <Link to={`/hotels/${hotelData.id}`}>
                <Button type="primary">View</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
