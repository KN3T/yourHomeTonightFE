import { SearchOutlined } from '@ant-design/icons';
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
    console.log(value);
  };
  const content = (
    <Form
      labelCol={{
        span: 10,
      }}
    >
      <Form.Item label="Beds">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Guests">
        <InputNumber />
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
        <Row gutter={[20, 0]}>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item name="city">
              <Input defaultValue={cityName} />
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
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item>
              <Popover
                trigger="click"
                content={content}
                visible={visible}
                onVisibleChange={handleVisibleChange}
              >
                <Button onClick={handleVisibleChange}>
                  {' '}
                  {beds} Beds, {children + adults} Guests
                </Button>
              </Popover>
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6 }}
            lg={{ span: 6 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item>
              <Button htmlType="submit" type="primary" shape="circle">
                <SearchOutlined />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchHome;
