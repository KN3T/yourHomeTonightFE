/* eslint-disable react/prop-types */
import { SearchOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popover,
  Row,
  Spin,
} from 'antd';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

const { RangePicker } = DatePicker;

const SearchHome = (props) => {
  const {
    visible,
    date,
    options,
    childrenData,
    adults,
    cityName,
    loading,
    handleVisibleChange,
    onFinish,
    handleSearch,
    onSelect,
    setAdults,
    setChildren,
    setCityName,
    DATE_FORMAT,
    setDate,
  } = props;

  const { t } = useTranslation();

  const content = (
    <Form
      labelCol={{
        span: 12,
      }}
      initialValues={{
        adults: adults,
        children: childrenData,
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
    <div className="search__home__wrapper">
      <Form
        onFinish={onFinish}
        initialValues={{
          city: cityName,
          children: childrenData,
          adults: adults,
          date: date,
        }}
      >
        <Row gutter={[10, 0]}>
          <Col
            xl={{ span: 8 }}
            lg={{ span: 8 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item name="city">
              <AutoComplete
                dropdownMatchSelectWidth={200}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
              >
                <Input
                  onChange={(e) => {
                    setCityName(e.target.value);
                  }}
                  style={{ paddingRight: '50px' }}
                  className="input"
                  size="large"
                  loading={loading}
                  placeholder={t('search.search_placeholder')}
                />
              </AutoComplete>
              <Spin className="spin__search" spinning={loading} />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 8 }}
            lg={{ span: 8 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item name="date">
              <RangePicker
                className="input"
                size="large"
                allowClear={false}
                format={DATE_FORMAT}
                onCalendarChange={setDate}
                disabledDate={(current) =>
                  current.isBefore(moment().subtract(1, 'day'))
                }
              />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 8 }}
            lg={{ span: 8 }}
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
                    {adults} {t('search.adults')}, {childrenData}{' '}
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

export default SearchHome;
