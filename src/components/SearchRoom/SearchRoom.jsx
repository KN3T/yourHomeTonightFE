/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, InputNumber, Popover, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addSearchDate } from '../../store/Slice/Booking/BookingSlice';
import './SearchRoom.scss';

const { RangePicker } = DatePicker;

const SearchRoom = ({ onClickSearch, setDateCheckin, setDateCheckout }) => {
  const DATE_FORMAT = 'DD-MM-YYYY';
  const searchDate = useSelector((state) => state.booking.searchDate);

  const [visible, setVisible] = useState(false);
  const [checkIn, setCheckIn] = useState(moment());
  const [checkOut, setCheckOut] = useState(moment().add(3, 'day'));
  const [date] =
    searchDate.checkIn && searchDate.checkOut
      ? useState([
          moment(searchDate.checkIn * 1000),
          moment(searchDate.checkOut * 1000),
        ])
      : useState([moment(), moment(moment().add(3, 'day'))]);

  const dispatch = useDispatch();

  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const onFinish = (value) => {
    setCheckIn(value.date[0].format(DATE_FORMAT));
    setCheckOut(value.date[1].format(DATE_FORMAT));

    dispatch(
      addSearchDate({
        checkIn: parseInt(value.date[0].format('X')),
        checkOut: parseInt(value.date[1].format('X')),
      })
    );

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
    setCheckIn(value[0]);
    setCheckOut(value[1]);
    setDateCheckin(parseInt(moment(value[0]).format('X')));
    setDateCheckout(parseInt(moment(value[1]).format('X')));
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
                format={DATE_FORMAT}
                className="input"
                size="large"
                onChange={(value) => onChange(value)}
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
