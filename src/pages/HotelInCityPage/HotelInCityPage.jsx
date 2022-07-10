/* eslint-disable no-unused-vars */
import { Col, Form, Layout, Popover, Rate, Row, Slider, Spin } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { hotelApi } from '../../api';
import { HotelList, SearchInHotels } from '../../components';
import formatCurrency from '../../utils/formatCurrency';
import './HotelInCityPage.scss';

const { Content } = Layout;

const HotelInCityPage = () => {
  const loadingContext = useLoadingContext();
  const [form] = Form.useForm();
  const [sortValue, setSortValue] = useState('high to low');
  const [visibleSortOption, setVisibleSortOption] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
      : 1000,
    rating: searchParams.get('rating') ? searchParams.get('rating') : 0,
    city: searchParams.get('city') ? searchParams.get('city') : '',
  });

  const [selectedCity, setSelectedCity] = useState(params.city);
  const [minPrice] = useState(params.minPrice);
  const [maxPrice] = useState(params.maxPrice);

  const getHotel = async (params) => {
    setLoading(true);
    const response = await hotelApi.get(params);
    if (response.data.status === 'success') {
      setHotelsData(response.data.data.hotels);
      setLoading(false);
      loadingContext.done();
    }
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

  const onChangeRating = (value) => {
    setParams({
      ...params,
      rating: parseFloat(value),
    });
    setSearchParams({
      ...params,
      rating: parseFloat(value),
    });
  };

  return (
    <Spin spinning={loading}>
      <div className="hotelpage__container">
        <Row className="hotelpage__wrapper ctn" gutter={10}>
          <Col xxl={6} xl={6} lg={6} md={24} xs={24}>
            <div className="hotelpage__sider">
              <Form form={form}>
                <div className="filter__section">
                  <h2 className="filter__heading">{t('hotels.filter_by')}:</h2>
                  <div className="filter__item">
                    <div className="filter__rating">
                      <h3 className="filter__title">{t('hotels.rating')}</h3>
                      <Form.Item name="rating">
                        <Rate
                          allowHalf
                          defaultValue={0}
                          onChange={onChangeRating}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="filter__item">
                    <div className="filter__price">
                      <h3 className="filter__title">
                        {t('hotels.your_budget')} ({t('hotels.per_night')})
                      </h3>
                      <Form.Item name="price">
                        <span>
                          {t('hotels.price_value', {
                            val: formatCurrency(
                              params.minPrice,
                              currentLanguage
                            ),
                          })}
                        </span>
                        <span> {t('hotels.to')} </span>
                        <span>
                          {t('hotels.price_value', {
                            val: formatCurrency(
                              params.maxPrice,
                              currentLanguage
                            ),
                          })}
                        </span>
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
            </div>
          </Col>
          <Col xxl={18} xl={18} lg={18} md={24} xs={24}>
            <Content className="hotels__section">
              <SearchInHotels
                onClickSearch={onClickSearch}
                setSelectedCity={setSelectedCity}
                cityDefault={params.city}
                adultsDefault={params.adults}
                childrenDefault={params.children}
                checkInDefault={params.checkIn}
                checkOutDefault={params.checkOut}
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
              {hotelsData && (
                <HotelList
                  hotelListData={hotelsData}
                  cityDefault={params.city}
                  adultsDefault={params.adults}
                  childrenDefault={params.children}
                  checkInDefault={params.checkIn}
                  checkOutDefault={params.checkOut}
                />
              )}
            </Content>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default HotelInCityPage;
