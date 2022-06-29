import { Col, Row } from 'antd';
import { Typography } from 'antd';
import React from 'react';

import CityPopulerList from '../CityPolulerList/CityPopulerList';
import './CityIntro.scss';

const { Title, Text } = Typography;
const CityInfo = () => {
  return (
    <div className="city_info">
      <Title level={2} className="title_city_section">
        Our Most Populer City
      </Title>
      <CityPopulerList />
      <div className="city_info_wrapper">
        <Row gutter={8} className="city_info_row">
          <Col span={12}>
            <section className="section_display">
              <a>
                <div className="city_info_img">
                  {' '}
                  <Text>Can Tho, Vietname</Text>{' '}
                </div>
                {/* <img
            className="city_info_img"
            src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/124355467.jpg?k=dd21ad9708439a0b43cda501e2f0b08eda27460129a599b3556d0cf994f364e8&o=&hp=1"
            alt="city_card_img"
          /> */}
              </a>
              {/* <Text>Can Tho, Vietname</Text> */}
            </section>
          </Col>
          <Col span={12}>
            <section>
              <a>
                <img
                  className="city_info_img"
                  src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/124355467.jpg?k=dd21ad9708439a0b43cda501e2f0b08eda27460129a599b3556d0cf994f364e8&o=&hp=1"
                  alt="city_card_img"
                />
              </a>
            </section>
          </Col>
        </Row>
        {/* <br/> */}
        <Row gutter={8} className="city_info_row">
          <Col span={8}>
            <section>
              <a>
                <img
                  className="city_info_img"
                  src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/124355467.jpg?k=dd21ad9708439a0b43cda501e2f0b08eda27460129a599b3556d0cf994f364e8&o=&hp=1"
                  alt="city_card_img"
                />
              </a>
            </section>
          </Col>
          <Col span={8}>
            <section>
              <a>
                <img
                  className="city_info_img"
                  src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/124355467.jpg?k=dd21ad9708439a0b43cda501e2f0b08eda27460129a599b3556d0cf994f364e8&o=&hp=1"
                  alt="city_card_img"
                />
              </a>
            </section>
          </Col>
          <Col span={8}>
            <section>
              <a>
                <img
                  className="city_info_img"
                  src="https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/124355467.jpg?k=dd21ad9708439a0b43cda501e2f0b08eda27460129a599b3556d0cf994f364e8&o=&hp=1"
                  alt="city_card_img"
                />
              </a>
            </section>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CityInfo;
