import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

import { roomsApi } from '../../../api/roomsApi';
import RoomDetailsHotel from '../../RoomDetailsHotel/RoomDetailsHotel';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';

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
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [dataEdit, setDataEdit] = useState('');

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddOk = () => {
    setIsModalAddVisible(true);
  };

  const handleAddCancel = () => {
    setIsModalAddVisible(false);
  };

  const handleEditOk = () => {
    setIsModalEditVisible(true);
  };

  const handleEditCancel = () => {
    setIsModalEditVisible(false);
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
            <a
              style={{
                marginRight: '12px',
              }}
              onClick={() => {
                setIsModalVisible(true);
                setDetail(record);
              }}
            >
              <EyeOutlined />
            </a>
            <a>
              <EditOutlined
                onClick={() => {
                  setIsModalEditVisible(true);
                  setDataEdit(record);
                }}
              />
            </a>
            <a
              style={{
                marginLeft: '12px',
              }}
              onClick={() => alertDialog(record.key)}
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
      const result = await roomsApi.getAll(6);
      data = [...data, ...convertRoomData(result.data.data.rooms)];
      setRooms(data);
    }
    getRooms();
  }, []);

  const start = () => {
    setLoading(true); // ajax request after empty completing
    // start delete
    try {
      newSelectedRowKeys.map(async (e) => {
        const params = {
          hotelId: 6,
          beds: e,
        };
        await roomsApi.deleteRoom(params);
      });
      toast.success('Delete Success');
      setLoading(false);
    } catch (error) {
      toast.error('Delete Fails');
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const alertDialog = (id) => {
    confirmAlert({
      title: 'Bạn có muốn xóa room này',
      message: 'Bạn thực sự muốn xóa nó.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleDelete = async (id) => {
    try {
      const params = {
        hotelId: 6,
        beds: id,
      };
      let response = await roomsApi.deleteRoom(params);
      if (response.status === 200) {
        toast.success('Delete Success');
      }
    } catch (error) {
      toast.error('Delete Fails');
    }
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
          style={{ marginRight: '20px' }}
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          <MinusCircleOutlined />
        </Button>
        {hasSelected ? (
          <span
            style={{
              margin: '0 8px',
            }}
          >
            Selected {selectedRowKeys.length} items
          </span>
        ) : (
          ''
        )}
        <Button type="primary" onClick={handleAddOk}>
          <PlusCircleOutlined />
        </Button>
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
      <ModalAdd
        isModalAddVisible={isModalAddVisible}
        handleAddOk={handleAddOk}
        handleCancel={handleAddCancel}
      />

      {data && (
        <ModalEdit
          isModalEditVisible={isModalEditVisible}
          data={dataEdit}
          handleEditOk={handleEditOk}
          handleEditCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default HotelAdmin;
