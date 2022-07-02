import { SearchOutlined, UserOutlined } from '@ant-design/icons';
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
import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cityApi } from '../../../api';
import homeBg from '../../../assets/images/homeBg.jpg';
import './index.scss';

const { RangePicker } = DatePicker;

const SearchHome = () => {
  const dateFormat = 'YYYY/MM/DD';
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [checkIn, setCheckIn] = useState(moment());
  const [checkOut, setCheckOut] = useState(moment().add(3, 'day'));
  const [date, setDate] = useState([
    moment(),
    moment(moment().add(3, 'day').format(dateFormat)),
  ]);
  const [options, setOptions] = useState([]);
  const [beds, setBeds] = useState(1);
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [cityName, setCityName] = useState('An Giang');
  const [loading, setLoading] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  const onFinish = (value) => {
    setCityName(value.city);
    setCheckIn(value.date[0].format('YYYY-MM-DD'));
    setCheckOut(value.date[1].format('YYYY-MM-DD'));
    console.log(cityName);
    console.log();
    console.log();
    console.log(beds);
    console.log(adults);
    console.log(children);
    navigate({
      pathname: '/hotels',
      search: `?city=${cityName}&checkIn=${moment(checkIn).format(
        'X'
      )}&checkOut=${moment(checkOut).format(
        'X'
      )}&beds=${beds}&adults=${adults}&children=${children}`,
    });
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
        <InputNumber onChange={(e) => setBeds(e)} min={1} />
      </Form.Item>
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
    // console.log(value);
  };
  const search = _.debounce(async (e) => {
    setLoading(true);
    const response = await cityApi.search(e);
    if (response.data.status === 'success') {
      setOptions(
        response.data.data.map((item) => {
          return {
            label: item.city && item.city,
            value: item.city && item.city,
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
            xl={{ span: 8 }}
            lg={{ span: 8 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Form.Item name="city">
              <AutoComplete
                dropdownMatchSelectWidth={500}
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
                  defaultValue={cityName}
                  loading={loading}
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
                // style={{ maxWidth: '310px' }}
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
