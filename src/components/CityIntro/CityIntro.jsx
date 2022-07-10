/* eslint-disable react/prop-types */
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './CityIntro.scss';

const { Title, Text } = Typography;

const CityInfo = ({ cityData }) => {
  const { t } = useTranslation();
  const images = [
    'https://res.klook.com/image/upload/c_crop,w_1125,h_624,x_1,y_0/w_1125,h_624/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/destination/ur2mrg23d91mex03l4mw.jpg',
    'https://cdnmedia.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2020/11/04/thanh-pho-thu-duc-tp-ho-chi-minh-41120.jpg',
    'https://i1-kinhdoanh.vnecdn.net/2020/10/19/121774598-699865344269296-8580-6401-9195-1603091427.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=46C_F171FelZxbt2hQuCkQ',
    'https://media-cdn.tripadvisor.com/media/photo-s/1b/28/2a/ed/ha-n-i-th-do-van-minh.jpg',
    'http://divui.com/blog/wp-content/uploads/2016/11/bangkok-city.jpg',
  ];

  const popularCities = cityData.map((item, index) => {
    return {
      name: item.city,
      properties: item.count_hotel,
      backgroundImage: images[index],
    };
  });

  return (
    <div className="city_info  ctn">
      <Title level={2} className="title_city_section">
        {t('city.populer_city_title')}
      </Title>
      <div className="city_info_wrapper">
        <Row gutter={8} className="city_info_row">
          {popularCities.slice(0, 2).map((item, index) => {
            return (
              <Col span={12} key={index}>
                <section className="section_display">
                  <a>
                    <div
                      className="city_info_img"
                      style={{
                        backgroundImage: `url(${item.backgroundImage})`,
                      }}
                    >
                      <Text className="text_city_info">
                        <div className="city_name">
                          <h2>{item.name}</h2>
                          <p>
                            {item.properties}{' '}
                            {t('city.populer_city_properties')}
                          </p>
                        </div>
                      </Text>
                    </div>
                  </a>
                </section>
              </Col>
            );
          })}
        </Row>
        <Row gutter={8} className="city_info_row">
          {popularCities.slice(2, 5).map((item, index) => {
            return (
              <Col span={8} key={index}>
                <section>
                  <a>
                    <div
                      className="city_info_img"
                      style={{
                        backgroundImage: `url(${item.backgroundImage})`,
                      }}
                    >
                      <Text className="text_city_info">
                        <div className="city_name">
                          <h2>{item.name}</h2>
                          <p>
                            {item.properties}{' '}
                            {t('city.populer_city_properties')}
                          </p>
                        </div>
                      </Text>
                    </div>
                  </a>
                </section>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default CityInfo;
