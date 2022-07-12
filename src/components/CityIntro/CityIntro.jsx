/* eslint-disable react/prop-types */
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import bangkok from '../../assets/images/bangkok.jpg';
import cantho from '../../assets/images/cantho.jpg';
import hanoi from '../../assets/images/hanoi.jpg';
import './CityIntro.scss';

const { Title, Text } = Typography;

const CityInfo = ({ cityData, onClickCity }) => {
  const { t } = useTranslation();
  const images = [
    cantho,
    'https://res.klook.com/image/upload/c_crop,w_1125,h_624,x_1,y_0/w_1125,h_624/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/destination/ur2mrg23d91mex03l4mw.jpg',
    'https://cdnmedia.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2020/11/04/thanh-pho-thu-duc-tp-ho-chi-minh-41120.jpg',
    bangkok,
    hanoi,
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
              <Col span={12} key={index} onClick={() => onClickCity(item.name)}>
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
              <Col span={8} key={index} onClick={() => onClickCity(item.name)}>
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
