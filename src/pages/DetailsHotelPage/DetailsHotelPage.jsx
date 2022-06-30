import { CheckCircleOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Affix,
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Divider,
  Image,
  List,
  Popover,
  Rate,
  Row,
  Space,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  PopoverDetailsHotel,
  RoomDetailsModal,
  RoomInDetailsHotel,
} from '../../components';
import { getByIdAsync } from '../../store/Slice/Hotels/HotelsSlice';
import { getAllRoomAsync } from '../../store/Slice/Rooms/RoomsSlice';
import formatCurrency from '../../utils/formatCurrency';
import './index.scss';

const DetailsHotelPage = () => {
  //data from store redux
  const loading = useSelector((state) => state.hotels.loading);
  const singleHotel = useSelector((state) => state.hotels.singleHotel);
  const rooms = useSelector((state) => state.rooms.list);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [roomImages, setRoomImages] = useState([]);
  const { t, i18n } = useTranslation();
  const [beds, setBeds] = useState(1);
  const [guests, setGuests] = useState(1);
  const [dateCheckin, setDateCheckin] = useState('');
  const [dateCheckout, setDateCheckout] = useState('');
  const currentLanguage = i18n.language;
  //this is for modal room
  const [isModalVisible, setIsModalVisible] = useState(false);

  //for popover select beds and guests
  const [visiblePopover, setVisiblePopover] = useState(false);
  console.log(beds, guests);
  let { id } = useParams(); //get id from url

  //dispatch to get data from store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByIdAsync(1));
    dispatch(getAllRoomAsync());
  }, [id]);
  //get first image to render ui
  let firstImage = '';

  // list of image after remove first image in an array
  let images = [];

  //handle whether data is recieved
  if (singleHotel) {
    firstImage = singleHotel.images !== undefined && singleHotel.images[0];
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

  const onCheckin = (date, dateString) => {
    console.log('check in', dateString);
    setDateCheckin(dateString);
  };
  const onCheckout = (date, dateString) => {
    console.log('check out', dateString);
    setDateCheckout(dateString);
  };
  return (
    <div className="details__hotel__wrapper">
      {loading && <Spin spinning={loading} />}
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
              <Breadcrumb.Item>New York</Breadcrumb.Item>
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
                  <Rate disabled defaultValue={singleHotel.rating} />
                </h1>
                <h4>{singleHotel.address}</h4>
                <h5>
                  <span className="details__rating__number">
                    {t('details__hotel.review', {
                      review: singleHotel.ratingCount,
                    })}
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
                        src={item}
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
                <Rate disabled defaultValue={singleHotel.rating} />
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
          >
            <h1>{t('details__hotel.available_rates')}</h1>
            <Space
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Space>
                <DatePicker
                  onChange={onCheckin}
                  placeholder={t('details__hotel.check_in')}
                />
                <DatePicker
                  onChange={onCheckout}
                  placeholder={t('details__hotel.check_out')}
                />
                <Popover
                  visible={visiblePopover}
                  content={
                    <PopoverDetailsHotel
                      setVisiblePopover={setVisiblePopover}
                      beds={beds}
                      guests={guests}
                      setBeds={setBeds}
                      setGuests={setGuests}
                    />
                  }
                  trigger="focus"
                >
                  <Button onClick={() => setVisiblePopover(true)}>
                    {beds} {t('details__hotel.beds')}, {guests}{' '}
                    {t('details__hotel.guests')}
                  </Button>
                </Popover>
              </Space>
              <Space>
                <Button style={{ width: 100 }} type="primary">
                  <SearchOutlined />
                </Button>
              </Space>
            </Space>
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={rooms}
              // header={<h1>{t('details__hotel.various_rooms')}</h1>}
              renderItem={(item) => (
                <List.Item>
                  {' '}
                  <RoomInDetailsHotel showModal={showModal} room={item} />{' '}
                </List.Item>
              )}
            />
          </Col>
          <Col
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Divider />
            <h1>{t('details__hotel.amenities')}</h1>
            <Row gutter={[0, 10]}>
              {singleHotel.assets.map((item, key) => (
                <Col
                  lg={{ span: 12 }}
                  xl={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 12 }}
                  key={key}
                >
                  <Space>
                    <CheckCircleOutlined style={{ color: '#158F50' }} />
                    <span>{item}</span>
                  </Space>
                </Col>
              ))}
            </Row>
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
      ) : (
        ''
      )}
      {selectedRoom.images && (
        <RoomDetailsModal
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          roomData={selectedRoom}
          roomImages={roomImages}
        />
      )}
    </div>
  );
};

export default DetailsHotelPage;
