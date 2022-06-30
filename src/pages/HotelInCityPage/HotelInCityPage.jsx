import { Button, Form, Input, Layout, Popover, Rate, Slider } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';

import { HotelList, RoomDetailsModal } from '../../components';
import './HotelInCityPage.scss';

const { Content, Sider } = Layout;

const HotelInCityPage = () => {
  const mockHotelData = [
    {
      id: 1,
      hotelName: 'Vinpearl Hotel Can Tho',
      price: 120,
      img: 'https://content.r9cdn.net/rimg/himg/07/69/27/expediav2-2662803-a43a54-065828.jpg?width=226&height=209&xhint=500&yhint=281&crop=true&watermarkheight=14&watermarkpadding=5',
      rating: 4,
      ratingCount: 250,
      address: 'Phuong 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
    },
    {
      id: 2,
      hotelName: 'Victoria Resort',
      price: 180,
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/12/Capture.png',
      rating: 3,
      ratingCount: 120,
      address: 'Phuong 7',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
    },
    {
      id: 3,
      hotelName: 'Victoria Resort',
      price: 180,
      img: 'http://vietair.com.vn/Media/Images/azerai-can-tho.jpg?w=1200&h=630&c=true',
      rating: 3,
      ratingCount: 120,
      address: 'Phuong 7',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
    },
    {
      id: 4,
      hotelName: 'Victoria Resort',
      price: 180,
      img: 'https://www.hoteljob.vn/uploads/images/18-08-08-16/Resort-la-gi-01.jpeg',
      rating: 3,
      ratingCount: 120,
      address: 'Phuong 7',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
    },
    {
      id: 5,
      hotelName: 'Victoria Resort',
      price: 180,
      img: 'https://cdn.cet.edu.vn/wp-content/uploads/2018/02/thuat-ngu-resort-la-gi.jpg',
      rating: 3,
      ratingCount: 120,
      address: 'Phuong 7',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
    },
    {
      id: 6,
      hotelName: 'Vinpearl Hotel Can Tho',
      price: 120,
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/157869791.jpg?k=5bb305d114029126f9dc4f55b12de4f921b6dd29e11b25076e4a27ec2f9bf7e4&o=&hp=1',
      rating: 4,
      ratingCount: 250,
      address: 'Phuong 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
    },
    {
      id: 7,
      hotelName: 'Victoria Resort',
      price: 180,
      img: 'https://hellotrip.vn/wp-content/uploads/2021/02/gold-coast-resort-5-spa-quang-binh-850000d-phong-23000.jpg',
      rating: 3,
      ratingCount: 120,
      address: 'Phuong 7',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
    },
  ];

  const mockRoomsInHotelData = [
    {
      id: 1,
      hotel_id: 2,
      name: 'A01',
      price: 130,
      beds: 2,
      images: [
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/216662190.jpg?k=4f57a95cedb8a0b499aca8112ac445206fb538b7c35a6e65adada86e79faeac6&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/216662197.jpg?k=5386995cea8418030d3ec2b09b817f2893d1e8b9a392044c74522c7788633c74&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/216662180.jpg?k=22da781b75505a7ce7ee6efed752d0e833196b2bb73dead984bbcca9163a2e60&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/213109774.jpg?k=ae405b41803f56321e8773fdc2a78e0f64d79c884988dd5b939a6938d87c65e6&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/213109776.jpg?k=070830d80413f92c645fb44b5d66903ead1b35a9485c7859017b4a3fc8a1a10d&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/197588683.jpg?k=feef2d9ec96a837c8a74c5e1bad995f42b2e284ab70b9a442ef7ddca8fc2051e&o=',
        },
      ],
      description:
        'Phòng Giường Đôi/2 Giường Đơn này có ban công, áo choàng tắm và ghế sofa.',
      adults: 4,
      children: 2,
      assets: [
        'Hoàn toàn nằm ở tầng trệt',
        'Giường cực dài (> 2 mét)',
        'Tủ lạnh',
        'Điện thoại',
        'Bồn tắm spa',
        'Hệ thống cách âm',
        'Tủ hoặc phòng để quần áo',
      ],
    },
    {
      id: 2,
      hotel_id: 2,
      name: 'A02',
      price: 130,
      beds: 2,
      images: [
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/216662190.jpg?k=4f57a95cedb8a0b499aca8112ac445206fb538b7c35a6e65adada86e79faeac6&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/216662197.jpg?k=5386995cea8418030d3ec2b09b817f2893d1e8b9a392044c74522c7788633c74&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/216662180.jpg?k=22da781b75505a7ce7ee6efed752d0e833196b2bb73dead984bbcca9163a2e60&o=',
        },
        {
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/213109774.jpg?k=ae405b41803f56321e8773fdc2a78e0f64d79c884988dd5b939a6938d87c65e6&o=',
        },
      ],
      description:
        'Phòng Giường Đôi/2 Giường Đơn này có ban công, áo choàng tắm và ghế sofa.',
      adults: 4,
      children: 2,
      assets: [
        'Hoàn toàn nằm ở tầng trệt',
        'Giường cực dài (> 2 mét)',
        'Tủ lạnh',
        'Điện thoại',
        'Bồn tắm spa',
        'Hệ thống cách âm',
        'Tủ hoặc phòng để quần áo',
      ],
    },
  ];

  const [sortValue, setSortValue] = useState('high to low');
  const [visibleSortOption, setVisibleSortOption] = useState(false);

  const { t } = useTranslation();

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

  return (
    <div className="hotelpage__container">
      <Layout className="hotelpage__wrapper">
        <Sider className="hotelpage__sider" width={300}>
          <div className="search__section">
            <Form layout="vertical">
              <Form.Item label={t('hotels.destination')} name="destination">
                <Input placeholder={t('hotels.search_placeholder')} />
              </Form.Item>
              <Button className="search__btn" type="primary">
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
              {mockHotelData.length} {t('hotels.properties')}
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
          <HotelList hotelListData={mockHotelData} />
        </Content>
      </Layout>
    </div>
  );
};

export default HotelInCityPage;
