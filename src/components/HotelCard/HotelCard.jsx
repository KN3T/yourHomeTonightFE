/* eslint-disable react/prop-types */
import { Rate } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import formatCurrency from '../../utils/formatCurrency';
import './HotelCard.scss';

const HotelCard = (props) => {
  const { rating, name, id, images, price } = props;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const navigate = useNavigate();
  const [date, setDate] = useState([
    moment().format('X'),
    moment().add(3, 'day').format('X'),
  ]);

  const onClickHotel = () => {
    navigate({
      pathname: `/hotels/${id}`,
      search: `&checkIn=${date[0]}&checkOut=${date[1]}&adults=1&children=1`,
    });
  };

  return (
    <div className="room_card">
      <div className="room_card_img_wrapper">
        {images[0] !== undefined && (
          <img
            className="room_card_img"
            src={images[0].src}
            alt="room_card_img"
            onClick={onClickHotel}
          />
        )}
      </div>
      <div className="room_card_info">
        <div className="room_name" onClick={onClickHotel}>
          {name}
        </div>
        <div className="room_rating">
          {t('hotel.rating')}:{' '}
          <Rate
            allowHalf
            disabled
            defaultValue={0}
            value={rating ? rating : 0}
          />
        </div>
        <div>
          <span className="room_start">{t('hotel.start_from')}</span>
          <span className="room_price">
            {' '}
            {t('hotel.price_value', {
              val: formatCurrency(price, currentLanguage),
            })}
          </span>
          <span className="room_per_night"> / {t('hotel.per_night')}</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
