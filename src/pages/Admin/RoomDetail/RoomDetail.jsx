import {
  CheckCircleOutlined,
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
import { Breadcrumb, Button, Table, Tag } from 'antd';
import { Card, Col, Divider, Image, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { hotelApi } from '../../../api';
import bookingApi from '../../../api/bookingApi';
import { roomsApi } from '../../../api/roomsApi';
import handleTag from '../../../utils/handleTag';
import './RoomDetail.scss';

const RoomDetail = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (item) => {
        console.log(item);
        const { color, text, icon } = handleTag(item);
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: '',
      render: (_, record) => {
        return record.status === 2 ? (
          <Button
            shape="circle"
            onClick={() => handleMarkAsDone(record.id)}
            danger
          >
            <CheckCircleOutlined />
          </Button>
        ) : (
          <Button
            disabled
            shape="circle"
            onClick={() => handleMarkAsDone(record.id)}
            danger
          >
            <CheckCircleOutlined />
          </Button>
        );
      },
    },
  ];

  const handleMarkAsDone = async (id) => {
    await hotelApi.markAsDoneBooking(id);
    const newData = listDetail.map((item) => {
      if (item.id === id) {
        item.status = 4;
        return item;
      } else {
        return item;
      }
    });
    setListDetail(newData);
  };

  const [detailRoom, setDetailRoom] = useState('');
  const [listDetail, setListDetail] = useState([]);

  const params = useParams();

  const customData = (data) => {
    let array = [];
    data &&
      data.map((e) => {
        array.push({
          key: e.id,
          id: e.id,
          fullName: e.fullName,
          phone: e.phone,
          email: e.email,
          status: e.status,
          total: e.total,
          checkIn: moment(e.checkIn.date).format('DD-MM-YYYY'),
          checkOut: moment(e.checkOut.date).format('DD-MM-YYYY'),
          createdAt: moment(e.createdAt.date).format('DD-MM-YYYY'),
        });
      });

    return array;
  };

  const loadingContext = useLoadingContext();

  useEffect(() => {
    async function fetchData() {
      const data = await roomsApi.getDetail(params.id, params.roomId);
      if (data.status === 200) {
        setDetailRoom(data.data.data);
        loadingContext.done();
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      const room = await bookingApi.bookingById(params.id, params.roomId);
      setListDetail(customData(room.data.data.bookings));
    };
    fetchRoom();
    loadingContext.done();
  }, [detailRoom]);

  return (
    <Row>
      <Col span={24}>
        <Row className="header ctn">
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
                <a onClick={() => history.back()}>Rooms</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Room No.{detailRoom.number}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="card_container">
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
        </div>
        <div className="card">
          <Divider />
        </div>
        <div className="card_container">
          <div className="card">
            <h1 className="title">Booking Information</h1>
            <Table
              dataSource={listDetail}
              columns={columns}
              pagination={false}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default RoomDetail;
