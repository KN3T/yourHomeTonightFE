/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, InputNumber, Popover, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './SearchRoom.scss';

const { RangePicker } = DatePicker;

const SearchRoom = ({
  onClickSearch,
  adultsDefault,
  childrenDefault,
  dateDefault,
}) => {
  const DATE_FORMAT = 'DD-MM-YYYY';

  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(dateDefault);
  const [children, setChildren] = useState(childrenDefault);
  const [adults, setAdults] = useState(adultsDefault);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const onFinish = (value) => {
    if (value) {
      setDate(value.date);
      onClickSearch({
        checkIn: parseInt(moment(date[0]).format('X')),
        checkOut: parseInt(moment(date[1]).format('X')),
        adults: adults,
        children: children,
      });
    }
  };

  const { t } = useTranslation();

  const content = (
    <Form
      labelCol={{
        span: 12,
      }}
      initialValues={{
        adults: adults,
        children: children,
      }}
    >
      <Form.Item name="adults" label={t('search.adults')}>
        <InputNumber onChange={(e) => setAdults(e)} min={1} />
      </Form.Item>
      <Form.Item name="children" label={t('search.children')}>
        <InputNumber onChange={(e) => setChildren(e)} min={1} />
      </Form.Item>
    </Form>
  );

  return (
    <div className="search__room__wrapper">
      <Form
        onFinish={onFinish}
        initialValues={{
          children: childrenDefault,
          adults: adultsDefault,
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
                onCalendarChange={setDate}
                allowClear={false}
                disabledDate={(current) =>
                  current.isBefore(moment().subtract(1, 'day'))
                }
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
                    {adults} {t('search.adults')}, {children}{' '}
                    {t('search.children')}
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
