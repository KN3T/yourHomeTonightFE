import React from 'react';

import './HotelCard.scss';

const HotelCard = () => {
  return (
    <div className="room_card">
      <div className="room_card_img_wrapper">
        <img
          className="room_card_img"
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/328270670.jpg?k=e1d9d748699b1aa3257fb190da472def6689647b01a3c540e219fab6b771c184&o=&hp=1"
          alt=""
        />
      </div>
      <div className="room_card_info">
        <div className="room_name">Deluxe Contrast Room</div>
        <div className="room_rating">Rating</div>
        <div>
          <span className="room_price">$250</span>
          <span className="room_per_night"> / Night</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
