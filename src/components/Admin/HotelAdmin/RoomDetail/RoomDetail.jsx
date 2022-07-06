import {
  ContactsOutlined,
  DollarOutlined,
  FileTextOutlined,
  LaptopOutlined,
  ProfileOutlined,
  RedditOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Table } from 'antd';
import { Card, Col, Divider, Image, Row } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';

import bookingApi from '../../../../api/bookingApi';
import { roomsApi } from '../../../../api/roomsApi';
import './RoomDetail.scss';

const RoomDetail = () => {
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
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
        status: e.status,
        total: e.total,
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
      const data = await roomsApi.getDetail(9, 56);
      if (data.status === 200) {
        setDetailRoom(data.data.data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (detailRoom) {
      async function fetchRoom() {
        const room = await bookingApi.bookingById(9, detailRoom.id);
        setListDetail(customData(room.data.data.bookings));
      }

      fetchRoom();
    }
  }, [detailRoom]);

  return (
    <>
      <Row>
        <Col className="card_container">
          <div className="card">
            <div className="site-card-border-less-wrapper">
              <Card
                title="Room Detail"
                bordered={false}
                style={{
                  width: 300,
                }}
              >
                <Row>
                  <Col span={8}>
                    <div className="room_wrapper">
                      <p>
                        <span className="icon">
                          {' '}
                          <ContactsOutlined />
                        </span>{' '}
                        <span> Room name: </span>
                        <span>{detailRoom.number}</span>
                      </p>
                      <p>
                        <span className="icon">
                          {' '}
                          <DollarOutlined />
                        </span>{' '}
                        <span> Price: </span>
                        <span>{detailRoom.price}</span>
                      </p>
                      <p>
                        <span className="icon">
                          {' '}
                          <UserOutlined />
                        </span>{' '}
                        <span> Adults: </span>
                        <span>{detailRoom.adults}</span>
                      </p>
                      <p>
                        <span className="icon">
                          <LaptopOutlined />
                        </span>{' '}
                        <span> Assets: </span>
                        <span>
                          {detailRoom.asset && detailRoom.asset.toString()}
                        </span>
                      </p>
                      <p>
                        <span className="icon">
                          <FileTextOutlined />
                        </span>{' '}
                        <span> Description: </span>
                        <span>{detailRoom.description}</span>
                      </p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="room_wrapper">
                      <p>
                        <span className="icon">
                          {' '}
                          <ProfileOutlined />{' '}
                        </span>{' '}
                        <span> Type: </span>
                        <span>{detailRoom.type}</span>
                      </p>
                      <p>
                        <span className="icon">
                          {' '}
                          <RedditOutlined />
                        </span>{' '}
                        <span> Beds: </span>
                        <span>{detailRoom.beds}</span>
                      </p>
                      <p>
                        <span className="icon">
                          {' '}
                          <TeamOutlined />
                        </span>{' '}
                        <span> Children: </span>
                        <span>{detailRoom.children}</span>
                      </p>
                      <p>
                        <span className="icon">
                          {' '}
                          <SmileOutlined />{' '}
                        </span>{' '}
                        <span> Rating: </span>
                        <span>{detailRoom.rating}</span>
                      </p>
                    </div>
                  </Col>
                  <Col span={8}>
                    {detailRoom.images && (
                      <div className="room_wrapper">
                        <Image
                          className="img_rooms"
                          src={detailRoom?.images[0]?.src}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
          <div className="card">
            {' '}
            <Divider />{' '}
          </div>
          <div className="card">
            <h1 className="title">Booking Information</h1>
            <Table
              dataSource={listDetail}
              columns={columns}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default RoomDetail;
