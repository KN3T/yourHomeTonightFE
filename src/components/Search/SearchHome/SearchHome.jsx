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
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { IoBedSharp } from 'react-icons/io5';
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
  const [date] = useState([
    moment(),
    moment(moment().add(3, 'day').format(dateFormat)),
  ]);
  const [options, setOptions] = useState([]);
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);

  const getFirstCity = async () => {
    const response = await cityApi.getAll();
    return setCityName(response.data.data[0].city);
  };

  useEffect(() => {
    getFirstCity();
  }, []);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const onFinish = (value) => {
    setCityName(value.city);
    setCheckIn(value.date[0].format('YYYY-MM-DD'));
    setCheckOut(value.date[1].format('YYYY-MM-DD'));

    navigate({
      pathname: '/hotels',
      search: `?city=${cityName}&checkIn=${moment(checkIn).format(
        'X'
      )}&checkOut=${moment(checkOut).format(
        'X'
      )}&adults=${adults}&children=${children}`,
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
  };

  return (
    <div className="search__home__wrapper">
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
                  style={{ paddingRight: '50px' }}
                  className="input"
                  size="large"
                  loading={loading}
                  placeholder={`Search your favarite city. EX: ${cityName}`}
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
      <div
        className="ctn bg__image__home"
        style={{ backgroundImage: `url(${homeBg})` }}
      ></div>
    </div>
  );
};

export default SearchHome;
