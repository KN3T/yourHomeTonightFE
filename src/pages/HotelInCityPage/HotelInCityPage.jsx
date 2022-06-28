import { Button, DatePicker, Form, Input, Layout, Rate, Slider } from 'antd';
import React from 'react';

import './HotelInCityPage.scss';

const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

const HotelInCityPage = () => {
  return (
    <div className="hotelpage__container">
      <Layout className="hotelpage__wrapper">
        <Sider className="hotelpage__sider" width={300}>
          <div className="search__section">
            <Form layout="vertical">
              <Form.Item label="Destination" name="destination">
                <Input />
              </Form.Item>
              <Form.Item label="Times" name="times">
                <RangePicker />
              </Form.Item>
              <Button className="search__btn" type="primary">
                Search
              </Button>
            </Form>
          </div>

          <div className="filter__section">
            <h2 className="filter__heading">Filter by:</h2>
            <div className="filter__item">
              <div className="filter__rating">
                <h3 className="filter__title">Start Rating</h3>
                <Rate allowHalf defaultValue={1} />
              </div>
            </div>
            <div className="filter__item">
              <div className="filter__price">
                <h3 className="filter__title">Your Budget (pernight)</h3>
                <Slider
                  className="filter__slider"
                  range
                  defaultValue={[0, 1000000]}
                  min={0}
                  max={4000000}
                  tooltipVisible
                />
              </div>
            </div>
          </div>
        </Sider>
        <Content>
          <ul>
            <li>Hotel 1</li>
            <li>Hotel 2</li>
            <li>Hotel 3</li>
          </ul>
        </Content>
      </Layout>
    </div>
  );
};

export default HotelInCityPage;
