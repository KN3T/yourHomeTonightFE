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
  Modal,
  Popover,
  Row,
  Spin,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoBedSharp } from 'react-icons/io5';

import { cityApi } from '../../api';
import './SearchInHotels.scss';

const { RangePicker } = DatePicker;

const SearchInHotels = ({
  onClickSearch,
  setSelectedCity,
  cityDefault,
  adultsDefault,
  childrenDefault,
  checkInDefault,
  checkOutDefault,
}) => {
  const DATE_FORMAT = 'DD-MM-YYYY';

  const [visible, setVisible] = useState(false);

  const [date, setDate] = useState(
    checkInDefault && checkOutDefault
      ? [moment(checkInDefault * 1000), moment(checkOutDefault * 1000)]
      : [moment(), moment().add(3, 'day')]
  );

  const { t } = useTranslation();

  const [options, setOptions] = useState([]);
  const [children, setChildren] = useState(childrenDefault);
  const [adults, setAdults] = useState(adultsDefault);
  const [cityName, setCityName] = useState(cityDefault);
  const [loading, setLoading] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const error = () => {
    Modal.error({
      title: 'Search your favorite city',
      content: 'Please, enter a city...',
    });
  };

  const onFinish = (value) => {
    if (cityName === '') {
      error();
    } else {
      setCityName(value.city);

      onClickSearch({
        city: cityName,
        checkIn: parseInt(moment(date[0]).format('X')),
        checkOut: parseInt(moment(date[1]).format('X')),
        adults: adults,
        children: children,
      });
    }
  };

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

  const search = _.debounce(async (e) => {
    setLoading(true);
    const response = await cityApi.search(e);
    if (response.data.status === 'success') {
      setOptions(
        response.data.data.map((item) => {
          return {
            value: item.city && item.city,
            label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {item.city && item.city}
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IoBedSharp
                    style={{
                      marginRight: '2px',
                    }}
                  />
                  {item.count_hotel && item.count_hotel}
                </span>
              </div>
            ),
          };
        })
      );
      setLoading(false);
    }
  }, 300);

  const handleSearch = (value) => {
    if (value && value !== '') {
      search(value);
    } else if (value === '') {
      setCityName('');
      setOptions([]);
    }
  };

  const onSelect = (value) => {
    setCityName(value);
    setSelectedCity(value);
  };

  return (
    <div className="search__hotels__wrapper">
      <Form
        onFinish={onFinish}
        initialValues={{
          city: cityName,
          children: children,
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
                  allowClear
                  style={{ paddingRight: '50px' }}
                  className="input"
                  size="large"
                  placeholder={
                    cityDefault ? cityDefault : t('search.search_placeholder')
                  }
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
                format={DATE_FORMAT}
                onCalendarChange={setDate}
                allowClear={false}
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

export default SearchInHotels;
