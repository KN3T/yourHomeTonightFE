import { PhoneOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Image,
  InputNumber,
  List,
  Rate,
  Row,
  Skeleton,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
  RangePickerInHotels,
  RoomDetailsModal,
  RoomInDetailsHotel,
} from '../../components';
import { getByIdAsync } from '../../store/Slice/Hotels/HotelsSlice';
import { filterRoomsByBedsAsync } from '../../store/Slice/Rooms/FilterRoomsSlice';
import { getAllRoomAsync } from '../../store/Slice/Rooms/RoomsSlice';
import formatCurrency from '../../utils/formatCurrency';
import './index.scss';

const DetailsHotelPage = () => {
  //data from store redux
  const loading = useSelector((state) => state.hotels.loading);
  const singleHotel = useSelector((state) => state.hotels.singleHotel);
  const rooms = useSelector((state) => state.rooms.list);
  const loadingRooms = useSelector((state) => state.rooms.loading);
  const roomsFilter = useSelector((state) => state.filterRooms.list);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [roomImages, setRoomImages] = useState([]);
  const { t, i18n } = useTranslation();
  const [beds, setBeds] = useState(1);
  const [dateCheckin, setDateCheckin] = useState();
  const [dateCheckout, setDateCheckout] = useState();
  const currentLanguage = i18n.language;
  //this is for modal room
  const [isModalVisible, setIsModalVisible] = useState(false);
  let { id } = useParams(); //get id from url

  //dispatch to get data from store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByIdAsync(id));
    dispatch(getAllRoomAsync(id));
  }, [id]);
  //get first image to render ui
  let firstImage = '';

  // list of image after remove first image in an array
  let images = [];
  //handle whether data is recieved
  if (singleHotel) {
    firstImage = singleHotel.images !== undefined && singleHotel.images[0].src;
    images = singleHotel.images !== undefined && [
      ...singleHotel.images.slice(1),
    ];
  }
  const showModal = (idRoom) => {
    setIsModalVisible(true);
    const room = rooms.find((room) => room.id === idRoom);
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
    hotelAddress: singleHotel.address,
    rating: singleHotel.rating,
    selectedRoom,
  };
  const onFinish = (value) => {
    setBeds(value.beds);
  };
  const handleFilter = (hotelId, beds) => {
    dispatch(filterRoomsByBedsAsync({ hotelId, beds }));
    console.log(roomsFilter);
  };
  return (
    <div className="details__hotel__wrapper">
      {/* {loading && <Spin spinning={loading} />} */}
      <Skeleton loading={loading}>
        {singleHotel.images ? (
          <Row className="details__hotel__row" gutter={[20, 40]}>
            <Col
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Breadcrumb>
                <Breadcrumb.Item>{t('details__hotel.home')}</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/hotels">{singleHotel.address.province}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{singleHotel.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>

            <Col
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="details__title__wrappper"
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
                  <h1>
                    {singleHotel.name}{' '}
                    {/* <Rate disabled defaultValue={singleHotel.rating} /> */}
                    <Rate disabled defaultValue={5} />
                  </h1>
                  {/* <h4>{singleHotel.address}</h4> */}
                  <h4>
                    <PhoneOutlined />{' '}
                    <a href={`tel:${singleHotel.phone}`}>{singleHotel.phone}</a>
                  </h4>
                  <h4>{`${singleHotel.address.city}, ${singleHotel.address.province}, ${singleHotel.address.address}`}</h4>
                  <h5>
                    <span className="details__rating__number">
                      {/* {t('details__hotel.review', {
                      review: singleHotel.ratingCount,
                    })} */}
                      999
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
                      {t('details__hotel.price_value', {
                        val: formatCurrency(singleHotel.price, currentLanguage),
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
                      description: singleHotel.description,
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
                  {/* <Rate disabled defaultValue={singleHotel.rating} /> */}
                  <Rate disabled defaultValue={5} />
                  <p>
                    {t('details__hotel.based_on', {
                      review: singleHotel.ratingCount,
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
              <Form
                onFinish={onFinish}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
                initialValues={{
                  beds: beds,
                }}
              >
                <Space>
                  <Form.Item>
                    <RangePickerInHotels
                      setDateCheckin={setDateCheckin}
                      setDateCheckout={setDateCheckout}
                    />
                  </Form.Item>
                  <Form.Item label="beds" name="beds">
                    <InputNumber onChange={(value) => setBeds(value)} min={1} />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      onClick={() => handleFilter(id, beds)}
                      htmlType="submit"
                      type="primary"
                    >
                      <SearchOutlined />
                    </Button>
                  </Form.Item>
                </Space>
              </Form>
              <Skeleton loading={loadingRooms}>
                <List
                  itemLayout="horizontal"
                  dataSource={
                    roomsFilter && roomsFilter.length > 0 ? roomsFilter : rooms
                  }
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
