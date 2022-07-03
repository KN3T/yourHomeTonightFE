/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, InputNumber, Popover, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import './SearchRoom.scss';

const { RangePicker } = DatePicker;

const SearchRoom = ({ onClickSearch }) => {
  const dateFormat = 'YYYY/MM/DD';

  const [visible, setVisible] = useState(false);
  const [checkIn, setCheckIn] = useState(moment());
  const [checkOut, setCheckOut] = useState(moment().add(3, 'day'));
  const [date] = useState([
    moment(),
    moment(moment().add(3, 'day').format(dateFormat)),
  ]);

  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const onFinish = (value) => {
    setCheckIn(value.date[0].format('YYYY-MM-DD'));
    setCheckOut(value.date[1].format('YYYY-MM-DD'));

    onClickSearch({
      checkIn: parseInt(moment(checkIn).format('X')),
      checkOut: parseInt(moment(checkOut).format('X')),
      adults: adults,
      children: children,
    });
  };

  const content = (
    <Form
      labelCol={{
        span: 10,
      }}
      initialValues={{
        adults: adults,
        children: children,
      }}
    >
      <Form.Item name="adults" label="Adults">
        <InputNumber onChange={(e) => setAdults(e)} min={1} />
      </Form.Item>
      <Form.Item name="children" label="Children">
        <InputNumber onChange={(e) => setChildren(e)} min={1} />
      </Form.Item>
    </Form>
  );

  const onChange = (value) => {
    setCheckIn(value[0].format('YYYY-MM-DD'));
    setCheckOut(value[1].format('YYYY-MM-DD'));
  };

  return (
    <div className="search__room__wrapper">
      <Form
        onFinish={onFinish}
        initialValues={{
          children: children,
          adults: adults,
          date: date,
        }}
      >
        <Row gutter={[10, 0]}>
          <Col
            xl={{ span: 12 }}
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item name="date">
              <RangePicker
                className="input"
                size="large"
                onChange={(value) => onChange(value)}
                defaultValue={[
                  moment(),
                  moment(moment().add(3, 'day').format(dateFormat)),
                ]}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 12 }}
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
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
                    {adults} Adults, {children} Children
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
    </div>
  );
};

export default SearchRoom;
