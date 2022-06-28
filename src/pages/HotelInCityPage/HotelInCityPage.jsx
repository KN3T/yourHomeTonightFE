import { Button, DatePicker, Form, Input, Layout, Rate, Slider } from 'antd';
import React from 'react';

import { HotelList } from '../../components';
import './HotelInCityPage.scss';

const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

const mockHotelData = [
  {
    id: 1,
    hotelName: 'Vinpearl Hotel Can Tho',
    price: 1200000,
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
    price: 1800000,
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
    price: 1800000,
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
    price: 1800000,
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
    price: 1800000,
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
    price: 1200000,
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
    price: 1800000,
    img: 'https://hellotrip.vn/wp-content/uploads/2021/02/gold-coast-resort-5-spa-quang-binh-850000d-phong-23000.jpg',
    rating: 3,
    ratingCount: 120,
    address: 'Phuong 7',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem deleniti accusantium, labore sit in enim, optio asperiores cum reiciendis harum doloremque incidunt explicabo sed rem, modi velit quos voluptatum inventore!',
  },
];

const HotelInCityPage = () => {
  return (
    <div className="hotelpage__container">
      <Layout className="hotelpage__wrapper">
        <Sider className="hotelpage__sider" width={300}>
          <div className="search__section">
            <Form layout="vertical">
              <Form.Item label="Destination" name="destination">
                <Input placeholder="Search city" />
              </Form.Item>
              <Form.Item label="Times" name="times">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
              <Button className="search__btn" type="primary">
                Search
              </Button>
            </Form>
          </div>

          <div className="filter__section">
            <h2 className="filter__heading">Filter by:</h2>
            <div className="filter__item">
              <div className="filter__rating">
                <h3 className="filter__title">Start Rating</h3>
                <Rate allowHalf defaultValue={1} />
              </div>
            </div>
            <div className="filter__item">
              <div className="filter__price">
                <h3 className="filter__title">Your Budget (per night)</h3>
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
        <Content>
          <HotelList hotelListData={mockHotelData} />
        </Content>
      </Layout>
    </div>
  );
};

export default HotelInCityPage;
