import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Table,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import { roomsApi } from '../../../api/roomsApi';
import './HotelAdmin.scss';
import ModalAdd from './ModalAdd/ModalAdd';
import ModalEdit from './ModalEdit/ModalEdit';

const { confirm } = Modal;

const HotelAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;

  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editRoomData, setEditRoomData] = useState();

  const getRooms = async (id) => {
    setLoading(true);
    const response = await roomsApi.getAll(id);
    if (response.data.status === 'success') {
      setRoomData(
        response.data.data &&
          response.data.data.rooms &&
          response.data.data.rooms.length > 0 &&
          response.data.data.rooms.map((item) => {
            return {
              id: item.id,
              number: item.number,
              type: item.type,
              beds: item.beds,
              adults: item.adults,
              childrenData: item.children,
              description: item.description,
              price: item.price,
              asset: item.asset,
              images: item.images,
            };
          })
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms(id);
  }, [id]);

  useEffect(() => {
    setDataSource(roomData);
  }, [roomData]);

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
    },
    {
      title: 'Adults',
      dataIndex: 'adults',
    },
    {
      title: 'Children',
      dataIndex: 'childrenData',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <Space size="middle">
            <Button
              className="primary__button"
              type="primary"
              ghost
              onClick={() => onClickEdit(id)}
            >
              <AiFillEdit />
            </Button>
            <Button type="danger" onClick={() => onClickDelete(id)}>
              <AiFillDelete />
            </Button>
          </Space>
        );
      },
    },
  ];

  const showDeleteConfirm = (roomId) => {
    confirm({
      title: 'Are you sure delete this room?',
      icon: <ExclamationCircleOutlined />,
      content: 'By confirm this action, this room will be deleted forever',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      async onOk() {
        setLoading(true);
        try {
          const response = await roomsApi.delete({
            roomId: roomId,
            hotelId: id,
          });
          if (response.status === 204) {
            const filterData = dataSource.filter((item) => item.id !== roomId);
            setDataSource(filterData);
            setLoading(false);
            message.success('A room is deleted!!!');
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          message.error('Something went wrong, please try it again!');
        }
      },

      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClickDelete = async (roomId) => {
    showDeleteConfirm(roomId);
  };

  const onClickEdit = (id) => {
    const data = dataSource.find((item) => item.id === id);
    setEditRoomData(data);
    setEditVisible(true);
  };

  const handleAddRoom = async (values) => {
    setLoading(true);
    try {
      const response = await roomsApi.add({ ...values, id });
      if (response.data.status === 'success') {
        dataSource && dataSource.length > 0
          ? setDataSource((prev) => [
              ...prev,
              {
                id: response.data.data.id,
                number: response.data.data.number,
                type: response.data.data.type,
                beds: response.data.data.beds,
                adults: response.data.data.adults,
                childrenData: response.data.data.children,
                description: response.data.data.description,
                price: response.data.data.price,
                asset: response.data.data.asset,
                images: values.imagesSrc,
              },
            ])
          : setDataSource([
              {
                id: response.data.data.id,
                number: response.data.data.number,
                type: response.data.data.type,
                beds: response.data.data.beds,
                adults: response.data.data.adults,
                childrenData: response.data.data.children,
                description: response.data.data.description,
                price: response.data.data.price,
                asset: response.data.data.asset,
                images: values.imagesSrc,
              },
            ]);
        setAddVisible(false);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong, please try it again!');
    }
  };

  const handleEditRoom = async (values) => {
    setLoading(true);
    try {
      const response = await roomsApi.update({
        ...values,
        hotelId: id,
        roomId: editRoomData.id,
      });
      if (response.data.status === 'success') {
        const index = dataSource.findIndex(
          (item) => item.id === editRoomData.id
        );
        let initialData = dataSource;
        initialData[index] = {
          id: response.data.data.id,
          number: response.data.data.number,
          type: response.data.data.type,
          beds: response.data.data.beds,
          adults: response.data.data.adults,
          childrenData: response.data.data.children,
          description: response.data.data.description,
          price: response.data.data.price,
          asset: response.data.data.asset,
          images: response.data.data.images,
        };
        setDataSource(initialData);
        setEditVisible(false);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong, please try it again!');
    }
  };

  const [searchValue, setSearchValue] = useState('');
  // Handle search product by name
  const onSearch = (value) => {
    const currValue = value;
    setSearchValue(value);
    const filteredData = roomData.filter(
      (entry) =>
        entry.number.toString().includes(currValue) ||
        entry.number.toString().includes(currValue) ||
        entry.price.toString().includes(currValue) ||
        entry.type.toLowerCase().includes(currValue) ||
        entry.type.toUpperCase().includes(currValue)
    );
    setDataSource(filteredData);
  };

  return (
    <Spin spinning={loading}>
      <Row>
        <ModalAdd
          visible={addVisible}
          onCancel={() => setAddVisible(false)}
          handleAddRoom={handleAddRoom}
        />
        <ModalEdit
          visible={editVisible}
          onCancel={() => setEditVisible(false)}
          editRoomData={editRoomData}
          handleEditRoom={handleEditRoom}
        />
        <Col span={24}>
          <Row gutter={12}>
            <Col span={8}>
              <Input
                className="search__input"
                onChange={(e) => onSearch(e.target.value)}
                value={searchValue}
              />
            </Col>
            <Col>
              <Button
                onClick={() => setAddVisible(true)}
                type="primary"
                icon={<PlusOutlined />}
              >
                Add new room
              </Button>
            </Col>
          </Row>
        </Col>
        <Divider />
        <Col span={24}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
    </Spin>
  );
};

export default HotelAdmin;
