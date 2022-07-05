import { PhoneOutlined } from '@ant-design/icons';
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
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
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
  const [dateCheckin, setDateCheckin] = useState(
    parseInt(moment().format('X'))
  );
  const [dateCheckout, setDateCheckout] = useState(
    parseInt(moment().add(3, 'day').format('X'))
  );

  const currentLanguage = i18n.language;
  //this is for modal room
  const [isModalVisible, setIsModalVisible] = useState(false);
  let { id } = useParams(); //get id from url

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getRooms = async (id) => {
    setLoadingRooms(true);
    const response = await roomsApi.getAll(id);
    if (response.data.status === 'success') {
      setRoomData(response.data.data.rooms);
      setLoadingRooms(false);
    }
  };

  const filterRooms = async (params) => {
    setLoadingRooms(true);
    const response = await roomsApi.filter(params);
    if (response.data.status === 'success') {
      setRoomData(response.data.data.rooms);
      setLoadingRooms(false);
    }
  };

  const getHotelById = async (id) => {
    setLoadingHotel(true);
    const response = await hotelApi.getById(id);
    if (response.data.status === 'success') {
      setLoadingHotel(false);
      setHotelData(response.data.data);
    }
  };

  useEffect(() => {
    getRooms(id);
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
    setRoomImages(room.images);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dataOrder = {
    dateCheckin,
    dateCheckout,
    hotelAddress: hotelData.address,
    rating: hotelData.rating,
    selectedRoom,
  };

  const handleSearch = (values) => {
    setDateCheckin(values.checkIn);
    setDateCheckout(values.checkOut);

    filterRooms({
      id: id,
      adults: values.adults,
      children: values.children,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
    });
  };
  loadingContext.done();

  return (
    <div className="details__hotel__wrapper">
      <Skeleton loading={loadingHotel}>
        {hotelData.images ? (
          <Row className="details__hotel__row ctn" gutter={[20, 40]}>
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
                  <a onClick={() => history.back()}>
                    {hotelData.address.province}
                  </a>
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
                    {hotelData.name} <Rate disabled defaultValue={5} />
                  </h1>
                  <h4>
                    <PhoneOutlined />{' '}
                    <a href={`tel:${hotelData.phone}`}>{hotelData.phone}</a>
                  </h4>
                  <h4
                    style={{ textTransform: 'capitalize' }}
                  >{`${hotelData.address.city}, ${hotelData.address.province}, ${hotelData.address.address}`}</h4>
                  <h5>
                    <span className="details__rating__number">999</span>
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
                      {t('details__hotel.price_value', {
                        val: formatCurrency(hotelData.price, currentLanguage),
                      })}
                      /
                      <span style={{ fontSize: '15px' }}>
                        {t('details__hotel.night')}
                      </span>
                    </h1>
                    <Button type="primary">
                      {t('details__hotel.view_details')}
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
                  <h1>{t('details__hotel.rating')}</h1>
                  <Rate disabled defaultValue={5} />
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
              <h1>{t('details__hotel.available_rates')}</h1>
              <SearchRoom
                onClickSearch={handleSearch}
                setDateCheckin={setDateCheckin}
                setDateCheckout={setDateCheckout}
              />
              <Skeleton loading={loadingRooms}>
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
              <Feedback hotelId={id} />
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
        ) : (
          ''
        )}
      </Skeleton>
      {selectedRoom.images && (
        <RoomDetailsModal
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
