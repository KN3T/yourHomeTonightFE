import {
  PhoneOutlined,
  RollbackOutlined,
  SearchOutlined,
} from '@ant-design/icons';
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

import { RoomDetailsModal, RoomInDetailsHotel } from '../../../components';
import { getByIdAsync } from '../../../store/Slice/Hotels/HotelsSlice';
import { getAllRoomAsync } from '../../../store/Slice/Rooms/RoomsSlice';
import formatCurrency from '../../../utils/formatCurrency';
import './index.scss';

const DetailHotel = () => {
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  let { id } = useParams(); //get id from url
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getByIdAsync(id));
    dispatch(getAllRoomAsync(id));
  }, [id]);
  //get first image to render ui
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

  return (
    <>
      <div className="top">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin/hotel">
              <Button
                type="primary"
                className="py-2"
                shape="round"
                icon={<RollbackOutlined />}
                size={'large'}
              >
                Back
              </Button>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="details__hotel__wrapper">
        <Skeleton loading={loading}>
          <List
            style={{ width: '100%' }}
            itemLayout="horizontal"
            dataSource={
              roomsFilter && roomsFilter.length > 0 ? roomsFilter : rooms
            }
            renderItem={(item) => (
              <List.Item>
                {' '}
                <RoomInDetailsHotel
                  showModal={showModal}
                  idHotel={id}
                  room={item ? item : ''}
                  isShowDelete
                />{' '}
              </List.Item>
            )}
          />
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
            isShowAdmin
          />
        )}
      </div>
    </>
  );
};

export default DetailHotel;
