/* eslint-disable no-unused-vars */
import { Form, Layout, Popover, Rate, Skeleton, Slider } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';

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

  const [params, setParams] = useState({
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 10,
    offset: searchParams.get('offset')
      ? parseInt(searchParams.get('offset'))
      : 0,
    order: searchParams.get('order') ? searchParams.get('order') : 'desc',
    checkIn: searchParams.get('checkIn') ? searchParams.get('checkIn') : 0,
    checkOut: searchParams.get('checkOut') ? searchParams.get('checkOut') : 0,
    adults: searchParams.get('adults') ? searchParams.get('adults') : 1,
    children: searchParams.get('children') ? searchParams.get('children') : 1,
    minPrice: searchParams.get('minPrice')
      ? parseInt(searchParams.get('minPrice'))
      : 0,
    maxPrice: searchParams.get('maxPrice')
      ? parseInt(searchParams.get('maxPrice'))
      : 1000000000000,
    city: searchParams.get('city') ? searchParams.get('city') : '',
  });

  const [selectedCity, setSelectedCity] = useState(params.city);
  const [minPrice] = useState(params.minPrice);
  const [maxPrice] = useState(params.maxPrice);

  const getHotel = async (params) => {
    const response = await hotelApi.get(params);
    setHotelsData(response.data.data.hotels);
  };

  useEffect(() => {
    getHotel(params);
  }, [params]);

  const onClickHigh = () => {
    setSortValue('high to low');
    setVisibleSortOption(false);
    setParams({
      ...params,
      order: 'desc',
    });
    setSearchParams({
      ...params,
      order: 'desc',
    });
  };

  const onClickLow = () => {
    setSortValue('low to high');
    setVisibleSortOption(false);
    setParams({
      ...params,
      order: 'asc',
    });
    setSearchParams({
      ...params,
      order: 'asc',
    });
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
      city: values.city ? values.city : selectedCity,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      adults: values.adults,
      children: values.children,
    });
    setSearchParams({
      ...searchParams,
      city: values.city ? values.city : selectedCity,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      adults: values.adults,
      children: values.children,
    });
  };

  const onFilterPrice = (value) => {
    setParams({
      ...params,
      minPrice: value[0],
      maxPrice: value[1],
    });
    setSearchParams({
      ...params,
      minPrice: value[0],
      maxPrice: value[1],
    });
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
                    <span>${params.minPrice}</span>
                    <span> to </span>
                    <span>${params.maxPrice}</span>
                    <Slider
                      tooltipVisible={false}
                      className="filter__slider"
                      range
                      defaultValue={[minPrice, maxPrice]}
                      min={minPrice}
                      max={maxPrice}
                      onChange={onFilterPrice}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </Sider>
        <Content className="hotels__section">
          <SearchInHotels
            onClickSearch={onClickSearch}
            setSelectedCity={setSelectedCity}
            city={params.city}
          />
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
