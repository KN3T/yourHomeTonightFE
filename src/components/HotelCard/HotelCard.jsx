import React from 'react';

import './HotelCard.scss';

const HotelCard = () => {
  return (
    <div className="room_card">
      <div className="room_card_img_wrapper">
        <img
          className="room_card_img"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          alt=""
        />
      </div>
      <div className="room_card_info">
        <div className="room_name">Deluxe Contrast Room</div>
        <div className="room_rating">Rating</div>
        <div>
          <span className="room_price">$250</span>
          <span className="room_per_night"> /Per Night</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
