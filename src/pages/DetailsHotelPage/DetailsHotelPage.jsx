/* eslint-disable no-unused-vars */
import { CaretDownOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Image,
  List,
  Rate,
  Row,
  Skeleton,
  Spin,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { hotelApi } from '../../api';
import { roomsApi } from '../../api/roomsApi';
import {
  Feedback,
  RoomDetailsModal,
  RoomInDetailsHotel,
  SearchRoom,
} from '../../components';
import formatCurrency from '../../utils/formatCurrency';
import './index.scss';

const DetailsHotelPage = () => {
  const loadingContext = useLoadingContext();

  const [hotelData, setHotelData] = useState({});
  const [loadingHotel, setLoadingHotel] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [roomImages, setRoomImages] = useState([]);

  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [date, setDate] = useState([
    moment(
      searchParams.get('checkIn')
        ? searchParams.get('checkIn') * 1000
        : moment()
    ),
    moment(
      searchParams.get('checkOut')
        ? searchParams.get('checkOut') * 1000
        : moment().add(3, 'day')
    ),
  ]);

  const [adults, setAdults] = useState(
    searchParams.get('adults') ? searchParams.get('adults') : 1
  );
  const [children, setChildren] = useState(
    searchParams.get('children') ? searchParams.get('children') : 1
  );

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

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

  const currentLanguage = i18n.language;
  //this is for modal room
  const [isModalVisible, setIsModalVisible] = useState(false);
  let { id } = useParams(); //get id from url
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterRooms = async (params) => {
    setLoadingRooms(true);
    const response = await roomsApi.filter(params);
    if (response.data.status === 'success') {
      setRoomData(response.data.data.rooms);
      setLoadingRooms(false);
    }
  };
  const [dataOrder, setDataOrder] = useState({
    checkIn: parseInt(moment(date[0]).format('X')),
    checkOut: parseInt(moment(date[1]).format('X')),
    selectedRoom,
  });

  const getHotelById = async (id) => {
    setLoadingHotel(true);
    const response = await hotelApi.getById(id);
    if (response.data.status === 'success') {
      response.data.data && setHotelData(response.data.data);
      setDataOrder({
        ...dataOrder,
        hotelAddress: response.data.data.address,
        rating: response.data.data.rating,
      });
      loadingContext.done();
    }
  };

  useEffect(() => {
    filterRooms({
      id: id,
      adults: adults,
      children: children,
      checkIn: parseInt(moment(date[0]).format('X')),
      checkOut: parseInt(moment(date[1]).format('X')),
    });
    getHotelById(id);
  }, [id]);

  //get first image to render ui
  let firstImage = '';

  // list of image after remove first image in an array
  let images = [];

  //handle whether data is received
  if (hotelData) {
    firstImage = hotelData.images !== undefined && hotelData.images[0].src;
    images = hotelData.images !== undefined && [...hotelData.images.slice(1)];
  }
  const showModal = (idRoom) => {
    setIsModalVisible(true);
    const room = roomData.find((room) => room.id === idRoom);
    setSelectedRoom(room);
    setDataOrder({
      ...dataOrder,
      selectedRoom: room,
    });
    setRoomImages(room.images);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (values) => {
    setDataOrder({
      ...dataOrder,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      hotelAddress: hotelData && hotelData.address,
      rating: hotelData && hotelData.rating,
      selectedRoom,
    });

    setSearchParams({
      ...searchParams,
      adults: values.adults,
      children: values.children,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    });

    filterRooms({
      id: id,
      adults: values.adults,
      children: values.children,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    });
  };

  const handleScrollIntoView = () => {
    const list__rooms = document.getElementById('list__rooms');
    list__rooms.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();

  const onClickCity = () => {
    navigate(
      `/hotels?city=${hotelData.address.city}&checkIn=${parseInt(
        moment(date[0]).format('X')
      )}&checkOut=${parseInt(
        moment(date[1]).format('X')
      )}&adult=${adults}&children=${children}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  return (
    <div className="details__hotel__wrapper">
      {hotelData.images && (
        <Row className="details__hotel__row ctn" gutter={[20, 10]}>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            style={{ width: '100%' }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">{t('details__hotel.home')}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={onClickCity}>{hotelData.address.city}</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{hotelData.name}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>

          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="details__title__wrapper"
          >
            <Divider />
            <Row gutter={[10, 0]}>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <h1 style={{ textTransform: 'capitalize' }}>
                  {hotelData.name}
                </h1>
                <h4>
                  <PhoneOutlined />{' '}
                  <a href={`tel:${hotelData.phone}`}>{hotelData.phone}</a>
                </h4>
                <h4
                  style={{ textTransform: 'capitalize' }}
                >{`${hotelData.address.city}, ${hotelData.address.province}, ${hotelData.address.address}`}</h4>
                <h5>
                  <span className="details__rating__number">
                    {hotelData.ratingCount}
                  </span>
                  {t('details__hotel.wonderful_reviews')}
                </h5>
              </Col>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <div className="right">
                  <h1>
                    <span>{t('details__hotel.from')}</span>{' '}
                    <span
                      style={{ color: 'var(--primary-color)', fontWeight: 700 }}
                    >
                      {t('details__hotel.price_value', {
                        val: formatCurrency(hotelData.price, currentLanguage),
                      })}
                    </span>
                    /
                    <span style={{ fontSize: '15px' }}>
                      {t('details__hotel.night')}
                    </span>
                  </h1>
                  <Button onClick={handleScrollIntoView} type="primary">
                    {t('details__hotel.view__rooms')}
                    <CaretDownOutlined />
                  </Button>
                </div>
              </Col>
            </Row>
            <Divider />
          </Col>

          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="details__gallery"
          >
            <Row gutter={[10, 10]}>
              <Col lg={{ span: 12 }}>
                <Image
                  className="details__hotel__image"
                  height="100%"
                  src={firstImage}
                />
              </Col>
              <Col className="images" lg={{ span: 12 }}>
                <Row gutter={[10, 10]}>
                  {images.map((item, key) => (
                    <Col key={key} lg={{ span: 12 }}>
                      <Image
                        className="details__hotel__image"
                        height="100%"
                        src={item.src}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Col>

          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="details__rating__wrapper"
          >
            <Divider />
            <Row gutter={[20, 10]}>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <h1>{t('details__hotel.overview')}</h1>
                <p>
                  {t('details__hotel.description', {
                    description: hotelData.description,
                  })}
                </p>
              </Col>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <h1 id="list__rooms">{t('details__hotel.rating')}</h1>
                <Rate disabled defaultValue={hotelData.rating} />
                <p>
                  {t('details__hotel.based_on', {
                    review: hotelData.ratingCount,
                  })}
                </p>
              </Col>
            </Row>
            <Divider />
          </Col>

          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="filter__wrapper"
          ></Col>

          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <h1 style={{ margin: 0 }}>{t('details__hotel.available_rates')}</h1>
            <SearchRoom
              onClickSearch={handleSearch}
              dateDefault={date}
              adultsDefault={adults}
              childrenDefault={children}
            />
            <Skeleton loading={loadingRooms}>
              <Row gutter={[20, 20]}>
                <Col span={6}>
                  <b>Type of stay</b>
                </Col>
                <Col span={6}>
                  <b>Facilities</b>
                </Col>
                <Col
                  span={6}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <b>Nightly base price</b>
                </Col>
                <Col
                  span={6}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <b>View in details</b>
                </Col>
              </Row>
              <Divider style={{ margin: '12px' }} />
              <List
                itemLayout="horizontal"
                dataSource={roomData && roomData.length > 0 ? roomData : []}
                renderItem={(item) => (
                  <List.Item>
                    {' '}
                    <RoomInDetailsHotel
                      showModal={showModal}
                      room={item ? item : ''}
                    />{' '}
                  </List.Item>
                )}
              />
            </Skeleton>
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Divider />
            <h1>Reviews</h1>
            {hotelData.ratingCount > 0 ? (
              <Feedback hotelId={id} hotelData={hotelData} />
            ) : (
              <h3>This hotel has no review yet</h3>
            )}
            <Divider />
          </Col>

          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <h1>{t('details__hotel.things_to_keep_in_mind')}</h1>
            <Row gutter={[0, 20]}>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <h3>{t('details__hotel.cancellation/prepayment')}</h3>
                <p>{t('details__hotel.policies')}</p>
              </Col>
              <Col
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <h3>{t('details__hotel.checkin_checkout')}</h3>
                <p>{t('details__hotel.checkin')}</p>
              </Col>
            </Row>
            <Divider />
          </Col>
        </Row>
      )}
      {selectedRoom.images && (
        <RoomDetailsModal
          hotelId={id}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          roomData={selectedRoom}
          roomImages={roomImages}
          dataOrder={dataOrder}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
};

export default DetailsHotelPage;
