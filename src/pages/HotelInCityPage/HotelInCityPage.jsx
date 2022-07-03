/* eslint-disable no-unused-vars */
import { Form, Layout, Popover, Rate, Slider } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { hotelApi } from '../../api';
import { HotelList, SearchInHotels } from '../../components';
import './HotelInCityPage.scss';

const { Content, Sider } = Layout;

const HotelInCityPage = () => {
  const [form] = Form.useForm();
  const [sortValue, setSortValue] = useState('high to low');
  const [visibleSortOption, setVisibleSortOption] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentParams, setCurrentParams] = useState(location.search);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    setCurrentParams(location.search);
  }, [location.search]);

  const [params, setParams] = useState({
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 10,
    offset: searchParams.get('offset')
      ? parseInt(searchParams.get('offset'))
      : 0,
    order: searchParams.get('order') ? searchParams.get('order') : 'desc',
    checkIn: searchParams.get('checkIn') ? searchParams.get('checkIn') : 0,
    checkOut: searchParams.get('checkOut') ? searchParams.get('checkOut') : 0,
    beds: searchParams.get('beds') ? searchParams.get('beds') : 1,
    adults: searchParams.get('adults') ? searchParams.get('adults') : 1,
    children: searchParams.get('children') ? searchParams.get('children') : 1,
    minPrice: searchParams.get('minPrice')
      ? parseInt(searchParams.get('minPrice'))
      : 0,
    maxPrice: searchParams.get('maxPrice')
      ? parseInt(searchParams.get('maxPrice'))
      : 100,
    city: searchParams.get('city') ? searchParams.get('city') : '',
  });

  const getHotel = async (params) => {
    const response = await hotelApi.get(params);
    setHotelsData(response.data.data.hotels);
  };

  const getPrices = async () => {
    const response = await hotelApi.getPrices();
    if (response.data.status === 'success') {
      setMinPrice(response.data.data.minPrice);
      setMaxPrice(response.data.data.maxPrice);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      price: [minPrice, maxPrice],
    });
  }, [minPrice, maxPrice]);

  useEffect(() => {
    getHotel(params);
    getPrices();
  }, [params]);

  const onClickHigh = () => {
    setSortValue('high to low');
    setVisibleSortOption(false);
    setParams({
      ...params,
      order: 'desc',
    });
    if (currentParams) {
      console.log(123);
      navigate(`/hotels${currentParams}&order=desc`);
    } else {
      navigate(`/hotels/?order=desc`);
    }
  };

  const onClickLow = () => {
    setSortValue('low to high');
    setVisibleSortOption(false);
    setParams({
      ...params,
      order: 'asc',
    });
    if (currentParams) {
      navigate(`/hotels${currentParams}&order=asc`);
    } else {
      navigate(`/hotels/?order=asc`);
    }
  };

  const sortOptions = (
    <div className="sort__options">
      <ul>
        <li
          className={sortValue === 'high to low' ? 'active' : ''}
          onClick={onClickHigh}
        >
          {t('hotels.price')} {t('hotels.high_to_low')}
        </li>
        <li
          className={sortValue === 'low to high' ? 'active' : ''}
          onClick={onClickLow}
        >
          {t('hotels.price')} {t('hotels.low_to_high')}
        </li>
      </ul>
    </div>
  );

  const onClickSearch = (values) => {
    setParams({
      ...params,
      city: values.city,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      beds: values.beds,
      adults: values.adults,
      children: values.children,
    });
    if (currentParams) {
      navigate(
        `/hotels${currentParams}&city=${values.city}&checkIn=${values.checkIn}&checkOut=${values.checkOut}&beds=${values.beds}&adults=${values.adults}&children=${values.children}`
      );
    } else {
      navigate(
        `/hotels?city=${values.city}&checkIn=${values.checkIn}&checkOut=${values.checkOut}&beds=${values.beds}&adults=${values.adults}&children=${values.children}`
      );
    }
  };

  const onFilterPrice = (value) => {
    setParams({
      ...params,
      minPrice: value[0],
      maxPrice: value[1],
    });
    if (currentParams) {
      navigate(
        `/hotels${currentParams}&minPrice=${value[0]}&maxPrice=${value[1]}`
      );
    } else {
      navigate(`/hotels?&minPrice=${value[0]}&maxPrice=${value[1]}`);
    }
  };

  return (
    <div className="hotelpage__container">
      <Layout className="hotelpage__wrapper">
        <Sider className="hotelpage__sider" width={300}>
          <Form form={form}>
            <div className="filter__section">
              <h2 className="filter__heading">{t('hotels.filter_by')}:</h2>
              <div className="filter__item">
                <div className="filter__rating">
                  <h3 className="filter__title">{t('hotels.rating')}</h3>
                  <Form.Item name="rating">
                    <Rate allowHalf defaultValue={1} />
                  </Form.Item>
                </div>
              </div>
              <div className="filter__item">
                <div className="filter__price">
                  <h3 className="filter__title">
                    {t('hotels.your_budget')} ({t('hotels.per_night')})
                  </h3>
                  <Form.Item name="price">
                    <Slider
                      className="filter__slider"
                      range
                      defaultValue={[minPrice, maxPrice]}
                      min={minPrice}
                      max={maxPrice}
                      tooltipVisible
                      onAfterChange={onFilterPrice}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </Sider>
        <Content className="hotels__section">
          <SearchInHotels onClickSearch={onClickSearch} />
          <div className="sort__button__wrapper">
            {hotelsData ? (
              <div className="result__list">
                {hotelsData && hotelsData.length} {t('hotels.properties')}{' '}
                {params.city
                  ? t('hotels.related_to') + ' ' + params.city
                  : 'of all city'}
              </div>
            ) : (
              <div className="result__list">
                No results found for {params.city}
              </div>
            )}

            <Popover
              content={sortOptions}
              placement="bottomRight"
              visible={visibleSortOption}
              onClick={() => setVisibleSortOption(!visibleSortOption)}
            >
              <a className="sort__button">
                {t('hotels.sort_by')}{' '}
                <b>
                  {' '}
                  {t('hotels.price')}{' '}
                  {sortValue === 'high to low'
                    ? t('hotels.high_to_low')
                    : t('hotels.low_to_high')}
                </b>
                <span>
                  <IoIosArrowDown />
                </span>
              </a>
            </Popover>
          </div>
          {hotelsData && <HotelList hotelListData={hotelsData} />}
        </Content>
      </Layout>
    </div>
  );
};

export default HotelInCityPage;
