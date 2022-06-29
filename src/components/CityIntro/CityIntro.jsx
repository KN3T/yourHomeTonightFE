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
                <div className="city_info_img1">
                  {' '}
                  <Text className="text_city_info">
                    {' '}
                    <div className="city_name">
                      <h3>Can Tho, Vietname</h3> <p>672 properties</p>
                    </div>
                  </Text>{' '}
                </div>
              </a>
            </section>
          </Col>
          <Col span={12}>
            <section>
              <a>
                <div className="city_info_img2">
                  {' '}
                  <Text className="text_city_info">
                    {' '}
                    <div className="city_name">
                      <h3>Can Tho, Vietname</h3> <p>672 properties</p>
                    </div>
                  </Text>{' '}
                </div>
              </a>
            </section>
          </Col>
        </Row>
        {/* <br/> */}
        <Row gutter={8} className="city_info_row">
          <Col span={8}>
            <section>
              <a>
                <div className="city_info_img3">
                  {' '}
                  <Text className="text_city_info">
                    {' '}
                    <div className="city_name">
                      <h3>Can Tho, Vietname</h3> <p>672 properties</p>
                    </div>
                  </Text>{' '}
                </div>
              </a>
            </section>
          </Col>
          <Col span={8}>
            <section>
              <a>
                <div className="city_info_img4">
                  {' '}
                  <Text className="text_city_info">
                    {' '}
                    <div className="city_name">
                      <h3>Can Tho, Vietname</h3> <p>672 properties</p>
                    </div>
                  </Text>{' '}
                </div>
              </a>
            </section>
          </Col>
          <Col span={8}>
            <section>
              <a>
                <div className="city_info_img5">
                  {' '}
                  <Text className="text_city_info">
                    {' '}
                    <div className="city_name">
                      <h3>Can Tho, Vietname</h3> <p>672 properties</p>
                    </div>
                  </Text>{' '}
                </div>
              </a>
            </section>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CityInfo;
