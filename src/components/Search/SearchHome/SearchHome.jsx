import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popover,
  Row,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import homeBg from '../../../assets/images/homeBg.jpg';
import './index.scss';

const { RangePicker } = DatePicker;
const SearchHome = () => {
  const dateFormat = 'YYYY/MM/DD';
  const [visible, setVisible] = useState(false);
  const [checkIn, setCheckIn] = useState(moment());
  const [checkOut, setCheckOut] = useState(
    moment(moment().add(3, 'day').format(dateFormat))
  );
  const [date, setDate] = useState([checkIn, checkOut]);
  const [beds, setBeds] = useState(1);
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [cityName, setCityName] = useState('An Giang');
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  const onFinish = (value) => {
    setCityName(value.city);
    console.log(cityName);
    console.log(value);
  };
  const content = (
    <Form
      labelCol={{
        span: 10,
      }}
      initialValues={{
        beds: beds,
        adults: adults,
        children: children,
      }}
    >
      <Form.Item name="beds" label="Beds">
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="adults" label="Adults">
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="children" label="Children">
        <InputNumber min={1} />
      </Form.Item>
    </Form>
  );

  const onChange = (value) => {
    setCheckIn(value);
  };
  return (
    <div className="search__home__wrapper">
      <Form
        onFinish={onFinish}
        initialValues={{
          city: cityName,
          beds: beds,
          children: children,
          adults: adults,
          date: date,
        }}
      >
        <Row gutter={[10, 0]}>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item name="city">
              <Input
                className="input"
                style={{ maxWidth: '310px' }}
                size="large"
                defaultValue={cityName}
              />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item name="date">
              <RangePicker
                className="input"
                style={{ maxWidth: '310px' }}
                size="large"
                onChange={(value) => onChange(value)}
                defaultValue={[
                  moment(),
                  moment(moment().add(3, 'day').format(dateFormat)),
                ]}
              />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            xs={{ span: 12 }}
          >
            <Form.Item>
              <div className="popover__guests">
                <Popover
                  className="popover__antd"
                  trigger="click"
                  content={content}
                  visible={visible}
                  onVisibleChange={handleVisibleChange}
                >
                  <Button
                    className="btn"
                    size="large"
                    onClick={handleVisibleChange}
                  >
                    {' '}
                    {beds} Beds, {adults} Adults, {children} Children
                  </Button>
                </Popover>
                <div className="search__btn">
                  <Button
                    className="btn"
                    size="large"
                    htmlType="submit"
                    type="primary"
                  >
                    <SearchOutlined />
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div
        className="ctn bg__image__home"
        style={{ backgroundImage: `url(${homeBg})` }}
      ></div>
    </div>
  );
};

export default SearchHome;
