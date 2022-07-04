import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { roomsApi } from '../../api/roomsApi';
import RoomDetailsHotel from '../RoomDetailsHotel/RoomDetailsHotel';

const data = [
  {
    id: 12,
    number: 30,
    type: 'Silver',
    beds: 3,
    price: 60,
    adults: 2,
    child: 2,
    asset: [],
    description: 'description',
    images: [
      {
        imageId: 16,
        src: 'https://gos3.ibcdn.com/18f9b55eb22b11eb86440242ac110005.jpg',
      },
    ],
  },
  {
    id: 11,
    number: 45,
    type: 'Gold',
    beds: 2,
    price: 100,
    adults: 2,
    child: 1,
    asset: [],
    description: 'description',
    images: [
      {
        imageId: 15,
        src: 'https://thumbs.dreamstime.com/b/hotel-room-beautiful-orange-sofa-included-43642330.jpg',
      },
    ],
  },
  {
    id: 13,
    number: 75,
    type: 'Diamond',
    beds: 5,
    price: 200,
    adults: 3,
    child: 2,
    asset: [],
    description: 'description',
    images: [
      {
        imageId: 17,
        src: 'http://www.bedbreakfast.ee/wp-content/uploads/2016/10/hotel-room.jpg',
      },
    ],
  },
];

function convertRoomData(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    const {
      id,
      number,
      type,
      beds,
      price,
      adults,
      children,
      description,
      rating,
      asset,
      images,
    } = data[i];
    result.push({
      key: id,
      number,
      type,
      beds,
      price,
      adults,
      child: children,
      description,
      rating,
      asset,
      images,
    });
  }
  return result;
}

const HotelAdmin = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState();
  const [detail, setDetail] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Beds',
      dataIndex: 'beds',
      key: 'beds',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => {
        return (
          <>
            <span
              onClick={() => {
                setIsModalVisible(true);
                setDetail(record);
              }}
            >
              <EditOutlined />
            </span>
            <a
              style={{
                marginLeft: '12px',
              }}
            >
              <DeleteOutlined />
            </a>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    async function getRooms() {
      const hotelIds = [6, 8];
      let data = [];
      for (let i = 0; i < hotelIds.length; i++) {
        const result = await roomsApi.getAll(6);
        data = [...data, ...convertRoomData(result.data.data.rooms)];
      }
      setRooms(data);
    }
    getRooms();
  }, []);

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          <PlusCircleOutlined />
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={rooms}
        pagination={false}
      />
      <div>
        {rooms && detail && (
          <RoomDetailsHotel
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            handleOk={handleOk}
            roomData={detail}
            setIsModalVisible={setIsModalVisible}
          />
        )}
      </div>
    </div>
  );
};

export default HotelAdmin;
