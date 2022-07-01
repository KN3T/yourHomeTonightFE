/* eslint-disable no-unused-vars */
import {
  AutoComplete,
  Button,
  Form,
  Input,
  Layout,
  Popover,
  Rate,
  Slider,
} from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { cityApi, hotelApi } from '../../api';
import { HotelList } from '../../components';
import './HotelInCityPage.scss';

const { Content, Sider } = Layout;

const HotelInCityPage = () => {
  const [sortValue, setSortValue] = useState('high to low');
  const [visibleSortOption, setVisibleSortOption] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [params, setParams] = useState({
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 10,
    offset: searchParams.get('offset')
      ? parseInt(searchParams.get('offset'))
      : 0,
    order: searchParams.get('order') ? searchParams.get('order') : 'desc',
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

  useEffect(() => {
    getHotel(params);
  }, [params]);

  const onClickHigh = () => {
    setSortValue('high to low');
    setVisibleSortOption(false);
  };

  const onClickLow = () => {
    setSortValue('low to high');
    setVisibleSortOption(false);
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

  const search = _.debounce(async (e) => {
    const response = await cityApi.search(e);
    setOptions(
      response.data.data.map((item) => {
        return {
          label: item.city && item.city,
          value: item.city && item.city,
        };
      })
    );
  }, 300);

  const handleSearch = (value) => {
    if (value && value !== '') {
      search(value);
    } else if (value === '') {
      setSearchValue('');
      setOptions([]);
    }
  };

  const onSelect = (value) => {
    setSearchValue(value);
  };

  const onClickSearch = () => {
    setParams({
      ...params,
      city: searchValue,
    }),
      navigate({
        pathname: '/hotels',
        search: `?city=${searchValue}`,
      });
  };

  return (
    <div className="hotelpage__container">
      <Layout className="hotelpage__wrapper">
        <Sider className="hotelpage__sider" width={300}>
          <div className="search__section">
            <Form layout="vertical">
              <Form.Item label={t('hotels.destination')} name="destination">
                <AutoComplete
                  dropdownMatchSelectWidth={300}
                  options={options}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                >
                  <Input
                    size="large"
                    placeholder={t('hotels.search_placeholder')}
                    allowClear={true}
                  />
                </AutoComplete>
              </Form.Item>
              <Button
                className="search__btn"
                type="primary"
                onClick={onClickSearch}
              >
                {t('hotels.search')}
              </Button>
            </Form>
          </div>

          <div className="filter__section">
            <h2 className="filter__heading">{t('hotels.filter_by')}:</h2>
            <div className="filter__item">
              <div className="filter__rating">
                <h3 className="filter__title">{t('hotels.rating')}</h3>
                <Rate allowHalf defaultValue={1} />
              </div>
            </div>
            <div className="filter__item">
              <div className="filter__price">
                <h3 className="filter__title">
                  {t('hotels.your_budget')} ({t('hotels.per_night')})
                </h3>
                <Slider
                  className="filter__slider"
                  range
                  defaultValue={[0, 1000000]}
                  min={0}
                  max={4000000}
                  tooltipVisible
                />
              </div>
            </div>
          </div>
        </Sider>
        <Content className="hotels__section">
          <div className="sort__button__wrapper">
            <div className="result__list">
              {hotelsData && hotelsData.length} {t('hotels.properties')}
            </div>
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
