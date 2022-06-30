import React from 'react';

// import { Typography } from 'antd'
import './CityCard.scss';

// const { Title } = Typography;
const CityCard = () => {
  return (
    <div>
      {/* <Title level={2}>Our Most Populer City</Title> */}
      <div className="city_card">
        <div className="city_card_wrapper">
          <div className="city_card_img_wrapper">
            <img
              className="city_card_img"
              src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/328270670.jpg?k=e1d9d748699b1aa3257fb190da472def6689647b01a3c540e219fab6b771c184&o=&hp=1"
              alt="city_card_img"
            />
          </div>
          <div className="city_card_info">
            <div className="city_name">City Name</div>
            <div className="city_total">13,133 motels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
