import { Col, Row } from 'antd';
import React from 'react';

const CityInfo = () => {
  return (
    <div className="city_info">
      <Row>
        <Col span={12}>
          <img
            className="city_card_img"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/328270670.jpg?k=e1d9d748699b1aa3257fb190da472def6689647b01a3c540e219fab6b771c184&o=&hp=1"
            alt="city_card_img"
          />
        </Col>
        <Col span={12}>
          <img
            className="city_card_img"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/328270670.jpg?k=e1d9d748699b1aa3257fb190da472def6689647b01a3c540e219fab6b771c184&o=&hp=1"
            alt="city_card_img"
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <img
            className="city_card_img"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/328270670.jpg?k=e1d9d748699b1aa3257fb190da472def6689647b01a3c540e219fab6b771c184&o=&hp=1"
            alt="city_card_img"
          />
        </Col>
        <Col span={8}>
          <img
            className="city_card_img"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/328270670.jpg?k=e1d9d748699b1aa3257fb190da472def6689647b01a3c540e219fab6b771c184&o=&hp=1"
            alt="city_card_img"
          />
        </Col>
        <Col span={8}>
          <img
            className="city_card_img"
            src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/328270670.jpg?k=e1d9d748699b1aa3257fb190da472def6689647b01a3c540e219fab6b771c184&o=&hp=1"
            alt="city_card_img"
          />
        </Col>
      </Row>
    </div>
  );
};

export default CityInfo;
