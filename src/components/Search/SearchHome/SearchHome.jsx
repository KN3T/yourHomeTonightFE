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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoBedSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { cityApi, hotelApi } from '../../../api';
import './index.scss';

const { RangePicker } = DatePicker;

const SearchHome = () => {
  const DATE_FORMAT = 'DD-MM-YYYY';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchDate = useSelector((state) => state.booking.searchDate);

  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);

  const [date, setDate] = useState([moment(), moment(moment().add(3, 'day'))]);

  const [options, setOptions] = useState([]);
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const getPrices = async () => {
    const response = await hotelApi.getPrices();
    if (response.data.status === 'success') {
      setMinPrice(response.data.data.minPrice);
      setMaxPrice(response.data.data.maxPrice);
    }
  };

  useEffect(() => {
    getPrices();
  }, []);

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

      navigate({
        pathname: '/hotels',
        search: `?city=${cityName}&minPrice=${minPrice}&maxPrice=${maxPrice}&checkIn=${moment(
          date[0]
        ).format('X')}&checkOut=${moment(date[1]).format(
          'X'
        )}&adults=${adults}&children=${children}&order=desc`,
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

export default SearchHome;
