import { Col, Row } from 'antd';
import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './CityIntro.scss';

const { Title, Text } = Typography;

const CityInfo = () => {
  const { t } = useTranslation();
  const popularCities = [
    {
      name: 'Phú Quốc, Việt Nam',
      properties: 673,
      backgroundImage:
        'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/124355467.jpg?k=dd21ad9708439a0b43cda501e2f0b08eda27460129a599b3556d0cf994f364e8&o=&hp=1',
    },
    {
      name: 'TP. Hồ Chí Minh, Việt Nam',
      properties: 2018,
      backgroundImage:
        'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/196407744.jpg?k=1f82b3bbe1509877d15386622426e01aa912b1f1c53caa52f0426c403967ad95&o=&hp=1',
    },
    {
      name: 'Cần Thơ, Việt Nam',
      properties: 709,
      backgroundImage:
        'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/196407744.jpg?k=1f82b3bbe1509877d15386622426e01aa912b1f1c53caa52f0426c403967ad95&o=&hp=1',
    },
    {
      name: 'Hội An, Việt Nam',
      properties: 980,
      backgroundImage:
        'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/161116603.jpg?k=bf827bd530d82f54a078054ba524e29400c18695615251709e96b121d0c57556&o=&hp=1',
    },
    {
      name: 'Huế, Việt Nam',
      properties: 1024,
      backgroundImage:
        'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/161116585.jpg?k=6d35e26e4ba72338ee27704ad0468da3bd257d7be0b94dba6b3ec931b174ea11&o=&hp=1',
    },
  ];

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
