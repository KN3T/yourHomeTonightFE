import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

import bookingApi from '../../../api/bookingApi';
import { roomsApi } from '../../../api/roomsApi';
import './HotelDetail.scss';

const HotelDetail = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'CheckIn',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
      title: 'CheckOut',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const [detailRoom, setDetailRoom] = useState('');
  const [listDetail, setListDetail] = useState([]);

  const customData = (data) => {
    let array = [];
    data.map((e) => {
      array.push({
        key: e.id,
        id: e.id,
        fullName: e.fullName,
        phone: e.phone,
        email: e.email,
        checkIn: new Date(e.checkIn.date)
          .toLocaleString('vi-VN')
          .split('00:00:00,'),
        checkOut: new Date(e.checkOut.date)
          .toLocaleString('vi-VN')
          .split('00:00:00,'),
        createdAt: new Date(e.createdAt.date)
          .toLocaleString('vi-VN')
          .split('00:00:00,'),
      });
    });

    return array;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await roomsApi.getDetail(7, 14);
        if (data.status === 200) {
          setDetailRoom(data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (detailRoom) {
      async function fetchRoom() {
        try {
          const room = await bookingApi.bookingById(7, detailRoom.id);
          setListDetail(customData(room.data.data.bookings));
        } catch (error) {
          console.log(error);
        }
      }

      fetchRoom();
    }
  }, [detailRoom]);

  return (
    <>
      <div className="card">
        <h1 className="title">Room Detail</h1>
        <div className="main">
          <div className="col-left">
            <div className="item">
              <span className="icon">Tên Phòng: </span>
              <span>{detailRoom.number}</span>
            </div>
            <div className="item">
              <span className="icon">Price: </span>
              <span>{detailRoom.price}</span>
            </div>
            <div className="item">
              <span className="icon">Adults: </span>
              <span>{detailRoom.adults}</span>
            </div>
            <div className="item">
              <span className="icon">Assets: </span>
              <span>{detailRoom.asset && detailRoom.asset.toString()}</span>
            </div>
          </div>
          <div className="col-right">
            <div className="item">
              <span className="icon">Type: </span>
              <span>{detailRoom.type}</span>
            </div>
            <div className="item">
              <span className="icon">Beds: </span>
              <span>{detailRoom.beds}</span>
            </div>
            <div className="item">
              <span className="icon">Children: </span>
              <span>{detailRoom.children}</span>
            </div>
            <div className="item">
              <span className="icon">Rating: </span>
              <span>{detailRoom.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h1 className="title">Booking Information</h1>
        <Table dataSource={listDetail} columns={columns} pagination={false} />
      </div>
    </>
  );
};

export default HotelDetail;
